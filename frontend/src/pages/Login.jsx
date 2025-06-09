import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, LogIn, User, Briefcase, Shield, Chrome, Github, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

// Custom CSS for animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(-10px) rotate(-1deg); }
  }
  
  @keyframes pulse-subtle {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  @keyframes fade-in-left {
    0% { opacity: 0; transform: translateX(-30px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fade-in-right {
    0% { opacity: 0; transform: translateX(30px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slide-in-bottom {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .float-animation {
    animation: float 6s ease-in-out infinite;
  }
  
  .float-delay-1 {
    animation-delay: -2s;
  }
  
  .float-delay-2 {
    animation-delay: -4s;
  }
  
  .pulse-subtle {
    animation: pulse-subtle 2s ease-in-out infinite;
  }
  
  .animate-fade-in-left {
    animation: fade-in-left 0.8s ease-out;
  }
  
  .animate-fade-in-right {
    animation: fade-in-right 0.8s ease-out;
  }
  
  .animate-slide-in-bottom {
    animation: slide-in-bottom 0.6s ease-out;
  }
  
  .gradient-background {
    background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
    background-size: 400% 400%;
    animation: gradient-shift 15s ease infinite;
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
    <div className="min-h-screen bg-white flex">
      {/* Inject custom styles */}
      <style>{customStyles}</style>
      
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Back button */}
          <div className="mb-8 animate-fade-in-left">
            <Link 
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </div>

          {/* Logo and heading */}
          <div className="animate-fade-in-left" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Career Flow</h1>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600 mb-8">
              Sign in to your account to continue
            </p>
          </div>

          {/* Demo login buttons */}
          <div className="mb-8 animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleDemoLogin('jobseeker')}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50"
              >
                <User className="w-4 h-4 mr-2 text-blue-600" />
                Job Seeker Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('employer')}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50"
              >
                <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
                Employer Demo
              </button>
            </div>

            {/* OAuth buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                <Github className="w-5 h-5 mr-3" />
                Continue with GitHub
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8 animate-fade-in-left" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-left" style={{ animationDelay: "0.4s" }}>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>{errors.general}</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-3 pr-10 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/25 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-8 text-center animate-fade-in-left" style={{ animationDelay: "0.5s" }}>
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Geometric Illustration */}
      <div className="hidden lg:block relative w-0 flex-1 gradient-background">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Floating geometric shapes */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Large circle */}
            <div className="absolute w-64 h-64 bg-white/20 backdrop-blur-sm rounded-full float-animation"></div>
            
            {/* Medium circles */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-white/30 backdrop-blur-sm rounded-full float-animation float-delay-1"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/25 backdrop-blur-sm rounded-full float-animation float-delay-2"></div>
            
            {/* Triangles */}
            <div className="absolute top-32 left-32 w-16 h-16 bg-white/20 backdrop-blur-sm transform rotate-45 float-animation float-delay-1"></div>
            <div className="absolute bottom-32 right-32 w-20 h-20 bg-white/25 backdrop-blur-sm transform rotate-12 float-animation"></div>
            
            {/* Rectangles */}
            <div className="absolute top-1/4 left-1/2 w-12 h-32 bg-white/15 backdrop-blur-sm rounded-lg transform -rotate-12 float-animation float-delay-2"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-12 bg-white/20 backdrop-blur-sm rounded-lg transform rotate-45 float-animation float-delay-1"></div>
            
            {/* Small dots */}
            <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/40 rounded-full pulse-subtle"></div>
            <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white/50 rounded-full pulse-subtle" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-2/3 left-1/2 w-8 h-8 bg-white/30 rounded-full pulse-subtle" style={{ animationDelay: "0.5s" }}></div>
            
            {/* Central content */}
            <div className="relative z-10 text-center text-white animate-fade-in-right" style={{ animationDelay: "0.6s" }}>
              <div className="mb-8">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Find Your Dream Job</h2>
                <p className="text-xl text-white/90 max-w-md mx-auto leading-relaxed">
                  Connect with top companies and discover opportunities that match your skills and aspirations.
                </p>
              </div>
              
              <div className="space-y-4 text-white/80">
                <div className="flex items-center justify-center">
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Secure & Trusted Platform</span>
                </div>
                <div className="flex items-center justify-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>10,000+ Active Job Seekers</span>
                </div>
                <div className="flex items-center justify-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  <span>500+ Partner Companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
