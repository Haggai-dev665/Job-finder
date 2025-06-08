const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { auth: authenticate, authorize } = require('../middleware/auth');
const { validateJob, validateJobUpdate } = require('../middleware/validation');

// Public routes (no authentication required)
router.get('/', jobController.getJobs);
router.get('/search', jobController.searchJobs);
router.get('/featured', jobController.getFeaturedJobs);
router.get('/recent', jobController.getRecentJobs);
router.get('/statistics', jobController.getJobStatistics);
router.get('/salary-stats', jobController.getSalaryStatistics);
router.get('/location/:location', jobController.getJobsByLocation);
router.get('/type/:jobType', jobController.getJobsByType);
router.get('/experience/:experienceLevel', jobController.getJobsByExperience);
router.get('/:id', jobController.getJobById);

// Protected routes (authentication required)
router.use(authenticate);

// User routes (authenticated users)
router.get('/user/recommended', jobController.getRecommendedJobs);

// Company routes (company employees and admins)
router.post('/', validateJob, jobController.createJob);
router.put('/:id', validateJobUpdate, jobController.updateJob);
router.patch('/:id/toggle-status', jobController.toggleJobStatus);
router.delete('/:id', jobController.deleteJob);

// Company-specific job routes
router.get('/company/:companyId', jobController.getJobsByCompany);

module.exports = router;
