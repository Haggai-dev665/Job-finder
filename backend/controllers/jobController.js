const jobService = require('../services/jobService');
const { validationResult } = require('express-validator');
const { asyncHandler, sendResponse, sendError } = require('../utils/helpers');

class JobController {
  // Create a new job
  createJob = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array());
    }

    const job = await jobService.createJob(req.body, req.body.company);
    
    sendResponse(res, 'Job created successfully', job, 201);
  });

  // Get all jobs with filtering and pagination
  getJobs = asyncHandler(async (req, res) => {
    const result = await jobService.getJobs(req.query);
    
    sendResponse(res, 'Jobs fetched successfully', result);
  });

  // Get a single job by ID
  getJobById = asyncHandler(async (req, res) => {
    const job = await jobService.getJobById(req.params.id);
    
    sendResponse(res, 'Job fetched successfully', job);
  });

  // Update a job
  updateJob = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array());
    }

    const job = await jobService.updateJob(req.params.id, req.body, req.user.userId);
    
    sendResponse(res, 'Job updated successfully', job);
  });

  // Delete a job
  deleteJob = asyncHandler(async (req, res) => {
    const result = await jobService.deleteJob(req.params.id, req.user.userId);
    
    sendResponse(res, result.message);
  });

  // Get jobs by company
  getJobsByCompany = asyncHandler(async (req, res) => {
    const result = await jobService.getJobsByCompany(req.params.companyId, req.query);
    
    sendResponse(res, 'Company jobs fetched successfully', result);
  });

  // Get recommended jobs for current user
  getRecommendedJobs = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const jobs = await jobService.getRecommendedJobs(req.user.userId, limit);
    
    sendResponse(res, 'Recommended jobs fetched successfully', jobs);
  });

  // Get job statistics
  getJobStatistics = asyncHandler(async (req, res) => {
    const companyId = req.query.companyId || null;
    const stats = await jobService.getJobStatistics(companyId);
    
    sendResponse(res, 'Job statistics fetched successfully', stats);
  });

  // Toggle job active status
  toggleJobStatus = asyncHandler(async (req, res) => {
    const job = await jobService.toggleJobStatus(req.params.id, req.user.userId);
    
    sendResponse(res, 'Job status updated successfully', job);
  });

  // Search jobs (alias for getJobs with search parameter)
  searchJobs = asyncHandler(async (req, res) => {
    const searchQuery = {
      ...req.query,
      search: req.query.q || req.query.search
    };
    
    const result = await jobService.getJobs(searchQuery);
    
    sendResponse(res, 'Job search completed successfully', result);
  });

  // Get featured jobs
  getFeaturedJobs = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    const featuredQuery = {
      ...req.query,
      sortBy: 'views',
      sortOrder: 'desc',
      limit,
      isActive: true
    };
    
    const result = await jobService.getJobs(featuredQuery);
    
    sendResponse(res, 'Featured jobs fetched successfully', result.jobs);
  });

  // Get recent jobs
  getRecentJobs = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    const recentQuery = {
      ...req.query,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      limit,
      isActive: true
    };
    
    const result = await jobService.getJobs(recentQuery);
    
    sendResponse(res, 'Recent jobs fetched successfully', result.jobs);
  });

  // Get jobs by location
  getJobsByLocation = asyncHandler(async (req, res) => {
    const { location } = req.params;
    
    const locationQuery = {
      ...req.query,
      location
    };
    
    const result = await jobService.getJobs(locationQuery);
    
    sendResponse(res, `Jobs in ${location} fetched successfully`, result);
  });

  // Get jobs by job type
  getJobsByType = asyncHandler(async (req, res) => {
    const { jobType } = req.params;
    
    const typeQuery = {
      ...req.query,
      jobType
    };
    
    const result = await jobService.getJobs(typeQuery);
    
    sendResponse(res, `${jobType} jobs fetched successfully`, result);
  });

  // Get jobs by experience level
  getJobsByExperience = asyncHandler(async (req, res) => {
    const { experienceLevel } = req.params;
    
    const experienceQuery = {
      ...req.query,
      experienceLevel
    };
    
    const result = await jobService.getJobs(experienceQuery);
    
    sendResponse(res, `${experienceLevel} level jobs fetched successfully`, result);
  });

  // Get salary range statistics
  getSalaryStatistics = asyncHandler(async (req, res) => {
    const { jobType, location, experienceLevel } = req.query;
    
    // This would typically require aggregation in the service
    // For now, return basic statistics from the job statistics
    const stats = await jobService.getJobStatistics();
    
    const salaryStats = {
      averageMin: stats.overview.avgSalaryMin,
      averageMax: stats.overview.avgSalaryMax,
      filters: {
        jobType: jobType || 'all',
        location: location || 'all',
        experienceLevel: experienceLevel || 'all'
      }
    };
    
    sendResponse(res, 'Salary statistics fetched successfully', salaryStats);
  });
}

module.exports = new JobController();
