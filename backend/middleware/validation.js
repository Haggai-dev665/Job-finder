const { body, validationResult } = require('express-validator');

// Common validation rules
const emailValidation = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Please provide a valid email');

const passwordValidation = body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number');

const nameValidation = (field) => body(field)
  .isLength({ min: 2, max: 50 })
  .trim()
  .withMessage(`${field} must be between 2 and 50 characters`);

// Validation middleware to check for errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateRegister = [
  nameValidation('firstName'),
  nameValidation('lastName'),
  emailValidation,
  passwordValidation,
  body('role')
    .optional()
    .isIn(['candidate', 'employer'])
    .withMessage('Role must be either candidate or employer'),
  handleValidationErrors
];

const validateLogin = [
  emailValidation,
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

const validateUpdateProfile = [
  nameValidation('firstName').optional(),
  nameValidation('lastName').optional(),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio cannot be more than 500 characters'),
  handleValidationErrors
];

const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  passwordValidation.withMessage('New password must be at least 6 characters long and contain uppercase, lowercase, and number'),
  handleValidationErrors
];

// Job validation rules
const validateJob = [
  body('title')
    .isLength({ min: 5, max: 100 })
    .trim()
    .withMessage('Job title must be between 5 and 100 characters'),
  body('description')
    .isLength({ min: 50, max: 5000 })
    .trim()
    .withMessage('Job description must be between 50 and 5000 characters'),
  body('company')
    .isMongoId()
    .withMessage('Valid company ID is required'),
  body('jobType')
    .isIn(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'temporary'])
    .withMessage('Job type must be one of: full-time, part-time, contract, freelance, internship, temporary'),
  body('location.city')
    .isLength({ min: 2, max: 50 })
    .trim()
    .withMessage('City must be between 2 and 50 characters'),
  body('location.state')
    .isLength({ min: 2, max: 50 })
    .trim()
    .withMessage('State must be between 2 and 50 characters'),
  body('location.country')
    .isLength({ min: 2, max: 50 })
    .trim()
    .withMessage('Country must be between 2 and 50 characters'),
  body('location.type')
    .isIn(['on-site', 'remote', 'hybrid'])
    .withMessage('Location type must be one of: on-site, remote, hybrid'),
  body('salary.min')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum salary must be a positive number'),
  body('salary.max')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum salary must be a positive number'),
  body('salary.currency')
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code (e.g., USD)'),
  body('requirements.experienceLevel')
    .isIn(['entry', 'junior', 'mid', 'senior', 'executive'])
    .withMessage('Experience level must be one of: entry, junior, mid, senior, executive'),
  body('requirements.skills')
    .isArray({ min: 1 })
    .withMessage('At least one skill is required'),
  body('requirements.skills.*')
    .isLength({ min: 2, max: 30 })
    .trim()
    .withMessage('Each skill must be between 2 and 30 characters'),
  body('requirements.education')
    .optional()
    .isIn(['high-school', 'associate', 'bachelor', 'master', 'doctorate', 'other'])
    .withMessage('Education must be one of: high-school, associate, bachelor, master, doctorate, other'),
  body('benefits')
    .optional()
    .isArray()
    .withMessage('Benefits must be an array'),
  body('applicationDeadline')
    .optional()
    .isISO8601()
    .withMessage('Application deadline must be a valid date'),
  body('createdBy')
    .isMongoId()
    .withMessage('Valid creator ID is required'),
  handleValidationErrors
];

const validateJobUpdate = [
  body('title')
    .optional()
    .isLength({ min: 5, max: 100 })
    .trim()
    .withMessage('Job title must be between 5 and 100 characters'),
  body('description')
    .optional()
    .isLength({ min: 50, max: 5000 })
    .trim()
    .withMessage('Job description must be between 50 and 5000 characters'),
  body('jobType')
    .optional()
    .isIn(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'temporary'])
    .withMessage('Job type must be one of: full-time, part-time, contract, freelance, internship, temporary'),
  body('location.city')
    .optional()
    .isLength({ min: 2, max: 50 })
    .trim()
    .withMessage('City must be between 2 and 50 characters'),
  body('location.state')
    .optional()
    .isLength({ min: 2, max: 50 })
    .trim()
    .withMessage('State must be between 2 and 50 characters'),
  body('location.country')
    .optional()
    .isLength({ min: 2, max: 50 })
    .trim()
    .withMessage('Country must be between 2 and 50 characters'),
  body('location.type')
    .optional()
    .isIn(['on-site', 'remote', 'hybrid'])
    .withMessage('Location type must be one of: on-site, remote, hybrid'),
  body('salary.min')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum salary must be a positive number'),
  body('salary.max')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Maximum salary must be a positive number'),
  body('salary.currency')
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be a 3-letter code (e.g., USD)'),
  body('requirements.experienceLevel')
    .optional()
    .isIn(['entry', 'junior', 'mid', 'senior', 'executive'])
    .withMessage('Experience level must be one of: entry, junior, mid, senior, executive'),
  body('requirements.skills')
    .optional()
    .isArray({ min: 1 })
    .withMessage('At least one skill is required'),
  body('requirements.skills.*')
    .optional()
    .isLength({ min: 2, max: 30 })
    .trim()
    .withMessage('Each skill must be between 2 and 30 characters'),
  body('requirements.education')
    .optional()
    .isIn(['high-school', 'associate', 'bachelor', 'master', 'doctorate', 'other'])
    .withMessage('Education must be one of: high-school, associate, bachelor, master, doctorate, other'),
  body('benefits')
    .optional()
    .isArray()
    .withMessage('Benefits must be an array'),
  body('applicationDeadline')
    .optional()
    .isISO8601()
    .withMessage('Application deadline must be a valid date'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'closed'])
    .withMessage('Status must be one of: draft, published, closed'),
  handleValidationErrors
];

// Company validation rules
const validateCreateCompany = [
  body('name')
    .isLength({ min: 2, max: 100 })
    .trim()
    .withMessage('Company name must be between 2 and 100 characters'),
  body('description')
    .isLength({ min: 50, max: 2000 })
    .withMessage('Company description must be between 50 and 2000 characters'),
  body('industry')
    .isIn(['technology', 'healthcare', 'finance', 'education', 'retail', 'manufacturing', 'consulting', 'media', 'transportation', 'energy', 'real-estate', 'hospitality', 'agriculture', 'government', 'non-profit', 'other'])
    .withMessage('Invalid industry'),
  body('size')
    .isIn(['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'])
    .withMessage('Invalid company size'),
  body('headquarters.city')
    .notEmpty()
    .withMessage('Headquarters city is required'),
  body('headquarters.country')
    .notEmpty()
    .withMessage('Headquarters country is required'),
  handleValidationErrors
];

// Application validation rules
const validateApplication = [
  body('jobId')
    .isMongoId()
    .withMessage('Valid job ID is required'),
  body('coverLetter')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Cover letter cannot be more than 2000 characters'),
  handleValidationErrors
];

// Review validation rules
const validateCompanyReview = [
  body('title')
    .isLength({ min: 5, max: 100 })
    .trim()
    .withMessage('Review title must be between 5 and 100 characters'),
  body('content')
    .isLength({ min: 50, max: 2000 })
    .withMessage('Review content must be between 50 and 2000 characters'),
  body('ratings.overall')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Overall rating must be between 1 and 5'),
  body('ratings.workLifeBalance')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Work-life balance rating must be between 1 and 5'),
  body('ratings.compensation')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Compensation rating must be between 1 and 5'),
  body('ratings.culture')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Culture rating must be between 1 and 5'),
  body('ratings.careerGrowth')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Career growth rating must be between 1 and 5'),
  body('ratings.management')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Management rating must be between 1 and 5'),
  body('employmentStatus')
    .isIn(['current-employee', 'former-employee', 'intern', 'contractor'])
    .withMessage('Invalid employment status'),
  body('jobTitle')
    .isLength({ min: 2, max: 100 })
    .trim()
    .withMessage('Job title must be between 2 and 100 characters'),
  body('wouldRecommend')
    .isBoolean()
    .withMessage('Would recommend must be true or false'),
  body('ceoApproval')
    .isIn(['approve', 'disapprove', 'neutral'])
    .withMessage('Invalid CEO approval value'),
  body('businessOutlook')
    .isIn(['positive', 'negative', 'neutral'])
    .withMessage('Invalid business outlook value'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateJob,
  validateJobUpdate,
  validateCreateCompany,
  validateApplication,
  validateCompanyReview,
  handleValidationErrors
};
