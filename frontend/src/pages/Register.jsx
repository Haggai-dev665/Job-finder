import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

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
  
  .pulse-animation {
    animation: pulse-animation 0.5s ease-in-out;
  }
  
  .animate-bounce-subtle {
    animation: bounce-subtle 1.5s infinite ease-in-out;
  }
  
  .country-dropdown select option,
  .region-dropdown select option {
    background-color: #312e81;
    color: white;
    padding: 10px;
  }
  
  .country-dropdown:hover select,
  .region-dropdown:hover select {
    box-shadow: 0 0 15px rgba(251, 191, 36, 0.2);
  }
`;
import { 
  User, 
  Mail, 
  Lock, 
  Building, 
  MapPin, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  Shield,
  Users,
  Briefcase,
  Star,
  Zap,
  Award,
  Sparkles,
  Globe,
  Code
} from 'lucide-react';

const Register = () => {
  // Remove any stale dropdown style sheets that might be causing icon duplication
  useEffect(() => {
    // Clean up any potential style conflicts when component mounts
    const cleanup = () => {
      // Remove any browser-injected styles that might be conflicting
      const styleSheets = document.styleSheets;
      for (let i = 0; i < styleSheets.length; i++) {
        try {
          const rules = styleSheets[i].cssRules || styleSheets[i].rules;
          if (rules) {
            for (let j = 0; j < rules.length; j++) {
              // Look for rules affecting our dropdowns
              if (rules[j].selectorText && 
                  (rules[j].selectorText.includes('select') || 
                   rules[j].selectorText.includes('dropdown'))) {
                // If we find any that add backgrounds or arrows, try to neutralize them
                if (rules[j].style && rules[j].style.backgroundImage) {
                  rules[j].style.backgroundImage = 'none';
                }
              }
            }
          }
        } catch (e) {
          // Cross-origin stylesheets will throw errors, just ignore them
        }
      }
    };
    
    cleanup();
    
    return () => {
      // No cleanup needed when unmounting
    };
  }, []);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate',
    company: '',
    country: '',
    city: '',
    skills: [],
    frontendSkills: [],
    jobTypes: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [frontendSkillInput, setFrontendSkillInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
    isValid: false
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];
    
    if (password.length >= 8) {
      score += 1;
      feedback.push('At least 8 characters');
    } else {
      feedback.push('At least 8 characters');
    }
    
    if (/[A-Z]/.test(password)) {
      score += 1;
      feedback.push('Uppercase letter');
    } else {
      feedback.push('Uppercase letter');
    }
    
    if (/[a-z]/.test(password)) {
      score += 1;
      feedback.push('Lowercase letter');
    } else {
      feedback.push('Lowercase letter');
    }
    
    if (/\d/.test(password)) {
      score += 1;
      feedback.push('Number');
    } else {
      feedback.push('Number');
    }
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
      feedback.push('Special character');
    } else {
      feedback.push('Special character');
    }

    return {
      score,
      feedback: feedback.slice(0, 5),
      isValid: score >= 3
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: parseInt(value) || value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillAdd = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()]
        }));
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  const handleFrontendSkillAdd = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (frontendSkillInput.trim() && !formData.frontendSkills.includes(frontendSkillInput.trim())) {
        setFormData(prev => ({
          ...prev,
          frontendSkills: [...prev.frontendSkills, frontendSkillInput.trim()]
        }));
        setFrontendSkillInput('');
      }
    }
  };

  const removeFrontendSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      frontendSkills: prev.frontendSkills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  const countryDropdownRef = useRef(null);
  const regionDropdownRef = useRef(null);

  // Apply custom styles to dropdowns
  useEffect(() => {
    const styleDropdowns = () => {
      // Get all country and region select elements
      const countrySelectElement = document.querySelector('.country-dropdown select');
      const regionSelectElement = document.querySelector('.region-dropdown select');
      
      if (countrySelectElement) {
        // Store a reference to the select element
        countryDropdownRef.current = countrySelectElement;
        
        // Apply custom styles
        countrySelectElement.style.backgroundImage = 'none';
        countrySelectElement.style.backgroundColor = 'transparent';
      }
      
      if (regionSelectElement) {
        // Store a reference to the select element
        regionDropdownRef.current = regionSelectElement;
        
        // Apply custom styles
        regionSelectElement.style.backgroundImage = 'none';
        regionSelectElement.style.backgroundColor = 'transparent';
      }
    };
    
    // Apply styles after a short delay to ensure elements are rendered
    const timeoutId = setTimeout(styleDropdowns, 100);
    
    return () => clearTimeout(timeoutId);
  }, [formData.country]); // Re-run when country changes to style the region dropdown as well

  const selectCountry = (val) => {
    setFormData(prev => ({
      ...prev,
      country: val,
      city: '' // Reset city when country changes
    }));
    
    // Trigger animation effect when country is selected
    if (val && countryDropdownRef.current) {
      // Apply our animation
      countryDropdownRef.current.classList.add('pulse-animation');
      
      // Make sure any browser default styling is removed again
      countryDropdownRef.current.style.backgroundImage = 'none';
      countryDropdownRef.current.style.backgroundColor = 'transparent';
      
      // Remove the animation after it completes
      setTimeout(() => {
        if (countryDropdownRef.current) {
          countryDropdownRef.current.classList.remove('pulse-animation');
        }
      }, 500);
    }
    
    // This will also fix any potential UI glitches with the dropdown
    setTimeout(() => {
      const countrySelect = document.querySelector('.country-dropdown select');
      if (countrySelect) {
        countrySelect.style.backgroundImage = 'none';
        countrySelect.style.backgroundColor = 'transparent';
      }
    }, 100);
  };
  
  const selectPopularCountry = (countryCode) => {
    selectCountry(countryCode);
  };

  const selectCity = (val) => {
    setFormData(prev => ({
      ...prev,
      city: val
    }));
    
    // Trigger animation effect when city is selected
    if (val && regionDropdownRef.current) {
      // Apply our animation
      regionDropdownRef.current.classList.add('pulse-animation');
      
      // Make sure any browser default styling is removed again
      regionDropdownRef.current.style.backgroundImage = 'none';
      regionDropdownRef.current.style.backgroundColor = 'transparent';
      
      setTimeout(() => {
        if (regionDropdownRef.current) {
          regionDropdownRef.current.classList.remove('pulse-animation');
        }
      }, 500);
    }
    
    // This will also fix any potential UI glitches with the dropdown
    setTimeout(() => {
      const regionSelect = document.querySelector('.region-dropdown select');
      if (regionSelect) {
        regionSelect.style.backgroundImage = 'none';
        regionSelect.style.backgroundColor = 'transparent';
      }
    }, 100);
  };

  const handleJobTypeChange = (jobType) => {
    setFormData(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(jobType)
        ? prev.jobTypes.filter(type => type !== jobType)
        : [...prev.jobTypes, jobType]
    }));
  };
  
  const selectSuggestedFrontendSkill = (skill) => {
    if (!formData.frontendSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        frontendSkills: [...prev.frontendSkills, skill]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!passwordStrength.isValid) {
      setError('Password does not meet strength requirements');
      return;
    }

    setLoading(true);
    
    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      company: formData.company,
      location: {
        country: formData.country,
        city: formData.city
      },
      preferences: {
        skills: formData.skills,
        frontendSkills: formData.frontendSkills,
        jobTypes: formData.jobTypes
      }
    });

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed');
    }
    
    setLoading(false);
  };

  const jobTypes = [
    { id: 'full-time', label: 'Full Time', icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { id: 'part-time', label: 'Part Time', icon: Users, color: 'from-green-500 to-green-600' },
    { id: 'contract', label: 'Contract', icon: Award, color: 'from-purple-500 to-purple-600' },
    { id: 'remote', label: 'Remote', icon: Zap, color: 'from-orange-500 to-orange-600' },
    { id: 'hybrid', label: 'Hybrid', icon: Sparkles, color: 'from-pink-500 to-pink-600' },
    { id: 'internship', label: 'Internship', icon: Star, color: 'from-indigo-500 to-indigo-600' }
  ];

  // Suggested frontend technologies for quick selection
  const suggestedFrontendSkills = [
    { name: 'React', color: 'from-blue-500 to-blue-600' },
    { name: 'Vue', color: 'from-green-500 to-green-600' },
    { name: 'Angular', color: 'from-red-500 to-red-600' },
    { name: 'TypeScript', color: 'from-blue-600 to-blue-700' },
    { name: 'JavaScript', color: 'from-yellow-500 to-yellow-600' },
    { name: 'CSS', color: 'from-blue-400 to-blue-500' },
    { name: 'Sass', color: 'from-pink-500 to-pink-600' },
    { name: 'Tailwind', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Redux', color: 'from-purple-500 to-purple-600' },
    { name: 'Next.js', color: 'from-gray-800 to-gray-900' },
    { name: 'HTML', color: 'from-orange-500 to-orange-600' }
  ];
  
  // Popular countries for job seekers for quick selection
  const popularCountries = [
    { name: 'United States', code: 'US', flag: '🇺🇸', color: 'from-blue-500 to-red-500' },
    { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', color: 'from-blue-600 to-red-600' },
    { name: 'Canada', code: 'CA', flag: '🇨🇦', color: 'from-red-500 to-white' },
    { name: 'Australia', code: 'AU', flag: '🇦🇺', color: 'from-blue-600 to-red-600' },
    { name: 'Germany', code: 'DE', flag: '🇩🇪', color: 'from-black to-red-600' },
    { name: 'India', code: 'IN', flag: '🇮🇳', color: 'from-orange-500 to-green-600' },
    { name: 'France', code: 'FR', flag: '🇫🇷', color: 'from-blue-600 to-red-600' },
    { name: 'Singapore', code: 'SG', flag: '🇸🇬', color: 'from-red-600 to-white' },
    { name: 'Japan', code: 'JP', flag: '🇯🇵', color: 'from-white to-red-600' },
    { name: 'Brazil', code: 'BR', flag: '🇧🇷', color: 'from-green-600 to-yellow-500' },
    { name: 'South Africa', code: 'ZA', flag: '🇿🇦', color: 'from-green-600 to-red-600' },
    { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', color: 'from-green-600 to-black' }
  ];

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 1) return 'bg-gradient-to-r from-red-600 to-red-500';
    if (passwordStrength.score <= 2) return 'bg-gradient-to-r from-orange-600 to-orange-500';
    if (passwordStrength.score <= 3) return 'bg-gradient-to-r from-amber-600 to-amber-500';
    if (passwordStrength.score <= 4) return 'bg-gradient-to-r from-cyan-600 to-cyan-500';
    return 'bg-gradient-to-r from-green-600 to-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 1) return 'Very Weak';
    if (passwordStrength.score <= 2) return 'Weak';
    if (passwordStrength.score <= 3) return 'Fair';
    if (passwordStrength.score <= 4) return 'Good';
    return 'Strong';
  };

  // Custom styles for responsive dropdowns
  useEffect(() => {
    // Apply custom styles to select elements created by the library
    const enhanceDropdowns = () => {
      const selects = document.querySelectorAll('select');
      
      selects.forEach(select => {
        // Only apply if not already enhanced
        if (!select.classList.contains('enhanced')) {
          select.classList.add('enhanced');
          
          // Make sure text is properly visible
          select.style.color = 'inherit';
          select.style.WebkitAppearance = 'none';
          select.style.MozAppearance = 'none';
          select.style.appearance = 'none';
          
          // Fix for the default arrow/icon issue
          select.style.backgroundImage = 'none !important'; 
          select.style.backgroundColor = 'transparent !important';
          
          // Remove any unwanted browser defaults that might be causing issues
          select.style.border = 'none';
          select.style.outline = 'none';
          select.style.boxShadow = 'none';
          
          // Ensure proper sizing on mobile
          select.style.maxWidth = '100%';
          select.style.textOverflow = 'ellipsis';
          
          // Enhanced touch targets for mobile
          select.style.paddingTop = '16px';
          select.style.paddingBottom = '16px';
          
          // Add event listeners for focus/blur effects
          select.addEventListener('focus', () => {
            select.parentElement.classList.add('dropdown-focused');
            
            // Enhance the parent container with a pulse effect
            const container = select.closest('.relative');
            if (container) {
              container.classList.add('pulse-animation');
              setTimeout(() => {
                container.classList.remove('pulse-animation');
              }, 500);
            }
          });
          
          select.addEventListener('blur', () => {
            select.parentElement.classList.remove('dropdown-focused');
          });
          
          // Handle change event
          select.addEventListener('change', () => {
            if (select.value) {
              select.classList.add('has-value');
              select.style.color = 'white';
              select.style.fontWeight = 'bold';
            } else {
              select.classList.remove('has-value');
            }
            
            // Trigger animation effect on change
            select.classList.add('pulse-animation');
            setTimeout(() => {
              select.classList.remove('pulse-animation');
            }, 500);
          });
        }
      });
    };
    
    // Run once on mount and then whenever country changes
    enhanceDropdowns();
    
    // Set up a mutation observer to detect when the dropdowns are injected/updated
    const observer = new MutationObserver(enhanceDropdowns);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [formData.country]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Inject custom styles */}
      <style>
        {`
          @keyframes pulse-animation {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.2); }
            50% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.5); }
          }
          
          @keyframes border-pulse {
            0%, 100% { border-color: rgba(79, 70, 229, 0.3); }
            50% { border-color: rgba(251, 191, 36, 0.5); }
          }
          
          @keyframes slide-up {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes slide-in-right {
            0% { transform: translateX(20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes slide-in-left {
            0% { transform: translateX(-20px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes scale-in {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          .pulse-animation {
            animation: pulse-animation 0.5s ease-in-out;
          }
          
          .animate-bounce-subtle {
            animation: bounce-subtle 1.5s infinite ease-in-out;
          }
          
          .animate-glow {
            animation: glow 2s infinite ease-in-out;
          }
          
          .animate-border-pulse {
            animation: border-pulse 2s infinite ease-in-out;
          }
          
          .animate-slide-up {
            animation: slide-up 0.6s ease-out forwards;
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          
          .animate-slide-in-right {
            animation: slide-in-right 0.5s ease-out forwards;
          }
          
          .animate-slide-in-left {
            animation: slide-in-left 0.5s ease-out forwards;
          }
          
          .animate-scale-in {
            animation: scale-in 0.5s ease-out forwards;
          }
          
          /* Fix for duplicate icons and cleaner dropdowns */
          .country-dropdown select,
          .region-dropdown select {
            background-image: none !important;
            background-color: transparent !important;
            border: none;
            outline: none !important;
            box-shadow: none !important;
          }
          
          .country-dropdown select option,
          .region-dropdown select option {
            background-color: #312e81;
            color: white;
            padding: 10px;
          }
          
          .country-dropdown:hover select,
          .region-dropdown:hover select {
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.2);
          }
          
          /* Override any browser defaults that might be causing icon duplication */
          .country-dropdown select::-ms-expand,
          .region-dropdown select::-ms-expand {
            display: none !important;
          }
          
          .dropdown-focused {
            box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.3);
          }
          
          /* Mobile optimizations */
          @media (max-width: 640px) {
            .country-dropdown select,
            .region-dropdown select {
              font-size: 16px; /* Prevents zoom on iOS */
              padding-top: 14px;
              padding-bottom: 14px;
            }
            
            /* Better touch targets on mobile */
            .country-dropdown,
            .region-dropdown {
              min-height: 60px;
            }
          }
          
          /* Style improvements for select values */
          .has-value {
            font-weight: bold;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            letter-spacing: 0.01em;
          }
          
          /* Remove default focus styles and replace with our own */
          select:focus {
            outline: none !important;
          }
          
          /* Make scrollbars look nicer in dropdowns */
          select::-webkit-scrollbar {
            width: 8px;
          }
          
          select::-webkit-scrollbar-track {
            background: rgba(30, 27, 75, 0.8);
          }
          
          select::-webkit-scrollbar-thumb {
            background: rgba(251, 191, 36, 0.5);
            border-radius: 4px;
          }
          
          select::-webkit-scrollbar-thumb:hover {
            background: rgba(251, 191, 36, 0.7);
          }
        `}
      </style>
      
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-500/40 to-purple-500/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-amber-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl animate-bounce-subtle transform rotate-12 hover:rotate-0 transition-transform duration-500 border-4 border-white/20">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4 animate-pulse">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm py-2">
            Create your account and discover thousands of amazing opportunities across all career fields
          </p>
          <p className="mt-4 text-gray-300">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-amber-400 hover:text-amber-300 transition-colors duration-200 relative group"
            >
              Sign in here
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </p>
        </div>

        <form className="space-y-8 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/20 animate-slide-up text-white relative z-10" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/70 border-2 border-red-500/50 text-red-100 px-6 py-4 rounded-xl relative animate-shake shadow-lg">
              <div className="flex items-center">
                <X className="w-6 h-6 mr-3 text-red-400" />
                <span className="font-medium text-lg">{error}</span>
              </div>
            </div>
          )}

          {/* Role Selection */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <label className="block text-lg font-bold text-white mb-6">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-6">
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={formData.role === 'candidate'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-8 rounded-2xl border-3 cursor-pointer transition-all duration-300 text-center group-hover:shadow-xl ${
                  formData.role === 'candidate' 
                    ? 'border-amber-400 bg-gradient-to-br from-blue-600 to-cyan-600 shadow-xl transform scale-105' 
                    : 'border-gray-500 hover:border-amber-300 bg-indigo-800/50 hover:bg-gradient-to-br hover:from-blue-800/50 hover:to-cyan-800/50'
                }`}>
                  <User className={`w-12 h-12 mx-auto mb-4 ${formData.role === 'candidate' ? 'text-amber-400' : 'text-gray-300'} transition-colors duration-300`} />
                  <span className={`text-lg font-bold block text-white`}>
                    Job Seeker
                  </span>
                  <span className={`text-sm ${formData.role === 'candidate' ? 'text-amber-300' : 'text-gray-400'} block mt-2`}>
                    Find your dream job
                  </span>
                </div>
              </label>
              <label className="group cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={formData.role === 'employer'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`p-8 rounded-2xl border-3 cursor-pointer transition-all duration-300 text-center group-hover:shadow-xl ${
                  formData.role === 'employer' 
                    ? 'border-amber-400 bg-gradient-to-br from-pink-600 to-rose-600 shadow-xl transform scale-105' 
                    : 'border-gray-500 hover:border-amber-300 bg-indigo-800/50 hover:bg-gradient-to-br hover:from-pink-800/50 hover:to-rose-800/50'
                }`}>
                  <Building className={`w-12 h-12 mx-auto mb-4 ${formData.role === 'employer' ? 'text-amber-400' : 'text-gray-300'} transition-colors duration-300`} />
                  <span className={`text-lg font-bold block text-white`}>
                    Employer
                  </span>
                  <span className={`text-sm ${formData.role === 'employer' ? 'text-amber-300' : 'text-gray-400'} block mt-2`}>
                    Hire top talent
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            <div className="space-y-6">
              <div className="group">
                <label htmlFor="firstName" className="block text-sm font-bold text-gray-100 mb-3">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors duration-200 group-focus-within:text-amber-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="pl-12 block w-full border-2 border-indigo-500/30 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 bg-indigo-800/50 focus:bg-indigo-700/70 text-lg"
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="lastName" className="block text-sm font-bold text-gray-100 mb-3">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors duration-200 group-focus-within:text-amber-400" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="pl-12 block w-full border-2 border-indigo-500/30 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 bg-indigo-800/50 focus:bg-indigo-700/70 text-lg"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-bold text-gray-100 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors duration-200 group-focus-within:text-amber-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-12 block w-full border-2 border-indigo-500/30 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 bg-indigo-800/50 focus:bg-indigo-700/70 text-lg"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {formData.role === 'employer' && (
                <div className="group animate-slide-down">
                  <label htmlFor="company" className="block text-sm font-bold text-gray-100 mb-3">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors duration-200 group-focus-within:text-amber-400" />
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="pl-12 block w-full border-2 border-indigo-500/30 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 bg-indigo-800/50 focus:bg-indigo-700/70 text-lg"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Location section header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-amber-400">Your Location</h3>
                  <div className="relative group">
                    <button 
                      type="button"
                      className="text-gray-400 hover:text-amber-400 bg-indigo-800/30 rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ?
                    </button>
                    <div className="absolute right-0 w-64 p-3 bg-indigo-900/90 backdrop-blur-sm rounded-xl border border-indigo-500/30 text-xs text-white transform translate-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50 shadow-xl">
                      <div className="flex items-start mb-2">
                        <svg className="w-4 h-4 text-amber-400 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>Your location helps us find relevant job opportunities near you and allows employers to match with candidates in their target regions.</p>
                      </div>
                      <div className="flex items-center text-amber-300 text-xs">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Your location data is protected and private
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="country" className="block text-sm font-bold text-gray-100 mb-3 flex items-center justify-between">
                    <span>Country</span>
                    {formData.country && (
                      <span className="ml-auto text-xs bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full flex items-center">
                        <Check className="w-3 h-3 mr-1" /> Selected
                      </span>
                    )}
                  </label>
                  <div className={`relative rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 ${formData.country ? 'animate-glow shadow-amber-400/20' : 'hover:shadow-amber-500/20 group-focus-within:shadow-amber-400/30'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-blue-500/10 opacity-50 z-0"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${formData.country ? 'from-amber-700/20 to-indigo-800/40 animate-border-pulse' : 'from-indigo-700/30 to-purple-800/30'} opacity-80 z-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <div className="relative z-10 country-dropdown">
                      <CountryDropdown
                        value={formData.country}
                        onChange={selectCountry}
                        classes={`block w-full border-2 ${formData.country ? 'border-amber-500/50 bg-indigo-700/70' : 'border-indigo-500/30 bg-indigo-800/50'} rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 focus:bg-indigo-700/70 text-lg appearance-none cursor-pointer backdrop-blur-md ${formData.country ? 'has-value' : ''}`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <div className="relative">
                          <svg className={`w-5 h-5 text-amber-400 ${formData.country ? '' : 'animate-bounce-subtle'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          <div className="absolute -inset-1 bg-amber-400/20 rounded-full blur-md -z-10"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Popular Countries Quick Select */}
                  {!formData.country && (
                    <div className="mt-3 animate-fade-in">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-300">Popular locations:</p>
                        <div>
                          <span className="text-xs text-amber-400">Quick select</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {popularCountries.slice(0, 8).map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => selectPopularCountry(country.name)}
                            className={`inline-flex items-center px-3 py-2.5 bg-gradient-to-r ${country.color} bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm text-white border border-white/10 transition-all hover:border-amber-400/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer group`}
                          >
                            <span className="mr-2 text-lg group-hover:scale-125 transition-transform duration-300 w-6 h-6 flex items-center justify-center">{country.flag}</span>
                            <span className="font-medium truncate">{country.name}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Show More Countries Button */}
                      <div className="mt-2 text-center">
                        <button 
                          type="button" 
                          onClick={() => document.getElementById('more-countries-modal').classList.toggle('hidden')}
                          className="inline-flex items-center text-xs text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <span>Show more countries</span>
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* More Countries Modal (Hidden by Default) */}
                      <div id="more-countries-modal" className="hidden mt-3 p-3 bg-indigo-900/80 backdrop-blur-sm rounded-xl border border-indigo-500/30 animate-fade-in">
                        <div className="mb-2 flex justify-between items-center">
                          <h4 className="text-sm font-bold text-white">All Countries</h4>
                          <button 
                            type="button"
                            onClick={() => document.getElementById('more-countries-modal').classList.add('hidden')}
                            className="text-gray-400 hover:text-white"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                          {popularCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                selectPopularCountry(country.name);
                                document.getElementById('more-countries-modal').classList.add('hidden');
                              }}
                              className={`inline-flex items-center px-2 py-1.5 hover:bg-indigo-700/50 rounded-lg text-xs text-white transition-all hover:shadow-md group`}
                            >
                              <span className="mr-1.5 text-base">{country.flag}</span>
                              <span className="truncate">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="group">
                  <label htmlFor="city" className="block text-sm font-bold text-gray-100 mb-3 flex items-center justify-between">
                    <span>City/Town</span>
                    {formData.city && (
                      <span className="ml-auto text-xs bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full flex items-center">
                        <Check className="w-3 h-3 mr-1" /> Selected
                      </span>
                    )}
                  </label>
                  <div className={`relative rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 ${!formData.country ? 'opacity-80' : formData.city ? 'animate-glow shadow-amber-400/20' : 'hover:shadow-amber-500/20'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-50 z-0"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${!formData.country ? 'from-gray-700/30 to-gray-800/30' : formData.city ? 'from-amber-700/20 to-indigo-800/40 animate-border-pulse' : 'from-blue-700/30 to-indigo-800/30'} opacity-80 z-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Decorative elements that only appear when city is selected */}
                    {formData.city && (
                      <>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/50 to-pink-500/50"></div>
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-amber-500/20 rounded-full blur-xl"></div>
                      </>
                    )}
                    
                    <div className="relative z-10 region-dropdown">
                      <RegionDropdown
                        country={formData.country}
                        value={formData.city}
                        onChange={selectCity}
                        disabled={!formData.country}
                        classes={`block w-full border-2 ${!formData.country ? 'border-gray-600/50 bg-gray-800/50 text-gray-400' : formData.city ? 'border-amber-500/50 bg-indigo-700/70 text-white has-value' : 'border-indigo-500/30 bg-indigo-800/50 text-white'} rounded-xl py-4 px-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 focus:bg-indigo-700/70 text-lg appearance-none cursor-pointer`}
                        blankOptionLabel={formData.country ? "Select city/town" : "Select a country first"}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <div className="relative">
                          <svg className={`w-5 h-5 ${!formData.country ? 'text-gray-500' : formData.city ? 'text-amber-400' : 'text-amber-400 animate-bounce-subtle'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          {formData.country && (
                            <div className="absolute -inset-1 bg-amber-400/20 rounded-full blur-md -z-10"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Custom city input field that appears if needed */}
                  {formData.country && formData.city === "Not Listed" && (
                    <div className="mt-3 animate-fade-in">
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                        <input
                          type="text"
                          name="customCity"
                          placeholder="Enter your city/town"
                          className="pl-12 block w-full border-2 border-amber-500/30 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 bg-indigo-800/50 focus:bg-indigo-700/70 text-md"
                          onChange={(e) => setFormData(prev => ({ ...prev, customCity: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Current location option */}
                  {formData.country && !formData.city && (
                    <div className="mt-3 flex justify-center">
                      <button 
                        type="button"
                        onClick={() => {
                          // In a real implementation, this would use the browser's geolocation API
                          // and a reverse geocoding service to get the user's city
                          setFormData(prev => ({ ...prev, city: "Auto-detected location" }));
                          
                          // For this demo, we'll just show a success message after a delay
                          setTimeout(() => {
                            const citySelect = document.querySelector('.region-dropdown select');
                            if (citySelect) {
                              citySelect.classList.add('pulse-animation');
                              setTimeout(() => citySelect.classList.remove('pulse-animation'), 500);
                            }
                          }, 500);
                        }}
                        className="inline-flex items-center text-sm text-amber-400 hover:text-amber-300 bg-indigo-800/30 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-indigo-700/50 border border-amber-500/20 hover:border-amber-500/40"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Use my current location
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label htmlFor="password" className="block text-sm font-bold text-gray-100 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors duration-200 group-focus-within:text-amber-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-12 pr-12 block w-full border-2 border-indigo-500/30 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 bg-indigo-800/50 focus:bg-indigo-700/70 text-lg"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2 bg-indigo-900/50 p-3 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-200">Password Strength</span>
                      <span className={`text-sm font-bold ${
                        passwordStrength.score <= 1 ? 'text-red-400' : 
                        passwordStrength.score <= 2 ? 'text-orange-400' : 
                        passwordStrength.score <= 3 ? 'text-amber-400' : 
                        passwordStrength.score <= 4 ? 'text-cyan-400' : 'text-green-400'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-indigo-950 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {passwordStrength.feedback.map((requirement, index) => (
                        <div key={requirement} className="flex items-center">
                          {passwordStrength.score > index ? 
                            <Check className="w-3 h-3 text-green-400 mr-1" /> : 
                            <X className="w-3 h-3 text-gray-500 mr-1" />
                          }
                          <span className={passwordStrength.score > index ? 'text-green-300' : 'text-gray-400'}>
                            {requirement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="group">
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-100 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300 transition-colors duration-200 group-focus-within:text-amber-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-12 pr-12 block w-full border-2 border-indigo-500/30 rounded-xl py-4 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-400 transition-all duration-300 hover:border-indigo-400/50 bg-indigo-800/50 focus:bg-indigo-700/70 text-lg"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400 flex items-center bg-red-900/30 p-2 rounded-lg">
                    <X className="w-4 h-4 mr-1" />
                    Passwords do not match
                  </p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && formData.confirmPassword.length > 0 && (
                  <p className="mt-2 text-sm text-green-400 flex items-center bg-green-900/30 p-2 rounded-lg">
                    <Check className="w-4 h-4 mr-1" />
                    Passwords match
                  </p>
                )}
              </div>
            </div>
          </div>

          {formData.role === 'candidate' && (
            <div className="space-y-8 animate-slide-down border-t border-white/10 pt-8">
              <h3 className="text-2xl font-bold text-amber-400 text-center">Customize Your Experience</h3>
              
              {/* Professional Skills */}
              <div>
                <div className="flex items-center mb-4">
                  <Code className="w-6 h-6 text-amber-400 mr-2" />
                  <label className="text-lg font-bold text-gray-100">
                    Professional Skills
                  </label>
                </div>
                
                <p className="text-gray-300 mb-6">Add skills relevant to your profession to help employers find the perfect match.</p>
                
                <div className="flex flex-wrap gap-3 mb-4 min-h-[3rem] p-4 bg-indigo-950/50 rounded-xl border-2 border-dashed border-indigo-500/30 backdrop-blur-sm">
                  {formData.skills.length === 0 ? (
                    <span className="text-gray-400 italic">Add skills to showcase your expertise</span>
                  ) : (
                    formData.skills.map((skill, index) => (
                      <span
                        key={skill}
                        className="bg-gradient-to-r from-pink-600 to-purple-700 text-white px-4 py-2 rounded-full text-sm flex items-center shadow-lg animate-fade-in border border-pink-400/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-white hover:text-red-200 hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-all duration-200"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>
                <div className="flex rounded-xl overflow-hidden shadow-lg border-2 border-indigo-500/30 focus-within:border-amber-500 transition-all duration-300">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleSkillAdd}
                    className="flex-1 py-4 px-4 focus:outline-none bg-indigo-900/50 text-lg text-white placeholder-gray-400"
                    placeholder="Type a skill and press Enter or click Add"
                  />
                  <button
                    type="button"
                    onClick={handleSkillAdd}
                    className="bg-gradient-to-r from-amber-600 to-pink-600 text-white px-8 py-4 hover:from-amber-700 hover:to-pink-700 transition-all duration-200 font-bold text-lg"
                  >
                    Add
                  </button>
                </div>
                
                {/* Skill Suggestions */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Popular skills for various careers:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Project Management', 'Communication', 'Customer Service', 'Leadership', 'Problem Solving', 
                      'Data Analysis', 'Marketing', 'Design', 'Research', 'Teaching',
                      'Accounting', 'Writing', 'Teamwork', 'Sales', 'Strategy',
                      'Programming', 'Healthcare', 'Engineering', 'Negotiation'].map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => selectSuggestedFrontendSkill(skill)}
                        className={`px-3 py-1.5 bg-gradient-to-r from-indigo-700 to-indigo-900 text-white text-xs font-medium rounded-full transition-all hover:shadow-md hover:from-indigo-600 border border-indigo-500/30 ${
                          formData.skills.includes(skill) ? 'opacity-50' : ''
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Technical Skills */}
              <div className="mt-10 border-t border-white/10 pt-8">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-6 h-6 text-cyan-400 mr-2" />
                  <label className="text-lg font-bold text-gray-100">
                    Technical Skills
                  </label>
                </div>
                
                <p className="text-gray-300 mb-6">Add technical skills, software proficiencies, or tools you're experienced with.</p>
                
                <div className="flex flex-wrap gap-3 mb-4 min-h-[3rem] p-4 bg-indigo-950/50 rounded-xl border-2 border-dashed border-indigo-500/30">
                  {formData.frontendSkills.length === 0 ? (
                    <span className="text-gray-400 italic">Add technical skills you're proficient in</span>
                  ) : (
                    formData.frontendSkills.map((skill, index) => (
                      <span
                        key={skill}
                        className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm flex items-center shadow-lg animate-fade-in border border-cyan-400/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeFrontendSkill(skill)}
                          className="ml-2 text-white hover:text-red-200 hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center transition-all duration-200"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>
                
                <div className="flex rounded-xl overflow-hidden shadow-lg border-2 border-indigo-500/30 focus-within:border-cyan-500 transition-all duration-300">
                  <input
                    type="text"
                    value={frontendSkillInput}
                    onChange={(e) => setFrontendSkillInput(e.target.value)}
                    onKeyPress={handleFrontendSkillAdd}
                    className="flex-1 py-4 px-4 focus:outline-none bg-indigo-900/50 text-white text-lg placeholder-gray-400"
                    placeholder="Type a technical skill and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleFrontendSkillAdd}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 font-bold text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Job Types */}
              <div>
                <label className="block text-lg font-bold text-white mb-4">
                  Preferred Job Types
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {jobTypes.map((type, index) => {
                    const IconComponent = type.icon;
                    return (
                      <label 
                        key={type.id} 
                        className="group cursor-pointer animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.jobTypes.includes(type.id)}
                          onChange={() => handleJobTypeChange(type.id)}
                          className="sr-only"
                        />
                        <div className={`p-6 rounded-2xl border-3 transition-all duration-300 text-center group-hover:shadow-xl ${
                          formData.jobTypes.includes(type.id)
                            ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl transform scale-105'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-25 hover:to-purple-25'
                        }`}>
                          <IconComponent className={`w-8 h-8 mx-auto mb-3 ${
                            formData.jobTypes.includes(type.id) ? 'text-indigo-600' : 'text-gray-400'
                          } transition-colors duration-300`} />
                          <span className={`text-sm font-bold block ${
                            formData.jobTypes.includes(type.id) ? 'text-indigo-700' : 'text-gray-600'
                          }`}>
                            {type.label}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          
          {/* Create Account Button - Always visible for all roles */}
          <div className="mt-20 pt-8 border-t border-indigo-500/20">
            <button
              type="submit"
              disabled={loading || !passwordStrength.isValid}
              className="relative w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-6 px-8 rounded-2xl font-bold text-xl shadow-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden group animate-fade-in z-20"
            >
              <span className={`relative z-10 flex items-center justify-center transition-all duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <Shield className="w-6 h-6 mr-3" />
                Create My Account
              </span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="ml-4 text-white font-bold">Creating Your Account...</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </form>

        {/* Trust indicators */}
        <div className="mt-8 text-center text-gray-500">
          <p className="flex items-center justify-center text-sm">
            <Shield className="w-4 h-4 mr-2" />
            Your data is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
