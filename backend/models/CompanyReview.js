const mongoose = require('mongoose');

const companyReviewSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required']
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reviewer is required']
  },
  title: {
    type: String,
    required: [true, 'Review title is required'],
    trim: true,
    maxlength: [100, 'Review title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Review content is required'],
    maxlength: [2000, 'Review content cannot be more than 2000 characters']
  },
  ratings: {
    overall: {
      type: Number,
      required: [true, 'Overall rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    workLifeBalance: {
      type: Number,
      required: [true, 'Work-life balance rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    compensation: {
      type: Number,
      required: [true, 'Compensation rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    culture: {
      type: Number,
      required: [true, 'Culture rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    careerGrowth: {
      type: Number,
      required: [true, 'Career growth rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    management: {
      type: Number,
      required: [true, 'Management rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    }
  },
  pros: {
    type: String,
    maxlength: [1000, 'Pros cannot be more than 1000 characters']
  },
  cons: {
    type: String,
    maxlength: [1000, 'Cons cannot be more than 1000 characters']
  },
  advice: {
    type: String,
    maxlength: [1000, 'Advice cannot be more than 1000 characters']
  },
  employmentStatus: {
    type: String,
    required: [true, 'Employment status is required'],
    enum: ['current-employee', 'former-employee', 'intern', 'contractor']
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters']
  },
  department: {
    type: String,
    trim: true,
    maxlength: [100, 'Department cannot be more than 100 characters']
  },
  workLocation: {
    type: String,
    enum: ['on-site', 'remote', 'hybrid'],
    required: [true, 'Work location is required']
  },
  employmentDuration: {
    years: {
      type: Number,
      min: [0, 'Years cannot be negative'],
      max: [50, 'Years cannot be more than 50']
    },
    months: {
      type: Number,
      min: [0, 'Months cannot be negative'],
      max: [11, 'Months cannot be more than 11']
    }
  },
  salary: {
    amount: {
      type: Number,
      min: [0, 'Salary cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    period: {
      type: String,
      enum: ['hourly', 'monthly', 'yearly'],
      default: 'yearly'
    }
  },
  wouldRecommend: {
    type: Boolean,
    required: [true, 'Recommendation is required']
  },
  ceoApproval: {
    type: String,
    enum: ['approve', 'disapprove', 'neutral'],
    required: [true, 'CEO approval is required']
  },
  businessOutlook: {
    type: String,
    enum: ['positive', 'negative', 'neutral'],
    required: [true, 'Business outlook is required']
  },
  helpfulVotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    helpful: {
      type: Boolean,
      required: true
    }
  }],
  flagged: {
    type: Boolean,
    default: false
  },
  flagReasons: [{
    reason: {
      type: String,
      enum: ['inappropriate', 'spam', 'fake', 'offensive', 'other']
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reportedAt: {
      type: Date,
      default: Date.now
    }
  }],
  verified: {
    type: Boolean,
    default: false
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'hidden'],
    default: 'pending'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for helpful count
companyReviewSchema.virtual('helpfulCount').get(function() {
  return this.helpfulVotes ? this.helpfulVotes.filter(vote => vote.helpful).length : 0;
});

// Virtual for not helpful count
companyReviewSchema.virtual('notHelpfulCount').get(function() {
  return this.helpfulVotes ? this.helpfulVotes.filter(vote => !vote.helpful).length : 0;
});

// Virtual for total employment time in months
companyReviewSchema.virtual('totalEmploymentMonths').get(function() {
  const years = this.employmentDuration.years || 0;
  const months = this.employmentDuration.months || 0;
  return (years * 12) + months;
});

// Method to add helpful vote
companyReviewSchema.methods.addHelpfulVote = function(userId, isHelpful) {
  // Remove existing vote from this user if any
  this.helpfulVotes = this.helpfulVotes.filter(vote => vote.user.toString() !== userId.toString());
  
  // Add new vote
  this.helpfulVotes.push({
    user: userId,
    helpful: isHelpful
  });
  
  return this.save();
};

// Method to flag review
companyReviewSchema.methods.flagReview = function(reason, reportedBy) {
  this.flagged = true;
  this.flagReasons.push({
    reason,
    reportedBy
  });
  
  return this.save();
};

// Static method to get average ratings for a company
companyReviewSchema.statics.getCompanyAverageRatings = async function(companyId) {
  const result = await this.aggregate([
    {
      $match: {
        company: companyId,
        status: 'approved'
      }
    },
    {
      $group: {
        _id: null,
        avgOverall: { $avg: '$ratings.overall' },
        avgWorkLifeBalance: { $avg: '$ratings.workLifeBalance' },
        avgCompensation: { $avg: '$ratings.compensation' },
        avgCulture: { $avg: '$ratings.culture' },
        avgCareerGrowth: { $avg: '$ratings.careerGrowth' },
        avgManagement: { $avg: '$ratings.management' },
        totalReviews: { $sum: 1 },
        recommendCount: {
          $sum: { $cond: ['$wouldRecommend', 1, 0] }
        }
      }
    }
  ]);

  return result.length > 0 ? result[0] : null;
};

// Static method to get reviews by company
companyReviewSchema.statics.findByCompany = function(companyId, status = 'approved') {
  return this.find({ company: companyId, status }).populate('reviewer', 'firstName lastName');
};

// Pre-save middleware to ensure one review per user per company
companyReviewSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingReview = await this.constructor.findOne({
      company: this.company,
      reviewer: this.reviewer
    });
    
    if (existingReview) {
      const error = new Error('User has already reviewed this company');
      error.statusCode = 400;
      return next(error);
    }
  }
  next();
});

// Index for better performance
companyReviewSchema.index({ company: 1, reviewer: 1 }, { unique: true });
companyReviewSchema.index({ company: 1 });
companyReviewSchema.index({ reviewer: 1 });
companyReviewSchema.index({ status: 1 });
companyReviewSchema.index({ createdAt: -1 });
companyReviewSchema.index({ 'ratings.overall': -1 });

module.exports = mongoose.model('CompanyReview', companyReviewSchema);
