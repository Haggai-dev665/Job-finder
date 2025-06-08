import React, { createContext, useContext, useState, useEffect } from 'react';
import { jobsAPI, applicationsAPI } from '../utils/api';
import { useAuth } from './AuthContext';
import jobApiService from '../services/jobApiService';

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

// Alias for compatibility
export const useJob = useJobs;

export { JobContext };

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    location: '',
    jobType: '',
    salaryRange: { min: 0, max: 200000 },
    experience: '',
    company: '',
    skills: []
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Check if we're on the registration page
    const isRegisterPage = window.location.pathname.includes('/register');
    const isLoginPage = window.location.pathname.includes('/login');
    
    // Only fetch jobs when auth loading is complete and not on auth pages
    if (!authLoading && !isRegisterPage && !isLoginPage) {
      fetchJobs();
      
      // Only fetch user-specific data if authenticated
      if (isAuthenticated) {
        fetchSavedJobs();
        fetchApplications();
      }
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    // Check if we're on the registration or login page
    const isAuthPage = window.location.pathname.includes('/register') || 
                      window.location.pathname.includes('/login');
                      
    // Apply filters whenever searchFilters change, but not on auth pages
    if (!authLoading && !isAuthPage) {
      filterJobs();
    }
  }, [searchFilters, authLoading]);

  const fetchJobs = async (params = {}) => {
    // Check if we should abort the request (on auth pages)
    const isAuthPage = window.location.pathname.includes('/register') || 
                       window.location.pathname.includes('/login');
    if (isAuthPage) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Try to get jobs from external API first
      let apiJobs = [];
      try {
        const query = params.query || 'software engineer';
        const location = params.location || 'United States';
        apiJobs = await jobApiService.searchJobs(query, location, 1, 3);
        console.log('Fetched jobs from external API:', apiJobs.length);
      } catch (apiError) {
        console.warn('External API failed, falling back to local data:', apiError);
      }

      // If external API returns jobs, use them; otherwise try local API
      if (apiJobs && Array.isArray(apiJobs) && apiJobs.length > 0) {
        setJobs(apiJobs);
        setFilteredJobs(apiJobs);
      } else {
        // Fallback to local API
        try {
          const response = await jobsAPI.getJobs(params);
          if (response.status === 'success') {
            const jobsData = response.data.jobs || response.data;
            const jobsArray = Array.isArray(jobsData) ? jobsData : [];
            setJobs(jobsArray);
            setFilteredJobs(jobsArray);
          }
        } catch (localError) {
          console.warn('Local API also failed, using fallback data:', localError);
          // Use fallback data from the service
          const fallbackJobs = await jobApiService.getFallbackJobs();
          const fallbackArray = Array.isArray(fallbackJobs) ? fallbackJobs : [];
          setJobs(fallbackArray);
          setFilteredJobs(fallbackArray);
        }
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Set fallback data on any error
      const fallbackJobs = await jobApiService.getFallbackJobs();
      const fallbackArray = Array.isArray(fallbackJobs) ? fallbackJobs : [];
      setJobs(fallbackArray);
      setFilteredJobs(fallbackArray);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    if (!isAuthenticated) {
      // Clear saved jobs for unauthenticated users, fallback to localStorage
      const saved = localStorage.getItem('savedJobs');
      setSavedJobs(saved ? JSON.parse(saved) : []);
      return;
    }

    try {
      const response = await jobsAPI.getSavedJobs();
      if (response.status === 'success') {
        setSavedJobs(response.data);
        // Sync with localStorage for offline support
        localStorage.setItem('savedJobs', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      // Fallback to localStorage for offline support
      const saved = localStorage.getItem('savedJobs');
      setSavedJobs(saved ? JSON.parse(saved) : []);
    }
  };

  const fetchApplications = async () => {
    if (!isAuthenticated) {
      // Clear applications for unauthenticated users
      setApplications([]);
      return;
    }

    try {
      const response = await applicationsAPI.getUserApplications();
      if (response.status === 'success') {
        setApplications(response.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      // Set empty array on error for unauthenticated users
      setApplications([]);
    }
  };

  const filterJobs = async () => {
    // If we don't have any jobs yet or are in authLoading state, don't filter
    if (jobs.length === 0 || authLoading) {
      return;
    }

    // Use API search instead of client-side filtering for better performance
    try {
      setLoading(true);
      const searchParams = {
        query: searchFilters.query,
        location: searchFilters.location,
        jobType: searchFilters.jobType,
        minSalary: searchFilters.salaryRange.min,
        maxSalary: searchFilters.salaryRange.max,
        experience: searchFilters.experience,
        company: searchFilters.company,
        skills: searchFilters.skills.join(',')
      };

      // Remove empty params
      Object.keys(searchParams).forEach(key => {
        if (!searchParams[key] || searchParams[key] === 0 || searchParams[key] === '') {
          delete searchParams[key];
        }
      });

      const response = await jobsAPI.searchJobs(searchParams);
      if (response.status === 'success') {
        setFilteredJobs(response.data.jobs || response.data);
      }
    } catch (error) {
      console.error('Error filtering jobs:', error);
      // Fallback to client-side filtering if API fails
      let filtered = [...jobs];

      if (searchFilters.query) {
        filtered = filtered.filter(job =>
          job.title?.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
          job.company?.name?.toLowerCase().includes(searchFilters.query.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchFilters.query.toLowerCase())
        );
      }

      if (searchFilters.location) {
        filtered = filtered.filter(job =>
          job.location?.toLowerCase().includes(searchFilters.location.toLowerCase())
        );
      }

      if (searchFilters.jobType) {
        filtered = filtered.filter(job => job.type === searchFilters.jobType);
      }

      if (searchFilters.experience) {
        filtered = filtered.filter(job => job.experience === searchFilters.experience);
      }

      setFilteredJobs(filtered);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchFilters = (newFilters) => {
    setSearchFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setSearchFilters({
      query: '',
      location: '',
      jobType: '',
      salaryRange: { min: 0, max: 200000 },
      experience: '',
      company: '',
      skills: []
    });
  };

  const searchJobs = async (query, location) => {
    setLoading(true);
    try {
      const searchParams = { query, location };
      Object.keys(searchParams).forEach(key => {
        if (!searchParams[key]) delete searchParams[key];
      });

      // Update search filters before the API call
      updateSearchFilters({ query, location });
      
      const response = await jobsAPI.searchJobs(searchParams);
      if (response.status === 'success') {
        const jobsData = response.data.jobs || response.data;
        const jobsArray = Array.isArray(jobsData) ? jobsData : [];
        setJobs(jobsArray);
        setFilteredJobs(jobsArray);
      }
    } catch (error) {
      console.error('Error searching jobs:', error);
      // Set empty arrays on error to prevent UI issues
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId, applicationData = {}) => {
    if (!isAuthenticated) {
      return { 
        success: false, 
        message: 'You need to be logged in to apply for jobs',
        requireAuth: true
      };
    }
    
    try {
      const response = await applicationsAPI.applyToJob(jobId, applicationData);
      if (response.status === 'success') {
        // Update applications list
        await fetchApplications();
        return { success: true, message: 'Application submitted successfully!' };
      }
      return { success: false, message: response.message || 'Failed to submit application' };
    } catch (error) {
      console.error('Error applying to job:', error);
      return { success: false, message: 'Failed to submit application. Please try again.' };
    }
  };

  const saveJob = async (jobId) => {
    if (!isAuthenticated) {
      // Handle saving to localStorage for unauthenticated users
      const job = jobs.find(j => j._id === jobId || j.id === jobId);
      if (job && !savedJobs.find(j => j._id === jobId || j.id === jobId)) {
        const updatedSaved = [...savedJobs, { ...job, savedAt: new Date().toISOString() }];
        setSavedJobs(updatedSaved);
        localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
        return { success: true, message: 'Job saved locally! Sign in to sync across devices.' };
      }
      return { success: false, message: 'Job already saved.' };
    }

    try {
      const response = await jobsAPI.saveJob(jobId);
      if (response.status === 'success') {
        // Update saved jobs list
        await fetchSavedJobs();
        return { success: true, message: 'Job saved successfully!' };
      }
      return { success: false, message: response.message || 'Failed to save job' };
    } catch (error) {
      console.error('Error saving job:', error);
      // Fallback to localStorage
      const job = jobs.find(j => j._id === jobId || j.id === jobId);
      if (job && !savedJobs.find(j => j._id === jobId || j.id === jobId)) {
        const updatedSaved = [...savedJobs, { ...job, savedAt: new Date().toISOString() }];
        setSavedJobs(updatedSaved);
        localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
        return { success: true, message: 'Job saved locally!' };
      }
      return { success: false, message: 'Failed to save job.' };
    }
  };

  const unsaveJob = async (jobId) => {
    if (!isAuthenticated) {
      // Handle removal from localStorage for unauthenticated users
      const updatedSaved = savedJobs.filter(job => job._id !== jobId && job.id !== jobId);
      setSavedJobs(updatedSaved);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
      return { success: true, message: 'Job removed locally!' };
    }

    try {
      const response = await jobsAPI.unsaveJob(jobId);
      if (response.status === 'success') {
        // Update saved jobs list
        await fetchSavedJobs();
        return { success: true, message: 'Job removed from saved list!' };
      }
      return { success: false, message: response.message || 'Failed to unsave job' };
    } catch (error) {
      console.error('Error unsaving job:', error);
      // Fallback to localStorage
      const updatedSaved = savedJobs.filter(job => job._id !== jobId && job.id !== jobId);
      setSavedJobs(updatedSaved);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
      return { success: true, message: 'Job removed locally!' };
    }
  };

  const getJobRecommendations = (userPreferences) => {
    if (!userPreferences) return [];
    
    return jobs.filter(job => {
      // Match job type preferences
      const typeMatch = userPreferences.jobTypes?.includes(job.type);
      
      // Match location preferences
      const locationMatch = userPreferences.locations?.some(loc =>
        job.location.toLowerCase().includes(loc.toLowerCase())
      );
      
      // Match skills
      const skillMatch = userPreferences.skills?.some(skill =>
        job.skills.some(jobSkill =>
          jobSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      
      // Match salary range
      const salaryMatch = job.salary &&
        job.salary.min >= userPreferences.salaryRange?.min &&
        job.salary.max <= userPreferences.salaryRange?.max;
      
      return typeMatch || locationMatch || skillMatch || salaryMatch;
    }).slice(0, 10); // Return top 10 recommendations
  };

  // Get featured jobs from external API
  const getFeaturedJobs = async () => {
    try {
      const featuredJobs = await jobApiService.getFeaturedJobs();
      return featuredJobs;
    } catch (error) {
      console.error('Error fetching featured jobs:', error);
      return jobs.slice(0, 6); // Fallback to first 6 jobs
    }
  };

  // Get jobs by category from external API
  const getJobsByCategory = async (category) => {
    try {
      const categoryJobs = await jobApiService.getJobsByCategory(category);
      return categoryJobs;
    } catch (error) {
      console.error('Error fetching jobs by category:', error);
      return jobs.filter(job => job.industry === category).slice(0, 10);
    }
  };

  // Get job statistics
  const getJobStats = async () => {
    try {
      const stats = await jobApiService.getJobStats();
      return stats;
    } catch (error) {
      console.error('Error fetching job stats:', error);
      return {
        totalJobs: 125847,
        totalCompanies: 45000,
        totalProfessionals: 2800000,
        successRate: '96.8%'
      };
    }
  };

  // Get job categories
  const getJobCategories = async () => {
    try {
      const categories = await jobApiService.getJobCategories();
      return categories;
    } catch (error) {
      console.error('Error fetching job categories:', error);
      return null; // Return null to use fallback data
    }
  };

  const value = {
    jobs,
    filteredJobs,
    loading,
    searchFilters,
    applications,
    savedJobs,
    updateSearchFilters,
    resetFilters,
    searchJobs,
    applyToJob,
    saveJob,
    unsaveJob,
    getJobRecommendations,
    filterJobs,
    fetchJobs,
    fetchSavedJobs,
    fetchApplications,
    getFeaturedJobs,
    getJobsByCategory,
    getJobStats,
    getJobCategories
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};
