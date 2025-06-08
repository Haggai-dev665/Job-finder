const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { auth: authenticate, authorize } = require('../middleware/auth');
const { validateApplication } = require('../middleware/validation');

// All application routes require authentication
router.use(authenticate);

// User application routes (for job seekers)
router.post('/', validateApplication, applicationController.submitApplication);
router.get('/user', applicationController.getUserApplications);
router.get('/user/recent', applicationController.getRecentApplications);
router.get('/user/status/:status', applicationController.getApplicationsByStatus);

// Single application routes
router.get('/:id', applicationController.getApplicationById);
router.patch('/:id/withdraw', applicationController.withdrawApplication);

// Employer application management routes
router.get('/job/:jobId', applicationController.getJobApplications);
router.get('/company/:companyId', applicationController.getCompanyApplications);
router.patch('/:id/status', applicationController.updateApplicationStatus);
router.post('/bulk-update', applicationController.bulkUpdateApplications);

// Specific employer actions
router.patch('/:id/schedule-interview', applicationController.scheduleInterview);
router.patch('/:id/make-offer', applicationController.makeJobOffer);
router.patch('/:id/hire', applicationController.hireApplicant);
router.patch('/:id/reject', applicationController.rejectApplication);

// Statistics and analytics
router.get('/stats/overview', applicationController.getApplicationStatistics);
router.get('/employer/requiring-action', applicationController.getApplicationsRequiringAction);

module.exports = router;
