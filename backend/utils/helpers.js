// Async wrapper to handle try-catch in route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Success response helper
const sendSuccessResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

// Error response helper
const sendErrorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const response = {
    status: 'error',
    message
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  res.status(statusCode).json(response);
};

// Pagination helper
const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return {
    skip: Math.max(0, skip),
    limit: Math.max(1, Math.min(100, limit)) // Cap at 100 items per page
  };
};

// Build pagination options for MongoDB queries
const buildPaginationOptions = (page = 1, limit = 10) => {
  const parsedPage = Math.max(1, parseInt(page) || 1);
  const parsedLimit = Math.max(1, Math.min(100, parseInt(limit) || 10));
  const skip = (parsedPage - 1) * parsedLimit;
  
  return {
    skip,
    limit: parsedLimit,
    page: parsedPage
  };
};

// Search helper for MongoDB
const buildSearchQuery = (searchTerm, fields) => {
  if (!searchTerm) return {};
  
  const searchRegex = new RegExp(searchTerm, 'i');
  return {
    $or: fields.map(field => ({ [field]: searchRegex }))
  };
};

// Filter helper
const buildFilterQuery = (filters) => {
  const query = {};
  
  Object.keys(filters).forEach(key => {
    const value = filters[key];
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        query[key] = { $in: value };
      } else if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
        query[key] = { $gte: value.min, $lte: value.max };
      } else {
        query[key] = value;
      }
    }
  });
  
  return query;
};

// Sort helper
const buildSortQuery = (sortBy, sortOrder = 'desc') => {
  if (!sortBy) return { createdAt: -1 };
  
  const order = sortOrder.toLowerCase() === 'asc' ? 1 : -1;
  return { [sortBy]: order };
};

// Build sort options for MongoDB queries (alias for buildSortQuery)
const buildSortOptions = (sortBy, sortOrder = 'desc') => {
  return buildSortQuery(sortBy, sortOrder);
};

// Generate slug from string
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Generate random token
const generateToken = (length = 32) => {
  const crypto = require('crypto');
  return crypto.randomBytes(length).toString('hex');
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId.isValid(id);
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Sanitize object (remove undefined, null, empty strings)
const sanitizeObject = (obj) => {
  const sanitized = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const nested = sanitizeObject(value);
        if (Object.keys(nested).length > 0) {
          sanitized[key] = nested;
        }
      } else {
        sanitized[key] = value;
      }
    }
  });
  return sanitized;
};

// Generate initials from name
const generateInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate password reset token with expiry
const generatePasswordResetToken = () => {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  return {
    token,
    hashedToken,
    expires
  };
};

// Check if date is expired
const isExpired = (date) => {
  return new Date() > new Date(date);
};

module.exports = {
  asyncHandler,
  sendSuccessResponse,
  sendErrorResponse,
  // Aliases for backward compatibility
  sendResponse: sendSuccessResponse,
  sendError: sendErrorResponse,
  paginate,
  buildPaginationOptions,
  buildSearchQuery,
  buildFilterQuery,
  buildSortQuery,
  buildSortOptions,
  generateSlug,
  generateToken,
  isValidObjectId,
  calculateDistance,
  formatFileSize,
  sanitizeObject,
  generateInitials,
  isValidEmail,
  generatePasswordResetToken,
  isExpired
};
