import React, { useState, useEffect } from 'react';
import { Star, Quote, Briefcase, Users, Target, Heart, ArrowRight, Sparkles, MapPin, Clock, Trophy } from 'lucide-react';

const CompanyLogos = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentJourney, setCurrentJourney] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    const journeyInterval = setInterval(() => {
      setCurrentJourney((prev) => (prev + 1) % careerJourney.length);
    }, 4000);
    
    return () => {
      clearInterval(testimonialInterval);
      clearInterval(journeyInterval);
    };
  }, []);

  const careerJourney = [
    {
      title: "Discover Your Dream Role",
      description: "Explore opportunities that align with your passion and skills across innovative companies",
      icon: Target,
      color: "from-emerald-500 via-teal-500 to-cyan-500",
      bgImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format"
    },
    {
      title: "Connect with Visionaries", 
      description: "Build meaningful relationships with founders and leaders who share your vision",
      icon: Users,
      color: "from-purple-500 via-violet-500 to-indigo-500",
      bgImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format"
    },
    {
      title: "Launch Your Future",
      description: "Transform your career with opportunities that challenge and inspire you every day",
      icon: Trophy,
      color: "from-orange-500 via-rose-500 to-pink-500",
      bgImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop&auto=format"
    }
  ];

  const testimonials = [
    {
      name: "Alexandra Rivera",
      role: "Senior Product Designer", 
      company: "Meta",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face&auto=format",
      quote: "I found my dream role in product design through this platform. The direct connection with hiring managers made all the difference in showcasing my creative vision.",
      journey: "From freelancer to Senior Designer at Meta",
      timeToHire: "2 weeks"
    },
    {
      name: "David Chen",
      role: "Full Stack Engineer",
      company: "Stripe", 
      location: "Remote",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&auto=format",
      quote: "The transparency around compensation and company culture helped me make the best career decision of my life. No hidden surprises, just honest conversations.",
      journey: "From startup to Senior Engineer at Stripe",
      timeToHire: "3 weeks"
    },
    {
      name: "Sarah Kim",
      role: "VP of Marketing",
      company: "Notion",
      location: "New York, NY", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face&auto=format",
      quote: "This platform connected me with companies that truly value innovation and creativity. I went from marketing manager to VP in just 18 months.",
      journey: "From Manager to VP at Notion",
      timeToHire: "1 week"
    }
  ];

  const impactStories = [
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop&auto=format",
      title: "Remote Work Revolution", 
      description: "Connecting global talent with innovative companies breaking geographical boundaries",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop&auto=format",
      title: "Diversity & Inclusion",
      description: "Building inclusive teams that represent the future of technology and innovation",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&h=300&fit=crop&auto=format",
      title: "Startup Ecosystem",
      description: "Empowering the next generation of entrepreneurs and disruptive technologies", 
      gradient: "from-orange-600 to-red-600"
    }
  ];

  return (
    <div className="relative py-32 bg-white overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className={`text-center mb-24 transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse scale-110"></div>
            <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full p-4">
              <Sparkles className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
              Career Stories
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              That Inspire
            </span>
          </h2>
          
          <p className="text-2xl max-w-4xl mx-auto text-gray-600 leading-relaxed">
            Discover how professionals transformed their careers and found purpose 
            in companies building the future
          </p>
        </div>

        {/* Career Journey Showcase */}
        <div className={`mb-24 transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={careerJourney[currentJourney].bgImage}
                alt={careerJourney[currentJourney].title}
                className="w-full h-full object-cover transition-all duration-1000"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${careerJourney[currentJourney].color} opacity-80`}></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-white text-center p-12">
                <div className="max-w-3xl">
                  <div className="mb-6">
                    {React.createElement(careerJourney[currentJourney].icon, {
                      className: "w-20 h-20 mx-auto mb-4 animate-bounce"
                    })}
                  </div>
                  <h3 className="text-5xl font-bold mb-6">{careerJourney[currentJourney].title}</h3>
                  <p className="text-2xl leading-relaxed opacity-90">{careerJourney[currentJourney].description}</p>
                </div>
              </div>

              {/* Journey Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {careerJourney.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      index === currentJourney 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stories Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 transition-all duration-1500 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {impactStories.map((story, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-64">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${story.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
              </div>
              
              <div className="relative bg-white p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                  {story.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{story.description}</p>
                
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Testimonial */}
        <div className={`max-w-5xl mx-auto mb-20 transition-all duration-1500 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-2xl border border-gray-100 overflow-hidden">
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 -translate-y-16 translate-x-16"></div>
            <Quote className="absolute top-8 right-8 w-16 h-16 text-gray-200" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
                
                {/* Profile Section */}
                <div className="text-center lg:text-left">
                  <div className="relative inline-block mb-6">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/128x128/6366F1/FFFFFF?text=User";
                      }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-4 border-white">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-xl text-purple-600 font-semibold mb-2">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-lg text-gray-600 mb-1">
                    {testimonials[currentTestimonial].company}
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{testimonials[currentTestimonial].location}</span>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Hired in {testimonials[currentTestimonial].timeToHire}</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  <blockquote className="text-2xl text-gray-700 leading-relaxed mb-6 font-medium italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <p className="text-lg font-semibold text-gray-800 mb-2">Career Journey:</p>
                    <p className="text-purple-700">{testimonials[currentTestimonial].journey}</p>
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center mt-6 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-3 text-gray-600 font-medium">Exceptional Experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-12 space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-1500 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="relative inline-block p-12 rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border border-purple-100 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-pink-800 bg-clip-text text-transparent">
                Your Story Starts Here
              </h3>
              <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of professionals who've discovered their purpose and transformed their careers
              </p>
              
              <button className="group inline-flex items-center px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-700 transform hover:scale-110 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Briefcase className="w-7 h-7 mr-4 group-hover:animate-bounce" />
                <span>Begin Your Journey</span>
                <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          33% { transform: translateY(-30px) rotate(120deg); opacity: 0.4; }
          66% { transform: translateY(15px) rotate(240deg); opacity: 0.3; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CompanyLogos;
