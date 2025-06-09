import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerRef, headerVisible] = useScrollAnimation(0.1);
  const [testimonialRef, testimonialVisible] = useScrollAnimation(0.1);
  const [cardsRef, cardsVisible] = useScrollAnimation(0.1);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Software Engineer',
      company: 'TechFlow',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'I got my tech job on CareerFlow 4 years ago and I\'m still happy! Pays well, great culture, and unlimited PTO.',
      rating: 5,
      location: 'San Francisco, CA'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Product Manager',
      company: 'InnovateLab',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'I love CareerFlow. I got my current job at a startup entirely through the site last year - it\'s super easy to use and I love the UI.',
      rating: 5,
      location: 'Austin, TX'
    },
    {
      name: 'Emily Watson',
      role: 'UX Designer',
      company: 'DesignForward',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'I can\'t imagine my day to day without this platform. Life would be a lot more difficult.',
      rating: 5,
      location: 'New York, NY'
    },
    {
      name: 'David Kim',
      role: 'VP of Engineering',
      company: 'ScaleUp Inc',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
      quote: 'Half of the offers I give are sourced from CareerFlow. It\'s the best product for anyone looking for startup talent.',
      rating: 5,
      location: 'Seattle, WA',
      isRecruiter: true
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 mr-3 text-black" />
            <span className="text-lg font-semibold text-black">
              Success Stories
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            From our community
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Real stories from professionals who found their dream opportunities.
          </p>
        </div>

        {/* Main Testimonial */}
        <div 
          ref={testimonialRef}
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
            testimonialVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative rounded-3xl p-12 text-center bg-white border border-gray-200 shadow-xl">
            
            {/* Quote Icon */}
            <div className="absolute top-8 left-8">
              <Quote className="w-12 h-12 text-gray-300" fill="currentColor" />
            </div>

            {/* Profile Image */}
            <div className="mb-8">
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-20 h-20 rounded-full mx-auto border-4 border-gray-100 shadow-lg"
              />
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-black fill-current" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl font-medium text-black mb-8 leading-relaxed">
              "{currentTestimonial.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="space-y-2">
              <div className="text-lg font-bold text-black">
                {currentTestimonial.name}
              </div>
              <div className="text-gray-600">
                {currentTestimonial.role} at {currentTestimonial.company}
              </div>
              <div className="text-sm text-gray-500">
                {currentTestimonial.location}
              </div>
              {currentTestimonial.isRecruiter && (
                <div className="inline-block px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                  Recruiter
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:bg-black hover:border-black"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-white" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:bg-black hover:border-black"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-black scale-110' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Additional Testimonial Cards Grid */}
        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 ${
            cardsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                cardsVisible 
                  ? 'animate-fade-in-up' 
                  : ''
              }`}
              style={{
                animationDelay: cardsVisible ? `${index * 0.1}s` : '0s'
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-3 border-2 border-gray-200"
                />
                <div>
                  <div className="font-semibold text-black">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-black fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed">
                "{testimonial.quote.substring(0, 120)}..."
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
