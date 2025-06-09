import React, { useState, useCallback, useEffect } from 'react';
import { Search, MapPin, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Hero = () => {
  const navigate = useNavigate();
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [animatedNumbers, setAnimatedNumbers] = useState({ matches: 0, jobs: 0, candidates: 0 });

  // Popular search tags matching Wellfound's style
  const popularSearches = [
    'Remote Work', 'Software Engineer', 'Product Manager', 'Data Scientist', 
    'UI/UX Designer', 'Marketing', 'Sales', 'Full Stack', 'Backend', 'Frontend'
  ];

  // Animate numbers when hero becomes visible
  useEffect(() => {
    if (heroVisible) {
      const targets = { matches: 8, jobs: 150, candidates: 10 };
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedNumbers({
          matches: Math.floor(targets.matches * easeOut),
          jobs: Math.floor(targets.jobs * easeOut),
          candidates: Math.floor(targets.candidates * easeOut)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedNumbers({ matches: 8, jobs: 150, candidates: 10 });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [heroVisible]);

  const handleSearch = useCallback((query = searchQuery) => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('search', query);
    if (location) searchParams.set('location', location);
    navigate(`/jobs?${searchParams.toString()}`);
  }, [searchQuery, location, navigate]);

  const handleTagClick = useCallback((tag) => {
    setSearchQuery(tag);
    handleSearch(tag);
  }, [handleSearch]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-5 animate-pulse bg-black"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-3 animate-bounce bg-gray-900" style={{ animationDuration: '3s' }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-10 animate-float bg-gray-800"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div 
        ref={heroRef}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          heroVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        
        {/* Main Headline - Wellfound Style */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-3 text-black" />
            <span className="text-lg font-medium text-gray-600">
              The Future of Career Discovery
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-black">
            Find what's{' '}
            <span className="bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
              next
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 text-gray-700">
            Connect directly with founders at top startups. No third-party recruiters, 
            no cover letters. Just you, your skills, and endless opportunities.
          </p>
        </div>

        {/* Enhanced Search Interface */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative p-3 rounded-2xl backdrop-blur-md bg-gray-50/80 border border-gray-200 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-3">
              
              {/* Job Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-lg font-medium placeholder-gray-500 bg-white text-black focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 text-lg font-medium placeholder-gray-500 bg-white text-black focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={() => handleSearch()}
                className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center bg-black text-white hover:bg-gray-800"
              >
                <span className="mr-2">Search Jobs</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Popular Searches Tags */}
        <div className="max-w-5xl mx-auto mb-16">
          <p className="text-sm font-medium mb-4 text-gray-600">
            Popular searches:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearches.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 bg-gray-100 text-black border border-gray-200 hover:bg-gray-200 backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section - Full width with darker background */}
        <div className="relative mt-20 -mx-4 sm:-mx-6 lg:-mx-8">
          {/* Dark background section - Full width */}
          <div className="bg-gradient-to-r from-gray-900 via-purple-950 to-gray-900 py-20 px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[
                { number: animatedNumbers.matches, suffix: 'M+', label: 'Matches Made' },
                { number: animatedNumbers.jobs, suffix: 'K+', label: 'Tech Jobs' },
                { number: animatedNumbers.candidates, suffix: 'M+', label: 'Startup Ready Candidates' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-6xl md:text-7xl font-bold mb-4 text-white transition-all duration-1000 ${
                    heroVisible ? 'opacity-100 animate-countUp' : 'opacity-0'
                  }`} style={{ animationDelay: `${index * 0.2}s` }}>
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-xl md:text-2xl text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-16 max-w-6xl mx-auto"></div>

            {/* Company Logos Section with Scroll Animation */}
            <div className="max-w-6xl mx-auto overflow-hidden">
              <div className="animate-scroll-logos flex items-center gap-16 whitespace-nowrap">
                {/* First set of logos */}
                <div className="flex items-center gap-16 text-gray-400">
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">📊</span> Airtable
                  </div>
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">💰</span> nerdwallet
                  </div>
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">🎨</span> adonis
                  </div>
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">⚡</span> consensys
                  </div>
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">🚗</span> cruise
                  </div>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex items-center gap-16 text-gray-400">
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">📊</span> Airtable
                  </div>
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">💰</span> nerdwallet
                  </div>
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">🎨</span> adonis
                  </div>
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">⚡</span> consensys
                  </div>
                  <div className="text-2xl font-bold tracking-wider flex items-center">
                    <span className="mr-2">🚗</span> cruise
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section - Why job seekers and recruiters love us */}
        <div className="relative mt-0 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-24 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Job Seekers Section */}
                <div className="space-y-8">
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">Got talent?</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Why job seekers love us
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        icon: "🔗",
                        title: "Connect directly with founders at top startups - no third party recruiters allowed.",
                        delay: "0s"
                      },
                      {
                        icon: "📊",
                        title: "Everything you need to know, all upfront. View salary, stock options, and more before applying.",
                        delay: "0.2s"
                      },
                      {
                        icon: "👆",
                        title: "Say goodbye to cover letters - your profile is all you need. One click to apply and you're done.",
                        delay: "0.4s"
                      },
                      {
                        icon: "⭐",
                        title: "Unique jobs at startups and tech companies you can't find anywhere else.",
                        delay: "0.6s"
                      }
                    ].map((feature, index) => (
                      <div 
                        key={index}
                        className={`flex items-start space-x-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-slideInLeft`}
                        style={{ animationDelay: feature.delay }}
                      >
                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-xl flex-shrink-0">
                          {feature.icon}
                        </div>
                        <p className="text-gray-800 font-medium leading-relaxed">
                          {feature.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                      Learn more
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">
                      Sign up
                    </button>
                  </div>
                </div>

                {/* Recruiters Section */}
                <div className="space-y-8">
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">Need talent?</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      Why recruiters love us
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        icon: "🎯",
                        title: "Tap into a community of 10M+ engaged, startup-ready candidates.",
                        delay: "0.1s"
                      },
                      {
                        icon: "🚀",
                        title: "Everything you need to kickstart your recruiting — set up job posts, company branding, and HR tools within 10 minutes, all for free.",
                        delay: "0.3s"
                      },
                      {
                        icon: "📈",
                        title: "A free applicant tracking system, or free integration with any ATS you may already use.",
                        delay: "0.5s"
                      },
                      {
                        icon: "🤖",
                        title: "Let us handle the heavy-lifting with RecruiterCloud. Our new AI-Recruiter scans 500M+ candidates, filters it down based on your unique calibration, and schedules your favorites on your calendar in a matter of days.",
                        delay: "0.7s"
                      }
                    ].map((feature, index) => (
                      <div 
                        key={index}
                        className={`flex items-start space-x-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 animate-slideInRight`}
                        style={{ animationDelay: feature.delay }}
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl flex-shrink-0">
                          {feature.icon}
                        </div>
                        <p className="text-gray-800 font-medium leading-relaxed">
                          {feature.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                      Learn more
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes countUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.8);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        .animate-countUp {
          animation: countUp 0.8s ease-out forwards;
        }
        @keyframes scrollLogos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-logos {
          animation: scrollLogos 20s linear infinite;
        }
        .animate-scroll-logos:hover {
          animation-play-state: paused;
        }
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
