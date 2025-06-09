import React, { useState } from 'react';

// Import Wellfound-inspired components
import Hero from '../components/Hero';
import JobSeekerBenefits from '../components/JobSeekerBenefits';
import CompanyLogos from '../components/CompanyLogos';
import RecruiterBenefits from '../components/RecruiterBenefits';
import FeaturedStartups from '../components/FeaturedStartups';
import TestimonialsSection from '../components/TestimonialsSection';
import ConfettiAnimation from '../components/ConfettiAnimation';
import LoadingAnimation from '../components/LoadingAnimation';

const Home = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
  };

  if (showLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Confetti Animation */}
      {showConfetti && <ConfettiAnimation />}
      
      {/* Hero Section - White Background */}
      <Hero />
      
      {/* Job Seeker Benefits Section - White Background */}
      <JobSeekerBenefits />
      
      {/* Company Logos Section - Light Gray Background */}
      <CompanyLogos />
      
      {/* Recruiter Benefits Section - Light Gray Background */}
      <RecruiterBenefits />
      
      {/* Featured Startups Section - White Background */}
      <FeaturedStartups />
      
      {/* Testimonials Section - White Background */}
      <TestimonialsSection />
      
      {/* Call to Action Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to find what's next?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join millions of professionals discovering their dream opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={triggerConfetti}
              className="px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 bg-white text-black hover:bg-gray-100"
            >
              Get started for free
            </button>
            <button 
              onClick={triggerConfetti}
              className="px-8 py-4 rounded-full font-semibold text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Post a job
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
