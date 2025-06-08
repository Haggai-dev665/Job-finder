import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
const RAPIDAPI_KEY = '571628db65mshe6f8711bb952e3dp12a383jsnb46e97257b40';
const RAPIDAPI_HOST = 'jsearch.p.rapidapi.com';

class JobApiService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.lastRequestTime = 0;
    this.requestDelay = 1000; // 1 second between requests
  }

  // Rate limiting helper
  async waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.requestDelay) {
      const waitTime = this.requestDelay - timeSinceLastRequest;
      console.log(`⏱️ Rate limiting: waiting ${waitTime}ms`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    this.lastRequestTime = Date.now();
  }

  // Cache helper methods
  getCacheKey(endpoint, params = {}) {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Backend API methods (primary)
  async getFeaturedJobs(limit = 6) {
    try {
      const cacheKey = this.getCacheKey('featured_jobs', { limit });
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      console.log('🔄 Fetching featured jobs from backend...');
      const response = await axios.get(`${API_BASE_URL}/public/jobs/featured?limit=${limit}`);
      
      if (response.data.success) {
        this.setCache(cacheKey, response.data.data);
        console.log('✅ Featured jobs fetched from backend:', response.data.data.length);
        return response.data.data;
      }
      
      throw new Error('Backend request failed');
    } catch (error) {
      console.log('⚠️ Backend unavailable, trying RapidAPI fallback...');
      return await this.getFeaturedJobsFromRapidAPI(limit);
    }
  }

  async getJobCategories() {
    try {
      const cacheKey = this.getCacheKey('job_categories');
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      console.log('🔄 Fetching job categories from backend...');
      const response = await axios.get(`${API_BASE_URL}/public/jobs/categories`);
      
      if (response.data.success) {
        this.setCache(cacheKey, response.data.data);
        console.log('✅ Job categories fetched from backend:', response.data.data.length);
        return response.data.data;
      }
      
      throw new Error('Backend request failed');
    } catch (error) {
      console.log('⚠️ Backend unavailable, using fallback categories...');
      return this.getFallbackCategories();
    }
  }

  async getJobStats() {
    try {
      const cacheKey = this.getCacheKey('job_stats');
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      console.log('🔄 Fetching job stats from backend...');
      const response = await axios.get(`${API_BASE_URL}/public/jobs/stats`);
      
      if (response.data.success) {
        this.setCache(cacheKey, response.data.data);
        console.log('✅ Job stats fetched from backend:', response.data.data);
        return response.data.data;
      }
      
      throw new Error('Backend request failed');
    } catch (error) {
      console.log('⚠️ Backend unavailable, using fallback stats...');
      return this.getFallbackStats();
    }
  }

  async searchJobs(params = {}) {
    try {
      const cacheKey = this.getCacheKey('search_jobs', params);
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      console.log('🔄 Searching jobs from backend...');
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(`${API_BASE_URL}/public/jobs/search?${queryString}`);
      
      if (response.data.success) {
        this.setCache(cacheKey, response.data.data);
        console.log('✅ Jobs search completed from backend:', response.data.data.jobs.length);
        return response.data.data;
      }
      
      throw new Error('Backend request failed');
    } catch (error) {
      console.log('⚠️ Backend unavailable, trying RapidAPI fallback...');
      return await this.searchJobsFromRapidAPI(params);
    }
  }

  async getLatestJobs(limit = 10) {
    try {
      const cacheKey = this.getCacheKey('latest_jobs', { limit });
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      console.log('🔄 Fetching latest jobs from backend...');
      const response = await axios.get(`${API_BASE_URL}/public/jobs/latest?limit=${limit}`);
      
      if (response.data.success) {
        this.setCache(cacheKey, response.data.data);
        console.log('✅ Latest jobs fetched from backend:', response.data.data.length);
        return response.data.data;
      }
      
      throw new Error('Backend request failed');
    } catch (error) {
      console.log('⚠️ Backend unavailable, trying RapidAPI fallback...');
      return await this.getLatestJobsFromRapidAPI(limit);
    }
  }

  // RapidAPI fallback methods
  async getFeaturedJobsFromRapidAPI(limit = 6) {
    try {
      await this.waitForRateLimit();
      
      const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: {
          query: 'software engineer',
          page: 1,
          num_pages: 1,
          date_posted: 'week'
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      });

      if (response.data?.data) {
        const jobs = response.data.data.slice(0, limit).map(this.transformRapidAPIJob);
        console.log('✅ Featured jobs fetched from RapidAPI:', jobs.length);
        return jobs;
      }
      
      throw new Error('No data from RapidAPI');
    } catch (error) {
      console.log('❌ RapidAPI failed:', error.message);
      return this.getFallbackFeaturedJobs();
    }
  }

  async searchJobsFromRapidAPI(params = {}) {
    try {
      await this.waitForRateLimit();
      
      const { query = 'software developer', location = 'United States', page = 1 } = params;
      
      const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: {
          query: `${query} in ${location}`,
          page,
          num_pages: 1,
          date_posted: 'all'
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      });

      if (response.data?.data) {
        const jobs = response.data.data.map(this.transformRapidAPIJob);
        console.log('✅ Jobs search completed from RapidAPI:', jobs.length);
        return {
          jobs,
          pagination: {
            currentPage: page,
            totalPages: 5,
            totalJobs: jobs.length * 5,
            hasNext: page < 5,
            hasPrev: page > 1
          }
        };
      }
      
      throw new Error('No data from RapidAPI');
    } catch (error) {
      console.log('❌ RapidAPI search failed:', error.message);
      return this.getFallbackSearchResults();
    }
  }

  async getLatestJobsFromRapidAPI(limit = 10) {
    try {
      await this.waitForRateLimit();
      
      const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
        params: {
          query: 'developer',
          page: 1,
          num_pages: 1,
          date_posted: 'today'
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      });

      if (response.data?.data) {
        const jobs = response.data.data.slice(0, limit).map(this.transformRapidAPIJob);
        console.log('✅ Latest jobs fetched from RapidAPI:', jobs.length);
        return jobs;
      }
      
      throw new Error('No data from RapidAPI');
    } catch (error) {
      console.log('❌ RapidAPI latest jobs failed:', error.message);
      return this.getFallbackLatestJobs();
    }
  }

  // Transform RapidAPI job format to our format
  transformRapidAPIJob = (job) => {
    return {
      id: job.job_id || Math.random().toString(36).substr(2, 9),
      title: job.job_title || 'Software Developer',
      company: {
        name: job.employer_name || 'Tech Company',
        logo: job.employer_logo || '/default-logo.png',
        location: job.job_city ? `${job.job_city}, ${job.job_state || job.job_country}` : 'Remote'
      },
      location: {
        city: job.job_city || 'New York',
        state: job.job_state || 'NY',
        country: job.job_country || 'United States',
        isRemote: job.job_is_remote || false
      },
      jobType: job.job_employment_type || 'Full-time',
      salary: {
        min: job.job_min_salary || 60000,
        max: job.job_max_salary || 120000,
        currency: 'USD'
      },
      description: job.job_description || 'Exciting opportunity for a software developer...',
      requirements: {
        experienceLevel: job.job_required_experience?.required_experience_in_months > 36 ? 'Senior' : 
                       job.job_required_experience?.required_experience_in_months > 12 ? 'Mid-level' : 'Entry-level',
        skills: job.job_required_skills || ['JavaScript', 'React', 'Node.js']
      },
      benefits: job.job_benefits || ['Health Insurance', 'Remote Work', '401k'],
      postedDate: job.job_posted_at_datetime_utc || new Date().toISOString(),
      isActive: true,
      applicationCount: Math.floor(Math.random() * 50) + 10,
      views: Math.floor(Math.random() * 200) + 50
    };
  };

  // Fallback data methods
  getFallbackFeaturedJobs() {
    console.log('📦 Using fallback featured jobs data');
    return [
      {
        id: 'job1',
        title: 'Senior React Developer',
        company: {
          name: 'TechCorp',
          logo: '/default-logo.png',
          location: 'San Francisco, CA'
        },
        location: {
          city: 'San Francisco',
          state: 'CA',
          country: 'United States',
          isRemote: false
        },
        jobType: 'Full-time',
        salary: { min: 120000, max: 180000, currency: 'USD' },
        description: 'We are looking for a Senior React Developer...',
        requirements: {
          experienceLevel: 'Senior',
          skills: ['React', 'JavaScript', 'TypeScript', 'Node.js']
        },
        benefits: ['Health Insurance', 'Stock Options', 'Remote Work'],
        postedDate: new Date().toISOString(),
        isActive: true,
        applicationCount: 45,
        views: 156
      },
      {
        id: 'job2',
        title: 'Full Stack Developer',
        company: {
          name: 'StartupXYZ',
          logo: '/default-logo.png',
          location: 'New York, NY'
        },
        location: {
          city: 'New York',
          state: 'NY',
          country: 'United States',
          isRemote: true
        },
        jobType: 'Full-time',
        salary: { min: 90000, max: 140000, currency: 'USD' },
        description: 'Join our dynamic team as a Full Stack Developer...',
        requirements: {
          experienceLevel: 'Mid-level',
          skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
        },
        benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget'],
        postedDate: new Date().toISOString(),
        isActive: true,
        applicationCount: 32,
        views: 98
      }
    ];
  }

  getFallbackCategories() {
    console.log('📦 Using fallback categories data');
    return [
      { name: 'Technology', count: 1250, icon: '💻' },
      { name: 'Healthcare', count: 890, icon: '🏥' },
      { name: 'Finance', count: 675, icon: '💰' },
      { name: 'Marketing', count: 445, icon: '📈' },
      { name: 'Sales', count: 580, icon: '💼' },
      { name: 'Education', count: 320, icon: '📚' }
    ];
  }

  getFallbackStats() {
    console.log('📦 Using fallback stats data');
    return {
      totalJobs: 15420,
      totalCompanies: 2340,
      totalApplications: 45680,
      jobsPostedToday: 156
    };
  }

  getFallbackSearchResults() {
    console.log('📦 Using fallback search results');
    return {
      jobs: this.getFallbackFeaturedJobs(),
      pagination: {
        currentPage: 1,
        totalPages: 5,
        totalJobs: 10,
        hasNext: true,
        hasPrev: false
      }
    };
  }

  getFallbackLatestJobs() {
    console.log('📦 Using fallback latest jobs');
    return this.getFallbackFeaturedJobs();
  }

  getFallbackJobs() {
    console.log('📦 Using fallback jobs for general search');
    return this.getFallbackFeaturedJobs();
  }
}

// Create and export a single instance
const jobApiService = new JobApiService();
export default jobApiService;