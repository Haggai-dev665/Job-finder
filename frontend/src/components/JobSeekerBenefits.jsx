import React from 'react';
import { Rocket, Star, Zap, Target, ArrowRight, Sparkles, TrendingUp, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const JobSeekerBenefits = () => {
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [rocketRef, rocketVisible] = useScrollAnimation(0.1);
  const [featuresRef, featuresVisible] = useScrollAnimation(0.1);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1);

  const launchFeatures = [
    {
      icon: Rocket,
      title: 'Launch Your Dream Career',
      description: 'Blast off into opportunities that align with your passion and skills.',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      bgImage: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop&auto=format',
      stats: '10K+ launches'
    },
    {
      icon: Star,
      title: 'Connect with Stellar Companies',
      description: 'Join innovative teams building the next generation of technology.',
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      bgImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&auto=format',
      stats: '500+ partners'
    },
    {
      icon: Zap,
      title: 'Instant Impact Opportunities',
      description: 'Skip the queue and land roles where you can make a difference from day one.',
      gradient: 'from-green-500 via-blue-500 to-purple-500',
      bgImage: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop&auto=format',
      stats: '95% success rate'
    },
    {
      icon: Target,
      title: 'Precision Job Matching',
      description: 'AI-powered matching ensures you find roles perfectly suited to your skills.',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format',
      stats: '98% match accuracy'
    }
  ];

  return (
    <div className="relative py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cosmic Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1500 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Launch Your Career
            <br />
            <span className="text-5xl md:text-6xl">Into the Future</span>
          </h2>
          
          <p className="text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
            Break free from ordinary opportunities. Join the most innovative companies 
            and ambitious founders shaping tomorrow's world.
          </p>
        </div>

        {/* Rocket Launch Visualization */}
        <div 
          ref={rocketRef}
          className={`mb-24 transition-all duration-2000 ${
            rocketVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="relative max-w-4xl mx-auto h-96 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=400&fit=crop&auto=format"
              alt="Space Launch"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent"></div>
            
            {/* Floating Rocket */}
            <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-3000 ${
              rocketVisible ? 'translate-y-0' : 'translate-y-20'
            }`}>
              <div className="relative">
                <Rocket className="w-16 h-16 text-white animate-bounce" style={{ animationDuration: '2s' }} />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-orange-500 to-transparent rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-8 left-8 right-8 flex justify-between">
              {[
                { label: 'Success Rate', value: '98%' },
                { label: 'Dream Jobs', value: '10K+' },
                { label: 'Top Companies', value: '500+' }
              ].map((stat, index) => (
                <div key={index} className="text-center backdrop-blur-md bg-white/10 rounded-2xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Launch Features Grid */}
        <div 
          ref={featuresRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 transition-all duration-1000 ${
            featuresVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          {launchFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-700 hover:scale-105 ${
                featuresVisible ? 'animate-fade-in-up' : ''
              }`}
              style={{
                animationDelay: featuresVisible ? `${index * 0.2}s` : '0s'
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <img
                  src={feature.bgImage}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-60`}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8">
                {/* Icon with Glow */}
                <div className="mb-6 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-50`}></div>
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-lg leading-relaxed text-gray-300 mb-6">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-300 font-semibold bg-purple-500/20 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${feature.gradient} transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Mission Control CTA */}
        <div 
          ref={ctaRef}
          className={`text-center transition-all duration-1500 ${
            ctaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="relative inline-block p-12 rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6 text-white">
                Ready for Launch?
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of ambitious professionals who've already launched their dream careers.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/jobs"
                  className="group px-12 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-110 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/25 flex items-center"
                >
                  <Rocket className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  Launch Career
                  <Sparkles className="w-5 h-5 ml-3" />
                </Link>
                
                <Link
                  to="/register"
                  className="px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-500 border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                >
                  Join Mission
                </Link>
              </div>
              
              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  10M+ Global Users
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  98% Success Rate
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  4.9/5 Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-twinkle {
          animation: twinkle infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default JobSeekerBenefits;
