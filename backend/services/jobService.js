const Job = require('../models/Job');
const Company = require('../models/Company');
const User = require('../models/User');
const { buildSearchQuery, buildPaginationOptions, buildSortOptions } = require('../utils/helpers');

class JobService {
  // Create a new job
  async createJob(jobData, companyId) {
    try {
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Company not found');
      }

      const job = new Job({
        ...jobData,
        company: companyId,
        createdBy: jobData.createdBy
      });

      await job.save();
      await job.populate('company', 'name logo location website');
      
      // Update company's job count
      await Company.findByIdAndUpdate(companyId, {
        $inc: { 'statistics.totalJobs': 1, 'statistics.activeJobs': 1 }
      });

      return job;
    } catch (error) {
      throw new Error(`Failed to create job: ${error.message}`);
    }
  }

  // Get all jobs with filtering, searching, and pagination
  async getJobs(query = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        location,
        jobType,
        experienceLevel,
        salaryMin,
        salaryMax,
        skills,
        companySize,
        industry,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        isActive = true
      } = query;

      // Build search query
      const searchQuery = { status: 'published' };
      
      if (isActive !== undefined) {
        searchQuery.isActive = isActive === 'true';
      }

      // Text search
      if (search) {
        searchQuery.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { 'requirements.skills': { $in: [new RegExp(search, 'i')] } }
        ];
      }

      // Location filter
      if (location) {
        searchQuery.$or = searchQuery.$or || [];
        searchQuery.$or.push(
          { 'location.city': { $regex: location, $options: 'i' } },
          { 'location.state': { $regex: location, $options: 'i' } },
          { 'location.country': { $regex: location, $options: 'i' } }
        );
      }

      // Job type filter
      if (jobType) {
        searchQuery.jobType = { $in: Array.isArray(jobType) ? jobType : [jobType] };
      }

      // Experience level filter
      if (experienceLevel) {
        searchQuery['requirements.experienceLevel'] = { 
          $in: Array.isArray(experienceLevel) ? experienceLevel : [experienceLevel] 
        };
      }

      // Salary filter
      if (salaryMin || salaryMax) {
        searchQuery['salary.min'] = {};
        if (salaryMin) searchQuery['salary.min'].$gte = parseInt(salaryMin);
        if (salaryMax) searchQuery['salary.max'] = { $lte: parseInt(salaryMax) };
      }

      // Skills filter
      if (skills) {
        const skillsArray = Array.isArray(skills) ? skills : skills.split(',');
        searchQuery['requirements.skills'] = { $in: skillsArray.map(skill => new RegExp(skill, 'i')) };
      }

      // Company size filter (need to populate company)
      let companyFilter = {};
      if (companySize) {
        companyFilter['statistics.employeeCount'] = {};
        const sizes = Array.isArray(companySize) ? companySize : [companySize];
        
        const sizeRanges = sizes.map(size => {
          switch (size) {
            case 'startup': return { $lt: 50 };
            case 'small': return { $gte: 50, $lt: 200 };
            case 'medium': return { $gte: 200, $lt: 1000 };
            case 'large': return { $gte: 1000 };
            default: return {};
          }
        });
        
        if (sizeRanges.length > 0) {
          companyFilter['statistics.employeeCount'] = { $or: sizeRanges };
        }
      }

      // Industry filter
      if (industry) {
        companyFilter.industry = { $in: Array.isArray(industry) ? industry : [industry] };
      }

      // Build pagination and sort options
      const paginationOptions = buildPaginationOptions(page, limit);
      const sortOptions = buildSortOptions(sortBy, sortOrder);

      // Execute query
      let jobQuery = Job.find(searchQuery)
        .populate('company', 'name logo location website industry statistics')
        .populate('createdBy', 'firstName lastName email')
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const jobs = await jobQuery.exec();

      // Filter by company criteria if needed
      let filteredJobs = jobs;
      if (Object.keys(companyFilter).length > 0) {
        filteredJobs = jobs.filter(job => {
          if (companySize && companyFilter['statistics.employeeCount']) {
            const empCount = job.company.statistics?.employeeCount || 0;
            const sizeMatch = companyFilter['statistics.employeeCount'].$or?.some(range => {
              return Object.keys(range).every(op => {
                switch (op) {
                  case '$lt': return empCount < range[op];
                  case '$gte': return empCount >= range[op];
                  case '$lte': return empCount <= range[op];
                  default: return true;
                }
              });
            });
            if (!sizeMatch) return false;
          }
          
          if (industry && !companyFilter.industry.$in.includes(job.company.industry)) {
            return false;
          }
          
          return true;
        });
      }

      // Get total count for pagination
      const totalJobs = await Job.countDocuments(searchQuery);

      return {
        jobs: filteredJobs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalJobs / limit),
          totalJobs,
          hasNext: parseInt(page) < Math.ceil(totalJobs / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch jobs: ${error.message}`);
    }
  }

  // Get a single job by ID
  async getJobById(jobId) {
    try {
      const job = await Job.findById(jobId)
        .populate('company', 'name logo location website industry description statistics')
        .populate('createdBy', 'firstName lastName email')
        .populate('applications', 'applicant status appliedAt');

      if (!job) {
        throw new Error('Job not found');
      }

      // Increment view count
      await Job.findByIdAndUpdate(jobId, { $inc: { views: 1 } });

      return job;
    } catch (error) {
      throw new Error(`Failed to fetch job: ${error.message}`);
    }
  }

  // Update a job
  async updateJob(jobId, updateData, userId) {
    try {
      const job = await Job.findById(jobId);
      
      if (!job) {
        throw new Error('Job not found');
      }

      // Check if user has permission to update
      if (job.createdBy.toString() !== userId) {
        const company = await Company.findById(job.company);
        if (!company.employees.some(emp => emp.userId.toString() === userId && emp.role === 'admin')) {
          throw new Error('Unauthorized to update this job');
        }
      }

      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).populate('company', 'name logo location website');

      return updatedJob;
    } catch (error) {
      throw new Error(`Failed to update job: ${error.message}`);
    }
  }

  // Delete a job
  async deleteJob(jobId, userId) {
    try {
      const job = await Job.findById(jobId);
      
      if (!job) {
        throw new Error('Job not found');
      }

      // Check permissions
      if (job.createdBy.toString() !== userId) {
        const company = await Company.findById(job.company);
        if (!company.employees.some(emp => emp.userId.toString() === userId && emp.role === 'admin')) {
          throw new Error('Unauthorized to delete this job');
        }
      }

      await Job.findByIdAndDelete(jobId);

      // Update company statistics
      await Company.findByIdAndUpdate(job.company, {
        $inc: { 
          'statistics.totalJobs': -1,
          'statistics.activeJobs': job.isActive ? -1 : 0
        }
      });

      return { message: 'Job deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete job: ${error.message}`);
    }
  }

  // Get jobs by company
  async getJobsByCompany(companyId, query = {}) {
    try {
      const { page = 1, limit = 10, status, isActive } = query;

      const searchQuery = { company: companyId };
      
      if (status) {
        searchQuery.status = status;
      }
      
      if (isActive !== undefined) {
        searchQuery.isActive = isActive === 'true';
      }

      const paginationOptions = buildPaginationOptions(page, limit);

      const jobs = await Job.find(searchQuery)
        .populate('createdBy', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const totalJobs = await Job.countDocuments(searchQuery);

      return {
        jobs,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalJobs / limit),
          totalJobs,
          hasNext: parseInt(page) < Math.ceil(totalJobs / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch company jobs: ${error.message}`);
    }
  }

  // Get recommended jobs for a user
  async getRecommendedJobs(userId, limit = 10) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Get user's skills and preferences
      const userSkills = user.profile?.skills || [];
      const preferredJobTypes = user.preferences?.jobTypes || [];
      const preferredLocations = user.preferences?.locations || [];

      // Build recommendation query
      const searchQuery = {
        status: 'published',
        isActive: true,
        // Exclude jobs user already applied to
        _id: { $nin: user.applications || [] }
      };

      // Find jobs matching user's skills
      if (userSkills.length > 0) {
        searchQuery['requirements.skills'] = {
          $in: userSkills.map(skill => new RegExp(skill, 'i'))
        };
      }

      // Filter by preferred job types
      if (preferredJobTypes.length > 0) {
        searchQuery.jobType = { $in: preferredJobTypes };
      }

      // Filter by preferred locations
      if (preferredLocations.length > 0) {
        searchQuery.$or = preferredLocations.map(location => ({
          $or: [
            { 'location.city': { $regex: location, $options: 'i' } },
            { 'location.state': { $regex: location, $options: 'i' } }
          ]
        }));
      }

      const recommendedJobs = await Job.find(searchQuery)
        .populate('company', 'name logo location website')
        .sort({ createdAt: -1 })
        .limit(limit);

      return recommendedJobs;
    } catch (error) {
      throw new Error(`Failed to get recommended jobs: ${error.message}`);
    }
  }

  // Get job statistics
  async getJobStatistics(companyId = null) {
    try {
      const matchQuery = companyId ? { company: companyId } : {};

      const stats = await Job.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: null,
            totalJobs: { $sum: 1 },
            activeJobs: { $sum: { $cond: ['$isActive', 1, 0] } },
            publishedJobs: { $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] } },
            draftJobs: { $sum: { $cond: [{ $eq: ['$status', 'draft'] }, 1, 0] } },
            totalApplications: { $sum: '$applicationCount' },
            totalViews: { $sum: '$views' },
            avgSalaryMin: { $avg: '$salary.min' },
            avgSalaryMax: { $avg: '$salary.max' }
          }
        }
      ]);

      // Get job type distribution
      const jobTypeStats = await Job.aggregate([
        { $match: matchQuery },
        { $group: { _id: '$jobType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      // Get experience level distribution
      const experienceStats = await Job.aggregate([
        { $match: matchQuery },
        { $group: { _id: '$requirements.experienceLevel', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      return {
        overview: stats[0] || {
          totalJobs: 0,
          activeJobs: 0,
          publishedJobs: 0,
          draftJobs: 0,
          totalApplications: 0,
          totalViews: 0,
          avgSalaryMin: 0,
          avgSalaryMax: 0
        },
        jobTypeDistribution: jobTypeStats,
        experienceLevelDistribution: experienceStats
      };
    } catch (error) {
      throw new Error(`Failed to get job statistics: ${error.message}`);
    }
  }

  // Toggle job active status
  async toggleJobStatus(jobId, userId) {
    try {
      const job = await Job.findById(jobId);
      
      if (!job) {
        throw new Error('Job not found');
      }

      // Check permissions
      if (job.createdBy.toString() !== userId) {
        const company = await Company.findById(job.company);
        if (!company.employees.some(emp => emp.userId.toString() === userId && emp.role === 'admin')) {
          throw new Error('Unauthorized to modify this job');
        }
      }

      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { 
          isActive: !job.isActive,
          updatedAt: new Date()
        },
        { new: true }
      ).populate('company', 'name logo location website');

      // Update company statistics
      const increment = job.isActive ? -1 : 1;
      await Company.findByIdAndUpdate(job.company, {
        $inc: { 'statistics.activeJobs': increment }
      });

      return updatedJob;
    } catch (error) {
      throw new Error(`Failed to toggle job status: ${error.message}`);
    }
  }
}

module.exports = new JobService();
