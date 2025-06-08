const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job is required']
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Applicant is required']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company is required']
  },
  status: {
    type: String,
    enum: [
      'pending',
      'reviewing',
      'shortlisted',
      'interview-scheduled',
      'interviewed',
      'second-round',
      'final-round',
      'offer-made',
      'offer-accepted',
      'offer-declined',
      'hired',
      'rejected',
      'withdrawn'
    ],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    maxlength: [2000, 'Cover letter cannot be more than 2000 characters']
  },
  resume: {
    type: String,
    required: [true, 'Resume is required']
  },
  additionalDocuments: [{
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  answers: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  experience: {
    yearsOfExperience: Number,
    relevantExperience: String,
    previousRoles: [String]
  },
  availability: {
    startDate: Date,
    noticePeriod: {
      type: String,
      enum: ['immediate', '2-weeks', '1-month', '2-months', '3-months', 'negotiable']
    },
    workingHours: {
      type: String,
      enum: ['full-time', 'part-time', 'flexible', 'shift-work']
    }
  },
  salaryExpectation: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    negotiable: {
      type: Boolean,
      default: true
    }
  },
  interviews: [{
    type: {
      type: String,
      enum: ['phone', 'video', 'in-person', 'technical', 'behavioral', 'panel']
    },
    scheduledDate: Date,
    duration: Number, // in minutes
    interviewer: {
      name: String,
      email: String,
      role: String
    },
    location: String,
    meetingLink: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled', 'no-show'],
      default: 'scheduled'
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      notes: String,
      strengths: [String],
      weaknesses: [String],
      recommendation: {
        type: String,
        enum: ['strongly-recommend', 'recommend', 'neutral', 'not-recommend', 'strongly-not-recommend']
      }
    },
    notes: String
  }],
  timeline: [{
    action: {
      type: String,
      enum: [
        'application-submitted',
        'application-viewed',
        'status-updated',
        'interview-scheduled',
        'interview-completed',
        'feedback-provided',
        'offer-made',
        'offer-responded',
        'hired',
        'rejected',
        'withdrawn'
      ]
    },
    date: {
      type: Date,
      default: Date.now
    },
    note: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  recruiterNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    private: {
      type: Boolean,
      default: true
    }
  }],
  rating: {
    overall: {
      type: Number,
      min: 1,
      max: 5
    },
    technical: {
      type: Number,
      min: 1,
      max: 5
    },
    communication: {
      type: Number,
      min: 1,
      max: 5
    },
    cultural: {
      type: Number,
      min: 1,
      max: 5
    },
    experience: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  offer: {
    salary: {
      amount: Number,
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
    benefits: [String],
    startDate: Date,
    location: String,
    remote: Boolean,
    equity: String,
    bonus: String,
    offerLetter: String,
    expiryDate: Date,
    negotiable: {
      type: Boolean,
      default: true
    }
  },
  feedback: {
    fromApplicant: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comments: String,
      wouldRecommend: Boolean
    },
    fromEmployer: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comments: String,
      wouldRehire: Boolean
    }
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'job-board', 'social-media', 'recruiter', 'other'],
    default: 'website'
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for days since application
applicationSchema.virtual('daysSinceApplication').get(function() {
  const now = new Date();
  const applied = this.createdAt;
  const diffTime = Math.abs(now - applied);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for interview count
applicationSchema.virtual('interviewCount').get(function() {
  return this.interviews ? this.interviews.length : 0;
});

// Virtual for completed interviews
applicationSchema.virtual('completedInterviews').get(function() {
  return this.interviews ? this.interviews.filter(interview => interview.status === 'completed') : [];
});

// Pre-save middleware to add timeline entry
applicationSchema.pre('save', function(next) {
  if (this.isNew) {
    this.timeline.push({
      action: 'application-submitted',
      date: new Date()
    });
  } else if (this.isModified('status')) {
    this.timeline.push({
      action: 'status-updated',
      date: new Date(),
      note: `Status changed to ${this.status}`
    });
  }
  next();
});

// Method to add timeline entry
applicationSchema.methods.addTimelineEntry = function(action, note, performedBy) {
  this.timeline.push({
    action,
    date: new Date(),
    note,
    performedBy
  });
  return this.save();
};

// Method to schedule interview
applicationSchema.methods.scheduleInterview = function(interviewData) {
  this.interviews.push(interviewData);
  this.status = 'interview-scheduled';
  this.addTimelineEntry('interview-scheduled', `Interview scheduled for ${interviewData.scheduledDate}`);
  return this.save();
};

// Method to complete interview
applicationSchema.methods.completeInterview = function(interviewId, feedback) {
  const interview = this.interviews.id(interviewId);
  if (interview) {
    interview.status = 'completed';
    interview.feedback = feedback;
    this.addTimelineEntry('interview-completed', 'Interview completed');
  }
  return this.save();
};

// Method to update status
applicationSchema.methods.updateStatus = function(newStatus, note, performedBy) {
  this.status = newStatus;
  this.addTimelineEntry('status-updated', note || `Status changed to ${newStatus}`, performedBy);
  return this.save();
};

// Method to withdraw application
applicationSchema.methods.withdraw = function(reason) {
  this.status = 'withdrawn';
  this.isActive = false;
  this.addTimelineEntry('withdrawn', reason || 'Application withdrawn by applicant');
  return this.save();
};

// Static method to get applications by status
applicationSchema.statics.findByStatus = function(status) {
  return this.find({ status, isActive: true });
};

// Static method to get applications for a job
applicationSchema.statics.findByJob = function(jobId) {
  return this.find({ job: jobId, isActive: true });
};

// Static method to get applications by applicant
applicationSchema.statics.findByApplicant = function(applicantId) {
  return this.find({ applicant: applicantId, isActive: true });
};

// Index for better performance
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true }); // Prevent duplicate applications
applicationSchema.index({ job: 1 });
applicationSchema.index({ applicant: 1 });
applicationSchema.index({ company: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ isActive: 1 });

module.exports = mongoose.model('Application', applicationSchema);
