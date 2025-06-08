const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [5000, 'Job description cannot be more than 5000 characters']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required']
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Employer is required']
  },
  location: {
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: String,
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    zipCode: String,
    remote: {
      type: Boolean,
      default: false
    },
    hybrid: {
      type: Boolean,
      default: false
    }
  },
  jobType: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship', 'temporary']
  },
  category: {
    type: String,
    required: [true, 'Job category is required'],
    enum: [
      'technology',
      'healthcare',
      'finance',
      'marketing',
      'sales',
      'education',
      'engineering',
      'design',
      'customer-service',
      'human-resources',
      'operations',
      'legal',
      'consulting',
      'manufacturing',
      'retail',
      'other'
    ]
  },
  industry: {
    type: String,
    required: [true, 'Industry is required']
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['entry-level', 'mid-level', 'senior-level', 'executive', 'internship']
  },
  salary: {
    min: {
      type: Number,
      min: [0, 'Minimum salary cannot be negative']
    },
    max: {
      type: Number,
      min: [0, 'Maximum salary cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hourly', 'weekly', 'monthly', 'yearly'],
      default: 'yearly'
    },
    negotiable: {
      type: Boolean,
      default: false
    }
  },
  requirements: {
    skills: [{
      type: String,
      required: true
    }],
    education: {
      level: {
        type: String,
        enum: ['high-school', 'associate', 'bachelor', 'master', 'doctorate', 'certification', 'none']
      },
      field: String
    },
    experience: {
      years: {
        type: Number,
        min: [0, 'Experience years cannot be negative']
      },
      description: String
    },
    languages: [{
      language: String,
      proficiency: {
        type: String,
        enum: ['basic', 'intermediate', 'advanced', 'native']
      }
    }],
    certifications: [String],
    other: [String]
  },
  benefits: [{
    type: String,
    enum: [
      'health-insurance',
      'dental-insurance',
      'vision-insurance',
      'retirement-plan',
      'paid-time-off',
      'flexible-schedule',
      'remote-work',
      'professional-development',
      'tuition-reimbursement',
      'gym-membership',
      'commuter-benefits',
      'life-insurance',
      'disability-insurance',
      'employee-discounts',
      'stock-options',
      'bonus-eligible',
      'other'
    ]
  }],
  applicationDeadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > new Date();
      },
      message: 'Application deadline must be in the future'
    }
  },
  applicationInstructions: {
    type: String,
    maxlength: [1000, 'Application instructions cannot be more than 1000 characters']
  },
  applicationUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL'
    }
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'closed', 'expired'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  urgent: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [String],
  schedulingInfo: {
    startDate: Date,
    workingHours: {
      start: String,
      end: String
    },
    daysOfWeek: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }]
  },
  contactInfo: {
    email: String,
    phone: String,
    contactPerson: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for application count
jobSchema.virtual('applicationCount').get(function() {
  return this.applications ? this.applications.length : 0;
});

// Virtual for saved count
jobSchema.virtual('savedCount').get(function() {
  return this.savedBy ? this.savedBy.length : 0;
});

// Virtual for days since posted
jobSchema.virtual('daysSincePosted').get(function() {
  const now = new Date();
  const posted = this.createdAt;
  const diffTime = Math.abs(now - posted);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Pre-save middleware to set application deadline if not provided
jobSchema.pre('save', function(next) {
  if (!this.applicationDeadline && this.isNew) {
    // Set default deadline to 30 days from now
    this.applicationDeadline = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }
  next();
});

// Method to check if job is expired
jobSchema.methods.isExpired = function() {
  return this.applicationDeadline && this.applicationDeadline < new Date();
};

// Method to check if job is still accepting applications
jobSchema.methods.isAcceptingApplications = function() {
  return this.status === 'active' && !this.isExpired();
};

// Static method to find jobs by location
jobSchema.statics.findByLocation = function(city, state, country) {
  return this.find({
    'location.city': new RegExp(city, 'i'),
    'location.state': new RegExp(state, 'i'),
    'location.country': new RegExp(country, 'i')
  });
};

// Static method to find remote jobs
jobSchema.statics.findRemoteJobs = function() {
  return this.find({ 'location.remote': true });
};

// Index for better performance
jobSchema.index({ title: 'text', description: 'text', 'requirements.skills': 'text' });
jobSchema.index({ 'location.city': 1, 'location.state': 1, 'location.country': 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ industry: 1 });
jobSchema.index({ experienceLevel: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ featured: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ company: 1 });
jobSchema.index({ employer: 1 });
jobSchema.index({ 'salary.min': 1, 'salary.max': 1 });

module.exports = mongoose.model('Job', jobSchema);
