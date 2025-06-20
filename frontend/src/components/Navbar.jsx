import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  User, 
  Menu, 
  X, 
  Bell, 
  Settings, 
  LogOut, 
  Heart, 
  FileText,
  PlusCircle,
  Briefcase,
  Sparkles,
  Building2,
  Users,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isOlive, toggleTheme } = useContext(ThemeContext) || {};
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);
  const signupDropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signupDropdownRef.current && !signupDropdownRef.current.contains(event.target)) {
        setIsSignupDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  // Wellfound-style navigation
  const navigation = [
    { name: 'For job seekers', href: '/jobs', icon: Search },
    { name: 'For companies', href: '/companies', icon: Building2 },
    { name: 'Top Lists', href: '/companies/featured', icon: Sparkles },
    ...(isAuthenticated && user?.role === 'employer' 
      ? [{ name: 'Post Jobs', href: '/post-job', icon: PlusCircle }]
      : []
    ),
  ];

  const userNavigation = [
    // Different dashboard based on user role
    ...(user?.role === 'employer' || user?.role === 'company' 
      ? [{ name: 'Company Dashboard', href: '/company-dashboard', icon: Briefcase }]
      : [{ name: 'Dashboard', href: '/dashboard', icon: Briefcase }]
    ),
    { name: 'Profile', href: '/profile', icon: User },
    ...(user?.role === 'employer' || user?.role === 'company'
      ? [
          { name: 'Post Jobs', href: '/post-job', icon: PlusCircle },
          { name: 'Applications', href: '/company/applications', icon: FileText }
        ]
      : [
          { name: 'Saved Jobs', href: '/saved-jobs', icon: Heart },
          { name: 'Applications', href: '/applications', icon: FileText }
        ]
    ),
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <nav className={`${
      isOlive 
        ? 'bg-white/95 backdrop-blur-md text-raisin-black border-b border-gray-200/50' 
        : 'bg-gray-900/95 backdrop-blur-md text-white border-b border-white/10'
    } sticky top-0 z-50 shadow-lg transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                isOlive 
                  ? 'bg-gradient-to-br from-olive-beige to-olive-beige/80' 
                  : 'bg-gradient-to-br from-blue-600 to-purple-600'
              }`}>
                <Sparkles className={`h-6 w-6 ${isOlive ? 'text-raisin-black' : 'text-white'}`} />
              </div>
              <span className={`ml-3 text-2xl font-bold bg-gradient-to-r ${
                isOlive 
                  ? 'from-raisin-black to-raisin-black/80' 
                  : 'from-white to-gray-300'
              } bg-clip-text text-transparent`}>
                CareerFlow
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:ml-12 lg:flex lg:space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? isOlive 
                          ? 'bg-olive-beige/20 text-raisin-black border border-olive-beige/30' 
                          : 'bg-white/10 text-white border border-white/20'
                        : isOlive
                          ? 'text-raisin-black/70 hover:text-raisin-black hover:bg-raisin-black/5'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <button className={`p-2 rounded-lg transition-all duration-300 relative ${
                  isOlive 
                    ? 'text-raisin-black/70 hover:text-raisin-black hover:bg-raisin-black/5' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}>
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* User menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <img
                      className="h-9 w-9 rounded-full ring-2 ring-offset-1 ring-gray-300 bg-gray-300"
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
                      alt={user?.name}
                    />
                    <span className={`font-medium hidden md:block ${
                      isOlive ? 'text-raisin-black' : 'text-white'
                    }`}>
                      {user?.name}
                    </span>
                  </button>

                  {/* Enhanced Dropdown menu */}
                  {isUserMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-3 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black/5 border border-gray-100 overflow-hidden backdrop-blur-md">
                      <div className="py-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                        {userNavigation.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                              <Icon className="h-4 w-4 mr-3 text-gray-400" />
                              {item.name}
                            </Link>
                          );
                        })}
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isOlive 
                      ? 'text-raisin-black/70 hover:text-raisin-black hover:bg-raisin-black/5' 
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Sign in
                </Link>
                
                {/* Signup Dropdown */}
                <div className="relative" ref={signupDropdownRef}>
                  <button
                    onClick={() => setIsSignupDropdownOpen(!isSignupDropdownOpen)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                      isOlive 
                        ? 'bg-gradient-to-r from-olive-beige to-olive-beige/90 text-raisin-black hover:from-olive-beige/90 hover:to-olive-beige shadow-lg hover:shadow-xl' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <span>Sign up</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isSignupDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Signup Dropdown Menu */}
                  {isSignupDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-3 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black/5 border border-gray-100 overflow-hidden backdrop-blur-md z-50">
                      <div className="py-2">
                        <Link
                          to="/register"
                          onClick={() => setIsSignupDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Search className="h-4 w-4 mr-3 text-gray-400" />
                          <div>
                            <div className="font-medium">I am looking for a job</div>
                            <div className="text-xs text-gray-500">Join as a candidate</div>
                          </div>
                        </Link>
                        <Link
                          to="/company-registration"
                          onClick={() => setIsSignupDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <Building2 className="h-4 w-4 mr-3 text-gray-400" />
                          <div>
                            <div className="font-medium">I am looking for candidates</div>
                            <div className="text-xs text-gray-500">Join as a company</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden ml-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                  isOlive 
                    ? 'text-raisin-black/70 hover:text-raisin-black hover:bg-raisin-black/5' 
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center pl-3 pr-4 py-2 text-base font-medium border-l-4 transition-colors ${
                    location.pathname === item.href
                      ? 'border-primary-600 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
            
            {/* Mobile Auth Section */}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                >
                  <User className="h-5 w-5 mr-3" />
                  Sign in
                </Link>
                <div className="px-3 py-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Sign up as:</div>
                  <div className="space-y-2">
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center w-full pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg"
                    >
                      <Search className="h-4 w-4 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Job Seeker</div>
                        <div className="text-xs text-gray-500">Looking for a job</div>
                      </div>
                    </Link>
                    <Link
                      to="/company-registration"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center w-full pl-3 pr-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg"
                    >
                      <Building2 className="h-4 w-4 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Company</div>
                        <div className="text-xs text-gray-500">Looking for candidates</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isAuthenticated && (
            <>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <img
                    className="h-10 w-10 rounded-full bg-gray-300"
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=3b82f6&color=fff`}
                    alt={user?.name}
                  />
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  {userNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
