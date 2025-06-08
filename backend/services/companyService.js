const Company = require('../models/Company');
const CompanyReview = require('../models/CompanyReview');
const Job = require('../models/Job');
const User = require('../models/User');
const { buildSearchQuery, buildPaginationOptions, buildSortOptions } = require('../utils/helpers');

class CompanyService {
  // Create a new company
  async createCompany(companyData, userId) {
    try {
      // Check if company with same name already exists
      const existingCompany = await Company.findOne({ 
        name: { $regex: new RegExp(`^${companyData.name}$`, 'i') }
      });
      
      if (existingCompany) {
        throw new Error('Company with this name already exists');
      }

      const company = new Company({
        ...companyData,
        employees: [{
          userId,
          role: 'admin',
          joinedAt: new Date(),
          isActive: true
        }]
      });

      await company.save();
      await company.populate('employees.userId', 'firstName lastName email');

      return company;
    } catch (error) {
      throw new Error(`Failed to create company: ${error.message}`);
    }
  }

  // Get all companies with filtering and pagination
  async getCompanies(query = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        industry,
        size,
        location,
        verified,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = query;

      // Build search query
      const searchQuery = {};

      // Text search
      if (search) {
        searchQuery.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { industry: { $regex: search, $options: 'i' } }
        ];
      }

      // Industry filter
      if (industry) {
        searchQuery.industry = { $in: Array.isArray(industry) ? industry : [industry] };
      }

      // Company size filter
      if (size) {
        const sizes = Array.isArray(size) ? size : [size];
        const sizeConditions = sizes.map(s => {
          switch (s) {
            case 'startup': return { 'statistics.employeeCount': { $lt: 50 } };
            case 'small': return { 'statistics.employeeCount': { $gte: 50, $lt: 200 } };
            case 'medium': return { 'statistics.employeeCount': { $gte: 200, $lt: 1000 } };
            case 'large': return { 'statistics.employeeCount': { $gte: 1000 } };
            default: return {};
          }
        }).filter(condition => Object.keys(condition).length > 0);

        if (sizeConditions.length > 0) {
          searchQuery.$or = searchQuery.$or ? [...searchQuery.$or, ...sizeConditions] : sizeConditions;
        }
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

      // Verified filter
      if (verified !== undefined) {
        searchQuery.isVerified = verified === 'true';
      }

      // Build pagination and sort options
      const paginationOptions = buildPaginationOptions(page, limit);
      const sortOptions = buildSortOptions(sortBy, sortOrder);

      // Execute query
      const companies = await Company.find(searchQuery)
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit)
        .populate('employees.userId', 'firstName lastName email');

      const totalCompanies = await Company.countDocuments(searchQuery);

      return {
        companies,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCompanies / limit),
          totalCompanies,
          hasNext: parseInt(page) < Math.ceil(totalCompanies / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch companies: ${error.message}`);
    }
  }

  // Get a single company by ID
  async getCompanyById(companyId) {
    try {
      const company = await Company.findById(companyId)
        .populate('employees.userId', 'firstName lastName email profile.avatar')
        .populate('followers', 'firstName lastName email profile.avatar');

      if (!company) {
        throw new Error('Company not found');
      }

      return company;
    } catch (error) {
      throw new Error(`Failed to fetch company: ${error.message}`);
    }
  }

  // Update a company
  async updateCompany(companyId, updateData, userId) {
    try {
      const company = await Company.findById(companyId);
      
      if (!company) {
        throw new Error('Company not found');
      }

      // Check if user has permission to update
      const userEmployee = company.employees.find(emp => 
        emp.userId.toString() === userId && emp.isActive
      );
      
      if (!userEmployee || !['admin', 'manager'].includes(userEmployee.role)) {
        throw new Error('Unauthorized to update this company');
      }

      // If updating name, check for duplicates
      if (updateData.name && updateData.name !== company.name) {
        const existingCompany = await Company.findOne({ 
          name: { $regex: new RegExp(`^${updateData.name}$`, 'i') },
          _id: { $ne: companyId }
        });
        
        if (existingCompany) {
          throw new Error('Company with this name already exists');
        }
      }

      const updatedCompany = await Company.findByIdAndUpdate(
        companyId,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).populate('employees.userId', 'firstName lastName email');

      return updatedCompany;
    } catch (error) {
      throw new Error(`Failed to update company: ${error.message}`);
    }
  }

  // Delete a company
  async deleteCompany(companyId, userId) {
    try {
      const company = await Company.findById(companyId);
      
      if (!company) {
        throw new Error('Company not found');
      }

      // Check if user is admin
      const userEmployee = company.employees.find(emp => 
        emp.userId.toString() === userId && emp.role === 'admin' && emp.isActive
      );
      
      if (!userEmployee) {
        throw new Error('Only company admins can delete the company');
      }

      // Check if company has active jobs
      const activeJobs = await Job.countDocuments({ 
        company: companyId, 
        isActive: true 
      });
      
      if (activeJobs > 0) {
        throw new Error('Cannot delete company with active job postings');
      }

      await Company.findByIdAndDelete(companyId);

      // Delete associated reviews
      await CompanyReview.deleteMany({ company: companyId });

      return { message: 'Company deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete company: ${error.message}`);
    }
  }

  // Add employee to company
  async addEmployee(companyId, employeeData, userId) {
    try {
      const company = await Company.findById(companyId);
      
      if (!company) {
        throw new Error('Company not found');
      }

      // Check permissions
      const userEmployee = company.employees.find(emp => 
        emp.userId.toString() === userId && emp.isActive
      );
      
      if (!userEmployee || !['admin', 'manager'].includes(userEmployee.role)) {
        throw new Error('Unauthorized to add employees');
      }

      // Check if user already exists as employee
      const existingEmployee = company.employees.find(emp => 
        emp.userId.toString() === employeeData.userId
      );
      
      if (existingEmployee) {
        if (existingEmployee.isActive) {
          throw new Error('User is already an active employee');
        } else {
          // Reactivate employee
          existingEmployee.isActive = true;
          existingEmployee.role = employeeData.role || 'employee';
          existingEmployee.joinedAt = new Date();
        }
      } else {
        // Add new employee
        company.employees.push({
          userId: employeeData.userId,
          role: employeeData.role || 'employee',
          joinedAt: new Date(),
          isActive: true
        });
      }

      // Update employee count
      company.statistics.employeeCount = company.employees.filter(emp => emp.isActive).length;
      
      await company.save();
      await company.populate('employees.userId', 'firstName lastName email');

      return company;
    } catch (error) {
      throw new Error(`Failed to add employee: ${error.message}`);
    }
  }

  // Remove employee from company
  async removeEmployee(companyId, employeeUserId, userId) {
    try {
      const company = await Company.findById(companyId);
      
      if (!company) {
        throw new Error('Company not found');
      }

      // Check permissions
      const userEmployee = company.employees.find(emp => 
        emp.userId.toString() === userId && emp.isActive
      );
      
      if (!userEmployee || !['admin', 'manager'].includes(userEmployee.role)) {
        throw new Error('Unauthorized to remove employees');
      }

      // Find employee to remove
      const employeeToRemove = company.employees.find(emp => 
        emp.userId.toString() === employeeUserId
      );
      
      if (!employeeToRemove) {
        throw new Error('Employee not found');
      }

      // Cannot remove the last admin
      const activeAdmins = company.employees.filter(emp => 
        emp.isActive && emp.role === 'admin'
      );
      
      if (employeeToRemove.role === 'admin' && activeAdmins.length === 1) {
        throw new Error('Cannot remove the last admin');
      }

      employeeToRemove.isActive = false;
      employeeToRemove.leftAt = new Date();

      // Update employee count
      company.statistics.employeeCount = company.employees.filter(emp => emp.isActive).length;
      
      await company.save();

      return { message: 'Employee removed successfully' };
    } catch (error) {
      throw new Error(`Failed to remove employee: ${error.message}`);
    }
  }

  // Follow/unfollow company
  async toggleFollowCompany(companyId, userId) {
    try {
      const company = await Company.findById(companyId);
      
      if (!company) {
        throw new Error('Company not found');
      }

      const isFollowing = company.followers.includes(userId);
      
      if (isFollowing) {
        // Unfollow
        company.followers = company.followers.filter(id => id.toString() !== userId);
        company.statistics.followerCount = Math.max(0, company.statistics.followerCount - 1);
      } else {
        // Follow
        company.followers.push(userId);
        company.statistics.followerCount += 1;
      }

      await company.save();

      return {
        isFollowing: !isFollowing,
        followerCount: company.statistics.followerCount
      };
    } catch (error) {
      throw new Error(`Failed to toggle follow: ${error.message}`);
    }
  }

  // Get company reviews
  async getCompanyReviews(companyId, query = {}) {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;

      const paginationOptions = buildPaginationOptions(page, limit);
      const sortOptions = buildSortOptions(sortBy, sortOrder);

      const reviews = await CompanyReview.find({ company: companyId })
        .populate('reviewer', 'firstName lastName profile.avatar')
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const totalReviews = await CompanyReview.countDocuments({ company: companyId });

      return {
        reviews,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalReviews / limit),
          totalReviews,
          hasNext: parseInt(page) < Math.ceil(totalReviews / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch company reviews: ${error.message}`);
    }
  }

  // Get company statistics
  async getCompanyStatistics(companyId = null) {
    try {
      if (companyId) {
        // Get statistics for specific company
        const company = await Company.findById(companyId);
        if (!company) {
          throw new Error('Company not found');
        }

        const jobStats = await Job.aggregate([
          { $match: { company: company._id } },
          {
            $group: {
              _id: null,
              totalJobs: { $sum: 1 },
              activeJobs: { $sum: { $cond: ['$isActive', 1, 0] } },
              totalApplications: { $sum: '$applicationCount' },
              totalViews: { $sum: '$views' }
            }
          }
        ]);

        const reviewStats = await CompanyReview.aggregate([
          { $match: { company: company._id } },
          {
            $group: {
              _id: null,
              totalReviews: { $sum: 1 },
              averageRating: { $avg: '$overallRating' },
              averageWorkLifeBalance: { $avg: '$ratings.workLifeBalance' },
              averageCompensation: { $avg: '$ratings.compensation' },
              averageCareerGrowth: { $avg: '$ratings.careerGrowth' },
              averageManagement: { $avg: '$ratings.management' },
              averageCulture: { $avg: '$ratings.culture' }
            }
          }
        ]);

        return {
          company: company.statistics,
          jobs: jobStats[0] || { totalJobs: 0, activeJobs: 0, totalApplications: 0, totalViews: 0 },
          reviews: reviewStats[0] || { 
            totalReviews: 0, 
            averageRating: 0,
            averageWorkLifeBalance: 0,
            averageCompensation: 0,
            averageCareerGrowth: 0,
            averageManagement: 0,
            averageCulture: 0
          }
        };
      } else {
        // Get overall platform statistics
        const companyStats = await Company.aggregate([
          {
            $group: {
              _id: null,
              totalCompanies: { $sum: 1 },
              verifiedCompanies: { $sum: { $cond: ['$isVerified', 1, 0] } },
              totalEmployees: { $sum: '$statistics.employeeCount' },
              totalFollowers: { $sum: '$statistics.followerCount' },
              avgRating: { $avg: '$rating.overall' }
            }
          }
        ]);

        const industryStats = await Company.aggregate([
          { $group: { _id: '$industry', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 }
        ]);

        const sizeStats = await Company.aggregate([
          {
            $group: {
              _id: {
                $switch: {
                  branches: [
                    { case: { $lt: ['$statistics.employeeCount', 50] }, then: 'startup' },
                    { case: { $lt: ['$statistics.employeeCount', 200] }, then: 'small' },
                    { case: { $lt: ['$statistics.employeeCount', 1000] }, then: 'medium' },
                  ],
                  default: 'large'
                }
              },
              count: { $sum: 1 }
            }
          }
        ]);

        return {
          overview: companyStats[0] || {
            totalCompanies: 0,
            verifiedCompanies: 0,
            totalEmployees: 0,
            totalFollowers: 0,
            avgRating: 0
          },
          industryDistribution: industryStats,
          sizeDistribution: sizeStats
        };
      }
    } catch (error) {
      throw new Error(`Failed to get company statistics: ${error.message}`);
    }
  }

  // Get companies user is following
  async getFollowedCompanies(userId, query = {}) {
    try {
      const { page = 1, limit = 10 } = query;
      
      const paginationOptions = buildPaginationOptions(page, limit);

      const companies = await Company.find({ followers: userId })
        .sort({ 'statistics.followerCount': -1 })
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const totalCompanies = await Company.countDocuments({ followers: userId });

      return {
        companies,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCompanies / limit),
          totalCompanies,
          hasNext: parseInt(page) < Math.ceil(totalCompanies / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch followed companies: ${error.message}`);
    }
  }
}

module.exports = new CompanyService();
