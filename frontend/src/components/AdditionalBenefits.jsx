import React from 'react';
import { Star, Calculator, Users, TrendingUp, ArrowRight, Badge, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';

const AdditionalBenefits = () => {
  const [benefitsRef, benefitsVisible] = useScrollAnimation(0.1);

  const benefits = [
    {
      icon: Award,
      title: 'Get Featured',
      subtitle: 'Let us show you off',
      description: 'Apply to be featured and let the opportunities come to you. We\'ll highlight your profile to top recruiters and companies searching for your skills. Oh, it\'s also 100% free.',
      cta: 'Learn more',
      link: '/candidates/featured',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop&auto=format'
    },
    {
      icon: Calculator,
      title: 'Salary Calculator',
      subtitle: 'Know your worth',
      description: 'We have the data. Research by job title, industry, and company size to find your salary range and be prepared to nail your negotiations.',
      cta: 'Calculate',
      link: '/hiring-data',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop&auto=format'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={benefitsRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 ${
            benefitsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`group relative rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
                benefitsVisible 
                  ? index === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
                  : ''
              }`}
              style={{
                animationDelay: benefitsVisible ? `${index * 0.2}s` : '0s'
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-700">
                <img 
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgColor} group-hover:opacity-80 transition-all duration-700`} />

              {/* Content */}
              <div className="relative z-10 p-8 lg:p-12">
                {/* Icon with animated background */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Animated ring */}
                  <div className={`absolute inset-0 w-16 h-16 rounded-2xl border-2 border-transparent bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700`} style={{ maskImage: 'linear-gradient(transparent, transparent)', WebkitMaskImage: 'linear-gradient(transparent, transparent)' }} />
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-black mb-2 group-hover:text-gray-800 transition-colors duration-300">
                  {benefit.title}
                </h3>

                {/* Subtitle */}
                <p className="text-lg font-semibold text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {benefit.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-700 mb-8 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {benefit.description}
                </p>

                {/* CTA Button */}
                <Link
                  to={benefit.link}
                  className={`inline-flex items-center px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r ${benefit.gradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300 group-hover:shadow-xl`}
                >
                  {benefit.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                {/* Decorative elements */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${benefit.gradient} animate-bounce`} style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="absolute bottom-8 right-12 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.gradient} animate-bounce`} style={{ animationDelay: '1s' }} />
                </div>
              </div>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-all duration-700 bg-gradient-to-r ${benefit.gradient} blur-xl`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalBenefits;
