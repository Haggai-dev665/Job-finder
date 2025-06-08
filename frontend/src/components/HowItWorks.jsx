import React, { useContext } from 'react';
import { Search, UserPlus, Briefcase, CheckCircle, ArrowRight, Target, Zap, Shield } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const HowItWorks = () => {
  const { isOlive } = useContext(ThemeContext);
  const steps = [
    {
      step: 1,
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Set up your professional profile in minutes. Add your skills, experience, and career preferences.',
      details: ['Upload your resume', 'Add skills & certifications', 'Set salary expectations', 'Choose job preferences'],
      color: isOlive ? 'from-olive-beige to-raisin-black' : 'from-blue-500 to-cyan-400',
      bgColor: isOlive ? 'bg-olive-beige/5' : 'bg-blue-50'
    },
    {
      step: 2,
      icon: Search,
      title: 'Search & Discover',
      description: 'Use our advanced search to find jobs that match your skills and career goals perfectly.',
      details: ['AI-powered job matching', 'Filter by location & salary', 'Save interesting positions', 'Get personalized recommendations'],
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-50'
    },
    {
      step: 3,
      icon: Briefcase,
      title: 'Apply with Confidence',
      description: 'Apply to multiple positions with one click. Track your applications and get real-time updates.',
      details: ['One-click applications', 'Application tracking dashboard', 'Interview scheduling', 'Status notifications'],
      color: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-50'
    },
    {
      step: 4,
      icon: CheckCircle,
      title: 'Land Your Dream Job',
      description: 'Get hired by top companies and start your new career journey with confidence.',
      details: ['Direct employer contact', 'Salary negotiation tips', 'Onboarding support', 'Career growth tracking'],
      color: 'from-yellow-500 to-orange-400',
      bgColor: 'bg-yellow-50'
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'AI-powered algorithm matches you with jobs that fit your skills and preferences perfectly.',
      color: 'text-blue-600'
    },
    {
      icon: Zap,
      title: 'Instant Applications',
      description: 'Apply to multiple jobs with one click using your saved profile and preferences.',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your personal information is secure and only shared with your explicit permission.',
      color: 'text-green-600'
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden transition-all duration-500 ${
      isOlive 
        ? 'bg-gradient-to-br from-olive-beige/10 via-olive-beige/5 to-raisin-black/5' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-olive-beige/15 to-raisin-black/10'
            : 'bg-gradient-to-r from-blue-200/20 to-purple-200/20'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-raisin-black/10 to-olive-beige/15'
            : 'bg-gradient-to-r from-pink-200/20 to-yellow-200/20'
        }`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20" data-animate>
          <h2 className={`text-5xl font-black mb-6 transition-colors duration-500 ${
            isOlive ? 'text-raisin-black' : 'text-gray-900'
          }`}>
            How It <span className={`text-transparent bg-clip-text transition-all duration-500 ${
              isOlive 
                ? 'bg-gradient-to-r from-olive-beige to-raisin-black' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}>Works</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            isOlive ? 'text-raisin-black/70' : 'text-gray-600'
          }`}>
            Getting hired has never been easier. Follow our simple 4-step process to land your dream job.
          </p>
        </div>

        {/* Steps Process */}
        <div className="relative mb-20">
          {/* Connection Lines */}
          <div className={`hidden lg:block absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 z-0 transition-all duration-500 ${
            isOlive 
              ? 'bg-gradient-to-r from-olive-beige/40 via-raisin-black/30 to-olive-beige/40' 
              : 'bg-gradient-to-r from-blue-200 via-purple-200 to-yellow-200'
          }`}></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="group relative"
                data-animate
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Card */}
                <div className={`${step.bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 relative overflow-hidden`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  <div className="relative z-10">
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
                        <span className="text-xl font-black text-gray-700">{step.step}</span>
                      </div>
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                      isOlive ? 'text-raisin-black group-hover:text-raisin-black/80' : 'text-gray-900 group-hover:text-gray-700'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`mb-6 leading-relaxed transition-colors duration-300 ${
                      isOlive ? 'text-raisin-black/70' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className={`flex items-center text-sm transition-colors duration-300 ${
                          isOlive ? 'text-raisin-black/70' : 'text-gray-600'
                        }`}>
                          <CheckCircle className={`h-4 w-4 mr-2 flex-shrink-0 transition-colors duration-300 ${
                            isOlive ? 'text-olive-beige' : 'text-green-500'
                          }`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Arrow (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className={`rounded-3xl shadow-2xl p-12 border transition-all duration-500 ${
          isOlive 
            ? 'bg-white/95 border-olive-beige/20' 
            : 'bg-white border-gray-100'
        }`} data-animate>
          <h3 className={`text-3xl font-bold text-center mb-12 transition-colors duration-500 ${
            isOlive ? 'text-raisin-black' : 'text-gray-900'
          }`}>
            Why Choose Our Platform?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group"
                data-animate
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors duration-300">
                    <feature.icon className={`h-12 w-12 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16" data-animate>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who found their dream jobs through our platform. Your perfect career is just a few clicks away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
              isOlive 
                ? 'bg-gradient-to-r from-olive-beige to-raisin-black hover:from-olive-beige/90 hover:to-raisin-black/90' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}>
              Get Started Free
            </button>
            <button className={`border-2 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 ${
              isOlive 
                ? 'border-olive-beige text-olive-beige hover:border-raisin-black hover:text-raisin-black' 
                : 'border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
            }`}>
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
