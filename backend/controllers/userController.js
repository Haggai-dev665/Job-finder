const userService = require('../services/userService');
const { asyncHandler, sendSuccessResponse, sendErrorResponse } = require('../utils/helpers');

class UserController {
  // Register new user
  register = asyncHandler(async (req, res) => {
    const result = await userService.registerUser(req.body);
    sendSuccessResponse(res, result, 'User registered successfully', 201);
  });

  // Login user
  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    sendSuccessResponse(res, result, 'Login successful');
  });

  // Logout user
  logout = asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken || req.header('X-Refresh-Token');
    await userService.logoutUser(req.user._id, refreshToken);
    sendSuccessResponse(res, null, 'Logout successful');
  });

  // Refresh token
  refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken || req.header('X-Refresh-Token');
    
    if (!refreshToken) {
      return sendErrorResponse(res, 'Refresh token is required', 400);
    }

    const tokens = await userService.refreshToken(refreshToken);
    sendSuccessResponse(res, { tokens }, 'Token refreshed successfully');
  });

  // Get user profile
  getProfile = asyncHandler(async (req, res) => {
    const user = await userService.getUserProfile(req.user._id);
    sendSuccessResponse(res, user, 'Profile retrieved successfully');
  });

  // Update user profile
  updateProfile = asyncHandler(async (req, res) => {
    const user = await userService.updateUserProfile(req.user._id, req.body);
    sendSuccessResponse(res, user, 'Profile updated successfully');
  });

  // Change password
  changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.changePassword(req.user._id, currentPassword, newPassword);
    sendSuccessResponse(res, result, 'Password changed successfully');
  });

  // Forgot password
  forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await userService.forgotPassword(email);
    sendSuccessResponse(res, result, 'Password reset email sent');
  });

  // Reset password
  resetPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    const result = await userService.resetPassword(token, password);
    sendSuccessResponse(res, result, 'Password reset successful');
  });

  // Verify email
  verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;
    const result = await userService.verifyEmail(token);
    sendSuccessResponse(res, result, 'Email verified successfully');
  });

  // Resend email verification
  resendVerification = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await userService.resendEmailVerification(email);
    sendSuccessResponse(res, result, 'Verification email sent');
  });

  // Upload avatar
  uploadAvatar = asyncHandler(async (req, res) => {
    if (!req.file) {
      return sendErrorResponse(res, 'No file uploaded', 400);
    }

    const filePath = req.file.path.replace(/\\/g, '/'); // Normalize path for URLs
    const user = await userService.uploadAvatar(req.user._id, filePath);
    
    sendSuccessResponse(res, { 
      profilePicture: filePath,
      user 
    }, 'Avatar uploaded successfully');
  });

  // Upload resume
  uploadResume = asyncHandler(async (req, res) => {
    if (!req.file) {
      return sendErrorResponse(res, 'No file uploaded', 400);
    }

    const filePath = req.file.path.replace(/\\/g, '/'); // Normalize path for URLs
    const user = await userService.uploadResume(req.user._id, filePath);
    
    sendSuccessResponse(res, { 
      resume: filePath,
      user 
    }, 'Resume uploaded successfully');
  });

  // Save job
  saveJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const result = await userService.saveJob(req.user._id, jobId);
    sendSuccessResponse(res, result, 'Job saved successfully');
  });

  // Unsave job
  unsaveJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const result = await userService.unsaveJob(req.user._id, jobId);
    sendSuccessResponse(res, result, 'Job unsaved successfully');
  });

  // Get saved jobs
  getSavedJobs = asyncHandler(async (req, res) => {
    const savedJobs = await userService.getSavedJobs(req.user._id);
    sendSuccessResponse(res, savedJobs, 'Saved jobs retrieved successfully');
  });

  // Follow company
  followCompany = asyncHandler(async (req, res) => {
    const { companyId } = req.params;
    const result = await userService.followCompany(req.user._id, companyId);
    sendSuccessResponse(res, result, 'Company followed successfully');
  });

  // Unfollow company
  unfollowCompany = asyncHandler(async (req, res) => {
    const { companyId } = req.params;
    const result = await userService.unfollowCompany(req.user._id, companyId);
    sendSuccessResponse(res, result, 'Company unfollowed successfully');
  });

  // Get followed companies
  getFollowedCompanies = asyncHandler(async (req, res) => {
    const companies = await userService.getFollowedCompanies(req.user._id);
    sendSuccessResponse(res, companies, 'Followed companies retrieved successfully');
  });

  // Get preferences
  getPreferences = asyncHandler(async (req, res) => {
    const user = await userService.getUserProfile(req.user._id);
    sendSuccessResponse(res, user.preferences, 'Preferences retrieved successfully');
  });

  // Update preferences
  updatePreferences = asyncHandler(async (req, res) => {
    const preferences = await userService.updatePreferences(req.user._id, req.body);
    sendSuccessResponse(res, preferences, 'Preferences updated successfully');
  });

  // Deactivate account
  deactivateAccount = asyncHandler(async (req, res) => {
    const result = await userService.deactivateAccount(req.user._id);
    sendSuccessResponse(res, result, 'Account deactivated successfully');
  });

  // Get user by ID (for admin)
  getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await userService.getUserProfile(userId);
    sendSuccessResponse(res, user, 'User retrieved successfully');
  });
}

module.exports = new UserController();
