import React, { useContext, useState, useEffect, useRef, Suspense, lazy, useMemo, useCallback } from 'react';
import React, { useContext, useState, useEffect, useRef, Suspense, lazy, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Target, 
  Zap,
  Globe,
  Shield,
  Heart,
  Play,
  ChevronRight,
  Building2,
  DollarSign,
  Clock,
  Filter,
  Code,
  Palette,
  BarChart3,
  Stethoscope,
  Camera,
  Rocket,
  Quote,
  Wrench,
  GraduationCap,
  ChefHat,
  Truck,
  PlaneTakeoff,
  Music,
  TreePine,
  Gavel,
  Coins,
  ShoppingCart,
  Cpu,
  Phone,
  Headphones,
  BookOpen,
  Activity,
  Scissors,
  Calculator,
  Handshake,
  Lightbulb,
  Loader2
} from 'lucide-react';
import { JobContext } from '../contexts/JobContext';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import Cookies from 'js-cookie';

// Import CSS properly before any component rendering
import 'leaflet/dist/leaflet.css';

// Lazy load non-critical components
const FeaturedCompanies = lazy(() => import('../components/FeaturedCompanies'));
const JobCategories = lazy(() => import('../components/JobCategories'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const FeaturedJobs = lazy(() => import('../components/FeaturedJobs'));
const CallToAction = lazy(() => import('../components/CallToAction'));

// Don't lazy load leaflet components - this causes initialization issues
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Skeleton loading component
const SkeletonLoader = ({ type }) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-raisin-black/20 to-raisin-black/30 rounded-lg";
  
  switch(type) {
    case 'stats':
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`${baseClasses} h-48 p-6`}></div>
          ))}
        </div>
      );
    case 'card':
      return (
        <div className={`${baseClasses} h-64`}></div>
      );
    default:
      return (
        <div className={`${baseClasses} h-24 w-full`}></div>
      );
  }
};

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    return () => {
      setHasError(false);
    };
  }, []);
  
  if (hasError) {
    return fallback || (
      <div className="p-6 rounded-lg bg-red-50 border border-red-200 text-red-700">
        <p className="font-medium">Something went wrong</p>
        <button 
          onClick={() => setHasError(false)}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }
  
  return children;
};

const Home = () => {
  const { jobs = [], getFeaturedJobs, getJobStats, getJobCategories } = useContext(JobContext) || {};
  const { user } = useContext(AuthContext) || {};
  const { isOlive, setIsOlive } = useContext(ThemeContext) || {};
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState(null);
  const [keywordFilter, setKeywordFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [realStats, setRealStats] = useState(null);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [jobCategories, setJobCategories] = useState(null);
  const [isLoading, setIsLoading] = useState({
    stats: true,
    featuredJobs: true,
    categories: true,
    map: true
  });

  // Set raisin-black as default theme if not already set
  useEffect(() => {
    if (isOlive === undefined && setIsOlive) {
      setIsOlive(true); // Set raisin-black/olive theme as default
    }
  }, [isOlive, setIsOlive]);

  // Memoized default stats to prevent rerenders
  const defaultStats = useMemo(() => ({
    totalJobs: 125847,
    totalProfessionals: 2800000,
    totalCompanies: 45000,
    successRate: '96.8%'
  }), []);

  // Load real stats and featured jobs on component mount with improved error handling
  useEffect(() => {
    const loadRealData = async () => {
      // Load real statistics
      if (getJobStats) {
        try {
          setIsLoading(prev => ({ ...prev, stats: true }));
          const statsData = await getJobStats();
          if (statsData && typeof statsData === 'object') {
            setRealStats(statsData);
          } else {
            setRealStats(defaultStats);
          }
        } catch (statsError) {
          console.warn('Failed to load stats, using defaults:', statsError);
          setRealStats(defaultStats);
        } finally {
          setIsLoading(prev => ({ ...prev, stats: false }));
        }
      }

      // Load featured jobs
      if (getFeaturedJobs) {
        try {
          setIsLoading(prev => ({ ...prev, featuredJobs: true }));
          const featured = await getFeaturedJobs();
          if (Array.isArray(featured) && featured.length > 0) {
            setFeaturedJobs(featured);
          } else {
            setFeaturedJobs([]);
          }
        } catch (featuredError) {
          console.warn('Failed to load featured jobs:', featuredError);
          setFeaturedJobs([]);
        } finally {
          setIsLoading(prev => ({ ...prev, featuredJobs: false }));
        }
      }

      // Load job categories
      if (getJobCategories) {
        try {
          setIsLoading(prev => ({ ...prev, categories: true }));
          const categories = await getJobCategories();
          if (Array.isArray(categories) && categories.length > 0) {
            setJobCategories(categories);
          } else {
            setJobCategories([]);
          }
        } catch (categoriesError) {
          console.warn('Failed to load categories:', categoriesError);
          setJobCategories([]);
        } finally {
          setIsLoading(prev => ({ ...prev, categories: false }));
        }
      }
    };

    loadRealData();
  }, [getJobStats, getFeaturedJobs, getJobCategories, defaultStats]);

  // Enhanced stats with animations (now using real data)
  const stats = useMemo(() => [
    {
      icon: Briefcase,
      value: realStats ? realStats.totalJobs.toLocaleString() : '125,847',
      label: 'Active Jobs',
      description: 'Live opportunities',
      color: isOlive ? 'from-olive-beige to-raisin-black' : 'from-blue-500 to-cyan-400'
    },
    {
      icon: Users,
      value: realStats ? `${(realStats.totalProfessionals / 1000000).toFixed(1)}M+` : '2.8M+',
      label: 'Professionals',
      description: 'Success stories',
      color: isOlive ? 'from-olive-beige/90 to-raisin-black/95' : 'from-purple-500 to-pink-400'
    },
    {
      icon: Building2,
      value: realStats ? `${(realStats.totalCompanies / 1000).toFixed(0)}K+` : '45,000+',
      label: 'Companies',
      description: 'Trusted employers',
      color: isOlive ? 'from-olive-beige/80 to-raisin-black/90' : 'from-green-500 to-emerald-400'
    },
    {
      icon: Star,
      value: realStats ? realStats.successRate : '96.8%',
      label: 'Success Rate',
      description: 'Job placement',
      color: isOlive ? 'from-olive-beige/70 to-raisin-black/85' : 'from-yellow-500 to-orange-400'
    }
  ], [realStats, isOlive]);

  // Comprehensive testimonials from diverse professions - memoized to prevent rerenders
  const testimonials = useMemo(() => [
    {
      name: 'Dr. Sarah Martinez',
      role: 'Emergency Room Surgeon',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'Found the perfect hospital position that matches my expertise in trauma surgery. The healthcare section is outstanding!',
      rating: 5,
      industry: 'Healthcare'
    },
    {
      name: 'Marcus Johnson',
      role: 'Master Electrician',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'Never thought finding skilled trade work could be this easy. Connected with three top electrical contractors in my area.',
      rating: 5,
      industry: 'Skilled Trades'
    },
    {
      name: 'Emily Chen',
      role: 'Elementary School Teacher',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'The education category helped me find a school that truly values innovative teaching methods and student creativity.',
      rating: 5,
      industry: 'Education'
    }
  ], []);

  // Mouse tracking effect with useCallback for performance
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Enhanced intersection observer with useCallback for performance
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        entry.target.classList.add('animate-visible');
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, { 
      threshold: 0.1, 
      rootMargin: '50px'
    });

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [observerCallback]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [testimonials]);

  // Persist location in cookie and get current position
  useEffect(() => {
    const saved = Cookies.get('userLocation');
    if (saved) {
      setPos(JSON.parse(saved));
      setIsLoading(prev => ({ ...prev, map: false }));
    } else if (navigator.geolocation) {
      setIsLoading(prev => ({ ...prev, map: true }));
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const loc = [coords.latitude, coords.longitude];
          setPos(loc);
          Cookies.set('userLocation', JSON.stringify(loc), { expires: 7 });
          setIsLoading(prev => ({ ...prev, map: false }));
        },
        () => {
          setIsLoading(prev => ({ ...prev, map: false }));
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setIsLoading(prev => ({ ...prev, map: false }));
    }
  }, []);

  // Memoize filtered jobs to prevent unnecessary recalculations
  const filteredJobs = useMemo(() => {
    return (Array.isArray(jobs) ? jobs : []).filter(job =>
      job?.title?.toLowerCase().includes(keywordFilter.toLowerCase()) &&
      (typeFilter === '' || job?.jobType === typeFilter)
    );
  }, [jobs, keywordFilter, typeFilter]);

  // Search handler with useCallback
  const handleSearch = useCallback((filters) => {
    navigate('/jobs', { state: { filters } });
  }, [navigate]);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-10">
      <Loader2 className="w-8 h-8 text-olive-beige animate-spin" />
      <span className="ml-2 text-olive-beige text-lg">Loading...</span>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-500 bg-gradient-to-br from-raisin-black via-raisin-black/95 to-olive-beige/10">
      {/* Custom CSS for enhanced animations - reduced complexity for better performance */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.5)); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out forwards; }
        
        /* Simplified animations for better performance */
        [data-animate] {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease-out;
        }
        [data-animate].animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Revolutionary Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Enhanced Background Effects - simplified for better performance */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Gradient Orbs - reduced number */}
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full animate-float blur-xl bg-gradient-to-r from-olive-beige/20 to-olive-beige/30"></div>
          <div className="absolute top-1/3 right-32 w-24 h-24 rounded-lg rotate-45 animate-float blur-lg bg-gradient-to-r from-olive-beige/25 to-raisin-black/15" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 rounded-full animate-float blur-xl bg-gradient-to-r from-olive-beige/15 to-olive-beige/25" style={{animationDelay: '1s'}}></div>
          
          {/* Grid Pattern - simplified */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          
          {/* Particle System - reduced number for performance */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Revolutionary Main Headline */}
            <div className="space-y-8" data-animate id="hero-title">
              <div className="relative">
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text leading-tight animate-glow bg-gradient-to-r from-olive-beige via-white to-olive-beige">
                  The Future of
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-olive-beige via-olive-beige/80 to-white">
                    Career Discovery
                  </span>
                </h1>
                
                {/* Floating Elements - simplified */}
                <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full animate-float opacity-20 bg-gradient-to-r from-olive-beige to-olive-beige/80"></div>
                <div className="absolute -top-4 -right-12 w-12 h-12 rounded-lg rotate-45 opacity-30 bg-gradient-to-r from-olive-beige to-raisin-black/50"></div>
              </div>
              
              <p className="text-xl md:text-3xl max-w-5xl mx-auto leading-relaxed animate-slideUp text-gray-200">
                Join over <span className="font-bold text-olive-beige">2.8 million</span> professionals across 
                <span className="font-bold text-olive-beige/80"> every industry</span> who discovered their perfect career match.
              </p>
            </div>

            {/* Revolutionary Search Interface */}
            <div className="max-w-5xl mx-auto mt-16" data-animate id="hero-search">
              <div className="relative group">
                {/* Glowing Border Effect */}
                <div className="absolute -inset-1 rounded-3xl blur opacity-30 group-hover:opacity-60 bg-gradient-to-r from-olive-beige via-olive-beige/70 to-olive-beige"></div>
                
                <div className="relative rounded-3xl p-8 shadow-2xl bg-olive-beige/10 backdrop-blur-2xl border border-olive-beige/20">
                  <SearchBar 
                    onSearch={handleSearch}
                    showAdvanced={false}
                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl"
                  />
                  
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <span className="text-sm font-medium mb-2 block w-full text-gray-200">Popular Searches:</span>
                    {[
                      { label: 'Remote Work', icon: Globe, color: 'from-olive-beige to-raisin-black' },
                      { label: 'Healthcare', icon: Stethoscope, color: 'from-olive-beige/90 to-raisin-black/80' },
                      { label: 'Teaching', icon: GraduationCap, color: 'from-olive-beige/80 to-raisin-black/70' },
                      { label: 'Skilled Trades', icon: Wrench, color: 'from-olive-beige/70 to-raisin-black/60' },
                      { label: 'Creative Arts', icon: Palette, color: 'from-olive-beige/60 to-raisin-black/50' }
                    ].map((tag, index) => (
                      <button
                        key={tag.label}
                        className={`group px-6 py-3 bg-gradient-to-r ${tag.color} rounded-full text-white text-sm font-semibold transition-all duration-300 hover:scale-110 hover:shadow-lg transform-gpu animate-slideUp`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => handleSearch({ keyword: tag.label })}
                      >
                        <tag.icon className="w-4 h-4 inline-block mr-2 group-hover:rotate-12 transition-transform" />
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats with Individual Animations - with optimized loading state */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8" data-animate id="hero-stats">
              {isLoading.stats ? (
                <SkeletonLoader type="stats" />
              ) : (
                stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="group cursor-pointer transform transition-all duration-500 hover:scale-105 animate-slideUp"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className={`bg-gradient-to-br ${stat.color} p-8 rounded-3xl shadow-xl transition-all duration-500 backdrop-blur-md border border-olive-beige/10 hover:border-olive-beige/30`}>
                      <stat.icon className="h-16 w-16 mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-500" />
                      <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                      <div className="text-white/90 font-bold text-lg mb-1">{stat.label}</div>
                      <div className="text-white/70 text-sm">{stat.description}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-raisin-black/90 via-raisin-black to-olive-beige/20">
        <div className="absolute inset-0 bg-raisin-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-animate id="testimonials-title">
            <h2 className="text-5xl font-black text-white mb-6">
              Success Stories from Every Industry
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-200">
              Real professionals, real results. See how our platform transformed careers across all sectors.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto" data-animate id="testimonials-carousel">
            <div className="overflow-hidden rounded-3xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 transform ${
                    index === currentTestimonial 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 absolute inset-0 translate-x-full'
                  }`}
                >
                  <div className="rounded-3xl p-10 shadow-xl bg-olive-beige/10 backdrop-blur-xl border border-olive-beige/20">
                    <div className="flex items-center mb-8">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full border-4 border-white/30 mr-6 object-cover"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-white">{testimonial.name}</h3>
                        <p className="font-semibold text-olive-beige">{testimonial.role}</p>
                        <div className="flex mt-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <Quote className="w-12 h-12 mb-4 text-olive-beige" />
                    <p className="text-xl leading-relaxed italic text-gray-200">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-olive-beige scale-125'
                      : 'bg-white/30 hover:bg-olive-beige/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies Section - wrapped in Suspense for code splitting */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedCompanies />
      </Suspense>

      {/* Job Categories Section - wrapped in Suspense for code splitting */}
      <Suspense fallback={<LoadingSpinner />}>
        {!isLoading.categories && <JobCategories categoriesData={jobCategories} />}
      </Suspense>

      {/* How It Works Section - wrapped in Suspense for code splitting */}
      <Suspense fallback={<LoadingSpinner />}>
        <HowItWorks />
      </Suspense>

      {/* Featured Jobs Section - wrapped in Suspense for code splitting */}
      <Suspense fallback={<LoadingSpinner />}>
        {!isLoading.featuredJobs && <FeaturedJobs jobs={featuredJobs} />}
      </Suspense>

      {/* Call to Action Section - wrapped in Suspense for code splitting */}
      <Suspense fallback={<LoadingSpinner />}>
        <CallToAction />
      </Suspense>

      {/* Map section with loading state */}
      <section className="mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6 text-olive-beige text-center">Jobs Near You</h2>
        {isLoading.map ? (
          <div className="h-64 rounded-2xl overflow-hidden shadow-2xl border border-olive-beige/20 flex items-center justify-center bg-raisin-black/80">
            <Loader2 className="w-10 h-10 text-olive-beige animate-spin mr-3" />
            <p className="text-olive-beige text-lg">Loading map...</p>
          </div>
        ) : pos ? (
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-olive-beige/20">
            <Suspense fallback={<div className="h-64 bg-raisin-black/50 flex items-center justify-center"><Loader2 className="w-8 h-8 text-olive-beige animate-spin" /></div>}>
              <MapContainer center={pos} zoom={12} className="h-64" attributionControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={pos}>
                  <Popup>Your Location</Popup>
                </Marker>
                {filteredJobs.map(job => (
                  <Marker key={job.id} position={[job.lat, job.lng]}>
                    <Popup>
                      <strong>{job.title}</strong><br/>
                      <button 
                        onClick={() => navigate('/jobs', { state: { filters: { company: job.company } } })} 
                        className="text-sm text-olive-beige hover:text-raisin-black"
                      >
                        View similar
                      </button>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Suspense>
          </div>
        ) : (
          <div className="h-64 rounded-2xl overflow-hidden shadow-2xl border border-olive-beige/20 flex items-center justify-center bg-raisin-black/80">
            <p className="text-olive-beige text-lg">Please enable location services to see jobs near you</p>
          </div>
        )}
      </section>
      
      {/* Job filters section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by keyword..."
            value={keywordFilter}
            onChange={e => setKeywordFilter(e.target.value)}
            className="flex-1 p-4 rounded-xl border shadow-lg focus:ring-2 focus:outline-none transition-all duration-300 border-olive-beige/30 focus:border-olive-beige focus:ring-olive-beige/20 bg-white/95"
          />
          <select 
            value={typeFilter} 
            onChange={e => setTypeFilter(e.target.value)} 
            className="p-4 rounded-xl border shadow-lg focus:ring-2 focus:outline-none transition-all duration-300 border-olive-beige/30 focus:border-olive-beige focus:ring-olive-beige/20 bg-white/95"
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      {/* Filtered Jobs Display */}
      {filteredJobs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-olive-beige">
              Filtered Job Results
            </h3>
            <p className="text-lg text-olive-beige/70">
              Found {filteredJobs.length} jobs matching your criteria
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.slice(0, 6).map((job, index) => (
              <div key={job.id} className="animate-slideUp" style={{animationDelay: `${index * 0.1}s`}}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
          {filteredJobs.length > 6 && (
            <div className="text-center mt-10">
              <Link 
                to="/jobs" 
                className="px-8 py-4 bg-olive-beige text-raisin-black rounded-full inline-flex items-center font-bold hover:bg-olive-beige/90 transition-colors duration-300"
              >
                View All Jobs <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
