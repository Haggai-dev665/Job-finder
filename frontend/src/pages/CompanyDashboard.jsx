import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  UserCheck,
  Eye,
  Calendar,
  Plus,
  BarChart3,
  Settings,
  Star,
  MapPin,
  Globe,
  Mail,
  Phone,
  Edit
} from 'lucide-react';
import companyDashboardService from '../services/companyDashboardService';
import { useAuth } from '../contexts/AuthContext';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Get company data from localStorage and user
  const getCompanyData = () => {
    const storedCompany = localStorage.getItem('company');
    if (storedCompany) {
      try {
        return JSON.parse(storedCompany);
      } catch (error) {
        console.error('Error parsing company data:', error);
      }
    }
    return null;
  };

  const companyData = getCompanyData();
  const companyId = companyData?._id || user?.companyId || user?.company?._id || user?.company;

  useEffect(() => {
    if (companyId) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [companyId]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await companyDashboardService.getCompanyDashboardOverview(companyId);
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationStatusUpdate = async (applicationId, newStatus) => {
    try {
      await companyDashboardService.updateApplicationStatus(applicationId, newStatus);
      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If no company ID, show company setup
  if (!companyId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-lg font-medium text-gray-900 mb-2">Complete Company Setup</h2>
          <p className="text-sm text-gray-500 mb-6">
            You need to complete your company profile setup to access the dashboard.
          </p>
          <Link
            to="/company-registration"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Complete Setup
          </Link>
        </div>
      </div>
    );
  }

  const {
    company = companyData || {},
    jobStats = {},
    applicationStats = {},
    recentApplications = [],
    topPerformingJobs = [],
    analytics = {}
  } = dashboardData || {};

  const statsCards = [
    {
      title: 'Active Jobs',
      value: jobStats.activeJobs || 0,
      icon: Briefcase,
      color: 'blue',
      change: '+12%',
      subtitle: 'from last month'
    },
    {
      title: 'Total Applications',
      value: applicationStats.totalApplications || 0,
      icon: FileText,
      color: 'green',
      change: '+8%',
      subtitle: 'this month'
    },
    {
      title: 'Pending Review',
      value: applicationStats.pendingApplications || 0,
      icon: Clock,
      color: 'yellow',
      change: '-5%',
      subtitle: 'awaiting action'
    },
    {
      title: 'Hired',
      value: applicationStats.hiredApplications || 0,
      icon: UserCheck,
      color: 'purple',
      change: '+15%',
      subtitle: 'this quarter'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'interview_scheduled': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock;
      case 'reviewed': return Eye;
      case 'interview_scheduled': return Calendar;
      case 'hired': return CheckCircle;
      case 'rejected': return XCircle;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {company.logo ? (
                  <img
                    className="h-8 w-8 rounded-lg"
                    src={company.logo}
                    alt={company.name}
                  />
                ) : (
                  <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {company.name || 'Company Dashboard'}
                </h1>
                <p className="text-sm text-gray-500">
                  {company.industry || 'Technology'} • {company.size || 'Startup'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/company/settings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
              <Link
                to="/company/post-job"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'jobs', label: 'Jobs', icon: Briefcase },
            { id: 'applications', label: 'Applications', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 p-3 rounded-lg bg-${stat.color}-100`}>
                        <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <span className={`font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-gray-500 ml-1">{stat.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Applications */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
                  <Link
                    to="/company/applications"
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentApplications.length > 0 ? (
                  <div className="space-y-4">
                    {recentApplications.slice(0, 5).map((application, index) => {
                      const StatusIcon = getStatusIcon(application.status);
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              {application.userId?.profile?.avatar ? (
                                <img
                                  src={application.userId.profile.avatar}
                                  alt={`${application.userId.firstName} ${application.userId.lastName}`}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              ) : (
                                <Users className="w-6 h-6 text-gray-600" />
                              )}
                            </div>
                            <div className="ml-4">
                              <h4 className="text-sm font-medium text-gray-900">
                                {application.userId?.firstName} {application.userId?.lastName}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Applied for {application.jobId?.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(application.appliedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {application.status.replace('_', ' ')}
                            </span>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleApplicationStatusUpdate(application._id, 'reviewed')}
                                className="text-blue-600 hover:text-blue-500 text-xs font-medium"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => handleApplicationStatusUpdate(application._id, 'interview_scheduled')}
                                className="text-purple-600 hover:text-purple-500 text-xs font-medium"
                              >
                                Interview
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by posting your first job.</p>
                    <div className="mt-6">
                      <Link
                        to="/company/post-job"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Post a Job
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Performing Jobs */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Top Performing Jobs</h3>
              </div>
              <div className="p-6">
                {topPerformingJobs.length > 0 ? (
                  <div className="space-y-4">
                    {topPerformingJobs.map((job, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-sm font-medium text-gray-900">
                              {job.job?.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {job.job?.location?.city}, {job.job?.location?.state}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {job.applicationCount} applications
                          </div>
                          <div className="text-sm text-gray-500">
                            {job.hiredCount} hired
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No job data yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Job performance data will appear here once you start receiving applications.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab === 'jobs' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8">
            <div className="text-center">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Jobs Management</h3>
              <p className="mt-1 text-sm text-gray-500">This section is under development.</p>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Applications Management</h3>
              <p className="mt-1 text-sm text-gray-500">This section is under development.</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-8">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Analytics Dashboard</h3>
              <p className="mt-1 text-sm text-gray-500">This section is under development.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
