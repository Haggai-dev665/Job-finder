const companyReviewService = require('../services/companyReviewService');
const { validationResult } = require('express-validator');
const { asyncHandler, sendResponse, sendError } = require('../utils/helpers');

class CompanyReviewController {
  // Create a new company review
  createReview = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array());
    }

    const review = await companyReviewService.createReview(req.body, req.user.userId);
    
    sendResponse(res, 'Review created successfully', review, 201);
  });

  // Get reviews for a company
  getCompanyReviews = asyncHandler(async (req, res) => {
    const result = await companyReviewService.getCompanyReviews(req.params.companyId, req.query);
    
    sendResponse(res, 'Company reviews fetched successfully', result);
  });

  // Get a single review by ID
  getReviewById = asyncHandler(async (req, res) => {
    const review = await companyReviewService.getReviewById(req.params.id);
    
    sendResponse(res, 'Review fetched successfully', review);
  });

  // Update a review
  updateReview = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendError(res, 'Validation failed', 400, errors.array());
    }

    const review = await companyReviewService.updateReview(
      req.params.id,
      req.body,
      req.user.userId
    );
    
    sendResponse(res, 'Review updated successfully', review);
  });

  // Delete a review
  deleteReview = asyncHandler(async (req, res) => {
    const result = await companyReviewService.deleteReview(req.params.id, req.user.userId);
    
    sendResponse(res, result.message);
  });

  // Mark review as helpful/unhelpful
  toggleReviewHelpful = asyncHandler(async (req, res) => {
    const result = await companyReviewService.toggleReviewHelpful(
      req.params.id,
      req.user.userId
    );
    
    const message = result.isHelpful ? 'Review marked as helpful' : 'Review helpful vote removed';
    sendResponse(res, message, result);
  });

  // Get reviews by current user
  getUserReviews = asyncHandler(async (req, res) => {
    const result = await companyReviewService.getUserReviews(req.user.userId, req.query);
    
    sendResponse(res, 'User reviews fetched successfully', result);
  });

  // Get review statistics
  getReviewStatistics = asyncHandler(async (req, res) => {
    const companyId = req.params.companyId || req.query.companyId;
    const stats = await companyReviewService.getReviewStatistics(companyId);
    
    sendResponse(res, 'Review statistics fetched successfully', stats);
  });

  // Get platform review statistics (admin only)
  getPlatformReviewStatistics = asyncHandler(async (req, res) => {
    const stats = await companyReviewService.getReviewStatistics();
    
    sendResponse(res, 'Platform review statistics fetched successfully', stats);
  });

  // Get recent reviews for a company
  getRecentCompanyReviews = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    
    const query = {
      ...req.query,
      limit,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    
    const result = await companyReviewService.getCompanyReviews(req.params.companyId, query);
    
    sendResponse(res, 'Recent company reviews fetched successfully', result.reviews);
  });

  // Get helpful reviews for a company
  getHelpfulCompanyReviews = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    
    const query = {
      ...req.query,
      limit,
      helpful: true
    };
    
    const result = await companyReviewService.getCompanyReviews(req.params.companyId, query);
    
    sendResponse(res, 'Helpful company reviews fetched successfully', result.reviews);
  });

  // Get reviews by rating for a company
  getReviewsByRating = asyncHandler(async (req, res) => {
    const { companyId, rating } = req.params;
    
    const query = {
      ...req.query,
      rating
    };
    
    const result = await companyReviewService.getCompanyReviews(companyId, query);
    
    sendResponse(res, `${rating}-star reviews fetched successfully`, result);
  });
}

module.exports = new CompanyReviewController();
