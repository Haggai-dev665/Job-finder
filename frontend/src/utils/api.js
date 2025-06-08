// API Configuration and Utilities
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders(requireAuth = false) {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Only add auth header if we have a token or if auth is required
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else if (requireAuth) {
      throw new Error('Authentication required');
    }
    
    return headers;
  }

  // Helper method to handle responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const requireAuth = options.requireAuth || false;
    const config = {
      headers: this.getAuthHeaders(requireAuth),
      ...options,
    };
    
    // Remove requireAuth from options as it's not a fetch option
    delete config.requireAuth;

    try {
      const response = await fetch(url, config);
      return this.handleResponse(response);
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // File upload request
  async upload(endpoint, formData) {
    const token = localStorage.getItem('accessToken');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });
      return this.handleResponse(response);
    } catch (error) {
      console.error(`File upload failed: ${endpoint}`, error);
      throw error;
    }
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Auth API methods
export const authAPI = {
  register: (userData) => apiClient.post('/users/register', userData),
  login: (credentials) => apiClient.post('/users/login', credentials),
  logout: () => apiClient.post('/users/logout'),
  refreshToken: () => apiClient.post('/users/refresh-token'),
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data) => apiClient.put('/users/profile', data),
  changePassword: (data) => apiClient.post('/users/change-password', data),
  forgotPassword: (email) => apiClient.post('/users/forgot-password', { email }),
  resetPassword: (token, password) => apiClient.post('/users/reset-password', { token, password }),
  verifyEmail: (token) => apiClient.post('/users/verify-email', { token }),
  resendVerification: (email) => apiClient.post('/users/resend-verification', { email }),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return apiClient.upload('/users/upload-avatar', formData);
  },
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    return apiClient.upload('/users/upload-resume', formData);
  },
  getPreferences: () => apiClient.get('/users/preferences'),
  updatePreferences: (preferences) => apiClient.put('/users/preferences', preferences),
};

// Jobs API methods
export const jobsAPI = {
  getJobs: (params) => apiClient.get('/jobs', params),
  getJobById: (id) => apiClient.get(`/jobs/${id}`),
  searchJobs: (searchParams) => apiClient.get('/jobs/search', searchParams),
  getFeaturedJobs: () => apiClient.get('/jobs/featured'),
  getRecommendedJobs: () => apiClient.request('/jobs/user/recommended', { method: 'GET', requireAuth: true }),
  createJob: (jobData) => apiClient.post('/jobs', jobData),
  updateJob: (id, jobData) => apiClient.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => apiClient.delete(`/jobs/${id}`),
  saveJob: (jobId) => apiClient.request(`/users/jobs/${jobId}/save`, { method: 'POST', requireAuth: true }),
  unsaveJob: (jobId) => apiClient.request(`/users/jobs/${jobId}/save`, { method: 'DELETE', requireAuth: true }),
  getSavedJobs: () => apiClient.request('/users/saved-jobs', { method: 'GET', requireAuth: true }),
  applyToJob: (jobId, applicationData) => apiClient.request(`/jobs/${jobId}/apply`, { 
    method: 'POST', 
    requireAuth: true,
    body: JSON.stringify(applicationData)
  }),
};

// Companies API methods
export const companiesAPI = {
  getCompanies: (params) => apiClient.get('/companies', params),
  getCompanyById: (id) => apiClient.get(`/companies/${id}`),
  getTrendingCompanies: () => apiClient.get('/companies/trending'),
  getMyCompany: () => apiClient.get('/companies/my-company'),
  createCompany: (companyData) => apiClient.post('/companies/create', companyData),
  updateCompany: (id, companyData) => apiClient.put(`/companies/${id}/edit`, companyData),
  deleteCompany: (id) => apiClient.delete(`/companies/${id}/delete`),
  followCompany: (id) => apiClient.post(`/companies/${id}/follow`),
  getFollowedCompanies: () => apiClient.get('/companies/followed'),
  uploadCompanyLogo: (id, file) => {
    const formData = new FormData();
    formData.append('logo', file);
    return apiClient.upload(`/companies/${id}/upload-logo`, formData);
  },
  addCompanyReview: (id, reviewData) => apiClient.post(`/companies/${id}/review`, reviewData),
  getCompanyReviews: (id) => apiClient.get(`/companies/${id}/reviews`),
  getCompanyAnalytics: (id) => apiClient.get(`/companies/${id}/analytics`),
  claimCompany: (id, claimData) => apiClient.post(`/companies/${id}/claim`, claimData),
  verifyCompany: (id) => apiClient.patch(`/companies/admin/${id}/verify`),
};

// Applications API methods
export const applicationsAPI = {
  getApplications: (params) => apiClient.get('/applications', params),
  getApplicationById: (id) => apiClient.get(`/applications/${id}`),
  updateApplicationStatus: (id, status) => apiClient.patch(`/applications/${id}/status`, { status }),
  withdrawApplication: (id) => apiClient.patch(`/applications/${id}/withdraw`),
  getJobApplications: (jobId) => apiClient.get(`/applications/job/${jobId}`),
  getUserApplications: () => apiClient.get('/applications/user'),
  getApplicationAnalytics: () => apiClient.get('/applications/analytics'),
};

export default apiClient;
