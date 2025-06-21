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
  MagnifyingGlassIcon,
  StarIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  EyeIcon,
  FireIcon,
  SparklesIcon,
  TagIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HomeIcon,
  AcademicCapIcon,
  TrophyIcon,
  HeartIcon
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
      // Use dummy data instead of API call
      const data = {
        applicationStats: {
          totalApplications: 24,
          pending: 8,
          reviewed: 12,
          interviewScheduled: 3,
          rejected: 1
        },
        jobStats: {
          totalJobs: '125K+',
          newJobsThisWeek: 2847,
          matchingJobs: 156
        },
        userProfile: {
          completionPercentage: 75,
          profileViews: 89,
          lastLogin: new Date().toISOString()
        },
        recentApplications: [
          {
            id: 1,
            job: { title: 'Senior Frontend Developer', company: 'TechCorp Inc.' },
            company: { name: 'TechCorp Inc.', logo: null },
            status: 'interview_scheduled',
            appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'San Francisco, CA',
            salary: { min: 120000, max: 160000 }
          },
          {
            id: 2,
            job: { title: 'React Developer', company: 'StartupXYZ' },
            company: { name: 'StartupXYZ', logo: null },
            status: 'reviewed',
            appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Remote',
            salary: { min: 90000, max: 130000 }
          },
          {
            id: 3,
            job: { title: 'Full Stack Developer', company: 'InnovateLabs' },
            company: { name: 'InnovateLabs', logo: null },
            status: 'pending',
            appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Austin, TX',
            salary: { min: 100000, max: 140000 }
          }
        ],
        recommendedJobs: [
          {
            id: 1,
            title: 'Senior React Developer',
            company: { name: 'Google', logo: '🔵' },
            location: { city: 'Mountain View', state: 'CA', remote: false },
            salary: { min: 150000, max: 200000, currency: 'USD', period: 'yearly' },
            type: 'Full-time',
            experience: 'Senior',
            skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
            postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            applications: 234,
            description: 'Join our team to build next-generation web applications using cutting-edge technologies.',
            benefits: ['Health Insurance', '401k', 'Remote Work', 'Stock Options'],
            rating: 4.8,
            urgent: false,
            featured: true
          },
          {
            id: 2,
            title: 'Frontend Engineer',
            company: { name: 'Apple', logo: '🍎' },
            location: { city: 'Cupertino', state: 'CA', remote: true },
            salary: { min: 140000, max: 180000, currency: 'USD', period: 'yearly' },
            type: 'Full-time',
            experience: 'Mid-level',
            skills: ['JavaScript', 'Vue.js', 'CSS3', 'WebKit'],
            postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            applications: 189,
            description: 'Create beautiful and intuitive user interfaces for millions of users worldwide.',
            benefits: ['Health Insurance', 'Stock Purchase Plan', 'Flexible Hours'],
            rating: 4.9,
            urgent: true,
            featured: true
          },
          {
            id: 3,
            title: 'Full Stack Developer',
            company: { name: 'Microsoft', logo: '🔷' },
            location: { city: 'Seattle', state: 'WA', remote: true },
            salary: { min: 130000, max: 170000, currency: 'USD', period: 'yearly' },
            type: 'Full-time',
            experience: 'Mid-level',
            skills: ['C#', 'React', 'Azure', 'SQL Server'],
            postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            applications: 156,
            description: 'Build scalable cloud solutions and modern web applications.',
            benefits: ['Health Insurance', 'Azure Credits', 'Learning Budget'],
            rating: 4.7,
            urgent: false,
            featured: false
          },
          {
            id: 4,
            title: 'JavaScript Developer',
            company: { name: 'Netflix', logo: '🎬' },
            location: { city: 'Los Gatos', state: 'CA', remote: true },
            salary: { min: 125000, max: 165000, currency: 'USD', period: 'yearly' },
            type: 'Full-time',
            experience: 'Mid-level',
            skills: ['JavaScript', 'React', 'Node.js', 'AWS'],
            postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            applications: 298,
            description: 'Help us deliver entertainment to 200+ million subscribers worldwide.',
            benefits: ['Unlimited PTO', 'Stock Options', 'Content Stipend'],
            rating: 4.6,
            urgent: false,
            featured: true
          },
          {
            id: 5,
            title: 'React Native Developer',
            company: { name: 'Spotify', logo: '🎵' },
            location: { city: 'New York', state: 'NY', remote: true },
            salary: { min: 120000, max: 160000, currency: 'USD', period: 'yearly' },
            type: 'Full-time',
            experience: 'Mid-level',
            skills: ['React Native', 'iOS', 'Android', 'TypeScript'],
            postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            applications: 167,
            description: 'Build mobile experiences that connect millions of music lovers.',
            benefits: ['Music Stipend', 'Flexible Work', 'Wellness Programs'],
            rating: 4.5,
            urgent: true,
            featured: false
          },
          {
            id: 6,
            title: 'Vue.js Developer',
            company: { name: 'Shopify', logo: '🛍️' },
            location: { city: 'Ottawa', state: 'ON', remote: true },
            salary: { min: 110000, max: 150000, currency: 'CAD', period: 'yearly' },
            type: 'Full-time',
            experience: 'Junior',
            skills: ['Vue.js', 'Nuxt.js', 'GraphQL', 'Shopify APIs'],
            postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            applications: 134,
            description: 'Help merchants build their online presence and grow their businesses.',
            benefits: ['Stock Options', 'Learning Budget', 'Remote Work'],
            rating: 4.4,
            urgent: false,
            featured: false
          },
          {
            id: 7,
            title: 'Angular Developer',
            company: { name: 'Adobe', logo: '🎨' },
            location: { city: 'San Jose', state: 'CA', remote: false },
            salary: { min: 135000, max: 175000, currency: 'USD', period: 'yearly' },
            type: 'Full-time',
            experience: 'Senior',
            skills: ['Angular', 'TypeScript', 'RxJS', 'Adobe Creative Cloud APIs'],
            postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            applications: 89,
            description: 'Create tools that empower creativity for millions of users worldwide.',
            benefits: ['Creative Cloud Access', 'Stock Purchase Plan', 'Wellness Programs'],
            rating: 4.3,
            urgent: false,
            featured: true
          },
          {
            id: 8,
            title: 'Python Full Stack Developer',
            company: { name: 'Dropbox', logo: '📦' },
            location: { city: 'San Francisco', state: 'CA', remote: true },
            salary: { min: 140000, max: 180000, currency: 'USD', period: 'yearly' },
            type: 'Full-time',
            experience: 'Senior',
            skills: ['Python', 'Django', 'React', 'PostgreSQL'],
            postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            applications: 203,
            description: 'Build file storage and collaboration tools used by millions.',
            benefits: ['Unlimited PTO', 'Stock Options', 'Home Office Setup'],
            rating: 4.2,
            urgent: true,
            featured: false
          }
        ]
      };
      
      setDashboardData(data);
      
      if (data.userProfile) {
        const suggestions = [
          {
            title: 'Add Skills',
            description: 'List your technical skills',
            action: 'Add Skills'
          },
          {
            title: 'Upload Resume',
            description: 'Upload your latest resume',
            action: 'Upload'
          },
          {
            title: 'Add Experience',
            description: 'Detail your work history',
            action: 'Add Experience'
          },
          {
            title: 'Set Preferences',
            description: 'Define your job preferences',
            action: 'Set Preferences'
          }
        ];
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Loading your dashboard...</h3>
          <p className="mt-2 text-sm text-gray-500">Gathering your latest job matches and applications</p>
        </div>
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
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <DocumentTextIcon className="w-6 h-6 mr-2 text-blue-600" />
                    Recent Applications
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Track the status of your job applications
                  </p>
                </div>
                <Link
                  to="/applications"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All
                  <ArrowTrendingUpIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              {Array.isArray(recentApplications) && recentApplications.length > 0 ? (
                <div className="space-y-4">
                  {recentApplications.slice(0, 5).map((application, index) => (
                    <div key={index} className="group relative p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                              <BriefcaseIcon className="w-7 h-7 text-white" />
                            </div>
                            {/* Status indicator dot */}
                            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              application.status === 'interview_scheduled' ? 'bg-purple-500' :
                              application.status === 'reviewed' ? 'bg-blue-500' :
                              application.status === 'pending' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`}></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {application.job?.title || 'Job Title'}
                              </h4>
                              {application.status === 'interview_scheduled' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  <CalendarDaysIcon className="w-3 h-3 mr-1" />
                                  Interview Soon
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 mt-1">
                              <p className="text-sm font-medium text-gray-700 flex items-center">
                                <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                                {application.company?.name || 'Company Name'}
                              </p>
                              <p className="text-sm text-gray-500 flex items-center">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                {application.location || 'Location'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <p className="text-sm text-gray-500 flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1" />
                                Applied {new Date(application.appliedAt || application.createdAt).toLocaleDateString()}
                              </p>
                              {application.salary && (
                                <p className="text-sm font-medium text-green-600 flex items-center">
                                  <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                                  ${application.salary.min.toLocaleString()} - ${application.salary.max.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                            application.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                            application.status === 'reviewed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                            application.status === 'interview_scheduled' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                            application.status === 'offer_made' ? 'bg-green-100 text-green-800 border border-green-200' :
                            application.status === 'hired' ? 'bg-green-200 text-green-900 border border-green-300' :
                            'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                            {application.status === 'interview_scheduled' && <CalendarDaysIcon className="w-3 h-3 mr-1" />}
                            {application.status === 'reviewed' && <EyeIcon className="w-3 h-3 mr-1" />}
                            {application.status === 'pending' && <ClockIcon className="w-3 h-3 mr-1" />}
                            {application.status === 'hired' && <CheckCircleIcon className="w-3 h-3 mr-1" />}
                            {application.status?.replace('_', ' ') || 'Pending'}
                          </span>
                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                              <DocumentTextIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DocumentTextIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-500 mb-6">Start applying to jobs to see your applications here.</p>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
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
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <SparklesIcon className="w-6 h-6 mr-2 text-blue-600" />
                    Recommended Jobs
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Curated opportunities based on your profile and preferences
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <EyeIcon className="w-4 h-4 mr-1" />
                    <span>156 matches</span>
                  </div>
                  <Link
                    to="/jobs"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View All Jobs
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedJobs.slice(0, 6).map((job, index) => (
                  <div
                    key={index}
                    className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-bottom duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Job Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {job.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                            <StarIcon className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                        {job.urgent && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border border-red-200">
                            <FireIcon className="w-3 h-3 mr-1" />
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">
                          {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Company Logo & Name */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
                        {job.company.logo || job.company.name.charAt(0)}
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {job.company.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{job.rating}</span>
                          <span className="text-xs text-gray-400 ml-2">
                            {job.applications} applicants
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h4>

                    {/* Job Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Location & Remote */}
                    <div className="flex items-center mb-3">
                      <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {job.location.city}, {job.location.state}
                      </span>
                      {job.location.remote && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <GlobeAltIcon className="w-3 h-3 mr-1" />
                          Remote
                        </span>
                      )}
                    </div>

                    {/* Salary */}
                    <div className="flex items-center mb-4">
                      <CurrencyDollarIcon className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm font-semibold text-gray-900">
                        ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        /{job.salary.period}
                      </span>
                    </div>

                    {/* Job Type & Experience */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <AcademicCapIcon className="w-3 h-3 mr-1" />
                        {job.experience}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            <TagIcon className="w-3 h-3 mr-1" />
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-200 text-gray-600">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Benefits Preview */}
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <TrophyIcon className="w-4 h-4 text-orange-500 mr-1" />
                        <span className="text-xs font-medium text-gray-700">Benefits</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {job.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                          <span
                            key={benefitIndex}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-green-50 text-green-700 border border-green-200"
                          >
                            <CheckCircleIcon className="w-3 h-3 mr-1" />
                            {benefit}
                          </span>
                        ))}
                        {job.benefits.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{job.benefits.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="flex-1 bg-blue-600 text-white text-center py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                      <button className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Save Job">
                        <HeartIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Share Job">
                        <ArrowTrendingUpIcon className="w-4 h-4 rotate-45" />
                      </button>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-8">
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                  View All {recommendedJobs.length}+ Recommended Jobs
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
          
  );
};

export default Dashboard;
