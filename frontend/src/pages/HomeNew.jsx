import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { JobContext } from '../contexts/JobContext';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

// Import new components
import Hero from '../components/Hero';
import JobSeekerBenefits from '../components/JobSeekerBenefits';
import RecruiterBenefits from '../components/RecruiterBenefits';
import TestimonialsSection from '../components/TestimonialsSection';

// Lazy load components for better performance
const FeaturedCompanies = React.lazy(() => import('../components/FeaturedCompanies'));
const CallToAction = React.lazy(() => import('../components/CallToAction'));
const FeaturedJobs = React.lazy(() => import('../components/FeaturedJobs'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <Loader2 className="w-8 h-8 text-olive-beige animate-spin" />
    <span className="ml-2 text-olive-beige text-lg">Loading...</span>
  </div>
);

const Home = () => {
  const { jobs = [], getFeaturedJobs, getJobStats } = useContext(JobContext) || {};
  const { user } = useContext(AuthContext) || {};
  const { isOlive, setIsOlive } = useContext(ThemeContext) || {};
  const navigate = useNavigate();
  
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState({
    featuredJobs: false,
    stats: false
  });

  // Set olive theme as default if not already set
  useEffect(() => {
    if (isOlive === undefined && setIsOlive) {
      setIsOlive(true); // Set olive theme as default
    }
  }, [isOlive, setIsOlive]);

  // Load featured jobs on component mount
  useEffect(() => {
    const loadFeaturedJobs = async () => {
      if (getFeaturedJobs) {
        try {
          setIsLoading(prev => ({ ...prev, featuredJobs: true }));
          const featured = await getFeaturedJobs();
          if (Array.isArray(featured) && featured.length > 0) {
            setFeaturedJobs(featured);
          }
        } catch (error) {
          console.warn('Failed to load featured jobs:', error);
        } finally {
          setIsLoading(prev => ({ ...prev, featuredJobs: false }));
        }
      }
    };

    loadFeaturedJobs();
  }, [getFeaturedJobs]);

  return (
    <div className={`min-h-screen ${isOlive ? 'bg-white' : 'bg-gray-50'}`}>
      
      {/* Hero Section */}
      <Hero />

      {/* Company Logos Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedCompanies />
      </Suspense>

      {/* Job Seeker Benefits */}
      <JobSeekerBenefits />

      {/* Recruiter Benefits */}
      <RecruiterBenefits />

      {/* Featured Jobs Section */}
      <div className={`py-20 ${isOlive ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isOlive ? 'text-raisin-black' : 'text-gray-900'
            }`}>
              Featured Opportunities
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isOlive ? 'text-raisin-black/70' : 'text-gray-600'
            }`}>
              Discover hand-picked opportunities at the most innovative companies
            </p>
          </div>

          {isLoading.featuredJobs ? (
            <LoadingSpinner />
          ) : (
            <Suspense fallback={<LoadingSpinner />}>
              <FeaturedJobs jobs={featuredJobs} />
            </Suspense>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Preview Section */}
      <div className={`py-20 ${isOlive ? 'bg-white' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isOlive ? 'text-raisin-black' : 'text-gray-900'
            }`}>
              From the blog
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isOlive ? 'text-raisin-black/70' : 'text-gray-600'
            }`}>
              Career insights, startup trends, and success stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'The Future of Remote Work in 2025',
                excerpt: 'How distributed teams are reshaping the startup landscape and creating new opportunities...',
                readTime: '5 min read',
                category: 'Trends'
              },
              {
                title: '10 Questions to Ask Before Joining a Startup',
                excerpt: 'Essential questions to evaluate culture, growth potential, and your role in the company...',
                readTime: '7 min read',
                category: 'Career Tips'
              },
              {
                title: 'Top AI Startups Hiring Now',
                excerpt: 'Discover the most innovative AI companies looking for talented professionals...',
                readTime: '6 min read',
                category: 'Job Collections'
              }
            ].map((post, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1 ${
                  isOlive 
                    ? 'bg-white border border-gray-200 hover:border-olive-beige/30' 
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className={`text-sm font-medium mb-3 ${
                  isOlive ? 'text-olive-beige' : 'text-blue-600'
                }`}>
                  {post.category}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isOlive ? 'text-raisin-black' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>
                <p className={`mb-4 ${isOlive ? 'text-raisin-black/70' : 'text-gray-600'}`}>
                  {post.excerpt}
                </p>
                <div className={`text-sm ${isOlive ? 'text-raisin-black/50' : 'text-gray-500'}`}>
                  {post.readTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <Suspense fallback={<LoadingSpinner />}>
        <CallToAction />
      </Suspense>
    </div>
  );
};

export default Home;
