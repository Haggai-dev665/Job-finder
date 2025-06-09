import React, { useState, useEffect } from 'react';
import { Target, Clock, Brain, Users, ArrowRight, Building2, Zap, Calculator, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const RecruiterBenefits = () => {
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [cardsRef, cardsVisible] = useScrollAnimation(0.1);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const featureCards = [
    {
      id: 'featured',
      title: 'Get Featured',
      subtitle: 'Let us show you off',
      description: 'Apply to be featured and let the opportunities come to you. We\'ll highlight your profile to top recruiters and companies.',
      additionalText: 'Oh, it\'s also 100% free.',
      buttonText: 'Learn more',
      gradient: 'from-orange-400 via-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500',
      textColor: 'text-white',
      icon: Star,
      floatingElements: [
        { icon: '⭐', delay: '0s', top: '20%', left: '10%' },
        { icon: '🚀', delay: '1s', top: '60%', left: '80%' },
        { icon: '💼', delay: '2s', top: '30%', left: '85%' }
      ]
    },
    {
      id: 'calculator',
      title: 'Salary Calculator',
      subtitle: 'Know your worth',
      description: 'We have the data. Research by job title, industry, and company size to find your salary range and be prepared to negotiate.',
      buttonText: 'Calculate',
      gradient: 'from-purple-600 via-purple-700 to-purple-800',
      bgColor: 'bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800',
      textColor: 'text-white',
      icon: Calculator,
      floatingElements: [
        { icon: '💰', delay: '0.5s', top: '15%', left: '15%' },
        { icon: '📊', delay: '1.5s', top: '70%', left: '75%' },
        { icon: '💎', delay: '2.5s', top: '40%', left: '80%' }
      ]
    },
    {
      id: 'picks',
      title: 'Our top picks for 2025 are here!',
      subtitle: 'Wellfound has selected 10 startups across 10 trending industries that should be on your radar in 2025. See what teams our community is most excited about in the year ahead!',
      buttonText: 'Explore our 10 of 10',
      gradient: 'from-gray-800 via-gray-900 to-black',
      bgColor: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black',
      textColor: 'text-white',
      icon: Award,
      badge: {
        text: '10 OF 10',
        subtext: 'IN 2025'
      },
      floatingElements: [
        { icon: '🏆', delay: '0s', top: '25%', left: '12%' },
        { icon: '🌟', delay: '1s', top: '65%', left: '82%' },
        { icon: '🔥', delay: '2s', top: '35%', left: '88%' }
      ]
    }
  ];

  return (
    <div className="relative py-32 bg-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-br from-orange-400 to-purple-400 rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-1500 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse scale-110"></div>
            <div className="relative bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 rounded-full p-4">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-orange-800 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          
          <p className="text-2xl max-w-4xl mx-auto text-gray-600 leading-relaxed">
            Explore featured roles, calculate your worth, and discover the hottest startups of 2025
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div 
          ref={cardsRef}
          className={`transition-all duration-1500 delay-300 ${
            cardsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          {/* First Row - Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {featureCards.slice(0, 2).map((card, index) => (
              <div 
                key={card.id}
                className={`group relative overflow-hidden rounded-3xl ${card.bgColor} p-12 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-105 ${
                  cardsVisible ? 'animate-slide-up' : ''
                }`}
                style={{
                  animationDelay: cardsVisible ? `${index * 0.2}s` : '0s',
                  minHeight: '320px'
                }}
              >
                {/* Floating Elements */}
                {card.floatingElements.map((element, idx) => (
                  <div
                    key={idx}
                    className="absolute text-2xl animate-bounce opacity-60"
                    style={{
                      top: element.top,
                      left: element.left,
                      animationDelay: element.delay,
                      animationDuration: '3s'
                    }}
                  >
                    {element.icon}
                  </div>
                ))}

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="mb-6">
                    <p className="text-sm font-semibold opacity-90 mb-2 tracking-wide uppercase">
                      {card.title}
                    </p>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                      {card.subtitle}
                    </h3>
                  </div>

                  <p className="text-lg leading-relaxed text-white/90 mb-6">
                    {card.description}
                  </p>

                  {card.additionalText && (
                    <p className="text-base font-medium text-white/80 mb-8">
                      {card.additionalText}
                    </p>
                  )}

                  <button className="group/btn inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-110 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 hover:border-white/50">
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-white to-transparent transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* Second Row - Full Width Card */}
          <div className="w-full">
            {featureCards.slice(2).map((card, index) => (
              <div 
                key={card.id}
                className={`group relative overflow-hidden rounded-3xl ${card.bgColor} shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:scale-[1.02] ${
                  cardsVisible ? 'animate-slide-up' : ''
                }`}
                style={{
                  animationDelay: cardsVisible ? '0.4s' : '0s',
                  minHeight: '280px'
                }}
              >
                <div className="flex flex-col lg:flex-row items-center">
                  {/* Content Side */}
                  <div className="flex-1 p-12 relative z-10">
                    {/* Badge */}
                    {card.badge && (
                      <div className="inline-block mb-6">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white mb-1">
                              {card.badge.text}
                            </div>
                            <div className="text-sm text-white/80 font-medium">
                              {card.badge.subtext}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                      {card.title}
                    </h3>

                    <p className="text-xl leading-relaxed text-white/90 mb-8 max-w-2xl">
                      {card.subtitle}
                    </p>

                    <button className="group/btn inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-110 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 hover:border-white/50">
                      <span>{card.buttonText}</span>
                      <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Visual Side */}
                  <div className="flex-1 p-12 flex items-center justify-center relative">
                    {/* Floating Elements */}
                    {card.floatingElements.map((element, idx) => (
                      <div
                        key={idx}
                        className="absolute text-3xl animate-bounce opacity-60"
                        style={{
                          top: element.top,
                          left: element.left,
                          animationDelay: element.delay,
                          animationDuration: '3s'
                        }}
                      >
                        {element.icon}
                      </div>
                    ))}

                    {/* Central Icon */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-500">
                        <card.icon className="w-16 h-16 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-white to-transparent transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          ref={ctaRef}
          className={`text-center mt-24 transition-all duration-1500 delay-600 ${
            ctaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="relative inline-block p-12 rounded-3xl bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 border border-orange-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-800 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                Ready to Accelerate Your Career?
              </h3>
              <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of professionals discovering amazing opportunities every day
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group inline-flex items-center px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-700 transform hover:scale-110 bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl hover:shadow-orange-500/25 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <Zap className="w-7 h-7 mr-4 group-hover:animate-bounce" />
                  <span>Get Started</span>
                  <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform duration-500" />
                </button>
                
                <button className="px-12 py-5 rounded-2xl font-semibold text-xl transition-all duration-500 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          33% { transform: translateY(-20px) rotate(120deg); opacity: 0.6; }
          66% { transform: translateY(10px) rotate(240deg); opacity: 0.4; }
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
          animation: float 8s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RecruiterBenefits;
