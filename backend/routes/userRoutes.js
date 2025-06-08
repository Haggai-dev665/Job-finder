const express = require('express');
const userController = require('../controllers/userController');
const { auth, authorize } = require('../middleware/auth');
const { upload, handleMulterError } = require('../middleware/upload');
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword
} = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validateRegister, userController.register);
router.post('/login', validateLogin, userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.post('/verify-email', userController.verifyEmail);
router.post('/resend-verification', userController.resendVerification);

// Protected routes (require authentication)
router.use(auth); // All routes below require authentication

// Token management
router.post('/logout', userController.logout);
router.post('/refresh-token', userController.refreshToken);

// Profile management
router.get('/profile', userController.getProfile);
router.put('/profile', validateUpdateProfile, userController.updateProfile);
router.post('/change-password', validateChangePassword, userController.changePassword);

// File uploads
router.post('/upload-avatar', 
  upload.single('avatar'), 
  handleMulterError, 
  userController.uploadAvatar
);
router.post('/upload-resume', 
  upload.single('resume'), 
  handleMulterError, 
  userController.uploadResume
);

// Job interactions
router.post('/jobs/:jobId/save', userController.saveJob);
router.delete('/jobs/:jobId/save', userController.unsaveJob);
router.get('/saved-jobs', userController.getSavedJobs);

// Company interactions
router.post('/companies/:companyId/follow', userController.followCompany);
router.delete('/companies/:companyId/follow', userController.unfollowCompany);
router.get('/followed-companies', userController.getFollowedCompanies);

// Preferences
router.get('/preferences', userController.getPreferences);
router.put('/preferences', userController.updatePreferences);

// Account management
router.post('/deactivate', userController.deactivateAccount);

// Admin routes
router.get('/:userId', authorize('admin'), userController.getUserById);

module.exports = router;
