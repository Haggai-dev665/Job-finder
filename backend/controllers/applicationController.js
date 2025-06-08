const applicationService = require('../services/applicationService');
const { validationResult } = require('express-validator');
const { asyncHandler, sendResponse, sendError } = require('../utils/helpers');

class ApplicationController {
  // Submit a job application
  submitApplication = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array());
    }

    const application = await applicationService.submitApplication(req.body, req.user.userId);
    
    sendResponse(res, 'Application submitted successfully', application, 201);
  });

  // Get user's applications
  getUserApplications = asyncHandler(async (req, res) => {
    const result = await applicationService.getUserApplications(req.user.userId, req.query);
    
    sendResponse(res, 'User applications fetched successfully', result);
  });

  // Get applications for a specific job (for employers)
  getJobApplications = asyncHandler(async (req, res) => {
    const result = await applicationService.getJobApplications(
      req.params.jobId, 
      req.user.userId, 
      req.query
    );
    
    sendResponse(res, 'Job applications fetched successfully', result);
  });

  // Get single application details
  getApplicationById = asyncHandler(async (req, res) => {
    const application = await applicationService.getApplicationById(
      req.params.id, 
      req.user.userId
    );
    
    sendResponse(res, 'Application fetched successfully', application);
  });

  // Update application status (for employers)
  updateApplicationStatus = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array());
    }

    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      req.body,
      req.user.userId
    );
    
    sendResponse(res, 'Application status updated successfully', application);
  });

  // Withdraw application (for applicants)
  withdrawApplication = asyncHandler(async (req, res) => {
    const application = await applicationService.withdrawApplication(
      req.params.id,
      req.user.userId
    );
    
    sendResponse(res, 'Application withdrawn successfully', application);
  });

  // Get application statistics
  getApplicationStatistics = asyncHandler(async (req, res) => {
    const stats = await applicationService.getApplicationStatistics(req.query);
    
    sendResponse(res, 'Application statistics fetched successfully', stats);
  });

  // Get company applications (for company employees)
  getCompanyApplications = asyncHandler(async (req, res) => {
    const result = await applicationService.getCompanyApplications(
      req.params.companyId,
      req.user.userId,
      req.query
    );
    
    sendResponse(res, 'Company applications fetched successfully', result);
  });

  // Get applications by status for current user
  getApplicationsByStatus = asyncHandler(async (req, res) => {
    const { status } = req.params;
    
    const query = {
      ...req.query,
      status
    };
    
    const result = await applicationService.getUserApplications(req.user.userId, query);
    
    sendResponse(res, `${status} applications fetched successfully`, result);
  });

  // Bulk update application statuses (for employers)
  bulkUpdateApplications = asyncHandler(async (req, res) => {
    const { applicationIds, status, notes } = req.body;
    
    if (!applicationIds || !Array.isArray(applicationIds) || applicationIds.length === 0) {
      return sendError(res, 'Application IDs are required', 400);
    }

    if (!status) {
      return sendError(res, 'Status is required', 400);
    }

    const results = [];
    const errors = [];

    for (const applicationId of applicationIds) {
      try {
        const application = await applicationService.updateApplicationStatus(
          applicationId,
          { status, notes },
          req.user.userId
        );
        results.push(application);
      } catch (error) {
        errors.push({
          applicationId,
          error: error.message
        });
      }
    }

    const response = {
      updated: results,
      errors: errors,
      summary: {
        total: applicationIds.length,
        successful: results.length,
        failed: errors.length
      }
    };

    sendResponse(res, 'Bulk update completed', response);
  });

  // Get recent applications for dashboard
  getRecentApplications = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    
    const query = {
      ...req.query,
      limit,
      sortBy: 'appliedAt',
      sortOrder: 'desc'
    };
    
    const result = await applicationService.getUserApplications(req.user.userId, query);
    
    sendResponse(res, 'Recent applications fetched successfully', result.applications);
  });

  // Get applications requiring action (for employers)
  getApplicationsRequiringAction = asyncHandler(async (req, res) => {
    const query = {
      ...req.query,
      status: 'pending',
      sortBy: 'appliedAt',
      sortOrder: 'asc'
    };

    // This would need to be enhanced to get applications for jobs the user manages
    // For now, we'll return applications that need review
    const result = await applicationService.getUserApplications(req.user.userId, query);
    
    sendResponse(res, 'Applications requiring action fetched successfully', result);
  });

  // Schedule interview
  scheduleInterview = asyncHandler(async (req, res) => {
    const { interviewDate, notes } = req.body;
    
    if (!interviewDate) {
      return sendError(res, 'Interview date is required', 400);
    }

    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      {
        status: 'interview_scheduled',
        interviewDate,
        notes: notes || 'Interview scheduled'
      },
      req.user.userId
    );
    
    sendResponse(res, 'Interview scheduled successfully', application);
  });

  // Make job offer
  makeJobOffer = asyncHandler(async (req, res) => {
    const { salary, notes } = req.body;
    
    if (!salary) {
      return sendError(res, 'Salary offer is required', 400);
    }

    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      {
        status: 'offer_made',
        salary,
        notes: notes || 'Job offer made'
      },
      req.user.userId
    );
    
    sendResponse(res, 'Job offer made successfully', application);
  });

  // Hire applicant
  hireApplicant = asyncHandler(async (req, res) => {
    const { startDate, salary, notes } = req.body;

    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      {
        status: 'hired',
        startDate,
        salary,
        notes: notes || 'Applicant hired'
      },
      req.user.userId
    );
    
    sendResponse(res, 'Applicant hired successfully', application);
  });

  // Reject application
  rejectApplication = asyncHandler(async (req, res) => {
    const { notes } = req.body;

    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      {
        status: 'rejected',
        notes: notes || 'Application rejected'
      },
      req.user.userId
    );
    
    sendResponse(res, 'Application rejected', application);
  });
}

module.exports = new ApplicationController();
