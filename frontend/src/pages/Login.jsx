import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, LogIn, User, Briefcase, Shield } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

// Custom CSS for animations
const customStyles = `
  @keyframes pulse-animation {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
  
  @keyframes fade-in-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-up {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .pulse-animation {
    animation: pulse-animation 0.5s ease-in-out;
  }
  
  .animate-bounce-subtle {
    animation: bounce-subtle 1.5s infinite ease-in-out;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out;
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out;
  }
`;

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ general: result.error || 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (userType) => {
    setIsLoading(true);
    const demoCredentials = {
      jobseeker: { email: 'demo@jobseeker.com', password: 'demo123' },
      employer: { email: 'demo@employer.com', password: 'demo123' }
    };

    try {
      const result = await login(
        demoCredentials[userType].email, 
        demoCredentials[userType].password
      );
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ general: result.error || 'Demo login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Demo login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Inject custom styles */}
      <style>{customStyles}</style>
      
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>
      
      <div className="max-w-md mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-amber-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl animate-bounce-subtle transform rotate-12 hover:rotate-0 transition-transform duration-500 border-4 border-white/20">
            <LogIn className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4 animate-pulse">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm py-2">
            Sign in to your account and continue your journey
          </p>
          <p className="mt-4 text-gray-300">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-semibold text-amber-400 hover:text-amber-300 transition-colors duration-200 relative group"
            >
              Create one here
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 animate-slide-up text-white relative z-10">
          {/* Demo Login Buttons */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-amber-400" />
                <p className="text-sm text-gray-200 font-medium">Quick Demo Access</p>
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleDemoLogin('jobseeker')}
                disabled={isLoading}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:transform-none border border-blue-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Job Seeker</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('employer')}
                disabled={isLoading}
                className="group relative overflow-hidden bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:transform-none border border-pink-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">Employer</span>
                </div>
              </button>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-500/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 text-gray-300 rounded-full">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-900/70 border-2 border-red-500/50 text-red-100 px-6 py-4 rounded-xl relative animate-pulse shadow-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3 text-red-400" />
                  <span className="font-medium text-lg">{errors.general}</span>
                </div>
              </div>
            )}

            <div className="group animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <label htmlFor="email" className="block text-sm font-bold text-gray-100 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors duration-200 group-focus-within:text-amber-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-12 block w-full border-2 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 bg-indigo-800/50 focus:bg-indigo-700/70 text-lg ${
                    errors.email ? 'border-red-500/50 bg-red-900/20' : 'border-indigo-500/30'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="group animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <label htmlFor="password" className="block text-sm font-bold text-gray-100 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors duration-200 group-focus-within:text-amber-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-12 pr-12 block w-full border-2 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 bg-indigo-800/50 focus:bg-indigo-700/70 text-lg ${
                    errors.password ? 'border-red-500/50 bg-red-900/20' : 'border-indigo-500/30'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-500 rounded bg-indigo-800/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-amber-400 hover:text-amber-300 transition-colors duration-200 relative group"
                >
                  Forgot password?
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/50 disabled:transform-none disabled:shadow-none overflow-hidden animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
          <div className="flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-amber-400 mr-2" />
            <h3 className="text-sm font-bold text-amber-400">Demo Account Credentials</h3>
            <Shield className="w-5 h-5 text-amber-400 ml-2" />
          </div>
          <div className="text-xs text-gray-300 space-y-2">
            <div className="bg-indigo-800/30 rounded-lg p-3 border border-indigo-600/30">
              <p className="text-cyan-300 font-semibold">👤 Job Seeker Demo:</p>
              <p className="text-gray-200">📧 demo@jobseeker.com</p>
              <p className="text-gray-200">🔑 demo123</p>
            </div>
            <div className="bg-indigo-800/30 rounded-lg p-3 border border-indigo-600/30">
              <p className="text-pink-300 font-semibold">🏢 Employer Demo:</p>
              <p className="text-gray-200">📧 demo@employer.com</p>
              <p className="text-gray-200">🔑 demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
