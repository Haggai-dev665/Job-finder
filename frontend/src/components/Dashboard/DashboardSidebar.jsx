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
  EyeIcon
} from '@heroicons/react/24/outline';

const DashboardSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { olive } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: UserIcon, label: 'Profile', path: '/profile' },
    { icon: BriefcaseIcon, label: 'Jobs', path: '/jobs', highlight: true },
    { icon: DocumentTextIcon, label: 'Applications', path: '/applications' },
    { icon: ChatBubbleLeftRightIcon, label: 'Messages', path: '/messages' },
    { icon: MagnifyingGlassIcon, label: 'Discover', path: '/discover' },
    { icon: CogIcon, label: 'Settings', path: '/settings' }
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
        <div className="flex items-center">
          <div className="text-2xl font-bold text-black">
            W<span className="text-red-500 text-3xl">.</span>
          </div>
          {!isCollapsed && (
            <span className="ml-2 text-lg font-semibold text-gray-700">
              JobFinder
            </span>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
                ${item.highlight ? 'bg-yellow-50 text-yellow-700 font-medium' : ''}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="ml-3">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Status */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {!isCollapsed && (
              <span className="ml-2 text-sm text-gray-600">Ready to interview</span>
            )}
          </div>
          <BellIcon className="w-5 h-5 text-gray-400" />
        </div>

        {/* Refer a Friend */}
        {!isCollapsed && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <UserGroupIcon className="w-5 h-5 text-purple-600" />
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-900">Refer a friend</div>
                <div className="text-xs text-purple-600">Earn $200</div>
              </div>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src={user?.profile?.avatar || '/default-avatar.png'}
            alt={user?.firstName || 'User'}
          />
          {!isCollapsed && (
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500">{user?.email}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="p-1 text-gray-400 hover:text-gray-600"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 text-gray-400 hover:text-gray-600"
      >
        <EyeIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DashboardSidebar;
