const CompanyReview = require('../models/CompanyReview');
const Company = require('../models/Company');
const User = require('../models/User');
const { buildPaginationOptions, buildSortOptions } = require('../utils/helpers');

class CompanyReviewService {
  // Create a new company review
  async createReview(reviewData, userId) {
    try {
      const { companyId } = reviewData;

      // Check if company exists
      const company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Company not found');
      }

      // Check if user already reviewed this company
      const existingReview = await CompanyReview.findOne({
        company: companyId,
        reviewer: userId
      });

      if (existingReview) {
        throw new Error('You have already reviewed this company');
      }

      // Calculate overall rating
      const ratings = reviewData.ratings;
      const overallRating = (
        ratings.workLifeBalance +
        ratings.compensation +
        ratings.careerGrowth +
        ratings.management +
        ratings.culture
      ) / 5;

      const review = new CompanyReview({
        ...reviewData,
        company: companyId,
        reviewer: userId,
        overallRating: Math.round(overallRating * 10) / 10 // Round to 1 decimal
      });

      await review.save();

      // Update company rating
      await this.updateCompanyRating(companyId);

      await review.populate('reviewer', 'firstName lastName profile.avatar');

      return review;
    } catch (error) {
      throw new Error(`Failed to create review: ${error.message}`);
    }
  }

  // Get reviews for a company
  async getCompanyReviews(companyId, query = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        rating,
        helpful = false
      } = query;

      const searchQuery = { company: companyId };
      
      // Filter by rating
      if (rating) {
        const ratingNum = parseInt(rating);
        searchQuery.overallRating = { $gte: ratingNum, $lt: ratingNum + 1 };
      }

      const paginationOptions = buildPaginationOptions(page, limit);
      let sortOptions = buildSortOptions(sortBy, sortOrder);

      // Sort by helpfulness if requested
      if (helpful === 'true') {
        sortOptions = { helpfulCount: -1, createdAt: -1 };
      }

      const reviews = await CompanyReview.find(searchQuery)
        .populate('reviewer', 'firstName lastName profile.avatar')
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const totalReviews = await CompanyReview.countDocuments(searchQuery);

      // Get rating distribution
      const ratingDistribution = await CompanyReview.aggregate([
        { $match: { company: company._id } },
        {
          $group: {
            _id: { $floor: '$overallRating' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: -1 } }
      ]);

      return {
        reviews,
        ratingDistribution,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalReviews / limit),
          totalReviews,
          hasNext: parseInt(page) < Math.ceil(totalReviews / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch company reviews: ${error.message}`);
    }
  }

  // Get a single review by ID
  async getReviewById(reviewId) {
    try {
      const review = await CompanyReview.findById(reviewId)
        .populate('reviewer', 'firstName lastName profile.avatar')
        .populate('company', 'name logo');

      if (!review) {
        throw new Error('Review not found');
      }

      return review;
    } catch (error) {
      throw new Error(`Failed to fetch review: ${error.message}`);
    }
  }

  // Update a review
  async updateReview(reviewId, updateData, userId) {
    try {
      const review = await CompanyReview.findById(reviewId);
      
      if (!review) {
        throw new Error('Review not found');
      }

      // Check if user owns the review
      if (review.reviewer.toString() !== userId) {
        throw new Error('Unauthorized to update this review');
      }

      // Recalculate overall rating if ratings are updated
      if (updateData.ratings) {
        const ratings = { ...review.ratings, ...updateData.ratings };
        updateData.overallRating = (
          ratings.workLifeBalance +
          ratings.compensation +
          ratings.careerGrowth +
          ratings.management +
          ratings.culture
        ) / 5;
        updateData.overallRating = Math.round(updateData.overallRating * 10) / 10;
      }

      const updatedReview = await CompanyReview.findByIdAndUpdate(
        reviewId,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).populate('reviewer', 'firstName lastName profile.avatar');

      // Update company rating
      await this.updateCompanyRating(review.company);

      return updatedReview;
    } catch (error) {
      throw new Error(`Failed to update review: ${error.message}`);
    }
  }

  // Delete a review
  async deleteReview(reviewId, userId) {
    try {
      const review = await CompanyReview.findById(reviewId);
      
      if (!review) {
        throw new Error('Review not found');
      }

      // Check if user owns the review
      if (review.reviewer.toString() !== userId) {
        throw new Error('Unauthorized to delete this review');
      }

      const companyId = review.company;
      
      await CompanyReview.findByIdAndDelete(reviewId);

      // Update company rating
      await this.updateCompanyRating(companyId);

      return { message: 'Review deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete review: ${error.message}`);
    }
  }

  // Mark review as helpful/unhelpful
  async toggleReviewHelpful(reviewId, userId) {
    try {
      const review = await CompanyReview.findById(reviewId);
      
      if (!review) {
        throw new Error('Review not found');
      }

      // Check if user already marked this review
      const alreadyMarked = review.helpfulVotes.includes(userId);
      
      if (alreadyMarked) {
        // Remove helpful vote
        review.helpfulVotes = review.helpfulVotes.filter(id => id.toString() !== userId);
        review.helpfulCount = Math.max(0, review.helpfulCount - 1);
      } else {
        // Add helpful vote
        review.helpfulVotes.push(userId);
        review.helpfulCount += 1;
      }

      await review.save();

      return {
        isHelpful: !alreadyMarked,
        helpfulCount: review.helpfulCount
      };
    } catch (error) {
      throw new Error(`Failed to toggle review helpful: ${error.message}`);
    }
  }

  // Get reviews by user
  async getUserReviews(userId, query = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = query;

      const paginationOptions = buildPaginationOptions(page, limit);
      const sortOptions = buildSortOptions(sortBy, sortOrder);

      const reviews = await CompanyReview.find({ reviewer: userId })
        .populate('company', 'name logo location')
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

      const totalReviews = await CompanyReview.countDocuments({ reviewer: userId });

      return {
        reviews,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalReviews / limit),
          totalReviews,
          hasNext: parseInt(page) < Math.ceil(totalReviews / limit),
          hasPrev: parseInt(page) > 1
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch user reviews: ${error.message}`);
    }
  }

  // Update company's overall rating based on reviews
  async updateCompanyRating(companyId) {
    try {
      const ratings = await CompanyReview.aggregate([
        { $match: { company: companyId } },
        {
          $group: {
            _id: null,
            overallRating: { $avg: '$overallRating' },
            workLifeBalance: { $avg: '$ratings.workLifeBalance' },
            compensation: { $avg: '$ratings.compensation' },
            careerGrowth: { $avg: '$ratings.careerGrowth' },
            management: { $avg: '$ratings.management' },
            culture: { $avg: '$ratings.culture' },
            totalReviews: { $sum: 1 }
          }
        }
      ]);

      if (ratings.length > 0) {
        const rating = ratings[0];
        await Company.findByIdAndUpdate(companyId, {
          rating: {
            overall: Math.round(rating.overallRating * 10) / 10,
            workLifeBalance: Math.round(rating.workLifeBalance * 10) / 10,
            compensation: Math.round(rating.compensation * 10) / 10,
            careerGrowth: Math.round(rating.careerGrowth * 10) / 10,
            management: Math.round(rating.management * 10) / 10,
            culture: Math.round(rating.culture * 10) / 10,
            totalReviews: rating.totalReviews
          }
        });
      } else {
        // No reviews, reset ratings
        await Company.findByIdAndUpdate(companyId, {
          rating: {
            overall: 0,
            workLifeBalance: 0,
            compensation: 0,
            careerGrowth: 0,
            management: 0,
            culture: 0,
            totalReviews: 0
          }
        });
      }
    } catch (error) {
      console.error('Failed to update company rating:', error);
    }
  }

  // Get review statistics
  async getReviewStatistics(companyId = null) {
    try {
      const matchQuery = companyId ? { company: companyId } : {};

      const stats = await CompanyReview.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: null,
            totalReviews: { $sum: 1 },
            averageRating: { $avg: '$overallRating' },
            averageWorkLifeBalance: { $avg: '$ratings.workLifeBalance' },
            averageCompensation: { $avg: '$ratings.compensation' },
            averageCareerGrowth: { $avg: '$ratings.careerGrowth' },
            averageManagement: { $avg: '$ratings.management' },
            averageCulture: { $avg: '$ratings.culture' },
            totalHelpfulVotes: { $sum: '$helpfulCount' }
          }
        }
      ]);

      // Get rating distribution
      const ratingDistribution = await CompanyReview.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: { $floor: '$overallRating' },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: -1 } }
      ]);

      return {
        overview: stats[0] || {
          totalReviews: 0,
          averageRating: 0,
          averageWorkLifeBalance: 0,
          averageCompensation: 0,
          averageCareerGrowth: 0,
          averageManagement: 0,
          averageCulture: 0,
          totalHelpfulVotes: 0
        },
        ratingDistribution
      };
    } catch (error) {
      throw new Error(`Failed to get review statistics: ${error.message}`);
    }
  }
}

module.exports = new CompanyReviewService();
