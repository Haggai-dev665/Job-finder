import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import {
  HomeIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  EyeIcon,
  ChartBarIcon,
  UserIcon,
  TrophyIcon,
  PlusIcon,
  FireIcon,
  ShieldCheckIcon,
  StarIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  UsersIcon,
  FolderIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import {
  BellIcon as BellIconSolid,
  CheckCircleIcon as CheckCircleIconSolid
} from '@heroicons/react/24/solid';

const CompanyDashboardSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { olive } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Get company data from localStorage or user
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
  const company = companyData || user?.company || {};

  // Company-specific notifications
  const [notifications] = useState([
    { id: 1, type: 'application', message: 'New application for Senior Developer', time: '2 hours ago', read: false },
    { id: 2, type: 'interview', message: 'Interview scheduled with candidate', time: '5 hours ago', read: false },
    { id: 3, type: 'job', message: 'Job posting expires in 3 days', time: '1 day ago', read: true }
  ]);

  // Company-specific activity
  const [recentActivity] = useState([
    { id: 1, action: 'Posted Senior Frontend Developer position', time: '2 hours ago', status: 'completed' },
    { id: 2, action: 'Reviewed 5 applications', time: '5 hours ago', status: 'completed' },
    { id: 3, action: 'Updated company profile', time: '1 day ago', status: 'completed' }
  ]);

  // Company-specific alerts
  const [companyAlerts] = useState([
    { id: 1, title: '12 new applications pending review', count: 12, urgent: true },
    { id: 2, title: '3 job postings expiring soon', count: 3, urgent: true },
    { id: 3, title: 'Monthly hiring goal: 80% complete', count: 80, urgent: false }
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const pendingApplications = 42; // From dashboard data

  const menuItems = [
    { 
      icon: HomeIcon, 
      label: 'Overview', 
      path: '/company-dashboard?tab=overview', 
      active: true,
      badge: null
    },
    { 
      icon: BriefcaseIcon, 
      label: 'Job Postings', 
      path: '/company-dashboard?tab=jobs',
      badge: '15', // Active jobs
      badgeColor: 'bg-blue-100 text-blue-600'
    },
    { 
      icon: PlusIcon, 
      label: 'Create Job', 
      path: '/company-dashboard?tab=create-job', 
      highlight: true,
      badge: 'NEW',
      badgeColor: 'bg-green-100 text-green-600'
    },
    { 
      icon: DocumentTextIcon, 
      label: 'Applications', 
      path: '/company-dashboard?tab=applications',
      badge: pendingApplications > 0 ? pendingApplications.toString() : null,
      badgeColor: 'bg-red-100 text-red-600'
    },
    { 
      icon: UserGroupIcon, 
      label: 'Candidates', 
      path: '/company-dashboard?tab=candidates',
      badge: '89', // Total candidates
      badgeColor: 'bg-purple-100 text-purple-600'
    },
    { 
      icon: BuildingOfficeIcon, 
      label: 'Company Profile', 
      path: '/company-dashboard?tab=company-profile'
    },
    { 
      icon: ChartBarIcon, 
      label: 'Analytics', 
      path: '/company-dashboard?tab=analytics'
    },
    { 
      icon: UsersIcon, 
      label: 'Team Management', 
      path: '/company-dashboard?tab=team'
    },
    { 
      icon: CogIcon, 
      label: 'Settings', 
      path: '/company-dashboard?tab=settings'
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sidebarClasses = `
    ${isCollapsed ? 'w-16' : 'w-64'}
    ${olive ? 'bg-white border-olive-300' : 'bg-white border-gray-200'}
    border-r transition-all duration-300 ease-in-out flex flex-col
  `;

  return (
    <div className={sidebarClasses}>
      {/* Company Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {company.logo ? (
              <img
                className="w-10 h-10 rounded-xl object-cover shadow-sm"
                src={company.logo}
                alt={company.name}
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BuildingOfficeIcon className="w-6 h-6 text-white" />
              </div>
            )}
            {!isCollapsed && (
              <div className="ml-3">
                <div className="text-lg font-bold text-gray-900">{company.name || 'Company'}</div>
                <div className="text-xs text-gray-500">Company Dashboard</div>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="relative">
              <button className="p-1 text-gray-400 hover:text-gray-600 relative">
                <BellIcon className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Company Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Hiring Overview</span>
              <TrophyIcon className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Active jobs</span>
                <span className="font-semibold text-blue-600">15</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Applications received</span>
                <span className="font-semibold text-purple-600">247</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Hired this month</span>
                <span className="font-semibold text-green-600">18</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const currentTab = new URLSearchParams(location.search).get('tab') || 'overview';
          const itemTab = item.path.includes('?tab=') ? item.path.split('?tab=')[1] : 'overview';
          const isActive = itemTab === currentTab;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 relative
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[1.02]' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                }
                ${item.highlight ? 'bg-gradient-to-r from-green-50 to-blue-50 text-green-700 border border-green-200' : ''}
              `}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
              {!isCollapsed && (
                <>
                  <span className="ml-3 font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Company Alerts */}
      {!isCollapsed && companyAlerts.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                <FireIcon className="w-4 h-4 mr-1 text-orange-500" />
                Hiring Alerts
              </h4>
              <Link to="/company-dashboard?tab=analytics" className="text-xs text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {companyAlerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className={`p-2 rounded-lg text-xs ${
                alert.urgent ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
              }`}>
                <div className="flex items-start justify-between">
                  <span className={`font-medium ${alert.urgent ? 'text-red-700' : 'text-blue-700'}`}>
                    {alert.title}
                  </span>
                  {alert.urgent && (
                    <FireIcon className="w-3 h-3 text-red-500 ml-1 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center">
              <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
              Recent Activity
            </h4>
          </div>
          <div className="space-y-2 max-h-24 overflow-y-auto">
            {recentActivity.slice(0, 2).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-2">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  activity.status === 'completed' ? 'bg-green-500' :
                  activity.status === 'pending' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600 line-clamp-2">{activity.action}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Company Status & Actions */}
      <div className="p-4 border-t border-gray-200">
        {/* Status Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {!isCollapsed && (
              <span className="text-sm text-gray-600">Actively hiring</span>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center space-x-1">
              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Notifications">
                <BellIcon className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Analytics">
                <ChartBarIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Quick Action - Post Job */}
        {!isCollapsed && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mb-4 border border-green-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <PlusIcon className="w-4 h-4 text-white" />
              </div>
              <div className="ml-2 flex-1">
                <div className="text-sm font-medium text-gray-900">Post New Job</div>
                <div className="text-xs text-green-600 font-semibold">Attract top talent</div>
              </div>
              <Link 
                to="/company-dashboard?tab=create-job"
                className="text-green-600 hover:text-green-700"
              >
                <PlusIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Company Profile */}
        <div className="flex items-center">
          <div className="relative">
            {company.logo ? (
              <img
                className="w-10 h-10 rounded-xl object-cover shadow-sm"
                src={company.logo}
                alt={company.name}
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {company.name ? company.name.substring(0, 2).toUpperCase() : 'CO'}
                </span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="ml-3 flex-1">
              <div className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <ShieldCheckIcon className="w-3 h-3 mr-1" />
                Company Admin
              </div>
            </div>
          )}
          <div className="flex items-center space-x-1">
            {!isCollapsed && (
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Company Settings">
                <CogIcon className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleLogout}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Upgrade Prompt for Company */}
        {!isCollapsed && (
          <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-indigo-600" />
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-900">Upgrade to Enterprise</div>
                <div className="text-xs text-indigo-600">Unlimited job postings & advanced analytics</div>
              </div>
            </div>
            <button className="mt-2 w-full bg-indigo-600 text-white text-xs py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 transform bg-white border border-gray-300 rounded-full p-1.5 text-gray-400 hover:text-gray-600 hover:border-gray-400 transition-all shadow-sm"
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        <ArrowUpIcon className={`w-3 h-3 transform transition-transform ${isCollapsed ? 'rotate-90' : '-rotate-90'}`} />
      </button>
    </div>
  );
};

export default CompanyDashboardSidebar;
