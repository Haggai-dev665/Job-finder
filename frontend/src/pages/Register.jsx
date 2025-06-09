import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Country, State, City } from 'country-state-city';
import ReactCountryFlag from 'react-country-flag';
import { 
  Eye, 
  EyeOff, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  MapPin,
  DollarSign,
  Search,
  Check,
  Building,
  GraduationCap,
  Users,
  Code,
  ChevronDown
} from 'lucide-react';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Basic info
    fullName: '',
    email: '',
    password: '',
    role: 'candidate',
    
    // Step 2 - Personal details (moved to step 2)
    location: {
      country: null,
      state: '',
      city: ''
    },
    currentRole: '',
    experienceYears: '',
    isStudent: false,
    currentCompany: '',
    
    // Step 3 - Job preferences (moved to step 3)
    jobSearchStatus: '',
    jobTypes: [],
    desiredSalary: '',
    salaryPeriod: 'yearly',
    rolesLookingFor: [],
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  // Initialize countries on component mount
  React.useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
      
      // If country changes, update available states and reset state/city
      if (locationField === 'country') {
        const selectedCountry = countries.find(c => c.isoCode === value);
        if (selectedCountry) {
          const countryStates = State.getStatesOfCountry(value);
          setStates(countryStates);
          setCities([]);
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              country: {
                isoCode: selectedCountry.isoCode,
                name: selectedCountry.name,
                flag: selectedCountry.flag
              },
              state: '',
              city: ''
            }
          }));
        }
      }
      
      // If state changes, update available cities
      if (locationField === 'state') {
        const selectedState = states.find(s => s.isoCode === value);
        if (selectedState) {
          const stateCities = City.getCitiesOfState(formData.location.country.isoCode, value);
          setCities(stateCities);
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              state: {
                isoCode: selectedState.isoCode,
                name: selectedState.name
              },
              city: ''
            }
          }));
        }
      }
      
      // If city changes
      if (locationField === 'city') {
        const selectedCity = cities.find(c => c.name === value);
        if (selectedCity) {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              city: {
                name: selectedCity.name,
                latitude: selectedCity.latitude,
                longitude: selectedCity.longitude
              }
            }
          }));
        } else {
          // For manual input
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              city: value
            }
          }));
        }
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Validate password in real-time
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    });
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
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
    
    const [firstName, ...lastNameParts] = formData.fullName.split(' ');
    const lastName = lastNameParts.join(' ');
    
    const result = await register({
      firstName,
      lastName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      preferences: {
        jobSearchStatus: formData.jobSearchStatus,
        jobTypes: formData.jobTypes,
        desiredSalary: formData.desiredSalary,
        salaryPeriod: formData.salaryPeriod,
        rolesLookingFor: formData.rolesLookingFor,
        location: formData.location,
        currentRole: formData.currentRole,
        experienceYears: formData.experienceYears,
        isStudent: formData.isStudent,
        currentCompany: formData.currentCompany
      }
    });

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed');
    }
    
    setLoading(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        const isPasswordValid = Object.values(passwordValidation).every(Boolean);
        return formData.fullName && formData.email && formData.password && isPasswordValid;
      case 2:
        return formData.location.country && formData.location.state && formData.currentRole && formData.experienceYears;
      case 3:
        return formData.jobSearchStatus && formData.jobTypes.length > 0;
      default:
        return false;
    }
  };

  const jobSearchStatuses = [
    {
      id: 'ready-to-interview',
      title: 'Ready to interview',
      description: "You're actively looking for new work and ready to interview. Your job profile will be visible by startups."
    },
    {
      id: 'open-to-offers',
      title: 'Open to offers',
      description: "You're not looking but open to hear about new opportunities. Your job profile will be visible to startups."
    },
    {
      id: 'closed-to-offers',
      title: 'Closed to offers',
      description: "You're not looking and don't want to hear about new opportunities. Your job profile will be hidden to startups."
    }
  ];

  const jobTypeOptions = [
    { id: 'full-time', label: 'Full-time Employee', selected: true },
    { id: 'contractor', label: 'Contractor' },
    { id: 'intern', label: 'Intern' },
    { id: 'co-founder', label: 'Co-founder' }
  ];

  const roleOptions = [
    'Software Engineer',
    'Product Manager',
    'Designer',
    'Data Scientist',
    'Marketing Manager',
    'Sales Representative', 
    'Business Analyst',
    'Teacher',
    'Nurse',
    'Accountant',
    'Chef',
    'Construction Worker',
    'Electrician',
    'Plumber',
    'Lawyer',
    'Doctor',
    'Writer',
    'Photographer',
    'Real Estate Agent',
    'Customer Service Representative',
    'Project Manager',
    'HR Manager',
    'Financial Advisor',
    'Other'
  ];

  const experienceOptions = [
    '0-1 years',
    '2-3 years', 
    '4-5 years',
    '6-10 years',
    '10+ years'
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Google Sign Up Button */}
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 mb-4 transition-all duration-300 text-sm md:text-base hover:shadow-md transform hover:scale-[1.02] animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <svg className="w-4 h-4 md:w-5 md:h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>

            <div className="text-center mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <span className="text-gray-400 text-xs md:text-sm">or Sign up with Email</span>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-shake">
                  {error}
                </div>
              )}

              <div className="group">
                <label htmlFor="fullName" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="enter text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base transition-all duration-300 group-hover:border-gray-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mail@website.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base transition-all duration-300 group-hover:border-gray-400 bg-white text-gray-900 placeholder-gray-400"
                />
              </div>

              <div className="group">
                <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="min 6 characters"
                    className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base transition-all duration-300 group-hover:border-gray-400 bg-white text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                    <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
                    <div className="space-y-1">
                      <div className={`flex items-center text-xs ${passwordValidation.length ? 'text-green-600' : 'text-red-500'}`}>
                        {passwordValidation.length ? (
                          <Check className="w-3 h-3 mr-2" />
                        ) : (
                          <div className="w-3 h-3 mr-2 border border-current rounded-full"></div>
                        )}
                        At least 6 characters
                      </div>
                      <div className={`flex items-center text-xs ${passwordValidation.uppercase ? 'text-green-600' : 'text-red-500'}`}>
                        {passwordValidation.uppercase ? (
                          <Check className="w-3 h-3 mr-2" />
                        ) : (
                          <div className="w-3 h-3 mr-2 border border-current rounded-full"></div>
                        )}
                        One uppercase letter (A-Z)
                      </div>
                      <div className={`flex items-center text-xs ${passwordValidation.lowercase ? 'text-green-600' : 'text-red-500'}`}>
                        {passwordValidation.lowercase ? (
                          <Check className="w-3 h-3 mr-2" />
                        ) : (
                          <div className="w-3 h-3 mr-2 border border-current rounded-full"></div>
                        )}
                        One lowercase letter (a-z)
                      </div>
                      <div className={`flex items-center text-xs ${passwordValidation.number ? 'text-green-600' : 'text-red-500'}`}>
                        {passwordValidation.number ? (
                          <Check className="w-3 h-3 mr-2" />
                        ) : (
                          <div className="w-3 h-3 mr-2 border border-current rounded-full"></div>
                        )}
                        One number (0-9)
                      </div>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-600">Password Strength</span>
                        <span className={`text-xs font-bold ${
                          Object.values(passwordValidation).filter(Boolean).length === 4 ? 'text-green-600' :
                          Object.values(passwordValidation).filter(Boolean).length >= 2 ? 'text-yellow-600' :
                          'text-red-500'
                        }`}>
                          {Object.values(passwordValidation).filter(Boolean).length === 4 ? 'Strong' :
                           Object.values(passwordValidation).filter(Boolean).length >= 2 ? 'Medium' :
                           'Weak'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            Object.values(passwordValidation).filter(Boolean).length === 4 ? 'bg-green-500 w-full' :
                            Object.values(passwordValidation).filter(Boolean).length >= 2 ? 'bg-yellow-500 w-2/3' :
                            'bg-red-500 w-1/3'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
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
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
              <p className="text-gray-600">Help us personalize your experience</p>
            </div>

            <div className="space-y-6">
              {/* Location - Country */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  Which country are you based in?
                </label>
                <p className="text-sm text-blue-600 mb-3">This helps us show you relevant opportunities</p>
                <div className="relative">
                  <select
                    name="location.country"
                    value={formData.location.country?.isoCode || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-lg group-hover:border-gray-400 transition-all duration-300 appearance-none"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  {formData.location.country && (
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <ReactCountryFlag 
                        countryCode={formData.location.country.isoCode} 
                        svg 
                        style={{
                          width: '1.5em',
                          height: '1.1em',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Location - State/Region */}
              {formData.location.country && states.length > 0 && (
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    What state/region are you in?
                  </label>
                  <div className="relative">
                    <select
                      name="location.state"
                      value={formData.location.state?.isoCode || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-lg group-hover:border-gray-400 transition-all duration-300 appearance-none"
                    >
                      <option value="">Select your state/region</option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Location - City */}
              {formData.location.country && (
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    City {cities.length > 0 ? '(select from list or type manually)' : '(optional)'}
                  </label>
                  <div className="relative">
                    {cities.length > 0 ? (
                      <select
                        name="location.city"
                        value={typeof formData.location.city === 'object' ? formData.location.city.name : formData.location.city}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-lg group-hover:border-gray-400 transition-all duration-300 appearance-none"
                      >
                        <option value="">Select your city or type manually below</option>
                        {cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="location.city"
                        value={typeof formData.location.city === 'object' ? formData.location.city.name : formData.location.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-lg group-hover:border-gray-400 transition-all duration-300"
                      />
                    )}
                    {cities.length > 0 && (
                      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    )}
                  </div>
                  {cities.length > 0 && (
                    <div className="mt-2">
                      <input
                        type="text"
                        name="location.city"
                        value={typeof formData.location.city === 'object' ? formData.location.city.name : formData.location.city}
                        onChange={handleChange}
                        placeholder="Or type your city manually"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-base group-hover:border-gray-400 transition-all duration-300"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Current Role */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                  What's your current role?
                </label>
                <select
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-lg group-hover:border-gray-400 transition-all duration-300 appearance-none"
                >
                  <option value="">Select your role</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                  Years of experience
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {experienceOptions.map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, experienceYears: exp }))}
                      className={`p-4 border-2 rounded-xl text-center transition-all duration-300 transform hover:scale-105 ${
                        formData.experienceYears === exp
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      <div className="font-semibold">{exp}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Status */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Are you a student or recent graduate?
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isStudent: true }))}
                    className={`flex-1 p-4 border-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      formData.isStudent
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    <div className="text-center font-semibold">Yes</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isStudent: false }))}
                    className={`flex-1 p-4 border-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      !formData.isStudent
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 text-gray-700'
                    }`}
                  >
                    <div className="text-center font-semibold">No</div>
                  </button>
                </div>
              </div>

              {/* Current Company */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Building className="w-5 h-5 text-blue-600 mr-2" />
                  Current company (optional)
                </label>
                <p className="text-sm text-blue-600 mb-3">Your company will never see that you're looking for opportunities</p>
                <input
                  type="text"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-lg group-hover:border-gray-400 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your dream job awaits</h2>
              <p className="text-gray-600">Tell us what you're looking for</p>
            </div>

            <div className="space-y-8">
              {/* Job Search Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  What's your job search status?
                </h3>
                <div className="space-y-4">
                  {jobSearchStatuses.map((status) => (
                    <label key={status.id} className="block cursor-pointer group">
                      <div className={`p-6 border-2 rounded-2xl transition-all duration-300 group-hover:shadow-lg transform group-hover:scale-[1.02] ${
                        formData.jobSearchStatus === status.id
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg'
                          : 'border-gray-200 group-hover:border-blue-300'
                      }`}>
                        <div className="flex items-start">
                          <input
                            type="radio"
                            name="jobSearchStatus"
                            value={status.id}
                            checked={formData.jobSearchStatus === status.id}
                            onChange={handleChange}
                            className="mt-1.5 w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <div className="ml-4">
                            <div className="font-semibold text-gray-900 text-lg">{status.title}</div>
                            <div className="text-sm text-blue-600 mt-1 font-medium">This means:</div>
                            <div className="text-sm text-gray-600 mt-2 leading-relaxed">{status.description}</div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Types */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  What type of work interests you?
                </h3>
                <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobTypeOptions.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleMultiSelect('jobTypes', type.id)}
                      className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                        formData.jobTypes.includes(type.id)
                          ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg">{type.label}</span>
                        {formData.jobTypes.includes(type.id) && (
                          <Check className="w-6 h-6" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  Desired salary (optional)
                </h3>
                <p className="text-sm text-blue-600 mb-4">This helps us match you with the right opportunities</p>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="desiredSalary"
                      value={formData.desiredSalary}
                      onChange={handleChange}
                      placeholder="50,000"
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-lg"
                    />
                  </div>
                  <select
                    name="salaryPeriod"
                    value={formData.salaryPeriod}
                    onChange={handleChange}
                    className="px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-lg"
                  >
                    <option value="yearly">per year</option>
                    <option value="monthly">per month</option>
                    <option value="hourly">per hour</option>
                  </select>
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Geometric Illustration - Only show on step 1 */}
      {currentStep === 1 && (
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 min-h-[50vh] lg:min-h-screen">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Main geometric shapes grid */}
          <div className="absolute inset-0 p-4 md:p-8">
            {/* Responsive grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 h-full">
              {/* Column 1 */}
              <div className="space-y-2 md:space-y-4 animate-fade-in">
                {/* Orange circle with laptop - enhanced */}
                <div className="w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="w-8 h-6 md:w-16 md:h-12 bg-blue-500 rounded-lg relative shadow-md">
                    <div className="absolute inset-1 md:inset-2 bg-white rounded flex items-center justify-center">
                      <Briefcase className="w-2 h-2 md:w-4 md:h-4 text-blue-500" />
                    </div>
                  </div>
                </div>
                
                {/* Blue stacked shapes */}
                <div className="w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl md:rounded-2xl shadow-lg transform hover:rotate-3 transition-transform duration-300"></div>
                
                {/* Photo placeholder */}
                <div className="w-10 h-10 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format" 
                    alt="Professional" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Orange star */}
                <div className="w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg transform rotate-45 flex items-center justify-center shadow-lg hover:rotate-90 transition-transform duration-500">
                  <Sparkles className="w-3 h-3 md:w-6 md:h-6 text-white transform -rotate-45" />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-2 md:space-y-4 pt-8 md:pt-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {/* Blue squares */}
                <div className="w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl shadow-lg transform hover:-rotate-3 transition-transform duration-300"></div>
                <div className="w-16 h-10 md:w-32 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                  <div className="grid grid-cols-2 gap-0.5 md:gap-1">
                    <div className="w-2 h-2 md:w-4 md:h-4 bg-yellow-600 rounded animate-pulse"></div>
                    <div className="w-2 h-2 md:w-4 md:h-4 bg-yellow-600 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-2 h-2 md:w-4 md:h-4 bg-yellow-600 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="w-2 h-2 md:w-4 md:h-4 bg-yellow-600 rounded animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                </div>
                
                {/* Pink cross shape */}
                <div className="w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-xl md:rounded-2xl relative shadow-lg hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-2 md:inset-4 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg"></div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-2 md:space-y-4 pt-4 md:pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {/* Blue X shape */}
                <div className="w-10 h-10 md:w-20 md:h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
                  <div className="text-blue-600 text-lg md:text-3xl font-bold">✕</div>
                </div>
                
                {/* Photo */}
                <div className="w-12 h-12 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face&auto=format" 
                    alt="Team member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Pink donut */}
                <div className="w-10 h-10 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full relative shadow-lg hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-1.5 md:inset-3 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full">
                    <div className="absolute inset-1.5 md:inset-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full"></div>
                  </div>
                </div>
                
                {/* Red diamonds */}
                <div className="w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg md:rounded-xl grid grid-cols-2 gap-0.5 md:gap-1 p-1 md:p-2 shadow-lg hover:rotate-6 transition-transform duration-300">
                  <div className="bg-red-500 rounded transform rotate-45 animate-pulse"></div>
                  <div className="bg-red-500 rounded transform rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="bg-red-500 rounded transform rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="bg-red-500 rounded transform rotate-45 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
              </div>

              {/* Column 4 - Hidden on mobile */}
              <div className="hidden md:flex md:flex-col md:space-y-4 md:pt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                {/* Photo */}
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format" 
                    alt="Professional woman" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Green checkered */}
                <div className="w-16 h-16 bg-white rounded-lg grid grid-cols-3 gap-0.5 p-1 shadow-lg hover:scale-105 transition-transform duration-300">
                  <div className="bg-green-500 rounded-sm animate-pulse"></div>
                  <div className="bg-pink-400 rounded-sm animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="bg-green-500 rounded-sm animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <div className="bg-pink-400 rounded-sm animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="bg-green-500 rounded-sm animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                  <div className="bg-pink-400 rounded-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="bg-green-500 rounded-sm animate-pulse" style={{ animationDelay: '1.2s' }}></div>
                  <div className="bg-pink-400 rounded-sm animate-pulse" style={{ animationDelay: '1.4s' }}></div>
                  <div className="bg-green-500 rounded-sm animate-pulse" style={{ animationDelay: '1.6s' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-4 md:bottom-16 left-1/2 transform -translate-x-1/2 text-center px-4 animate-fade-in-up">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 md:mb-4 leading-tight">
              Find the job<br />made for<br />you.
            </h1>
            <p className="text-gray-700 text-sm md:text-lg hidden md:block">
              Browse over 130K jobs at top companies<br />and fast-growing startups.
            </p>
          </div>
        </div>
      )}

      {/* Background for steps 2 and 3 */}
      {currentStep > 1 && (
        <div className="fixed inset-0 z-0">
          <img 
            src={currentStep === 2 
              ? "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format"
              : "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop&auto=format"
            }
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
        </div>
      )}

      {/* Right Side - Registration Form */}
      <div className={`${currentStep === 1 ? 'w-full lg:w-96 xl:w-[28rem]' : 'flex-1 max-w-4xl mx-auto'} ${currentStep > 1 ? 'relative z-10' : ''} bg-white flex flex-col justify-center px-6 md:px-8 py-6 lg:py-8`}>
        <div className={`${currentStep === 1 ? 'max-w-sm' : 'max-w-2xl'} mx-auto w-full`}>
          {/* Header */}
          <div className={`text-center ${currentStep === 1 ? 'lg:text-right' : ''} mb-8 animate-fade-in`}>
            <div className={`flex items-center ${currentStep === 1 ? 'justify-center lg:justify-end' : 'justify-center'} mb-4`}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900">Career Flow</span>
            </div>
            {currentStep > 1 && (
              <div className="mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        step <= currentStep 
                          ? 'bg-blue-500 text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step < currentStep ? <Check className="w-5 h-5" /> : step}
                      </div>
                      {step < 3 && (
                        <div className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${
                          step < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  Step {currentStep} of 3
                </div>
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
              {currentStep === 1 ? 'Create Account' : 
               currentStep === 2 ? 'Personal Details' : 
               'Job Preferences'}
            </h2>
            <p className="text-gray-600 text-lg">
              {currentStep === 1 ? 'Find your next opportunity!' : 
               currentStep === 2 ? 'Tell us about your background' : 
               'What kind of role are you seeking?'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()} className={`animate-fade-in ${currentStep > 1 ? 'bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl' : ''}`} style={{ animationDelay: '0.4s' }}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
                  className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center group transform hover:scale-105 hover:shadow-xl"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !canProceed()}
                  className="ml-auto bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center group transform hover:scale-105 hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <Check className="w-5 h-5 ml-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Footer - Only show on step 1 */}
          {currentStep === 1 && (
            <>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
                By continuing you accept our{' '}
                <Link to="/terms" className="text-black underline hover:text-gray-700 transition-colors duration-200">
                  standard terms and conditions
                </Link>{' '}
                and our{' '}
                <Link to="/privacy" className="text-black underline hover:text-gray-700 transition-colors duration-200">
                  privacy policy
                </Link>
                .
              </p>

              <div className="mt-6 pt-4 border-t border-gray-200 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <p className="text-center text-xs md:text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 underline decoration-2 underline-offset-2"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Register;
