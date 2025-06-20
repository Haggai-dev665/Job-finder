import apiClient from '../utils/api';

class CompanyDashboardService {
  // Get company dashboard overview
  async getCompanyDashboardOverview(companyId) {
    try {
      const response = await apiClient.get(`/companies/${companyId}/dashboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company dashboard overview:', error);
      return this.getFallbackDashboardData();
    }
  }

  // Get company job statistics
  async getCompanyJobStats(companyId) {
    try {
      const response = await apiClient.get(`/companies/${companyId}/dashboard/job-stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company job stats:', error);
      return {
        totalJobs: 0,
        activeJobs: 0,
        draftJobs: 0,
        closedJobs: 0
      };
    }
  }

  // Get company application statistics
  async getCompanyApplicationStats(companyId) {
    try {
      const response = await apiClient.get(`/companies/${companyId}/dashboard/application-stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company application stats:', error);
      return {
        totalApplications: 0,
        pendingApplications: 0,
        reviewedApplications: 0,
        interviewApplications: 0,
        hiredApplications: 0
      };
    }
  }

  // Get recent applications
  async getRecentApplications(companyId, limit = 10) {
    try {
      const response = await apiClient.get(`/companies/${companyId}/dashboard/recent-applications?limit=${limit}`);
      const applications = response.data;
      return Array.isArray(applications) ? applications : [];
    } catch (error) {
      console.error('Error fetching recent applications:', error);
      return [];
    }
  }

  // Get company analytics
  async getCompanyAnalytics(companyId) {
    try {
      const response = await apiClient.get(`/companies/${companyId}/dashboard/analytics`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company analytics:', error);
      return {
        applicationsTrend: [],
        jobViewsTrend: []
      };
    }
  }

  // Get company employees
  async getCompanyEmployees(companyId) {
    try {
      const response = await apiClient.get(`/companies/${companyId}/dashboard/employees`);
      const employees = response.data;
      return Array.isArray(employees) ? employees : [];
    } catch (error) {
      console.error('Error fetching company employees:', error);
      return [];
    }
  }

  // Get company's own jobs
  async getCompanyJobs(companyId, params = {}) {
    try {
      const queryParams = new URLSearchParams({
        company: companyId,
        ...params
      }).toString();
      
      const response = await apiClient.get(`/jobs?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company jobs:', error);
      return {
        jobs: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalJobs: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  }

  // Create a new job posting
  async createJob(jobData) {
    try {
      const response = await apiClient.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  // Update job posting
  async updateJob(jobId, jobData) {
    try {
      const response = await apiClient.put(`/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  // Delete job posting
  async deleteJob(jobId) {
    try {
      const response = await apiClient.delete(`/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  // Update application status
  async updateApplicationStatus(applicationId, status, notes = '') {
    try {
      const response = await apiClient.patch(`/applications/${applicationId}/status`, {
        status,
        notes
      });
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  }

  // Get company profile
  async getCompanyProfile(companyId) {
    try {
      const response = await apiClient.get(`/companies/${companyId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company profile:', error);
      throw error;
    }
  }

  // Update company profile
  async updateCompanyProfile(companyId, profileData) {
    try {
      const response = await apiClient.put(`/companies/${companyId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating company profile:', error);
      throw error;
    }
  }

  // Fallback dashboard data
  getFallbackDashboardData() {
    return {
      company: {
        name: 'Your Company',
        logo: null,
        industry: 'Technology',
        size: 'startup'
      },
      jobStats: {
        totalJobs: 0,
        activeJobs: 0,
        draftJobs: 0,
        closedJobs: 0
      },
      applicationStats: {
        totalApplications: 0,
        pendingApplications: 0,
        reviewedApplications: 0,
        interviewApplications: 0,
        hiredApplications: 0
      },
      recentApplications: [],
      topPerformingJobs: [],
      analytics: {
        applicationsTrend: [],
        jobViewsTrend: []
      }
    };
  }
}

export default new CompanyDashboardService();
