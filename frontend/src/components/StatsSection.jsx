import React from 'react';
import { TrendingUp, Users, Briefcase, Star, ArrowRight } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const StatsSection = () => {
  const [statsRef, statsVisible] = useScrollAnimation(0.1);

  const stats = [
    {
      number: '8M+',
      label: 'Matches Made',
      icon: TrendingUp,
      description: 'Successful connections between talent and startups'
    },
    {
      number: '150K+',
      label: 'Tech Jobs',
      icon: Briefcase,
      description: 'Active opportunities across all tech sectors'
    },
    {
      number: '10M+',
      label: 'Startup Ready Candidates',
      icon: Users,
      description: 'Professionals ready for their next big opportunity'
    }
  ];

  return (
    <div className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={statsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 ${
            statsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center group transition-all duration-1000 ${
                statsVisible 
                  ? 'animate-scale-in' 
                  : ''
              }`}
              style={{
                animationDelay: statsVisible ? `${index * 0.2}s` : '0s'
              }}
            >
              {/* Animated Icon Container */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                  <stat.icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                {/* Animated Ring */}
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl border-2 border-white/30 group-hover:scale-125 group-hover:border-white/50 transition-all duration-500 animate-pulse" />
              </div>

              {/* Number with counting animation */}
              <div className="mb-2">
                <span className="text-5xl md:text-6xl font-bold text-white group-hover:text-gray-200 transition-colors duration-300">
                  {stat.number}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors duration-300">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed">
                {stat.description}
              </p>

              {/* Hover Effect Arrow */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <ArrowRight className="w-5 h-5 text-white mx-auto" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer group">
            <Star className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">Join the community</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
