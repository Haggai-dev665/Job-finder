import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import dashboardService from '../services/dashboardService';
import {
  ChartBarIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { olive } = useContext(ThemeContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileSuggestions, setProfileSuggestions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getDashboardOverview();
      setDashboardData(data);
      
      if (data.userProfile) {
        const suggestions = dashboardService.getProfileCompletionSuggestions(data.userProfile);
        setProfileSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const {
    applicationStats = {},
    jobStats = {},
    userProfile = {},
    recentApplications = [],
    recommendedJobs = []
  } = dashboardData || {};

  const statsCards = [
    {
      title: 'Total Applications',
      value: applicationStats.totalApplications || 0,
      icon: DocumentTextIcon,
      color: 'blue',
      trend: '+12%',
      subtitle: 'from last month'
    },
    {
      title: 'Active Jobs',
      value: jobStats.totalJobs || '125K+',
      icon: BriefcaseIcon,
      color: 'green',
      trend: '+8%',
      subtitle: 'new jobs this week'
    },
    {
      title: 'Profile Views',
      value: userProfile.profileViews || 0,
      icon: UsersIcon,
      color: 'purple',
      trend: '+24%',
      subtitle: 'this month'
    },
    {
      title: 'Interview Rate',
      value: `${Math.round(((applicationStats.interviewScheduled || 0) / Math.max(applicationStats.totalApplications || 1, 1)) * 100)}%`,
      icon: ChartBarIcon,
      color: 'orange',
      trend: '+5%',
      subtitle: 'success rate'
    }
  ];

  return (
    <div className={`min-h-screen ${olive ? 'bg-olive-50' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your job search today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Ready to interview</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Completion Banner */}
        {userProfile.completionPercentage < 100 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="w-8 h-8 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Complete Your Profile
                  </h3>
                  <p className="text-gray-600">
                    Your profile is {userProfile.completionPercentage || 60}% complete. 
                    {profileSuggestions.length} steps remaining to boost your visibility.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray={`${userProfile.completionPercentage || 60}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {userProfile.completionPercentage || 60}%
                    </span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Complete Profile
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{stat.trend}</span>
                      <span className="text-sm text-gray-500 ml-1">{stat.subtitle}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                <Link
                  to="/applications"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              {Array.isArray(recentApplications) && recentApplications.length > 0 ? (
                <div className="space-y-4">
                  {recentApplications.slice(0, 5).map((application, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <BriefcaseIcon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">
                            {application.job?.title || 'Job Title'}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {application.company?.name || 'Company Name'}
                          </p>
                          <div className="flex items-center mt-1">
                            <ClockIcon className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              Applied {new Date(application.appliedAt || application.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                          application.status === 'interview_scheduled' ? 'bg-purple-100 text-purple-800' :
                          application.status === 'offer_made' ? 'bg-green-100 text-green-800' :
                          application.status === 'hired' ? 'bg-green-200 text-green-900' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {application.status?.replace('_', ' ') || 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-500 mb-4">Start applying to jobs to see your applications here.</p>
                  <Link
                    to="/jobs"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Profile Suggestions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  to="/jobs"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Search Jobs</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <UsersIcon className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Update Profile</span>
                </Link>
                <Link
                  to="/applications"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <DocumentTextIcon className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">My Applications</span>
                </Link>
                <Link
                  to="/saved-jobs"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BriefcaseIcon className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Saved Jobs</span>
                </Link>
              </div>
            </div>

            {/* Profile Completion Suggestions */}
            {profileSuggestions.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Profile Tips</h2>
                </div>
                <div className="p-6 space-y-3">
                  {profileSuggestions.slice(0, 3).map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <PlusIcon className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{suggestion.title}</p>
                          <p className="text-xs text-gray-500">{suggestion.description}</p>
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {suggestion.action}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Jobs */}
        {Array.isArray(recommendedJobs) && recommendedJobs.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recommended Jobs</h2>
                <Link
                  to="/jobs"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All Jobs
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedJobs.slice(0, 6).map((job, index) => (
                  <Link
                    key={index}
                    to={`/jobs/${job.id || job._id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <BriefcaseIcon className="w-6 h-6 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-500">
                        {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'Recently posted'}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {job.title || 'Job Title'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {job.company?.name || job.company || 'Company Name'}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span>{job.location?.city || job.location || 'Location'}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center text-sm text-green-600">
                        <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                        <span>
                          ${job.salary.min?.toLocaleString() || 'N/A'} - ${job.salary.max?.toLocaleString() || 'N/A'}
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
          
  );
};

export default Dashboard;
