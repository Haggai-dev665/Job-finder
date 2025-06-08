const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const Company = require('../models/Company');
const { buildPaginationOptions, buildSortOptions } = require('../utils/helpers');
const emailService = require('../utils/emailService');

class ApplicationService {
  // Submit a job application
  async submitApplication(applicationData, userId) {
    try {
      const { jobId, coverLetter, expectedSalary } = applicationData;

      // Check if job exists and is active
      const job = await Job.findById(jobId).populate('company', 'name');
      if (!job) {
        throw new Error('Job not found');
      }

      if (!job.isActive || job.status !== 'published') {
        throw new Error('Job is not available for applications');
      }

      // Check if application deadline has passed
      if (job.applicationDeadline && new Date() > job.applicationDeadline) {
        throw new Error('Application deadline has passed');
      }

      // Check if user already applied for this job
      const existingApplication = await Application.findOne({
        applicant: userId,
        job: jobId
      });

      if (existingApplication) {
        throw new Error('You have already applied for this job');
      }

      // Get user details
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Create application
      const application = new Application({
        applicant: userId,
        job: jobId,
        company: job.company._id,
        coverLetter,
        expectedSalary,
        timeline: [{
          stage: 'applied',
          date: new Date(),
          notes: 'Application submitted'
        }]
      });

      await application.save();

      // Update job application count
      await Job.findByIdAndUpdate(jobId, {
        $inc: { applicationCount: 1 },
        $push: { applications: application._id }
      });

      // Update user applications list
      await User.findByIdAndUpdate(userId, {
        $push: { applications: application._id }
      });

      // Populate application details for response
      await application.populate([
        { path: 'job', select: 'title company location' },
        { path: 'company', select: 'name logo' },
        { path: 'applicant', select: 'firstName lastName email profile' }
      ]);

      // Send confirmation email to applicant
      try {
        await emailService.sendApplicationConfirmation(
          user.email,
          user.firstName,
          job.title,
          job.company.name
        );
      } catch (emailError) {
        console.error('Failed to send application confirmation email:', emailError);
      }

      return application;
    } catch (error) {
      throw new Error(`Failed to submit application: ${error.message}`);
    }
  }

  // Get user's applications
  async getUserApplications(userId, query = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        sortBy = 'appliedAt',
        sortOrder = 'desc'
      } = query;

      const searchQuery = { applicant: userId };
      
      if (status) {
        searchQuery.status = status;
      }

      const paginationOptions = buildPaginationOptions(page, limit);
      const sortOptions = buildSortOptions(sortBy, sortOrder);

      const applications = await Application.find(searchQuery)
        .populate('job', 'title company location jobType salary')
        .populate('company', 'name logo location')
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const totalApplications = await Application.countDocuments(searchQuery);

      return {
        applications,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalApplications / limit),
          totalApplications,
          hasNext: parseInt(page) < Math.ceil(totalApplications / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch user applications: ${error.message}`);
    }
  }

  // Get applications for a job (for employers)
  async getJobApplications(jobId, userId, query = {}) {
    try {
      // Verify user has access to this job
      const job = await Job.findById(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      // Check if user is the job creator or company employee
      if (job.createdBy.toString() !== userId) {
        const company = await Company.findById(job.company);
        const isEmployee = company.employees.some(emp => 
          emp.userId.toString() === userId && emp.isActive
        );
        
        if (!isEmployee) {
          throw new Error('Unauthorized to view applications for this job');
        }
      }

      const {
        page = 1,
        limit = 10,
        status,
        sortBy = 'appliedAt',
        sortOrder = 'desc'
      } = query;

      const searchQuery = { job: jobId };
      
      if (status) {
        searchQuery.status = status;
      }

      const paginationOptions = buildPaginationOptions(page, limit);
      const sortOptions = buildSortOptions(sortBy, sortOrder);

      const applications = await Application.find(searchQuery)
        .populate('applicant', 'firstName lastName email profile')
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const totalApplications = await Application.countDocuments(searchQuery);

      // Get application statistics
      const statusStats = await Application.aggregate([
        { $match: { job: job._id } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);

      return {
        applications,
        statistics: statusStats,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalApplications / limit),
          totalApplications,
          hasNext: parseInt(page) < Math.ceil(totalApplications / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch job applications: ${error.message}`);
    }
  }

  // Get single application details
  async getApplicationById(applicationId, userId) {
    try {
      const application = await Application.findById(applicationId)
        .populate('job', 'title company location jobType salary')
        .populate('company', 'name logo location')
        .populate('applicant', 'firstName lastName email profile');

      if (!application) {
        throw new Error('Application not found');
      }

      // Check if user has access to this application
      const isApplicant = application.applicant._id.toString() === userId;
      
      if (!isApplicant) {
        // Check if user is employer/company employee
        const job = await Job.findById(application.job._id);
        const isJobCreator = job.createdBy.toString() === userId;
        
        if (!isJobCreator) {
          const company = await Company.findById(application.company._id);
          const isEmployee = company.employees.some(emp => 
            emp.userId.toString() === userId && emp.isActive
          );
          
          if (!isEmployee) {
            throw new Error('Unauthorized to view this application');
          }
        }
      }

      return application;
    } catch (error) {
      throw new Error(`Failed to fetch application: ${error.message}`);
    }
  }

  // Update application status (for employers)
  async updateApplicationStatus(applicationId, statusData, userId) {
    try {
      const { status, notes, interviewDate, salary } = statusData;

      const application = await Application.findById(applicationId)
        .populate('job')
        .populate('applicant', 'firstName lastName email')
        .populate('company', 'name');

      if (!application) {
        throw new Error('Application not found');
      }

      // Check if user has permission to update
      const job = await Job.findById(application.job._id);
      const isJobCreator = job.createdBy.toString() === userId;
      
      if (!isJobCreator) {
        const company = await Company.findById(application.company._id);
        const isEmployee = company.employees.some(emp => 
          emp.userId.toString() === userId && emp.isActive && 
          ['admin', 'manager', 'hr'].includes(emp.role)
        );
        
        if (!isEmployee) {
          throw new Error('Unauthorized to update this application');
        }
      }

      // Update application status
      application.status = status;
      
      // Add timeline entry
      application.timeline.push({
        stage: status,
        date: new Date(),
        notes: notes || `Application status changed to ${status}`
      });

      // Handle specific status updates
      if (status === 'interview_scheduled' && interviewDate) {
        application.interviewDate = new Date(interviewDate);
        application.timeline[application.timeline.length - 1].notes = 
          `Interview scheduled for ${new Date(interviewDate).toLocaleDateString()}`;
      }

      if (status === 'offer_made' && salary) {
        application.offer = {
          salary,
          offeredAt: new Date(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        };
      }

      await application.save();

      // Send notification email to applicant
      try {
        const emailTemplates = {
          'interview_scheduled': () => emailService.sendInterviewScheduled(
            application.applicant.email,
            application.applicant.firstName,
            application.job.title,
            application.company.name,
            application.interviewDate
          ),
          'offer_made': () => emailService.sendJobOffer(
            application.applicant.email,
            application.applicant.firstName,
            application.job.title,
            application.company.name,
            salary
          ),
          'rejected': () => emailService.sendApplicationRejection(
            application.applicant.email,
            application.applicant.firstName,
            application.job.title,
            application.company.name
          )
        };

        if (emailTemplates[status]) {
          await emailTemplates[status]();
        }
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
      }

      return application;
    } catch (error) {
      throw new Error(`Failed to update application status: ${error.message}`);
    }
  }

  // Withdraw application (for applicants)
  async withdrawApplication(applicationId, userId) {
    try {
      const application = await Application.findById(applicationId);
      
      if (!application) {
        throw new Error('Application not found');
      }

      // Check if user is the applicant
      if (application.applicant.toString() !== userId) {
        throw new Error('Unauthorized to withdraw this application');
      }

      // Can only withdraw if not already processed
      if (['offer_made', 'hired', 'rejected'].includes(application.status)) {
        throw new Error('Cannot withdraw application in current status');
      }

      application.status = 'withdrawn';
      application.timeline.push({
        stage: 'withdrawn',
        date: new Date(),
        notes: 'Application withdrawn by applicant'
      });

      await application.save();

      // Update job application count
      await Job.findByIdAndUpdate(application.job, {
        $inc: { applicationCount: -1 }
      });

      return application;
    } catch (error) {
      throw new Error(`Failed to withdraw application: ${error.message}`);
    }
  }

  // Get application statistics
  async getApplicationStatistics(query = {}) {
    try {
      const { userId, jobId, companyId } = query;

      let matchQuery = {};
      
      if (userId) matchQuery.applicant = userId;
      if (jobId) matchQuery.job = jobId;
      if (companyId) matchQuery.company = companyId;

      const stats = await Application.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: null,
            totalApplications: { $sum: 1 },
            pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
            reviewed: { $sum: { $cond: [{ $eq: ['$status', 'reviewed'] }, 1, 0] } },
            interviewScheduled: { $sum: { $cond: [{ $eq: ['$status', 'interview_scheduled'] }, 1, 0] } },
            offerMade: { $sum: { $cond: [{ $eq: ['$status', 'offer_made'] }, 1, 0] } },
            hired: { $sum: { $cond: [{ $eq: ['$status', 'hired'] }, 1, 0] } },
            rejected: { $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] } },
            withdrawn: { $sum: { $cond: [{ $eq: ['$status', 'withdrawn'] }, 1, 0] } }
          }
        }
      ]);

      // Get applications over time
      const timeStats = await Application.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: {
              year: { $year: '$appliedAt' },
              month: { $month: '$appliedAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 }
      ]);

      return {
        overview: stats[0] || {
          totalApplications: 0,
          pending: 0,
          reviewed: 0,
          interviewScheduled: 0,
          offerMade: 0,
          hired: 0,
          rejected: 0,
          withdrawn: 0
        },
        timeline: timeStats
      };
    } catch (error) {
      throw new Error(`Failed to get application statistics: ${error.message}`);
    }
  }

  // Get company applications
  async getCompanyApplications(companyId, userId, query = {}) {
    try {
      // Verify user has access to company
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Company not found');
      }

      const isEmployee = company.employees.some(emp => 
        emp.userId.toString() === userId && emp.isActive
      );
      
      if (!isEmployee) {
        throw new Error('Unauthorized to view company applications');
      }

      const {
        page = 1,
        limit = 10,
        status,
        jobId,
        sortBy = 'appliedAt',
        sortOrder = 'desc'
      } = query;

      const searchQuery = { company: companyId };
      
      if (status) {
        searchQuery.status = status;
      }
      
      if (jobId) {
        searchQuery.job = jobId;
      }

      const paginationOptions = buildPaginationOptions(page, limit);
      const sortOptions = buildSortOptions(sortBy, sortOrder);

      const applications = await Application.find(searchQuery)
        .populate('job', 'title location jobType')
        .populate('applicant', 'firstName lastName email profile')
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const totalApplications = await Application.countDocuments(searchQuery);

      return {
        applications,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalApplications / limit),
          totalApplications,
          hasNext: parseInt(page) < Math.ceil(totalApplications / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch company applications: ${error.message}`);
    }
  }
}

module.exports = new ApplicationService();
