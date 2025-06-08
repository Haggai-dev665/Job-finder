const express = require('express');
const router = express.Router();
const companyReviewController = require('../controllers/companyReviewController');
const { auth: authenticate } = require('../middleware/auth');
const { validateCompanyReview } = require('../middleware/validation');

// Public routes (no authentication required)
router.get('/company/:companyId', companyReviewController.getCompanyReviews);
router.get('/company/:companyId/recent', companyReviewController.getRecentCompanyReviews);
router.get('/company/:companyId/helpful', companyReviewController.getHelpfulCompanyReviews);
router.get('/company/:companyId/rating/:rating', companyReviewController.getReviewsByRating);
router.get('/company/:companyId/statistics', companyReviewController.getReviewStatistics);
router.get('/statistics', companyReviewController.getPlatformReviewStatistics);
router.get('/:id', companyReviewController.getReviewById);

// Protected routes (authentication required)
router.use(authenticate);

// User review routes
router.post('/', validateCompanyReview, companyReviewController.createReview);
router.get('/user/my-reviews', companyReviewController.getUserReviews);
router.put('/:id', validateCompanyReview, companyReviewController.updateReview);
router.delete('/:id', companyReviewController.deleteReview);
router.post('/:id/helpful', companyReviewController.toggleReviewHelpful);

module.exports = router;
