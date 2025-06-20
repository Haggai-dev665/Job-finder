import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Building2, 
  ArrowRight, 
  ArrowLeft,
  MapPin,
  Users,
  Globe,
  Check,
  Star,
  Heart,
  Target,
  Award,
  Briefcase,
  DollarSign,
  Calendar,
  Clock,
  Mail,
  Phone,
  Camera,
  Plus,
  X
} from 'lucide-react';

const CompanyRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Basic Company Info
    name: '',
    email: '',
    password: '',
    website: '',
    description: '',
    industry: '',
    size: '',
    founded: '',
    
    // Step 2 - Location & Culture
    headquarters: {
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    locations: [],
    culture: {
      values: [],
      mission: '',
      vision: '',
      workEnvironment: '',
      benefits: [],
      perks: []
    },
    
    // Step 3 - Additional Details
    contactInfo: {
      email: '',
      phone: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    logo: null,
    tags: [],
    financials: {
      revenue: '',
      funding: '',
      investors: []
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Manufacturing', 'Consulting', 'Media', 'Transportation', 'Energy',
    'Real Estate', 'Hospitality', 'Agriculture', 'Government', 'Non-profit', 'Other'
  ];

  // Map frontend industry names to backend enum values
  const getBackendIndustry = (frontendIndustry) => {
    const mapping = {
      'Technology': 'technology',
      'Healthcare': 'healthcare',
      'Finance': 'finance',
      'Education': 'education',
      'Retail': 'retail',
      'Manufacturing': 'manufacturing',
      'Consulting': 'consulting',
      'Media': 'media',
      'Transportation': 'transportation',
      'Energy': 'energy',
      'Real Estate': 'real-estate',
      'Hospitality': 'hospitality',
      'Agriculture': 'agriculture',
      'Government': 'government',
      'Non-profit': 'non-profit',
      'Other': 'other'
    };
    return mapping[frontendIndustry] || 'other';
  };

  const companySizes = [
    '1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'
  ];

  const workEnvironments = [
    { id: 'remote', label: 'Remote', icon: '🏠' },
    { id: 'hybrid', label: 'Hybrid', icon: '🔄' },
    { id: 'on-site', label: 'On-site', icon: '🏢' },
    { id: 'flexible', label: 'Flexible', icon: '⚡' }
  ];

  const benefitOptions = [
    { id: 'health-insurance', label: 'Health Insurance', icon: '🏥' },
    { id: 'dental-insurance', label: 'Dental Insurance', icon: '🦷' },
    { id: 'vision-insurance', label: 'Vision Insurance', icon: '👁️' },
    { id: 'retirement-plan', label: '401(k) Plan', icon: '💰' },
    { id: 'paid-time-off', label: 'Paid Time Off', icon: '🏖️' },
    { id: 'flexible-schedule', label: 'Flexible Schedule', icon: '⏰' },
    { id: 'remote-work', label: 'Remote Work', icon: '💻' },
    { id: 'professional-development', label: 'Professional Development', icon: '📚' },
    { id: 'tuition-reimbursement', label: 'Tuition Reimbursement', icon: '🎓' },
    { id: 'gym-membership', label: 'Gym Membership', icon: '💪' },
    { id: 'stock-options', label: 'Stock Options', icon: '📈' },
    { id: 'free-meals', label: 'Free Meals', icon: '🍽️' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleArrayChange = (field, value, action = 'toggle') => {
    setFormData(prev => {
      const currentArray = field.includes('.') 
        ? prev[field.split('.')[0]][field.split('.')[1]]
        : prev[field];
      
      let newArray;
      if (action === 'toggle') {
        newArray = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
      } else if (action === 'add') {
        newArray = [...currentArray, value];
      } else if (action === 'remove') {
        newArray = currentArray.filter((_, index) => index !== value);
      }

      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: newArray
          }
        };
      } else {
        return {
          ...prev,
          [field]: newArray
        };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Prepare user data for registration
      const userData = {
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        password: formData.password,
        role: 'employer'
      };

      // Prepare company data
      const companyData = {
        name: formData.name,
        description: formData.description || `${formData.name} is a growing ${formData.industry.toLowerCase()} company.`,
        industry: getBackendIndustry(formData.industry), // Use proper mapping
        size: formData.size,
        website: formData.website,
        founded: formData.founded ? parseInt(formData.founded) : undefined,
        headquarters: {
          address: formData.headquarters.address || '',
          city: formData.headquarters.city || '',
          state: formData.headquarters.state || '',
          country: formData.headquarters.country || '',
          zipCode: formData.headquarters.zipCode || ''
        },
        locations: formData.locations || [],
        culture: {
          values: formData.culture.values || [],
          mission: formData.culture.mission || '',
          vision: formData.culture.vision || '',
          workEnvironment: formData.culture.workEnvironment?.toLowerCase(),
          benefits: formData.culture.benefits || [],
          perks: formData.culture.perks || []
        },
        contactInfo: {
          email: formData.contactInfo.email || formData.email,
          phone: formData.contactInfo.phone || '',
          linkedin: formData.contactInfo.linkedin || '',
          twitter: formData.contactInfo.twitter || '',
          facebook: formData.contactInfo.facebook || '',
          instagram: formData.contactInfo.instagram || ''
        }
      };

      // Combine user and company data
      const registrationData = {
        ...userData,
        companyData,
        type: 'company'
      };
      
      const result = await register(registrationData);

      if (result.success) {
        navigate('/company-dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
    
    setLoading(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.password && formData.industry && formData.size;
      case 2:
        return formData.headquarters.city && formData.headquarters.country && formData.culture.workEnvironment;
      case 3:
        return true; // Optional step
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Create Your Company Profile</h2>
              <p className="text-gray-600">Join thousands of companies finding amazing talent</p>
            </div>

            {/* Features List */}
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-6 rounded-2xl border border-pink-200 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 text-pink-500 mr-2" />
                Powerful, <span className="text-pink-600 mx-1">FREE</span> recruiting tools
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Heart className="w-4 h-4 text-pink-500 mr-3" />
                  <span>Post your jobs and source candidates for FREE</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Target className="w-4 h-4 text-pink-500 mr-3" />
                  <span>Save time with intelligent applicant sorting</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Award className="w-4 h-4 text-pink-500 mr-3" />
                  <span>Free built-in ATS to manage your pipeline</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Check className="w-4 h-4 text-pink-500 mr-3" />
                  <span>Industry high 40% candidate response rate</span>
                </div>
              </div>
            </div>

            {/* Company Logos */}
            <div className="text-center mb-8">
              <p className="text-pink-600 font-medium mb-4">Powering recruiters at:</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 opacity-60">
                {['PLAID', 'ROBLOX', 'OpenAI', 'PELOTON', 'Postmates', 'Airtable'].map((company) => (
                  <div key={company} className="text-xs font-bold text-gray-600">{company}</div>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-shake">
                  {error}
                </div>
              )}

              {/* Google Sign Up */}
              <button className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>

              <div className="text-center text-sm text-gray-500">or Sign up with Email</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="mail@company.com"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 8 characters"
                    className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Company Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://company.com"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 transition-all duration-300"
                  >
                    <option value="">Select industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry.toLowerCase()}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Company Size *
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 transition-all duration-300"
                  >
                    <option value="">Select size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>{size} employees</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Founded Year
                </label>
                <input
                  type="number"
                  name="founded"
                  value={formData.founded}
                  onChange={handleChange}
                  placeholder="2020"
                  min="1800"
                  max={new Date().getFullYear()}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Company Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your company..."
                  rows="4"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300 resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Location & Culture</h2>
              <p className="text-gray-600">Tell candidates what makes your company special</p>
            </div>

            <div className="space-y-8">
              {/* Headquarters */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                  Headquarters Location *
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="headquarters.city"
                    value={formData.headquarters.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                  <input
                    type="text"
                    name="headquarters.state"
                    value={formData.headquarters.state}
                    onChange={handleChange}
                    placeholder="State/Province"
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                  <input
                    type="text"
                    name="headquarters.country"
                    value={formData.headquarters.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                  <input
                    type="text"
                    name="headquarters.zipCode"
                    value={formData.headquarters.zipCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                </div>
                <input
                  type="text"
                  name="headquarters.address"
                  value={formData.headquarters.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  className="w-full mt-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                />
              </div>

              {/* Work Environment */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 text-blue-600 mr-2" />
                  Work Environment *
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {workEnvironments.map((env) => (
                    <button
                      key={env.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, culture: { ...prev.culture, workEnvironment: env.id } }))}
                      className={`p-4 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                        formData.culture.workEnvironment === env.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      <div className="text-2xl mb-2">{env.icon}</div>
                      <div className="font-semibold">{env.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-5 h-5 text-blue-600 mr-2" />
                  Benefits & Perks
                </h3>
                <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {benefitOptions.map((benefit) => (
                    <button
                      key={benefit.id}
                      type="button"
                      onClick={() => handleArrayChange('culture.benefits', benefit.id)}
                      className={`p-3 border-2 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                        formData.culture.benefits.includes(benefit.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{benefit.icon}</span>
                        <span className="text-sm font-medium">{benefit.label}</span>
                      </div>
                      {formData.culture.benefits.includes(benefit.id) && (
                        <Check className="w-4 h-4 text-blue-500 mt-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Values */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Values</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mission Statement</label>
                    <textarea
                      name="culture.mission"
                      value={formData.culture.mission}
                      onChange={handleChange}
                      placeholder="What is your company's mission?"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vision Statement</label>
                    <textarea
                      name="culture.vision"
                      value={formData.culture.vision}
                      onChange={handleChange}
                      placeholder="What is your company's vision?"
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Finishing Touches</h2>
              <p className="text-gray-600">Complete your company profile to attract top talent</p>
            </div>

            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-5 h-5 text-green-600 mr-2" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="contactInfo.email"
                      value={formData.contactInfo.email}
                      onChange={handleChange}
                      placeholder="Contact Email"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="contactInfo.phone"
                      value={formData.contactInfo.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h3>
                <div className="space-y-4">
                  <input
                    type="url"
                    name="contactInfo.linkedin"
                    value={formData.contactInfo.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn Company Page"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                  />
                  <input
                    type="url"
                    name="contactInfo.twitter"
                    value={formData.contactInfo.twitter}
                    onChange={handleChange}
                    placeholder="Twitter Profile"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                  />
                </div>
              </div>

              {/* Company Logo */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Camera className="w-5 h-5 text-green-600 mr-2" />
                  Company Logo
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors duration-300">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload your company logo</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="logo-upload"
                    onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.files[0] }))}
                  />
                  <label
                    htmlFor="logo-upload"
                    className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              {/* Company Tags */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Tags</h3>
                <p className="text-sm text-gray-600 mb-4">Add tags that describe your company</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleArrayChange('tags', index, 'remove')}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a tag"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        handleArrayChange('tags', e.target.value.trim(), 'add');
                        e.target.value = '';
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300"
                    onClick={(e) => {
                      const input = e.target.previousElementSibling;
                      if (input.value.trim()) {
                        handleArrayChange('tags', input.value.trim(), 'add');
                        input.value = '';
                      }
                    }}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background for all steps */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mr-3">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Career Flow</span>
          </div>
          
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step <= currentStep 
                      ? 'bg-pink-500 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step < currentStep ? <Check className="w-6 h-6" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 rounded transition-all duration-300 ${
                      step < currentStep ? 'bg-pink-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-pink-600 font-medium">
              Step {currentStep} of 3
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-fade-in">
          <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5 mr-3" />
                  Back
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="ml-auto bg-gradient-to-r from-pink-600 to-orange-600 text-white py-4 px-8 rounded-xl font-bold hover:from-pink-700 hover:to-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center group transform hover:scale-105 hover:shadow-xl"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-8 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center group transform hover:scale-105 hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Creating Company...
                    </>
                  ) : (
                    <>
                      Create Company
                      <Check className="w-5 h-5 ml-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Footer - Only show on step 1 */}
          {currentStep === 1 && (
            <div className="mt-8 pt-6 border-t border-gray-200 animate-fade-in">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                By continuing you accept our{' '}
                <Link to="/terms" className="text-pink-600 underline hover:text-pink-700 transition-colors duration-200">
                  terms and conditions
                </Link>{' '}
                and our{' '}
                <Link to="/privacy" className="text-pink-600 underline hover:text-pink-700 transition-colors duration-200">
                  privacy policy
                </Link>
                .
              </p>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-pink-600 font-semibold hover:text-pink-700 transition-colors duration-200 underline"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CompanyRegistration;
