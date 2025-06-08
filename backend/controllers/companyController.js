const companyService = require('../services/companyService');
const { validationResult } = require('express-validator');
const { asyncHandler, sendResponse, sendError } = require('../utils/helpers');

class CompanyController {
  // Create a new company
  createCompany = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array());
    }

    const company = await companyService.createCompany(req.body, req.user.userId);
    
    sendResponse(res, 'Company created successfully', company, 201);
  });

  // Get all companies with filtering and pagination
  getCompanies = asyncHandler(async (req, res) => {
    const result = await companyService.getCompanies(req.query);
    
    sendResponse(res, 'Companies fetched successfully', result);
  });

  // Get a single company by ID
  getCompanyById = asyncHandler(async (req, res) => {
    const company = await companyService.getCompanyById(req.params.id);
    
    sendResponse(res, 'Company fetched successfully', company);
  });

  // Update a company
  updateCompany = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array());
    }

    const company = await companyService.updateCompany(req.params.id, req.body, req.user.userId);
    
    sendResponse(res, 'Company updated successfully', company);
  });

  // Delete a company
  deleteCompany = asyncHandler(async (req, res) => {
    const result = await companyService.deleteCompany(req.params.id, req.user.userId);
    
    sendResponse(res, result.message);
  });

  // Add employee to company
  addEmployee = asyncHandler(async (req, res) => {
    const { userId, role } = req.body;
    
    if (!userId) {
      return sendError(res, 'User ID is required', 400);
    }

    const company = await companyService.addEmployee(
      req.params.id, 
      { userId, role }, 
      req.user.userId
    );
    
    sendResponse(res, 'Employee added successfully', company);
  });

  // Remove employee from company
  removeEmployee = asyncHandler(async (req, res) => {
    const result = await companyService.removeEmployee(
      req.params.id,
      req.params.employeeId,
      req.user.userId
    );
    
    sendResponse(res, result.message);
  });

  // Follow/unfollow company
  toggleFollowCompany = asyncHandler(async (req, res) => {
    const result = await companyService.toggleFollowCompany(req.params.id, req.user.userId);
    
    const message = result.isFollowing ? 'Company followed successfully' : 'Company unfollowed successfully';
    sendResponse(res, message, result);
  });

  // Get company reviews
  getCompanyReviews = asyncHandler(async (req, res) => {
    const result = await companyService.getCompanyReviews(req.params.id, req.query);
    
    sendResponse(res, 'Company reviews fetched successfully', result);
  });

  // Get company statistics
  getCompanyStatistics = asyncHandler(async (req, res) => {
    const companyId = req.params.id || req.query.companyId;
    const stats = await companyService.getCompanyStatistics(companyId);
    
    sendResponse(res, 'Company statistics fetched successfully', stats);
  });

  // Get platform company statistics (admin only)
  getPlatformStatistics = asyncHandler(async (req, res) => {
    const stats = await companyService.getCompanyStatistics();
    
    sendResponse(res, 'Platform statistics fetched successfully', stats);
  });

  // Get companies user is following
  getFollowedCompanies = asyncHandler(async (req, res) => {
    const result = await companyService.getFollowedCompanies(req.user.userId, req.query);
    
    sendResponse(res, 'Followed companies fetched successfully', result);
  });

  // Search companies (alias for getCompanies with search parameter)
  searchCompanies = asyncHandler(async (req, res) => {
    const searchQuery = {
      ...req.query,
      search: req.query.q || req.query.search
    };
    
    const result = await companyService.getCompanies(searchQuery);
    
    sendResponse(res, 'Company search completed successfully', result);
  });

  // Get featured companies
  getFeaturedCompanies = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    const featuredQuery = {
      ...req.query,
      verified: true,
      sortBy: 'rating.overall',
      sortOrder: 'desc',
      limit
    };
    
    const result = await companyService.getCompanies(featuredQuery);
    
    sendResponse(res, 'Featured companies fetched successfully', result.companies);
  });

  // Get top-rated companies
  getTopRatedCompanies = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    const topRatedQuery = {
      ...req.query,
      sortBy: 'rating.overall',
      sortOrder: 'desc',
      limit
    };
    
    const result = await companyService.getCompanies(topRatedQuery);
    
    sendResponse(res, 'Top-rated companies fetched successfully', result.companies);
  });

  // Get companies by industry
  getCompaniesByIndustry = asyncHandler(async (req, res) => {
    const { industry } = req.params;
    
    const industryQuery = {
      ...req.query,
      industry
    };
    
    const result = await companyService.getCompanies(industryQuery);
    
    sendResponse(res, `Companies in ${industry} fetched successfully`, result);
  });

  // Get companies by size
  getCompaniesBySize = asyncHandler(async (req, res) => {
    const { size } = req.params;
    
    const sizeQuery = {
      ...req.query,
      size
    };
    
    const result = await companyService.getCompanies(sizeQuery);
    
    sendResponse(res, `${size} companies fetched successfully`, result);
  });

  // Get companies by location
  getCompaniesByLocation = asyncHandler(async (req, res) => {
    const { location } = req.params;
    
    const locationQuery = {
      ...req.query,
      location
    };
    
    const result = await companyService.getCompanies(locationQuery);
    
    sendResponse(res, `Companies in ${location} fetched successfully`, result);
  });

  // Get hiring companies (companies with active jobs)
  getHiringCompanies = asyncHandler(async (req, res) => {
    // This would require a more complex query or separate service method
    // For now, we'll get companies with active jobs count > 0
    const result = await companyService.getCompanies({
      ...req.query,
      sortBy: 'statistics.activeJobs',
      sortOrder: 'desc'
    });
    
    // Filter companies with active jobs
    const hiringCompanies = {
      ...result,
      companies: result.companies.filter(company => 
        company.statistics && company.statistics.activeJobs > 0
      )
    };
    
    sendResponse(res, 'Hiring companies fetched successfully', hiringCompanies);
  });

  // Upload company logo
  uploadCompanyLogo = asyncHandler(async (req, res) => {
    if (!req.file) {
      return sendError(res, 'No file uploaded', 400);
    }

    const logoUrl = `/uploads/companies/${req.file.filename}`;
    
    const company = await companyService.updateCompany(
      req.params.id,
      { logo: logoUrl },
      req.user.userId
    );
    
    sendResponse(res, 'Company logo uploaded successfully', { 
      logo: logoUrl,
      company 
    });
  });
}

module.exports = new CompanyController();
