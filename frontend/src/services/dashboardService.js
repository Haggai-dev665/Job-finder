import apiClient from '../utils/api';

class DashboardService {
  // Get dashboard overview data
  async getDashboardOverview() {
    try {
      const [
        applicationStats,
        jobStats,
        userProfile,
        recentApplications,
        recommendedJobs
      ] = await Promise.all([
        this.getApplicationStats(),
        this.getJobStats(),
        this.getUserProfile(),
        this.getRecentApplications(),
        this.getRecommendedJobs()
      ]);

      return {
        applicationStats,
        jobStats,
        userProfile,
        recentApplications,
        recommendedJobs
      };
    } catch (error) {
      console.error('Error fetching dashboard overview:', error);
      return this.getFallbackDashboardData();
    }
  }

  // Get application statistics
  async getApplicationStats() {
    try {
      const response = await apiClient.get('/applications/stats/overview');
      return response.data;
    } catch (error) {
      console.error('Error fetching application stats:', error);
      return {
        totalApplications: 0,
        pending: 0,
        reviewed: 0,
        interviewScheduled: 0,
        offerMade: 0,
        hired: 0,
        rejected: 0
      };
    }
  }

  // Get job statistics
  async getJobStats() {
    try {
      const response = await apiClient.get('/public/jobs/stats');
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error fetching job stats:', error);
      return {
        totalJobs: 125847,
        totalCompanies: 45000,
        featuredJobs: 1250,
        remoteJobs: 35000
      };
    }
  }

  // Get user profile completion status
  async getUserProfile() {
    try {
      const response = await apiClient.get('/users/profile');
      const profile = response.data;
      
      // Calculate profile completion percentage
      const completionFields = [
        profile.firstName,
        profile.lastName,
        profile.email,
        profile.profile?.bio,
        profile.profile?.skills?.length > 0,
        profile.profile?.experience?.length > 0,
        profile.profile?.education?.length > 0,
        profile.profile?.avatar
      ];
      
      const completedFields = completionFields.filter(Boolean).length;
      const completionPercentage = Math.round((completedFields / completionFields.length) * 100);
      
      return {
        ...profile,
        completionPercentage,
        missingFields: completionFields.length - completedFields
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        completionPercentage: 60,
        missingFields: 3
      };
    }
  }

  // Get recent applications
  async getRecentApplications(limit = 5) {
    try {
      const response = await apiClient.get(`/applications/user?limit=${limit}&sortBy=appliedAt&sortOrder=desc`);
      const applications = response.data.applications || response.data;
      // Ensure we always return an array
      return Array.isArray(applications) ? applications : [];
    } catch (error) {
      console.error('Error fetching recent applications:', error);
      return [];
    }
  }

  // Get recommended jobs
  async getRecommendedJobs(limit = 6) {
    try {
      const response = await apiClient.get(`/jobs/user/recommended?limit=${limit}`);
      const jobs = response.data.jobs || response.data;
      // Ensure we always return an array
      return Array.isArray(jobs) ? jobs : [];
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
      // Fallback to featured jobs
      try {
        const fallbackResponse = await apiClient.get(`/public/jobs/featured?limit=${limit}`);
        const fallbackJobs = fallbackResponse.data.data || [];
        return Array.isArray(fallbackJobs) ? fallbackJobs : [];
      } catch (fallbackError) {
        return [];
      }
    }
  }

  // Get saved jobs
  async getSavedJobs(limit = 10) {
    try {
      const response = await apiClient.get(`/users/saved-jobs?limit=${limit}`);
      const jobs = response.data.jobs || response.data;
      // Ensure we always return an array
      return Array.isArray(jobs) ? jobs : [];
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  }

  // Get job alerts
  async getJobAlerts() {
    try {
      const response = await apiClient.get('/users/job-alerts');
      const alerts = response.data.alerts || response.data;
      // Ensure we always return an array
      return Array.isArray(alerts) ? alerts : [];
    } catch (error) {
      console.error('Error fetching job alerts:', error);
      return [];
    }
  }

  // Get profile completion suggestions
  getProfileCompletionSuggestions(profile) {
    const suggestions = [];
    
    if (!profile.profile?.bio) {
      suggestions.push({
        title: 'Add a professional bio',
        description: 'Tell recruiters about yourself',
        action: 'Add Bio',
        priority: 'high'
      });
    }
    
    if (!profile.profile?.skills?.length) {
      suggestions.push({
        title: 'Add your skills',
        description: 'Highlight your technical abilities',
        action: 'Add Skills',
        priority: 'high'
      });
    }
    
    if (!profile.profile?.experience?.length) {
      suggestions.push({
        title: 'Add work experience',
        description: 'Show your professional background',
        action: 'Add Experience',
        priority: 'medium'
      });
    }
    
    if (!profile.profile?.education?.length) {
      suggestions.push({
        title: 'Add education',
        description: 'Include your educational background',
        action: 'Add Education',
        priority: 'low'
      });
    }
    
    if (!profile.profile?.avatar) {
      suggestions.push({
        title: 'Upload profile picture',
        description: 'Make your profile more personal',
        action: 'Upload Photo',
        priority: 'low'
      });
    }

    return suggestions;
  }

  // Fallback dashboard data
  getFallbackDashboardData() {
    return {
      applicationStats: {
        totalApplications: 0,
        pending: 0,
        reviewed: 0,
        interviewScheduled: 0,
        offerMade: 0,
        hired: 0,
        rejected: 0
      },
      jobStats: {
        totalJobs: 125847,
        totalCompanies: 45000,
        featuredJobs: 1250,
        remoteJobs: 35000
      },
      userProfile: {
        completionPercentage: 60,
        missingFields: 3
      },
      recentApplications: [],
      recommendedJobs: []
    };
  }
}

export default new DashboardService();
