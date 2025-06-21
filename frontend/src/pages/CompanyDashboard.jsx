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
  Edit,
  Target,
  DollarSign,
  Award,
  Activity,
  MessageSquare,
  Filter,
  Download,
  Search,
  Zap,
  Layers,
  Shield,
  Heart,
  Rocket,
  Lightbulb,
  Coffee,
  Headphones,
  Monitor,
  Smartphone,
  Wifi,
  ThumbsUp,
  Share2,
  Bell,
  AlertCircle,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  PieChart,
  LineChart,
  MousePointer,
  UserPlus,
  Clock4,
  CalendarDays,
  BookOpen
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
    jobStats = {
      activeJobs: 12,
      draftJobs: 3,
      closedJobs: 8,
      totalViews: 2847
    },
    applicationStats = {
      totalApplications: 247,
      pendingApplications: 42,
      hiredApplications: 18,
      rejectedApplications: 67,
      interviewsScheduled: 28
    },
    recentApplications = [
      {
        _id: '1',
        userId: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          profile: {
            avatar: null,
            experience: '5 years',
            location: 'New York, NY',
            skills: ['React', 'Node.js', 'TypeScript']
          }
        },
        jobId: {
          title: 'Senior Frontend Developer',
          department: 'Engineering'
        },
        status: 'pending',
        appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        coverLetter: 'Excited to contribute to your innovative projects...',
        expectedSalary: 120000
      },
      {
        _id: '2',
        userId: {
          firstName: 'Michael',
          lastName: 'Chen',
          profile: {
            avatar: null,
            experience: '4 years',
            location: 'Seattle, WA',
            skills: ['DevOps', 'AWS', 'Kubernetes']
          }
        },
        jobId: {
          title: 'DevOps Engineer',
          department: 'Infrastructure'
        },
        status: 'reviewed',
        appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        coverLetter: 'My experience with cloud infrastructure...',
        expectedSalary: 115000
      },
      {
        _id: '3',
        userId: {
          firstName: 'Emily',
          lastName: 'Rodriguez',
          profile: {
            avatar: null,
            experience: '3 years',
            location: 'Austin, TX',
            skills: ['UI/UX', 'Figma', 'React']
          }
        },
        jobId: {
          title: 'UX Designer',
          department: 'Design'
        },
        status: 'interview_scheduled',
        appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        coverLetter: 'I love creating user-centered designs...',
        expectedSalary: 95000
      }
    ],
    topPerformingJobs = [
      {
        job: {
          title: 'Senior Frontend Developer',
          location: { city: 'San Francisco', state: 'CA' },
          department: 'Engineering',
          type: 'Full-time',
          salary: '$120K - $160K',
          posted: 12
        },
        applicationCount: 87,
        hiredCount: 3,
        viewCount: 342
      },
      {
        job: {
          title: 'DevOps Engineer',
          location: { city: 'Seattle', state: 'WA' },
          department: 'Infrastructure',
          type: 'Full-time',
          salary: '$110K - $150K',
          posted: 8
        },
        applicationCount: 64,
        hiredCount: 2,
        viewCount: 278
      }
    ],
    analytics = {
      profileViews: 1234,
      responseRate: 76,
      averageSalary: 85,
      conversionRate: 12.5
    }
  } = dashboardData || {};

  const statsCards = [
    {
      title: 'Active Jobs',
      value: jobStats.activeJobs || 0,
      icon: Briefcase,
      color: 'blue',
      bgColor: 'bg-blue-500',
      change: '+12%',
      subtitle: 'from last month',
      trend: 'up'
    },
    {
      title: 'Total Applications',
      value: applicationStats.totalApplications || 247,
      icon: FileText,
      color: 'green',
      bgColor: 'bg-green-500',
      change: '+23%',
      subtitle: 'this month',
      trend: 'up'
    },
    {
      title: 'Pending Review',
      value: applicationStats.pendingApplications || 42,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-500',
      change: '-5%',
      subtitle: 'awaiting action',
      trend: 'down'
    },
    {
      title: 'Hired This Month',
      value: applicationStats.hiredApplications || 18,
      icon: UserCheck,
      color: 'purple',
      bgColor: 'bg-purple-500',
      change: '+35%',
      subtitle: 'this quarter',
      trend: 'up'
    },
    {
      title: 'Profile Views',
      value: analytics.profileViews || 1234,
      icon: Eye,
      color: 'indigo',
      bgColor: 'bg-indigo-500',
      change: '+18%',
      subtitle: 'this week',
      trend: 'up'
    },
    {
      title: 'Response Rate',
      value: `${analytics.responseRate || 76}%`,
      icon: Target,
      color: 'pink',
      bgColor: 'bg-pink-500',
      change: '+4%',
      subtitle: 'average',
      trend: 'up'
    },
    {
      title: 'Average Salary',
      value: `$${analytics.averageSalary || 85}K`,
      icon: DollarSign,
      color: 'emerald',
      bgColor: 'bg-emerald-500',
      change: '+8%',
      subtitle: 'per position',
      trend: 'up'
    },
    {
      title: 'Team Members',
      value: company.size || '50-100',
      icon: Users,
      color: 'orange',
      bgColor: 'bg-orange-500',
      change: '+12%',
      subtitle: 'employees',
      trend: 'up'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {company.logo ? (
                  <img
                    className="h-12 w-12 rounded-xl shadow-md object-cover"
                    src={company.logo}
                    alt={company.name}
                  />
                ) : (
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                )}
              </div>
              <div className="ml-6">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {company.name || 'Company Dashboard'}
                  </h1>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">4.8</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-sm text-gray-600 flex items-center">
                    <Building2 className="h-4 w-4 mr-1" />
                    {company.industry || 'Technology'} • {company.size || 'Startup'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {company.headquarters?.city || 'San Francisco'}, {company.headquarters?.country || 'USA'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {company.website || 'www.company.com'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <Link
                to="/company/settings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
              <Link
                to="/company/post-job"
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 border-b border-gray-200 bg-white/70 backdrop-blur-sm">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3, badge: null },
            { id: 'jobs', label: 'Jobs', icon: Briefcase, badge: jobStats.activeJobs || 9 },
            { id: 'applications', label: 'Applications', icon: FileText, badge: applicationStats.pendingApplications || 42 },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp, badge: null },
            { id: 'team', label: 'Team', icon: Users, badge: null },
            { id: 'insights', label: 'Insights', icon: Lightbulb, badge: '3' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
                {tab.badge && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}! 👋</h2>
                  <p className="text-blue-100 text-lg">Here's what's happening with {company.name || 'your company'} today.</p>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="text-sm">
                      <span className="text-blue-200">Founded:</span>
                      <span className="ml-1 font-semibold">{company.founded || 2020}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-200">Industry:</span>
                      <span className="ml-1 font-semibold">{company.industry || 'Technology'}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-200">Employees:</span>
                      <span className="ml-1 font-semibold">{company.size || '50-100'}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Rocket className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                const TrendIcon = stat.trend === 'up' ? ArrowUp : ArrowDown;
                return (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className={`flex-shrink-0 p-3 rounded-xl ${stat.bgColor} shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                        stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <TrendIcon className="w-3 h-3" />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Company Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Building2 className="h-6 w-6 mr-2 text-blue-600" />
                    Company Profile
                  </h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Company Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Building2 className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                          <div>
                            <p className="text-sm text-gray-900 font-medium">{company.name || 'TechCorp Inc.'}</p>
                            <p className="text-xs text-gray-500">Company Name</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                          <div>
                            <p className="text-sm text-gray-900">
                              {company.headquarters?.address || '123 Tech Street'}, {company.headquarters?.city || 'San Francisco'}
                            </p>
                            <p className="text-xs text-gray-500">Headquarters</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                          <div>
                            <p className="text-sm text-gray-900">{company.website || 'www.techcorp.com'}</p>
                            <p className="text-xs text-gray-500">Website</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                          <div>
                            <p className="text-sm text-gray-900">{company.contactInfo?.email || user?.email}</p>
                            <p className="text-xs text-gray-500">Contact Email</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Company Culture</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Mission</p>
                          <p className="text-sm text-gray-900">
                            {company.culture?.mission || 'To revolutionize the way people work and collaborate through innovative technology solutions.'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Work Environment</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {company.culture?.workEnvironment || 'Hybrid'}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Benefits</p>
                          <div className="flex flex-wrap gap-1">
                            {(company.culture?.benefits || ['health-insurance', 'remote-work', 'flexible-schedule']).slice(0, 3).map((benefit, idx) => (
                              <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                {benefit.replace('-', ' ')}
                              </span>
                            ))}
                            {(company.culture?.benefits?.length || 3) > 3 && (
                              <span className="text-xs text-gray-500">+{(company.culture.benefits.length || 3) - 3} more</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Post New Job', icon: Plus, color: 'blue', description: 'Create and publish a new job opening' },
                { title: 'Review Applications', icon: FileText, color: 'green', description: 'Check pending applications', badge: '42' },
                { title: 'Team Management', icon: Users, color: 'purple', description: 'Manage your team members' },
                { title: 'Company Analytics', icon: BarChart3, color: 'orange', description: 'View detailed insights' }
              ].map((action, index) => (
                <button key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${action.color}-100 group-hover:bg-${action.color}-200 transition-colors`}>
                      <action.icon className={`h-6 w-6 text-${action.color}-600`} />
                    </div>
                    {action.badge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {action.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <ChevronRight className="h-5 w-5 text-gray-400 mt-3 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            {/* Recent Applications Enhanced */}
            <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    Recent Applications
                  </h3>
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/50">
                      <Filter className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/50">
                      <Download className="h-5 w-5" />
                    </button>
                    <Link
                      to="/company/applications"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-6">
                {recentApplications.length > 0 ? (
                  <div className="space-y-4">
                    {recentApplications.slice(0, 5).map((application, index) => {
                      const StatusIcon = getStatusIcon(application.status);
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-sm">
                                {application.userId?.profile?.avatar ? (
                                  <img
                                    src={application.userId.profile.avatar}
                                    alt={`${application.userId.firstName} ${application.userId.lastName}`}
                                    className="w-12 h-12 rounded-xl object-cover"
                                  />
                                ) : (
                                  <Users className="w-6 h-6 text-gray-600" />
                                )}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{index + 1}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-gray-900">
                                  {application.userId?.firstName || 'John'} {application.userId?.lastName || 'Doe'}
                                </h4>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">
                                  {application.userId?.profile?.experience || '3'} years exp.
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                Applied for <span className="font-medium text-blue-600">{application.jobId?.title || 'Senior Developer'}</span>
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <p className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(application.appliedAt || Date.now()).toLocaleDateString()}
                                </p>
                                <p className="text-xs text-gray-500 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {application.userId?.profile?.location || 'San Francisco, CA'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {(application.status || 'pending').replace('_', ' ')}
                            </span>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleApplicationStatusUpdate(application._id, 'reviewed')}
                                className="text-blue-600 hover:text-blue-700 text-xs font-medium px-3 py-1 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => handleApplicationStatusUpdate(application._id, 'interview_scheduled')}
                                className="text-purple-600 hover:text-purple-700 text-xs font-medium px-3 py-1 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
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
                  // Enhanced empty state with sample applications
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Sarah Johnson',
                        position: 'Senior Frontend Developer',
                        experience: '5 years',
                        location: 'New York, NY',
                        status: 'pending',
                        appliedDays: 2
                      },
                      {
                        name: 'Michael Chen',
                        position: 'DevOps Engineer',
                        experience: '4 years',
                        location: 'Seattle, WA',
                        status: 'reviewed',
                        appliedDays: 1
                      },
                      {
                        name: 'Emily Rodriguez',
                        position: 'UX Designer',
                        experience: '3 years',
                        location: 'Austin, TX',
                        status: 'interview_scheduled',
                        appliedDays: 3
                      }
                    ].map((applicant, index) => {
                      const StatusIcon = getStatusIcon(applicant.status);
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                                <span className="text-white font-semibold text-sm">
                                  {applicant.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">{index + 1}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-gray-900">{applicant.name}</h4>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">{applicant.experience} exp.</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                Applied for <span className="font-medium text-blue-600">{applicant.position}</span>
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <p className="text-xs text-gray-500 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {applicant.appliedDays} days ago
                                </p>
                                <p className="text-xs text-gray-500 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {applicant.location}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {applicant.status.replace('_', ' ')}
                            </span>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="text-blue-600 hover:text-blue-700 text-xs font-medium px-3 py-1 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                Review
                              </button>
                              <button className="text-purple-600 hover:text-purple-700 text-xs font-medium px-3 py-1 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                Interview
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Job Performance */}
              <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Briefcase className="h-6 w-6 mr-2 text-green-600" />
                    Top Performing Jobs
                  </h3>
                </div>
                <div className="p-6">
                  {topPerformingJobs.length > 0 ? (
                    <div className="space-y-4">
                      {topPerformingJobs.map((job, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">
                                {job.job?.title || 'Senior Developer'}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {job.job?.location?.city || 'San Francisco'}, {job.job?.location?.state || 'CA'}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Posted {Math.floor(Math.random() * 30)} days ago
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {job.applicationCount || Math.floor(Math.random() * 100 + 20)}
                            </div>
                            <div className="text-xs text-gray-500">applications</div>
                            <div className="flex items-center mt-1">
                              <div className="text-sm font-medium text-green-600">
                                {job.hiredCount || Math.floor(Math.random() * 5 + 1)} hired
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Sample job performance data
                    <div className="space-y-4">
                      {[
                        { title: 'Senior Frontend Developer', location: 'San Francisco, CA', applications: 87, hired: 3, posted: 12 },
                        { title: 'DevOps Engineer', location: 'Seattle, WA', applications: 64, hired: 2, posted: 8 },
                        { title: 'UX Designer', location: 'Austin, TX', applications: 52, hired: 1, posted: 15 },
                        { title: 'Backend Developer', location: 'New York, NY', applications: 73, hired: 2, posted: 6 }
                      ].map((job, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">{job.title}</h4>
                              <p className="text-sm text-gray-600">{job.location}</p>
                              <p className="text-xs text-gray-500 mt-1">Posted {job.posted} days ago</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">{job.applications}</div>
                            <div className="text-xs text-gray-500">applications</div>
                            <div className="flex items-center mt-1">
                              <div className="text-sm font-medium text-green-600">{job.hired} hired</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Activity className="h-6 w-6 mr-2 text-purple-600" />
                    Recent Activity
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { type: 'application', user: 'Sarah Johnson', action: 'applied for Senior Frontend Developer', time: '2 hours ago', icon: UserPlus, color: 'blue' },
                      { type: 'interview', user: 'Michael Chen', action: 'interview scheduled for DevOps Engineer', time: '4 hours ago', icon: Calendar, color: 'purple' },
                      { type: 'hire', user: 'Emily Rodriguez', action: 'was hired as UX Designer', time: '1 day ago', icon: CheckCircle, color: 'green' },
                      { type: 'job', user: 'System', action: 'new job "Data Scientist" was posted', time: '2 days ago', icon: Briefcase, color: 'orange' },
                      { type: 'view', user: 'Anonymous', action: 'viewed your company profile', time: '3 days ago', icon: Eye, color: 'gray' }
                    ].map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 text-${activity.color}-600`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{activity.user}</span> {activity.action}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-8">
            {/* Jobs Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Job Management</h2>
                <p className="text-gray-600">Manage your posted jobs and create new opportunities</p>
              </div>
              <Link
                to="/company/post-job"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Post New Job
              </Link>
            </div>

            {/* Job Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Active Jobs', value: jobStats.activeJobs || 15, icon: Briefcase, color: 'blue' },
                { title: 'Draft Jobs', value: jobStats.draftJobs || 3, icon: FileText, color: 'yellow' },
                { title: 'Closed Jobs', value: jobStats.closedJobs || 8, icon: CheckCircle, color: 'green' },
                { title: 'Total Views', value: `${(jobStats.totalViews || 3247).toLocaleString()}`, icon: Eye, color: 'purple' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Jobs List */}
            <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">All Jobs</h3>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { 
                      title: 'Senior Frontend Developer', 
                      department: 'Engineering', 
                      location: 'San Francisco, CA', 
                      type: 'Full-time', 
                      applications: 87, 
                      status: 'active', 
                      posted: '12 days ago', 
                      salary: '$120K - $160K',
                      description: 'Join our engineering team to build cutting-edge web applications with React and TypeScript.',
                      requirements: ['5+ years React', 'TypeScript', 'Next.js', 'GraphQL', 'Testing'],
                      urgency: 'high',
                      views: 342,
                      category: 'Technology',
                      applicationsToday: 8
                    },
                    { 
                      title: 'DevOps Engineer', 
                      department: 'Infrastructure', 
                      location: 'Seattle, WA', 
                      type: 'Full-time', 
                      applications: 64, 
                      status: 'active', 
                      posted: '8 days ago', 
                      salary: '$110K - $150K',
                      description: 'Lead our cloud infrastructure and deployment automation initiatives.',
                      requirements: ['AWS/Azure', 'Kubernetes', 'CI/CD', 'Docker', 'Terraform'],
                      urgency: 'medium',
                      views: 278,
                      category: 'Infrastructure',
                      applicationsToday: 5
                    },
                    { 
                      title: 'UX Designer', 
                      department: 'Design', 
                      location: 'Austin, TX', 
                      type: 'Full-time', 
                      applications: 52, 
                      status: 'active', 
                      posted: '15 days ago', 
                      salary: '$90K - $120K',
                      description: 'Create intuitive and beautiful user experiences for our mobile and web platforms.',
                      requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
                      urgency: 'low',
                      views: 189,
                      category: 'Design',
                      applicationsToday: 3
                    },
                    { 
                      title: 'Product Manager', 
                      department: 'Product', 
                      location: 'Remote', 
                      type: 'Full-time', 
                      applications: 31, 
                      status: 'active', 
                      posted: '5 days ago', 
                      salary: '$130K - $170K',
                      description: 'Drive product strategy and roadmap for our core platform and new features.',
                      requirements: ['5+ years PM', 'B2B SaaS', 'Analytics', 'Agile', 'User Research'],
                      urgency: 'high',
                      views: 156,
                      category: 'Product',
                      applicationsToday: 6
                    },
                    { 
                      title: 'Backend Developer', 
                      department: 'Engineering', 
                      location: 'New York, NY', 
                      type: 'Full-time', 
                      applications: 43, 
                      status: 'active', 
                      posted: '6 days ago', 
                      salary: '$115K - $145K',
                      description: 'Build scalable APIs and microservices architecture for our growing platform.',
                      requirements: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'],
                      urgency: 'medium',
                      views: 203,
                      category: 'Technology',
                      applicationsToday: 4
                    },
                    { 
                      title: 'Data Scientist', 
                      department: 'Analytics', 
                      location: 'Boston, MA', 
                      type: 'Full-time', 
                      applications: 38, 
                      status: 'draft', 
                      posted: '2 days ago', 
                      salary: '$125K - $155K',
                      description: 'Analyze complex datasets to drive business insights and machine learning models.',
                      requirements: ['Python/R', 'ML/AI', 'SQL', 'TensorFlow', 'Statistics'],
                      urgency: 'medium',
                      views: 67,
                      category: 'Data Science',
                      applicationsToday: 2
                    },
                    { 
                      title: 'Sales Development Representative', 
                      department: 'Sales', 
                      location: 'Chicago, IL', 
                      type: 'Full-time', 
                      applications: 29, 
                      status: 'active', 
                      posted: '18 days ago', 
                      salary: '$55K - $75K + Commission',
                      description: 'Generate qualified leads and grow our customer base through outbound prospecting.',
                      requirements: ['Sales experience', 'CRM tools', 'Communication', 'Lead Generation', 'B2B Sales'],
                      urgency: 'low',
                      views: 134,
                      category: 'Sales',
                      applicationsToday: 1
                    },
                    { 
                      title: 'QA Engineer', 
                      department: 'Engineering', 
                      location: 'Denver, CO', 
                      type: 'Full-time', 
                      applications: 25, 
                      status: 'active', 
                      posted: '11 days ago', 
                      salary: '$85K - $110K',
                      description: 'Ensure product quality through comprehensive testing and automation frameworks.',
                      requirements: ['Test Automation', 'Selenium', 'API Testing', 'Jest', 'Quality Assurance'],
                      urgency: 'medium',
                      views: 98,
                      category: 'Quality Assurance',
                      applicationsToday: 2
                    },
                    { 
                      title: 'Marketing Manager', 
                      department: 'Marketing', 
                      location: 'Los Angeles, CA', 
                      type: 'Full-time', 
                      applications: 47, 
                      status: 'active', 
                      posted: '9 days ago', 
                      salary: '$95K - $125K',
                      description: 'Lead digital marketing campaigns and brand strategy for our consumer products.',
                      requirements: ['Digital Marketing', 'SEO/SEM', 'Analytics', 'Content Strategy', 'Social Media'],
                      urgency: 'medium',
                      views: 215,
                      category: 'Marketing',
                      applicationsToday: 4
                    },
                    { 
                      title: 'Customer Success Manager', 
                      department: 'Customer Success', 
                      location: 'Remote', 
                      type: 'Full-time', 
                      applications: 34, 
                      status: 'active', 
                      posted: '7 days ago', 
                      salary: '$80K - $105K',
                      description: 'Drive customer satisfaction and retention through proactive relationship management.',
                      requirements: ['Customer Success', 'SaaS Experience', 'Account Management', 'Communication', 'Analytics'],
                      urgency: 'high',
                      views: 167,
                      category: 'Customer Success',
                      applicationsToday: 3
                    }
                  ].map((job, index) => {
                    const urgencyColors = {
                      high: 'border-red-200 bg-red-50',
                      medium: 'border-yellow-200 bg-yellow-50',
                      low: 'border-green-200 bg-green-50'
                    };
                    const statusColors = {
                      active: 'bg-green-100 text-green-800',
                      draft: 'bg-yellow-100 text-yellow-800',
                      closed: 'bg-gray-100 text-gray-800'
                    };
                    return (
                      <div key={index} className={`flex items-center justify-between p-6 rounded-xl hover:shadow-md transition-all group border-2 ${urgencyColors[job.urgency]}`}>
                        <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                            <Briefcase className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                                {job.status}
                              </span>
                              {job.urgency === 'high' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                  🔥 Urgent
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center">
                                <Building2 className="h-4 w-4 mr-1" />
                                {job.department}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {job.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-gray-500">Posted {job.posted}</span>
                              <span className="text-gray-400">•</span>
                              <span className="font-medium text-green-600">{job.salary}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">{job.views} views</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {job.requirements.slice(0, 3).map((req, idx) => (
                                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                  {req}
                                </span>
                              ))}
                              {job.requirements.length > 3 && (
                                <span className="text-xs text-gray-500">+{job.requirements.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 flex-shrink-0">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{job.applications}</div>
                            <div className="text-xs text-gray-500">Applications</div>
                            {job.applicationsToday > 0 && (
                              <div className="text-xs text-green-600 font-medium">
                                +{job.applicationsToday} today
                              </div>
                            )}
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-blue-600">{job.views}</div>
                            <div className="text-xs text-gray-500">Views</div>
                          </div>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Applications">
                              <Eye className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Job">
                              <Edit className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Close Job">
                              <XCircle className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-8">
            {/* Applications Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Application Management</h2>
                <p className="text-gray-600">Review and manage all job applications</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Application Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { title: 'New Applications', value: '42', icon: FileText, color: 'blue', change: '+12%' },
                { title: 'Under Review', value: '18', icon: Eye, color: 'yellow', change: '+5%' },
                { title: 'Interviews Scheduled', value: '9', icon: Calendar, color: 'purple', change: '+25%' },
                { title: 'Offers Extended', value: '4', icon: Award, color: 'green', change: '+33%' },
                { title: 'Hired', value: '3', icon: UserCheck, color: 'emerald', change: '+50%' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                      <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                    </div>
                    <span className="text-xs font-medium text-green-600">{stat.change}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Applications Pipeline */}
            <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Application Pipeline</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {[
                    { stage: 'New', count: 42, applications: [
                      { name: 'Sarah Johnson', position: 'Frontend Developer', avatar: 'SJ' },
                      { name: 'Michael Chen', position: 'DevOps Engineer', avatar: 'MC' },
                      { name: 'Emily Rodriguez', position: 'UX Designer', avatar: 'ER' }
                    ], color: 'blue' },
                    { stage: 'Reviewing', count: 18, applications: [
                      { name: 'David Kim', position: 'Backend Developer', avatar: 'DK' },
                      { name: 'Lisa Wang', position: 'Product Manager', avatar: 'LW' },
                      { name: 'James Brown', position: 'Data Scientist', avatar: 'JB' }
                    ], color: 'yellow' },
                    { stage: 'Interview', count: 9, applications: [
                      { name: 'Anna Taylor', position: 'Marketing Manager', avatar: 'AT' },
                      { name: 'John Wilson', position: 'QA Engineer', avatar: 'JW' },
                      { name: 'Maria Garcia', position: 'Customer Success', avatar: 'MG' }
                    ], color: 'purple' },
                    { stage: 'Final Round', count: 4, applications: [
                      { name: 'Robert Lee', position: 'Sales Rep', avatar: 'RL' },
                      { name: 'Jennifer Davis', position: 'Frontend Developer', avatar: 'JD' }
                    ], color: 'orange' },
                    { stage: 'Hired', count: 3, applications: [
                      { name: 'Alex Thompson', position: 'Backend Developer', avatar: 'AT' },
                      { name: 'Sophie Martinez', position: 'UX Designer', avatar: 'SM' }
                    ], color: 'green' }
                  ].map((stage, index) => (
                    <div key={index} className={`bg-${stage.color}-50 p-4 rounded-xl border-2 border-${stage.color}-200`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-sm font-semibold text-${stage.color}-800`}>{stage.stage}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${stage.color}-200 text-${stage.color}-800`}>
                          {stage.count}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {stage.applications.map((applicant, idx) => (
                          <div key={idx} className={`p-3 bg-white rounded-lg border border-${stage.color}-200 hover:shadow-sm transition-shadow`}>
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 bg-${stage.color}-100 rounded-full flex items-center justify-center`}>
                                <span className={`text-xs font-semibold text-${stage.color}-700`}>
                                  {applicant.avatar}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{applicant.name}</p>
                                <p className="text-xs text-gray-500">{applicant.position}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {stage.count > stage.applications.length && (
                          <div className="text-center">
                            <button className={`text-xs text-${stage.color}-600 hover:text-${stage.color}-700 font-medium`}>
                              +{stage.count - stage.applications.length} more
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Analytics Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                <p className="text-gray-600">Insights into your hiring performance and company metrics</p>
              </div>
              <div className="flex items-center space-x-3">
                <select className="px-4 py-2 text-sm border border-gray-200 rounded-lg bg-white">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
                <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Conversion Rate', value: '12.5%', icon: Target, trend: '+2.1%', color: 'green' },
                { title: 'Time to Hire', value: '18 days', icon: Clock4, trend: '-3 days', color: 'blue' },
                { title: 'Cost per Hire', value: '$2,450', icon: DollarSign, trend: '-$150', color: 'purple' },
                { title: 'Employee Retention', value: '94%', icon: Shield, trend: '+1.2%', color: 'emerald' }
              ].map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${metric.color}-100`}>
                      <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                    </div>
                    <span className={`text-sm font-medium ${metric.trend.startsWith('+') || metric.trend.startsWith('-$') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hiring Funnel */}
              <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <PieChart className="h-6 w-6 mr-2 text-blue-600" />
                  Hiring Funnel
                </h3>
                <div className="space-y-4">
                  {[
                    { stage: 'Applications Received', count: 847, percentage: 100, color: 'blue' },
                    { stage: 'Qualified Candidates', count: 254, percentage: 30, color: 'indigo' },
                    { stage: 'Phone Screenings', count: 127, percentage: 15, color: 'purple' },
                    { stage: 'Technical Interviews', count: 64, percentage: 7.5, color: 'pink' },
                    { stage: 'Final Interviews', count: 32, percentage: 3.8, color: 'red' },
                    { stage: 'Job Offers', count: 16, percentage: 1.9, color: 'orange' },
                    { stage: 'Hires', count: 12, percentage: 1.4, color: 'green' }
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded bg-${stage.color}-500`}></div>
                        <span className="text-sm text-gray-700">{stage.stage}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-semibold text-gray-900">{stage.count}</span>
                        <span className="text-xs text-gray-500">({stage.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Sources */}
              <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <MousePointer className="h-6 w-6 mr-2 text-green-600" />
                  Application Sources
                </h3>
                <div className="space-y-4">
                  {[
                    { source: 'Company Website', count: 342, percentage: 40.4, color: 'blue' },
                    { source: 'LinkedIn', count: 254, percentage: 30.0, color: 'indigo' },
                    { source: 'Indeed', count: 152, percentage: 17.9, color: 'purple' },
                    { source: 'Glassdoor', count: 68, percentage: 8.0, color: 'pink' },
                    { source: 'Referrals', count: 31, percentage: 3.7, color: 'green' }
                  ].map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{source.source}</span>
                        <span className="text-sm font-semibold text-gray-900">{source.count} ({source.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-${source.color}-500 h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-8">
            {/* Team Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
                <p className="text-gray-600">Manage your team members and their access levels</p>
              </div>
              <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <UserPlus className="h-5 w-5 mr-2" />
                Invite Team Member
              </button>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Total Members', value: '24', icon: Users, color: 'blue' },
                { title: 'Active Recruiters', value: '8', icon: UserCheck, color: 'green' },
                { title: 'Pending Invites', value: '3', icon: Clock, color: 'yellow' },
                { title: 'Admin Users', value: '2', icon: Shield, color: 'purple' }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Members List */}
            <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Team Members</h3>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: 'John Smith', email: 'john@company.com', role: 'Admin', department: 'Engineering', status: 'active', avatar: null, lastActive: '2 hours ago' },
                    { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Recruiter', department: 'HR', status: 'active', avatar: null, lastActive: '1 day ago' },
                    { name: 'Michael Chen', email: 'michael@company.com', role: 'Hiring Manager', department: 'Product', status: 'active', avatar: null, lastActive: '3 hours ago' },
                    { name: 'Emily Rodriguez', email: 'emily@company.com', role: 'Recruiter', department: 'HR', status: 'pending', avatar: null, lastActive: 'Pending invitation' }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-white font-semibold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {member.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <p className="text-sm text-gray-500">{member.role} • {member.department}</p>
                            <span className="text-gray-400">•</span>
                            <p className="text-sm text-gray-500">Last active: {member.lastActive}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Settings className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-8">
            {/* Insights Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI-Powered Insights</h2>
                <p className="text-gray-600">Smart recommendations to improve your hiring process</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live insights</span>
              </div>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  type: 'success',
                  icon: TrendingUp,
                  title: 'High Performing Job',
                  description: 'Your "Senior Frontend Developer" role has 40% more applications than similar positions in your industry.',
                  action: 'View Details',
                  color: 'green'
                },
                {
                  type: 'warning',
                  icon: AlertCircle,
                  title: 'Long Time to Hire',
                  description: 'Average time to hire is 25 days, 7 days longer than industry average. Consider streamlining your process.',
                  action: 'Optimize Process',
                  color: 'yellow'
                },
                {
                  type: 'info',
                  icon: Lightbulb,
                  title: 'Salary Recommendation',
                  description: 'Consider increasing DevOps Engineer salary by 8% to attract more qualified candidates from top-tier companies.',
                  action: 'Adjust Salary',
                  color: 'blue'
                },
                {
                  type: 'opportunity',
                  icon: Target,
                  title: 'Skill Gap Analysis',
                  description: 'High demand for Python developers in your area. Consider posting more backend roles to capitalize on talent pool.',
                  action: 'Explore Roles',
                  color: 'purple'
                },
                {
                  type: 'trend',
                  icon: Activity,
                  title: 'Application Surge',
                  description: 'Applications increased 35% this week. Your recent company blog post about remote work may have contributed.',
                  action: 'Analyze Trend',
                  color: 'emerald'
                },
                {
                  type: 'retention',
                  icon: Heart,
                  title: 'Employee Satisfaction',
                  description: 'Your company rating increased to 4.8/5. Great time to highlight this in job postings for better attraction.',
                  action: 'Update Posts',
                  color: 'pink'
                }
              ].map((insight, index) => (
                <div key={index} className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 border-${insight.color}-500 hover:shadow-xl transition-shadow`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-${insight.color}-100`}>
                      <insight.icon className={`h-6 w-6 text-${insight.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                      <p className="text-gray-600 mb-4">{insight.description}</p>
                      <button className={`text-sm font-medium text-${insight.color}-600 hover:text-${insight.color}-700 flex items-center`}>
                        {insight.action}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Recommendations */}
            <div className="bg-white shadow-lg rounded-2xl border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
                  Detailed Recommendations
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {[
                    {
                      category: 'Job Postings',
                      recommendations: [
                        'Add more specific technical requirements to reduce unqualified applications',
                        'Include company culture information to attract better fits',
                        'Optimize job titles for better SEO performance'
                      ]
                    },
                    {
                      category: 'Application Process',
                      recommendations: [
                        'Reduce application form length to increase completion rate',
                        'Add pre-screening questions to filter candidates early',
                        'Implement automated acknowledgment emails'
                      ]
                    },
                    {
                      category: 'Interview Process',
                      recommendations: [
                        'Standardize interview questions across all interviewers',
                        'Schedule interviews within 5 days of application',
                        'Provide feedback to candidates within 48 hours'
                      ]
                    }
                  ].map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h4>
                      <div className="space-y-3">
                        {category.recommendations.map((rec, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-xs font-semibold text-blue-600">{idx + 1}</span>
                            </div>
                            <p className="text-gray-700 flex-1">{rec}</p>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Apply
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
