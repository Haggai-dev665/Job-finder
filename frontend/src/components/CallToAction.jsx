import React, { useContext } from 'react';
import { ArrowRight, Users, Zap, Shield, Heart, Star, CheckCircle } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const CallToAction = () => {
  const { isOlive } = useContext(ThemeContext);
  const benefits = [
    {
      icon: Zap,
      title: 'Fast Applications',
      description: 'Apply to multiple jobs in seconds'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is secure and protected'
    },
    {
      icon: Heart,
      title: 'Perfect Matches',
      description: 'AI finds jobs that fit you perfectly'
    }
  ];

  const stats = [
    { value: '2.8M+', label: 'Happy Users' },
    { value: '96.8%', label: 'Success Rate' },
    { value: '125K+', label: 'Job Postings' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  return (
    <section className={`py-24 relative overflow-hidden transition-all duration-500 ${
      isOlive 
        ? 'bg-gradient-to-br from-raisin-black via-raisin-black/95 to-olive-beige/20' 
        : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Orbs */}
        <div className={`absolute top-20 left-20 w-40 h-40 rounded-full animate-pulse blur-xl transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-olive-beige/30 to-olive-beige/20'
            : 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20'
        }`}></div>
        <div className={`absolute top-1/3 right-32 w-32 h-32 rounded-lg rotate-45 animate-pulse blur-lg transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-olive-beige/25 to-raisin-black/15'
            : 'bg-gradient-to-r from-purple-400/20 to-pink-500/20'
        }`}></div>
        <div className={`absolute bottom-32 left-1/3 w-48 h-48 rounded-full animate-pulse blur-xl transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-olive-beige/20 to-olive-beige/30'
            : 'bg-gradient-to-r from-green-400/20 to-teal-500/20'
        }`}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Content */}
        <div className="text-center mb-20" data-animate>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Your Dream Job
            <span className={`block text-transparent bg-clip-text transition-all duration-500 ${
              isOlive 
                ? 'bg-gradient-to-r from-olive-beige via-olive-beige/80 to-white' 
                : 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
            }`}>
              Awaits You
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Join millions of professionals who found their perfect career match. 
            <br className="hidden md:block" />
            Start your journey today and discover opportunities you never knew existed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className={`group text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 ${
              isOlive 
                ? 'bg-gradient-to-r from-olive-beige to-olive-beige/80 hover:from-olive-beige/90 hover:to-olive-beige/70' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600'
            }`}>
              <Users className="h-6 w-6" />
              <span>Start Job Search</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white/30 text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              <span>Post a Job</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                data-animate
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group text-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105"
              data-animate
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-6">              <div className={`p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                isOlive 
                  ? 'bg-gradient-to-r from-olive-beige to-olive-beige/80' 
                  : 'bg-gradient-to-r from-cyan-400 to-blue-500'
              }`}>
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
              <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20" data-animate>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              Join Professionals from Top Companies
            </h3>
            <p className="text-gray-300 text-lg">
              Trusted by employees from the world's leading organizations
            </p>
          </div>

          {/* Company Logos (Placeholder) */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Netflix'].map((company, index) => (
              <div
                key={company}
                className="bg-white/20 rounded-lg px-6 py-3 text-white font-semibold hover:bg-white/30 transition-colors duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20" data-animate>
          <div className="inline-flex items-center bg-green-500/20 border border-green-400/30 rounded-full px-6 py-3 mb-8">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-green-300 font-medium">100% Free to Get Started</span>
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-6">
            What are you waiting for?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Your perfect job is out there. Take the first step towards your dream career today.
          </p>
          
          <button className={`group relative overflow-hidden text-white px-16 py-6 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
            isOlive 
              ? 'bg-gradient-to-r from-olive-beige to-olive-beige/90' 
              : 'bg-gradient-to-r from-pink-500 to-rose-600'
          }`}>
            <span className="relative z-10 flex items-center space-x-3">
              <span>Get Started Now</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Button Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full ${
              isOlive 
                ? 'bg-gradient-to-r from-olive-beige/80 to-olive-beige/60' 
                : 'bg-gradient-to-r from-pink-400 to-rose-500'
            }`}></div>
          </button>
          
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • Start in less than 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
