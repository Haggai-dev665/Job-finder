const express = require('express');
const router = express.Router();
const {
  generateJobData,
  generateAllCategoriesData,
  getJobStats,
  getFeaturedJobs,
  getJobsByCategory,
  searchJobs,
  jobTemplates
} = require('../services/jobDataGenerator');

// In-memory cache for generated job data
let cachedJobData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Helper to get or generate job data
async function getJobData() {
  const now = Date.now();
  
  if (!cachedJobData || !cacheTimestamp || (now - cacheTimestamp) > CACHE_DURATION) {
    console.log('Generating fresh job data...');
    cachedJobData = await generateAllCategoriesData();
    cacheTimestamp = now;
  }
  
  return cachedJobData;
}

// @route   GET /api/public/jobs/featured
// @desc    Get featured jobs
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const jobs = await getJobData();
    const featuredJobs = getFeaturedJobs(jobs, parseInt(req.query.limit) || 6);
    
    res.json({
      success: true,
      count: featuredJobs.length,
      data: featuredJobs
    });
  } catch (error) {
    console.error('Error getting featured jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured jobs'
    });
  }
});

// @route   GET /api/public/jobs/stats
// @desc    Get job statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const jobs = await getJobData();
    const stats = getJobStats(jobs);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting job stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job statistics'
    });
  }
});

// @route   GET /api/public/jobs/categories
// @desc    Get available job categories with counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const jobs = await getJobData();
    const stats = getJobStats(jobs);
    
    const categories = Object.keys(jobTemplates).map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
      count: stats.jobsByCategory[category] || 0,
      icon: getCategoryIcon(category)
    }));
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error getting job categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job categories'
    });
  }
});

// @route   GET /api/public/jobs/category/:category
// @desc    Get jobs by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const jobs = await getJobData();
    const categoryJobs = getJobsByCategory(jobs, category, limit);
    
    res.json({
      success: true,
      count: categoryJobs.length,
      category: category,
      data: categoryJobs
    });
  } catch (error) {
    console.error('Error getting jobs by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs by category'
    });
  }
});

// @route   GET /api/public/jobs/search
// @desc    Search jobs with filters
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const {
      query,
      category,
      location,
      jobType,
      experienceLevel,
      salaryMin,
      salaryMax,
      page = 1,
      limit = 10
    } = req.query;
    
    const jobs = await getJobData();
    const filteredJobs = searchJobs(jobs, {
      query,
      category,
      location,
      jobType,
      experienceLevel,
      salaryMin: salaryMin ? parseInt(salaryMin) : null,
      salaryMax: salaryMax ? parseInt(salaryMax) : null
    });
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    
    const pagination = {};
    if (endIndex < filteredJobs.length) {
      pagination.next = {
        page: parseInt(page) + 1,
        limit: parseInt(limit)
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: parseInt(page) - 1,
        limit: parseInt(limit)
      };
    }
    
    res.json({
      success: true,
      count: paginatedJobs.length,
      total: filteredJobs.length,
      pagination,
      data: paginatedJobs
    });
  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching jobs'
    });
  }
});

// @route   GET /api/public/jobs/latest
// @desc    Get latest jobs
// @access  Public
router.get('/latest', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const jobs = await getJobData();
    
    const latestJobs = jobs
      .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
      .slice(0, limit);
    
    res.json({
      success: true,
      count: latestJobs.length,
      data: latestJobs
    });
  } catch (error) {
    console.error('Error getting latest jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching latest jobs'
    });
  }
});

// @route   POST /api/public/jobs/regenerate
// @desc    Regenerate job data (for development)
// @access  Public
router.post('/regenerate', async (req, res) => {
  try {
    console.log('Regenerating job data...');
    cachedJobData = await generateAllCategoriesData();
    cacheTimestamp = Date.now();
    
    const stats = getJobStats(cachedJobData);
    
    res.json({
      success: true,
      message: 'Job data regenerated successfully',
      stats
    });
  } catch (error) {
    console.error('Error regenerating job data:', error);
    res.status(500).json({
      success: false,
      message: 'Error regenerating job data'
    });
  }
});

// Helper function to get category icons
function getCategoryIcon(category) {
  const icons = {
    technology: '💻',
    healthcare: '🏥',
    finance: '💰',
    marketing: '📢',
    sales: '📈',
    education: '🎓',
    engineering: '⚙️',
    design: '🎨',
    'customer-service': '🛎️',
    'human-resources': '👥',
    operations: '🔧',
    legal: '⚖️',
    consulting: '💼',
    manufacturing: '🏭',
    retail: '🛍️',
    other: '📋'
  };
  
  return icons[category] || '📋';
}

module.exports = router;
