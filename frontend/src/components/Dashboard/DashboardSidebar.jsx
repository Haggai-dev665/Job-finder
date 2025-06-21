import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  EyeIcon,
  BookmarkIcon,
  ChartBarIcon,
  HeartIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  TrophyIcon,
  GiftIcon,
  StarIcon,
  FireIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import {
  BellIcon as BellIconSolid,
  HeartIcon as HeartIconSolid,
  CheckCircleIcon as CheckCircleIconSolid
} from '@heroicons/react/24/solid';

const DashboardSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { olive } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Dummy data for notifications and activities
  const [notifications] = useState([
    { id: 1, type: 'interview', message: 'Interview scheduled with Google', time: '2 hours ago', read: false },
    { id: 2, type: 'application', message: 'Apple viewed your application', time: '5 hours ago', read: false },
    { id: 3, type: 'message', message: 'New message from recruiter', time: '1 day ago', read: true }
  ]);

  const [recentActivity] = useState([
    { id: 1, action: 'Applied to Senior Frontend Developer at Google', time: '2 hours ago', status: 'pending' },
    { id: 2, action: 'Saved job at Apple Inc.', time: '5 hours ago', status: 'saved' },
    { id: 3, action: 'Updated profile skills', time: '1 day ago', status: 'completed' }
  ]);

  const [jobAlerts] = useState([
    { id: 1, title: '3 new React jobs in San Francisco', count: 3, urgent: true },
    { id: 2, title: '5 remote Frontend positions', count: 5, urgent: false },
    { id: 3, title: '2 jobs matching your salary range', count: 2, urgent: true }
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = 4; // Dummy unread messages count

  const menuItems = [
    { 
      icon: HomeIcon, 
      label: 'Dashboard', 
      path: '/dashboard', 
      active: true,
      badge: null
    },
    { 
      icon: UserIcon, 
      label: 'Profile', 
      path: '/profile',
      badge: '75%', // Profile completion
      badgeColor: 'bg-orange-100 text-orange-600'
    },
    { 
      icon: BriefcaseIcon, 
      label: 'Find Jobs', 
      path: '/jobs', 
      highlight: true,
      badge: '156', // New jobs
      badgeColor: 'bg-blue-100 text-blue-600'
    },
    { 
      icon: DocumentTextIcon, 
      label: 'Applications', 
      path: '/applications',
      badge: '24', // Total applications
      badgeColor: 'bg-green-100 text-green-600'
    },
    { 
      icon: ChatBubbleLeftRightIcon, 
      label: 'Messages', 
      path: '/messages',
      badge: unreadMessages > 0 ? unreadMessages.toString() : null,
      badgeColor: 'bg-red-100 text-red-600'
    },
    { 
      icon: BookmarkIcon, 
      label: 'Saved Jobs', 
      path: '/saved-jobs',
      badge: '12', // Saved jobs count
      badgeColor: 'bg-purple-100 text-purple-600'
    },
    { 
      icon: BuildingOfficeIcon, 
      label: 'Companies', 
      path: '/companies'
    },
    { 
      icon: ChartBarIcon, 
      label: 'Analytics', 
      path: '/analytics'
    },
    { 
      icon: AcademicCapIcon, 
      label: 'Learning', 
      path: '/learning',
      badge: 'New',
      badgeColor: 'bg-indigo-100 text-indigo-600'
    },
    { 
      icon: CogIcon, 
      label: 'Settings', 
      path: '/settings'
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
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">JF</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <div className="text-lg font-bold text-gray-900">JobFinder</div>
                <div className="text-xs text-gray-500">Find your dream job</div>
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

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Job Search Progress</span>
              <TrophyIcon className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Applications sent</span>
                <span className="font-semibold text-blue-600">24</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Interviews scheduled</span>
                <span className="font-semibold text-purple-600">3</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Profile views</span>
                <span className="font-semibold text-green-600">89</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
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
                ${item.highlight ? 'bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 border border-yellow-200' : ''}
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

      {/* Job Alerts */}
      {!isCollapsed && jobAlerts.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                <FireIcon className="w-4 h-4 mr-1 text-orange-500" />
                Job Alerts
              </h4>
              <Link to="/job-alerts" className="text-xs text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {jobAlerts.slice(0, 2).map((alert) => (
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

      {/* User Status & Actions */}
      <div className="p-4 border-t border-gray-200">
        {/* Status Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {!isCollapsed && (
              <span className="ml-2 text-sm text-gray-600">Ready to interview</span>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center space-x-1">
              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Notifications">
                <BellIcon className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Saved Jobs">
                <HeartIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Refer a Friend */}
        {!isCollapsed && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4 border border-purple-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <GiftIcon className="w-4 h-4 text-white" />
              </div>
              <div className="ml-2 flex-1">
                <div className="text-sm font-medium text-gray-900">Refer a friend</div>
                <div className="text-xs text-purple-600 font-semibold">Earn $200 bonus</div>
              </div>
              <button className="text-purple-600 hover:text-purple-700">
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="flex items-center">
          <div className="relative">
            <img
              className="w-10 h-10 rounded-xl object-cover shadow-sm"
              src={user?.profile?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=3b82f6&color=ffffff`}
              alt={user?.firstName || 'User'}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="ml-3 flex-1">
              <div className="text-sm font-semibold text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <ShieldCheckIcon className="w-3 h-3 mr-1" />
                Verified Profile
              </div>
            </div>
          )}
          <div className="flex items-center space-x-1">
            {!isCollapsed && (
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="Profile Settings">
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

        {/* Upgrade Prompt */}
        {!isCollapsed && (
          <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-200">
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-indigo-600" />
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-900">Upgrade to Pro</div>
                <div className="text-xs text-indigo-600">Get priority support & more features</div>
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

export default DashboardSidebar;
