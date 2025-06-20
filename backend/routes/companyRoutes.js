const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { auth: authenticate, authorize } = require('../middleware/auth');
const { validateCreateCompany } = require('../middleware/validation');
const { uploadCompanyLogo } = require('../middleware/upload');

// Public routes (no authentication required)
router.get('/', companyController.getCompanies);
router.get('/search', companyController.searchCompanies);
router.get('/featured', companyController.getFeaturedCompanies);
router.get('/top-rated', companyController.getTopRatedCompanies);
router.get('/hiring', companyController.getHiringCompanies);
router.get('/statistics', companyController.getPlatformStatistics);
router.get('/industry/:industry', companyController.getCompaniesByIndustry);
router.get('/size/:size', companyController.getCompaniesBySize);
router.get('/location/:location', companyController.getCompaniesByLocation);
router.get('/:id', companyController.getCompanyById);
router.get('/:id/reviews', companyController.getCompanyReviews);
router.get('/:id/statistics', companyController.getCompanyStatistics);

// Protected routes (authentication required)
router.use(authenticate);

// User routes (authenticated users)
router.get('/user/following', companyController.getFollowedCompanies);
router.post('/:id/follow', companyController.toggleFollowCompany);

// Company management routes (company employees)
router.post('/', validateCreateCompany, companyController.createCompany);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

// Employee management routes
router.post('/:id/employees', companyController.addEmployee);
router.delete('/:id/employees/:employeeId', companyController.removeEmployee);

// File upload routes
router.post('/:id/logo', uploadCompanyLogo, companyController.uploadCompanyLogo);

// Company dashboard routes (for company employees)
router.get('/:id/dashboard', companyController.getCompanyDashboard);
router.get('/:id/dashboard/job-stats', companyController.getCompanyJobStats);
router.get('/:id/dashboard/application-stats', companyController.getCompanyApplicationStats);
router.get('/:id/dashboard/recent-applications', companyController.getCompanyRecentApplications);
router.get('/:id/dashboard/analytics', companyController.getCompanyAnalytics);
router.get('/:id/dashboard/employees', companyController.getCompanyEmployees);

module.exports = router;
