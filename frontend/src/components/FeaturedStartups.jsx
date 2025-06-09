import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, MapPin, Users, TrendingUp, Sparkles, Rocket, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const FeaturedStartups = () => {
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [startupsRef, startupsVisible] = useScrollAnimation(0.1);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredStartups.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredStartups = [
    {
      name: 'TechFlow Dynamics',
      industry: 'AI & Automation',
      location: 'San Francisco, CA',
      employees: '50-100',
      description: 'Revolutionizing workplace productivity with AI-powered automation tools that enhance human creativity.',
      bgImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
      tags: ['Series B', 'AI', 'Remote-First'],
      openJobs: 15,
      growth: '+150%',
      gradient: 'from-blue-600 via-purple-600 to-pink-600',
      icon: Rocket
    },
    {
      name: 'Future Workspace',
      industry: 'HR Technology',
      location: 'Austin, TX',
      employees: '25-50',
      description: 'Building the next generation of remote collaboration tools for distributed teams worldwide.',
      bgImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&auto=format',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format',
      tags: ['Series A', 'SaaS', 'Global'],
      openJobs: 12,
      growth: '+200%',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
      icon: Users
    },
    {
      name: 'CareerCatalyst',
      industry: 'EdTech & Career',
      location: 'New York, NY',
      employees: '75-150',
      description: 'Transforming career development through personalized learning paths and AI-driven skill matching.',
      bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format',
      profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face&auto=format',
      tags: ['Series C', 'EdTech', 'AI-Powered'],
      openJobs: 22,
      growth: '+300%',
      gradient: 'from-orange-600 via-red-600 to-pink-600',
      icon: Target
    }
  ];

  return (
    <div className="relative py-32 bg-gray-900 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-pink-500/10 to-orange-500/10 animate-pulse blur-xl" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-40"></div>
          </div>
        ))}

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-24 transition-all duration-1500 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse scale-125"></div>
            <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full p-4">
              <Sparkles className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              The Future of Work
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h2>
          
          <p className="text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Discover the most innovative companies transforming how we work, collaborate, and grow professionally in 2025
          </p>
        </div>

        {/* Featured Companies Showcase */}
        <div 
          ref={startupsRef}
          className={`mb-20 transition-all duration-1500 delay-300 ${
            startupsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Main Featured Card */}
          <div className="relative mb-16">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={featuredStartups[currentSlide].bgImage}
                alt={featuredStartups[currentSlide].name}
                className="w-full h-full object-cover transition-all duration-1000"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${featuredStartups[currentSlide].gradient} opacity-80`}></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-between p-12 text-white">
                <div className="max-w-2xl">
                  <div className="flex items-center mb-6">
                    <img
                      src={featuredStartups[currentSlide].profileImage}
                      alt="Team"
                      className="w-16 h-16 rounded-full border-4 border-white/30 mr-4"
                    />
                    <div>
                      <h3 className="text-4xl font-bold mb-2">{featuredStartups[currentSlide].name}</h3>
                      <p className="text-xl opacity-90">{featuredStartups[currentSlide].industry}</p>
                    </div>
                  </div>
                  
                  <p className="text-xl leading-relaxed mb-6 opacity-90">
                    {featuredStartups[currentSlide].description}
                  </p>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {featuredStartups[currentSlide].location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      {featuredStartups[currentSlide].employees}
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {featuredStartups[currentSlide].growth} growth
                    </div>
                  </div>

                  <button className="group inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-110 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30">
                    <span>View {featuredStartups[currentSlide].openJobs} Open Roles</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>

                {/* Stats Card */}
                <div className="hidden lg:block">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    {React.createElement(featuredStartups[currentSlide].icon, {
                      className: "w-16 h-16 text-white mb-4 mx-auto"
                    })}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {featuredStartups[currentSlide].openJobs}
                      </div>
                      <div className="text-sm text-white/80">Open Positions</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {featuredStartups.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Company Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStartups.map((startup, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 ${
                  startupsVisible ? 'animate-slide-up' : ''
                }`}
                style={{
                  animationDelay: startupsVisible ? `${index * 0.2}s` : '0s'
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <img
                    src={startup.bgImage}
                    alt={startup.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${startup.gradient} opacity-60`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={startup.profileImage}
                      alt={startup.name}
                      className="w-12 h-12 rounded-full border-2 border-white/30 mr-4"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/48x48/6366F1/FFFFFF?text=${startup.name.charAt(0)}`;
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{startup.name}</h3>
                      <p className="text-sm text-gray-300">{startup.industry}</p>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400 fill-current ml-auto" />
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{startup.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {startup.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {startup.location}
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {startup.growth}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">
                      {startup.openJobs} Open Roles
                    </span>
                    <button className="group/btn inline-flex items-center text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${startup.gradient} transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          ref={ctaRef}
          className={`text-center transition-all duration-1500 delay-600 ${
            ctaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="relative inline-block p-12 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Ready to Shape the Future?
              </h3>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join innovative companies building tomorrow's workplace today
              </p>
              
              <button className="group inline-flex items-center px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-700 transform hover:scale-110 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Zap className="w-7 h-7 mr-4 group-hover:animate-bounce" />
                <span>Explore All Companies</span>
                <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          33% { transform: translateY(-25px) rotate(120deg); opacity: 0.7; }
          66% { transform: translateY(15px) rotate(240deg); opacity: 0.5; }
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FeaturedStartups;
