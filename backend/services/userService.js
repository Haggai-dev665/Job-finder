const User = require('../models/User');
const JWTConfig = require('../configs/jwt');
const emailService = require('../utils/emailService');
const { generatePasswordResetToken, isExpired } = require('../utils/helpers');
const crypto = require('crypto');

class UserService {
  // Register new user
  async registerUser(userData) {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role = 'candidate',
      location,
      company,
      preferences
    } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      company,
      location: {
        city: location?.city || '',
        country: location?.country || ''
      },
      skills: preferences?.skills || [],
      frontendSkills: preferences?.frontendSkills || [],
      preferences: {
        jobTypes: preferences?.jobTypes || []
      }
    });

    // Generate tokens
    const tokens = JWTConfig.generateTokens({ userId: user._id, role: user.role });

    // Save refresh token to user
    user.refreshTokens.push({ token: tokens.refreshToken });
    await user.save();

    // Generate email verification token
    const verificationToken = user.createEmailVerificationToken();
    await user.save();

    // Send welcome email and verification email
    try {
      await emailService.sendWelcomeEmail(user);
      await emailService.sendEmailVerification(user, verificationToken);
    } catch (error) {
      console.error('Email sending failed:', error);
    }

    // Remove password from response
    user.password = undefined;

    return {
      user,
      tokens
    };
  }

  // Login user
  async loginUser(email, password) {
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Generate tokens
    const tokens = JWTConfig.generateTokens({ userId: user._id, role: user.role });

    // Save refresh token
    user.refreshTokens.push({ token: tokens.refreshToken });
    user.lastLogin = new Date();
    await user.save();

    // Remove password from response
    user.password = undefined;

    return {
      user,
      tokens
    };
  }

  // Logout user
  async logoutUser(userId, refreshToken) {
    const user = await User.findById(userId);
    if (user) {
      user.refreshTokens = user.refreshTokens.filter(
        tokenObj => tokenObj.token !== refreshToken
      );
      await user.save();
    }
  }

  // Refresh token
  async refreshToken(refreshToken) {
    try {
      const decoded = JWTConfig.verifyRefreshToken(refreshToken);
      const user = await User.findById(decoded.userId);

      if (!user || !user.refreshTokens.some(tokenObj => tokenObj.token === refreshToken)) {
        throw new Error('Invalid refresh token');
      }

      // Generate new tokens
      const tokens = JWTConfig.generateTokens({ userId: user._id, role: user.role });

      // Replace old refresh token with new one
      user.refreshTokens = user.refreshTokens.filter(
        tokenObj => tokenObj.token !== refreshToken
      );
      user.refreshTokens.push({ token: tokens.refreshToken });
      await user.save();

      return tokens;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Get user profile
  async getUserProfile(userId) {
    const user = await User.findById(userId)
      .populate('savedJobs', 'title company location jobType salary')
      .populate('followedCompanies', 'name logo industry location');
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Update user profile
  async updateUserProfile(userId, updateData) {
    const allowedUpdates = [
      'firstName', 'lastName', 'phone', 'location', 'bio', 'skills',
      'experience', 'education', 'preferences'
    ];

    const updates = {};
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    
    if (!user) {
      throw new Error('User not found');
    }

    if (!(await user.comparePassword(currentPassword))) {
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  // Forgot password
  async forgotPassword(email) {
    const user = await User.findOne({ email });
    
    if (!user) {
      // Don't reveal that user doesn't exist
      return { message: 'If an account with that email exists, a password reset link has been sent.' };
    }

    const resetToken = user.createPasswordResetToken();
    await user.save();

    try {
      await emailService.sendPasswordResetEmail(user, resetToken);
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      throw new Error('Email could not be sent');
    }

    return { message: 'Password reset email sent' };
  }

  // Reset password
  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      throw new Error('Token is invalid or has expired');
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return { message: 'Password reset successful' };
  }

  // Verify email
  async verifyEmail(token) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const user = await User.findOne({ emailVerificationToken: hashedToken });

    if (!user) {
      throw new Error('Token is invalid');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    return { message: 'Email verified successfully' };
  }

  // Resend email verification
  async resendEmailVerification(email) {
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error('User not found');
    }

    if (user.isEmailVerified) {
      throw new Error('Email is already verified');
    }

    const verificationToken = user.createEmailVerificationToken();
    await user.save();

    await emailService.sendEmailVerification(user, verificationToken);

    return { message: 'Verification email sent' };
  }

  // Upload avatar
  async uploadAvatar(userId, filePath) {
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: filePath },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Upload resume
  async uploadResume(userId, filePath) {
    const user = await User.findByIdAndUpdate(
      userId,
      { resume: filePath },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Save job
  async saveJob(userId, jobId) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId);
      await user.save();
    }

    return { message: 'Job saved successfully' };
  }

  // Unsave job
  async unsaveJob(userId, jobId) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    user.savedJobs = user.savedJobs.filter(savedJobId => savedJobId.toString() !== jobId);
    await user.save();

    return { message: 'Job unsaved successfully' };
  }

  // Get saved jobs
  async getSavedJobs(userId) {
    const user = await User.findById(userId)
      .populate({
        path: 'savedJobs',
        populate: {
          path: 'company',
          select: 'name logo'
        }
      });
    
    if (!user) {
      throw new Error('User not found');
    }

    return user.savedJobs;
  }

  // Follow company
  async followCompany(userId, companyId) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.followedCompanies.includes(companyId)) {
      user.followedCompanies.push(companyId);
      await user.save();
    }

    return { message: 'Company followed successfully' };
  }

  // Unfollow company
  async unfollowCompany(userId, companyId) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    user.followedCompanies = user.followedCompanies.filter(
      followedCompanyId => followedCompanyId.toString() !== companyId
    );
    await user.save();

    return { message: 'Company unfollowed successfully' };
  }

  // Get followed companies
  async getFollowedCompanies(userId) {
    const user = await User.findById(userId).populate('followedCompanies');
    
    if (!user) {
      throw new Error('User not found');
    }

    return user.followedCompanies;
  }

  // Update preferences
  async updatePreferences(userId, preferences) {
    const user = await User.findByIdAndUpdate(
      userId,
      { preferences },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user.preferences;
  }

  // Deactivate account
  async deactivateAccount(userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return { message: 'Account deactivated successfully' };
  }
}

module.exports = new UserService();
