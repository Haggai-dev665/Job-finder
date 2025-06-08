import React, { useContext, useState, useEffect, useRef } from 'react';
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
  Anchor,
  Gamepad2,
  Languages,
  Newspaper,
  Building,
  Car,
  Hammer,
  Leaf,
  Microscope,
  Flame,
  Megaphone,
  Clapperboard
} from 'lucide-react';
import { JobContext } from '../contexts/JobContext';
import { AuthContext } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const Home = () => {
  const { jobs = [], getJobRecommendations } = useContext(JobContext) || {};
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Comprehensive testimonials from diverse professions
  const testimonials = [
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
    },
    {
      name: 'Chef Antonio Rodriguez',
      role: 'Head Chef at Michelin Restaurant',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'Discovered an amazing opportunity at a top restaurant. The culinary arts section connects chefs with quality establishments.',
      rating: 5,
      industry: 'Culinary Arts'
    },
    {
      name: 'Officer Lisa Thompson',
      role: 'Community Police Officer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'Found a position that lets me make a real difference in my community. Public service opportunities are excellent here.',
      rating: 5,
      industry: 'Public Service'
    }
  ];

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Image carousel for hero section
  useEffect(() => {
    const images = [image1, image2, image3];
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced intersection observer with more animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (filters) => {
    navigate('/jobs', { state: { filters } });
  };

  // Safe array operations
  const featuredJobs = Array.isArray(jobs) ? jobs.slice(0, 6) : [];
  const recommendedJobs = user && getJobRecommendations && typeof getJobRecommendations === 'function' 
    ? getJobRecommendations(user.preferences || {}).slice(0, 3) 
    : [];

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '125,847', description: 'Across all industries', color: 'from-blue-400 to-cyan-500' },
    { icon: Users, label: 'Professionals', value: '2.8M+', description: 'Trust our platform', color: 'from-purple-400 to-pink-500' },
    { icon: Building2, label: 'Companies', value: '45,000+', description: 'From startups to Fortune 500', color: 'from-green-400 to-emerald-500' },
    { icon: Star, label: 'Success Rate', value: '96.8%', description: 'Job placement success', color: 'from-yellow-400 to-orange-500' }
  ];

  // Comprehensive job categories for ALL professions
  const jobCategories = [
    { name: 'Technology & IT', count: '28,534', icon: Code, growth: '+22%', color: 'from-blue-500 to-cyan-400', jobs: ['Software Engineer', 'Data Scientist', 'DevOps', 'Cybersecurity'] },
    { name: 'Healthcare & Medical', count: '34,892', icon: Stethoscope, growth: '+28%', color: 'from-red-500 to-pink-400', jobs: ['Physician', 'Nurse', 'Therapist', 'Pharmacist'] },
    { name: 'Education & Training', count: '19,567', icon: GraduationCap, growth: '+15%', color: 'from-green-500 to-emerald-400', jobs: ['Teacher', 'Professor', 'Trainer', 'Administrator'] },
    { name: 'Skilled Trades', count: '22,345', icon: Wrench, growth: '+18%', color: 'from-orange-500 to-yellow-400', jobs: ['Electrician', 'Plumber', 'Carpenter', 'Mechanic'] },
    { name: 'Business & Finance', count: '31,289', icon: BarChart3, growth: '+12%', color: 'from-purple-500 to-violet-400', jobs: ['Analyst', 'Manager', 'Consultant', 'Accountant'] },
    { name: 'Creative & Design', count: '15,678', icon: Palette, growth: '+25%', color: 'from-pink-500 to-rose-400', jobs: ['Designer', 'Artist', 'Writer', 'Photographer'] },
    { name: 'Sales & Marketing', count: '26,743', icon: Megaphone, growth: '+14%', color: 'from-indigo-500 to-blue-400', jobs: ['Sales Rep', 'Marketer', 'Brand Manager', 'PR Specialist'] },
    { name: 'Engineering', count: '18,945', icon: Cpu, growth: '+20%', color: 'from-cyan-500 to-teal-400', jobs: ['Civil Engineer', 'Mechanical', 'Aerospace', 'Chemical'] },
    { name: 'Public Service', count: '12,456', icon: Shield, growth: '+8%', color: 'from-emerald-500 to-green-400', jobs: ['Police Officer', 'Firefighter', 'Social Worker', 'Government'] },
    { name: 'Hospitality & Service', count: '23,567', icon: ChefHat, growth: '+16%', color: 'from-yellow-500 to-amber-400', jobs: ['Chef', 'Hotel Manager', 'Server', 'Event Planner'] },
    { name: 'Transportation', count: '14,789', icon: Truck, growth: '+11%', color: 'from-slate-500 to-gray-400', jobs: ['Driver', 'Pilot', 'Logistics', 'Dispatcher'] },
    { name: 'Construction', count: '16,234', icon: Hammer, growth: '+13%', color: 'from-amber-500 to-orange-400', jobs: ['Contractor', 'Architect', 'Builder', 'Supervisor'] },
    { name: 'Agriculture & Environment', count: '8,945', icon: Leaf, growth: '+19%', color: 'from-green-600 to-lime-400', jobs: ['Farmer', 'Environmentalist', 'Ranger', 'Scientist'] },
    { name: 'Legal Services', count: '11,567', icon: Gavel, growth: '+9%', color: 'from-stone-500 to-neutral-400', jobs: ['Lawyer', 'Paralegal', 'Judge', 'Legal Assistant'] },
    { name: 'Sports & Fitness', count: '7,834', icon: Activity, growth: '+21%', color: 'from-red-600 to-pink-400', jobs: ['Coach', 'Trainer', 'Athlete', 'Nutritionist'] },
    { name: 'Arts & Entertainment', count: '9,678', icon: Music, growth: '+17%', color: 'from-violet-500 to-purple-400', jobs: ['Musician', 'Actor', 'Producer', 'Director'] },
    { name: 'Real Estate', count: '13,456', icon: Building, growth: '+10%', color: 'from-teal-500 to-cyan-400', jobs: ['Agent', 'Broker', 'Appraiser', 'Property Manager'] },
    { name: 'Retail & E-commerce', count: '21,789', icon: ShoppingCart, growth: '+14%', color: 'from-fuchsia-500 to-pink-400', jobs: ['Manager', 'Associate', 'Buyer', 'Merchandiser'] },
    { name: 'Media & Communications', count: '12,345', icon: Newspaper, growth: '+23%', color: 'from-sky-500 to-blue-400', jobs: ['Journalist', 'PR Manager', 'Content Creator', 'Editor'] },
    { name: 'Research & Science', count: '10,567', icon: Microscope, growth: '+26%', color: 'from-indigo-600 to-blue-400', jobs: ['Researcher', 'Lab Technician', 'Scientist', 'Analyst'] },
    { name: 'Security & Safety', count: '9,234', icon: Shield, growth: '+12%', color: 'from-red-700 to-red-400', jobs: ['Security Guard', 'Safety Inspector', 'Risk Analyst', 'Investigator'] },
    { name: 'Personal Services', count: '15,432', icon: Scissors, growth: '+15%', color: 'from-pink-600 to-rose-400', jobs: ['Stylist', 'Barber', 'Spa Therapist', 'Personal Trainer'] },
    { name: 'Gaming & Technology', count: '11,876', icon: Gamepad2, growth: '+35%', color: 'from-purple-600 to-violet-400', jobs: ['Game Developer', 'Designer', 'Tester', 'Producer'] },
    { name: 'Non-Profit & Volunteer', count: '6,789', icon: Heart, growth: '+18%', color: 'from-rose-500 to-pink-400', jobs: ['Coordinator', 'Fundraiser', 'Volunteer Manager', 'Advocate'] }
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Matching',
      description: 'Our advanced AI analyzes your skills, experience, and preferences to find perfect job matches across all industries',
      color: 'from-yellow-400 to-orange-500',
      gradient: 'bg-gradient-to-br from-yellow-50 to-orange-50'
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Access jobs worldwide from Fortune 500 companies to local businesses, remote positions to on-site roles',
      color: 'from-blue-400 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-50 to-cyan-50'
    },
    {
      icon: Shield,
      title: 'Verified Employers',
      description: 'Every company is thoroughly vetted for legitimacy, workplace culture, and employee satisfaction ratings',
      color: 'from-green-400 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-50 to-emerald-50'
    },
    {
      icon: Target,
      title: 'Career Advancement',
      description: 'Access professional development resources, mentorship programs, and career coaching for growth',
      color: 'from-purple-400 to-violet-500',
      gradient: 'bg-gradient-to-br from-purple-50 to-violet-50'
    }
  ];

  const howItWorksSteps = [
    {
      icon: Search,
      title: 'Discover Your Path',
      description: 'Browse thousands of opportunities across every industry or let our AI find matches tailored to your unique profile',
      color: 'from-blue-500 to-purple-600',
      image: image1
    },
    {
      icon: Target,
      title: 'Apply with Confidence',
      description: 'One-click applications with intelligent resume optimization and personalized cover letter generation',
      color: 'from-purple-500 to-pink-600',
      image: image2
    },
    {
      icon: Rocket,
      title: 'Launch Your Career',
      description: 'Get hired faster with interview preparation, salary negotiation guidance, and ongoing career support',
      color: 'from-pink-500 to-red-600',
      image: image3
    }
  ];

  const topCompanies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com', jobs: 1234, industry: 'Technology' },
    { name: 'Mayo Clinic', logo: 'https://logo.clearbit.com/mayoclinic.org', jobs: 867, industry: 'Healthcare' },
    { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com', jobs: 543, industry: 'Automotive' },
    { name: 'Disney', logo: 'https://logo.clearbit.com/disney.com', jobs: 721, industry: 'Entertainment' },
    { name: 'Starbucks', logo: 'https://logo.clearbit.com/starbucks.com', jobs: 2156, industry: 'Hospitality' },
    { name: 'Boeing', logo: 'https://logo.clearbit.com/boeing.com', jobs: 432, industry: 'Aerospace' }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Hero Section with Revolutionary Design */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at ${mousePosition.x * 0.1}px ${mousePosition.y * 0.1}px, rgba(120, 119, 198, 0.3), transparent 50%),
            linear-gradient(45deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 75%, #1a1a2e 100%)
          `
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-float-slow blur-xl"></div>
          <div className="absolute top-1/3 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-lg rotate-45 animate-float-medium blur-lg"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-green-400/20 to-teal-500/20 rounded-full animate-float-fast blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg animate-spin-slow blur-sm"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          
          {/* Particle System */}
          {[...Array(20)].map((_, i) => (
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
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 leading-tight animate-glow">
                  The Future of
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                    Career Discovery
                  </span>
                </h1>
                
                {/* Floating Elements around Title */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce opacity-20"></div>
                <div className="absolute -top-4 -right-12 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg rotate-45 animate-spin-slow opacity-30"></div>
                <div className="absolute -bottom-6 left-1/4 w-8 h-8 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-ping opacity-25"></div>
              </div>
              
              <p className="text-xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed animate-slideUp">
                Join over <span className="font-bold text-cyan-400 animate-pulse">2.8 million</span> professionals across 
                <span className="font-bold text-purple-400"> every industry</span> who discovered their perfect career match.
                <br />
                <span className="text-lg md:text-xl text-gray-400 mt-4 block">
                  From tech innovators to healthcare heroes, skilled craftspeople to creative artists - your dream job awaits.
                </span>
              </p>
            </div>

            {/* Revolutionary Search Interface */}
            <div className="max-w-5xl mx-auto mt-16" data-animate id="hero-search">
              <div className="relative group">
                {/* Glowing Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-60 animate-pulse"></div>
                
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <SearchBar 
                    onSearch={handleSearch}
                    showAdvanced={false}
                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl"
                  />
                  
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <span className="text-gray-300 text-sm font-medium mb-2 block w-full">Popular Searches:</span>
                    {[
                      { label: 'Remote Work', icon: Globe, color: 'from-blue-500 to-cyan-400' },
                      { label: 'Healthcare', icon: Stethoscope, color: 'from-red-500 to-pink-400' },
                      { label: 'Teaching', icon: GraduationCap, color: 'from-green-500 to-emerald-400' },
                      { label: 'Skilled Trades', icon: Wrench, color: 'from-orange-500 to-yellow-400' },
                      { label: 'Creative Arts', icon: Palette, color: 'from-purple-500 to-pink-400' }
                    ].map((tag, index) => (
                      <button
                        key={tag.label}
                        className={`group px-6 py-3 bg-gradient-to-r ${tag.color} rounded-full text-white text-sm font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl transform-gpu animate-slideUp`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <tag.icon className="w-4 h-4 inline-block mr-2 group-hover:rotate-12 transition-transform" />
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats with Individual Animations */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8" data-animate id="hero-stats">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-110 animate-slideUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`bg-gradient-to-br ${stat.color} p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-md border border-white/10 hover:border-white/30 group-hover:animate-glow`}>
                    <stat.icon className="h-16 w-16 mx-auto mb-6 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                    <div className="text-4xl font-black text-white mb-2 group-hover:animate-bounce">{stat.value}</div>
                    <div className="text-white/90 font-bold text-lg mb-1">{stat.label}</div>
                    <div className="text-white/70 text-sm">{stat.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call-to-Action Buttons */}
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center items-center" data-animate id="hero-cta">
              <Link
                to="/jobs"
                className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 animate-slideUp"
              >
                <span className="relative z-10 flex items-center">
                  Explore All Opportunities
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/register"
                className="group px-12 py-6 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:border-white/60 shadow-xl transform transition-all duration-300 hover:scale-105 animate-slideUp"
                style={{ animationDelay: '0.2s' }}
              >
                Join Our Community
                <Users className="ml-3 h-6 w-6 inline-block group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-ping"></div>
          </div>
        </div>
      </section>

      {/* Revolutionary Job Categories Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float-medium"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-animate id="categories-title">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 animate-slideUp">
              Opportunities Across
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Every Industry
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
              From traditional trades to cutting-edge technology, from community service to creative arts - 
              find your perfect career path among hundreds of thousands of opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {jobCategories.map((category, index) => (
              <div
                key={category.name}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-animate
                id={`category-${index}`}
              >
                <div className={`bg-gradient-to-br ${category.color} p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-md border border-white/10 hover:border-white/30 group-hover:animate-glow h-full`}>
                  <div className="flex items-center justify-between mb-6">
                    <category.icon className="h-12 w-12 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                    <div className="text-right">
                      <div className="text-sm text-white/80 font-medium">{category.growth}</div>
                      <div className="text-xs text-white/60">growth</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors">
                    {category.name}
                  </h3>
                  
                  <div className="text-3xl font-black text-white mb-4 group-hover:animate-bounce">
                    {category.count}
                  </div>
                  
                  <div className="text-white/80 text-sm mb-4">opportunities available</div>
                  
                  {/* Sample Job Types */}
                  <div className="space-y-1">
                    {category.jobs.slice(0, 3).map((job, jobIndex) => (
                      <div key={jobIndex} className="text-white/70 text-xs bg-white/10 rounded-full px-3 py-1 inline-block mr-2 mb-1">
                        {job}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Categories Button */}
          <div className="text-center mt-16" data-animate id="categories-cta">
            <Link
              to="/jobs"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 animate-slideUp"
            >
              Explore All Categories
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Revolutionary How It Works Section with Asset Images */}
      <section className="py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-float-fast"></div>
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-animate id="howit-title">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 animate-slideUp">
              Your Journey to
              <span className="block bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                Career Success
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Three simple steps to transform your career and unlock opportunities you never knew existed.
            </p>
          </div>

          <div className="space-y-32">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 animate-slideUp`}
                style={{ animationDelay: `${index * 0.3}s` }}
                data-animate
                id={`step-${index}`}
              >
                {/* Content */}
                <div className="flex-1 space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-2xl animate-glow`}>
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="text-6xl font-black text-white/20">{(index + 1).toString().padStart(2, '0')}</div>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="flex space-x-4">
                    <Link
                      to="/jobs"
                      className={`group px-8 py-4 bg-gradient-to-r ${step.color} text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-1 max-w-lg">
                  <div className="relative group">
                    <div className={`absolute -inset-4 bg-gradient-to-r ${step.color} rounded-3xl blur opacity-30 group-hover:opacity-50 animate-pulse`}></div>
                    <img
                      src={step.image}
                      alt={step.title}
                      className="relative w-full h-80 object-cover rounded-3xl shadow-2xl transform transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-animate id="features-title">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 animate-slideUp">
              Powered by
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Advanced technology meets human insight to create the most intelligent job matching platform ever built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 animate-slideUp"
                style={{ animationDelay: `${index * 0.2}s` }}
                data-animate
                id={`feature-${index}`}
              >
                <div className={`${feature.gradient} p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-md border border-white/10 hover:border-white/30 group-hover:animate-glow h-full`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolutionary Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-fast"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-animate id="testimonials-title">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 animate-slideUp">
              Success Stories from
              <span className="block bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Every Industry
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Real professionals, real success stories. Discover how our platform transformed careers across all fields.
            </p>
          </div>

          {/* Enhanced Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto" data-animate id="testimonials-carousel">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 shadow-2xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === currentTestimonial 
                      ? 'opacity-100 transform translate-x-0' 
                      : 'opacity-0 transform translate-x-full absolute inset-0'
                  }`}
                >
                  <div className="text-center space-y-8">
                    <Quote className="h-16 w-16 text-purple-400 mx-auto opacity-50" />
                    
                    <blockquote className="text-2xl md:text-3xl text-white leading-relaxed font-medium">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center justify-center space-x-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full border-4 border-white/20 shadow-xl"
                      />
                      <div className="text-left">
                        <div className="text-xl font-bold text-white">{testimonial.name}</div>
                        <div className="text-purple-300 font-medium">{testimonial.role}</div>
                        <div className="text-purple-400 text-sm">{testimonial.industry}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-4 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-purple-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Top Companies Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20" data-animate id="companies-title">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 animate-slideUp">
              Trusted by
              <span className="block bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
              From Fortune 500 corporations to innovative startups, the world's best companies trust us to find exceptional talent.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {topCompanies.map((company, index) => (
              <div
                key={company.name}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-110 animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-animate
                id={`company-${index}`}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:animate-glow text-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 mx-auto mb-4 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="text-white font-bold text-sm mb-2">{company.name}</div>
                  <div className="text-purple-300 text-xs">{company.industry}</div>
                  <div className="text-cyan-400 text-xs font-medium mt-2">{company.jobs} open roles</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" data-animate id="companies-cta">
            <Link
              to="/companies"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 animate-slideUp"
            >
              View All Companies
              <Building2 className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Revolutionary CTA Section */}
      <section className="py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12" data-animate id="final-cta">
            <h2 className="text-6xl md:text-7xl font-black text-white leading-tight animate-slideUp">
              Ready to Transform
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Your Career?
              </span>
            </h2>
            
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Join millions of professionals who've already discovered their perfect career match. 
              Whether you're a surgeon saving lives, a teacher shaping minds, or a craftsperson building dreams - 
              your next opportunity is just one click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/register"
                className="group relative px-16 py-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:scale-105 animate-slideUp overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <Rocket className="ml-4 h-7 w-7 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </Link>
              
              <Link
                to="/jobs"
                className="group px-16 py-6 bg-white/10 backdrop-blur-md text-white font-bold text-xl rounded-3xl border-2 border-white/30 hover:border-white/60 shadow-xl transform transition-all duration-300 hover:scale-105 animate-slideUp"
                style={{ animationDelay: '0.6s' }}
              >
                Browse Opportunities
                <Search className="ml-4 h-7 w-7 inline-block group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
