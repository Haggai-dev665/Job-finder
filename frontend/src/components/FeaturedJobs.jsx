import React, { useContext } from 'react';
import { MapPin, Clock, DollarSign, Bookmark, ArrowRight, Star, Building2 } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const FeaturedJobs = ({ jobs = [] }) => {
  const { isOlive } = useContext(ThemeContext);
  
  // Safely handle jobs array
  const safeJobs = Array.isArray(jobs) ? jobs : [];
  
  // Mock data if no jobs provided
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&auto=format',
      location: 'San Francisco, CA',
      salary: '$120,000 - $180,000',
      type: 'Full-time',
      remote: true,
      posted: '2 days ago',
      description: 'Join our team to build next-generation AI-powered applications using React, Node.js, and Python.',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      rating: 4.8,
      applicants: 45,
      featured: true
    },
    {
      id: 2,
      title: 'Emergency Room Nurse',
      company: 'City General Hospital',
      logo: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop&auto=format',
      location: 'New York, NY',
      salary: '$75,000 - $95,000',
      type: 'Full-time',
      remote: false,
      posted: '1 day ago',
      description: 'Provide critical care in our state-of-the-art emergency department. BSN required, ER experience preferred.',
      skills: ['Emergency Care', 'Patient Assessment', 'IV Therapy', 'CPR'],
      rating: 4.9,
      applicants: 78,
      featured: true
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'Creative Studios Inc',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop&auto=format',
      location: 'Los Angeles, CA',
      salary: '$80,000 - $110,000',
      type: 'Full-time',
      remote: true,
      posted: '3 days ago',
      description: 'Lead our marketing initiatives across digital channels. Experience with social media and content marketing required.',
      skills: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Strategy'],
      rating: 4.7,
      applicants: 32,
      featured: true
    },
    {
      id: 4,
      title: 'Master Electrician',
      company: 'PowerTech Services',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
      location: 'Chicago, IL',
      salary: '$65,000 - $85,000',
      type: 'Full-time',
      remote: false,
      posted: '1 week ago',
      description: 'Lead electrical installations for commercial and residential projects. Master license and 10+ years experience required.',
      skills: ['Commercial Wiring', 'Safety Protocols', 'Blueprint Reading', 'Team Leadership'],
      rating: 4.6,
      applicants: 23,
      featured: true
    },
    {
      id: 5,
      title: 'Elementary Teacher',
      company: 'Sunshine Elementary School',
      logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop&auto=format',
      location: 'Austin, TX',
      salary: '$45,000 - $60,000',
      type: 'Full-time',
      remote: false,
      posted: '4 days ago',
      description: 'Teach 3rd grade students in a supportive, innovative environment. State certification and classroom experience required.',
      skills: ['Classroom Management', 'Curriculum Development', 'Student Assessment', 'Parent Communication'],
      rating: 4.5,
      applicants: 67,
      featured: true
    },
    {
      id: 6,
      title: 'UX/UI Designer',
      company: 'Design Forward LLC',
      logo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&auto=format',
      location: 'Seattle, WA',
      salary: '$85,000 - $115,000',
      type: 'Full-time',
      remote: true,
      posted: '5 days ago',
      description: 'Create beautiful, user-centered designs for web and mobile applications. Portfolio and 3+ years experience required.',
      skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      rating: 4.8,
      applicants: 89,
      featured: true
    }
  ];

  const displayJobs = safeJobs.length > 0 ? safeJobs.slice(0, 6) : mockJobs;

  return (
    <section className={`py-24 relative overflow-hidden transition-all duration-500 ${
      isOlive 
        ? 'bg-gradient-to-br from-raisin-black/5 to-olive-beige/10' 
        : 'bg-gradient-to-br from-slate-50 to-gray-100'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-olive-beige/20 to-raisin-black/10'
            : 'bg-gradient-to-r from-blue-200/30 to-purple-200/30'
        }`}></div>
        <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-raisin-black/10 to-olive-beige/15'
            : 'bg-gradient-to-r from-pink-200/20 to-yellow-200/20'
        }`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16" data-animate>
          <h2 className={`text-5xl font-black mb-6 transition-colors duration-500 ${
            isOlive ? 'text-raisin-black' : 'text-gray-900'
          }`}>
            Featured <span className={`text-transparent bg-clip-text transition-all duration-500 ${
              isOlive 
                ? 'bg-gradient-to-r from-olive-beige to-raisin-black' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`}>Opportunities</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            isOlive ? 'text-raisin-black/70' : 'text-gray-600'
          }`}>
            Handpicked jobs from top employers across all industries. Apply now and take the next step in your career.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayJobs.map((job, index) => (
            <div
              key={job.id}
              className={`group rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 ${
                isOlive 
                  ? 'bg-white border border-olive-beige/20 hover:border-olive-beige/40' 
                  : 'bg-white border border-gray-100 hover:border-purple-200'
              }`}
              data-animate
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Job Header */}
              <div className={`p-8 border-b transition-colors duration-300 ${
                isOlive ? 'border-olive-beige/10' : 'border-gray-50'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-2xl object-cover border border-gray-100"
                    />
                    <div>
                      <h3 className={`text-lg font-bold transition-colors duration-300 ${
                        isOlive 
                          ? 'text-raisin-black group-hover:text-olive-beige' 
                          : 'text-gray-900 group-hover:text-purple-600'
                      }`}>
                        {job.title}
                      </h3>
                      <p className={`text-sm transition-colors duration-300 ${
                        isOlive ? 'text-raisin-black/70' : 'text-gray-600'
                      }`}>{job.company}</p>
                    </div>
                  </div>
                  {job.featured && (
                    <span className={`text-white px-3 py-1 rounded-full text-xs font-bold ${
                      isOlive 
                        ? 'bg-gradient-to-r from-olive-beige to-raisin-black' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      Featured
                    </span>
                  )}
                </div>

                {/* Job Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {typeof job.location === 'string' 
                      ? job.location 
                      : job.location?.city && job.location?.state
                        ? `${job.location.city}, ${job.location.state}`
                        : job.location?.city || 'Remote'
                    }
                    {(job.remote || job.location?.remote) && (
                      <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Remote
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                    {typeof job.salary === 'string' 
                      ? job.salary 
                      : job.salary?.min && job.salary?.max
                        ? `${job.salary.currency || '$'}${job.salary.min.toLocaleString()} - ${job.salary.currency || '$'}${job.salary.max.toLocaleString()}${job.salary.period ? '/' + job.salary.period : ''}`
                        : job.salary?.min
                          ? `${job.salary.currency || '$'}${job.salary.min.toLocaleString()}${job.salary.period ? '/' + job.salary.period : ''}`
                          : 'Competitive salary'
                    }
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {job.type} • Posted {job.posted}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                    isOlive ? 'text-raisin-black' : 'text-gray-700'
                  }`}>Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {(job.skills || job.requirements?.skills || []).slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          isOlive 
                            ? 'bg-olive-beige/20 text-raisin-black hover:bg-olive-beige/30' 
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Company Rating & Applicants */}
                <div className="flex items-center justify-between mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-700">{job.rating}</span>
                    <span className="text-gray-500">Company Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{job.applicants} applicants</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className={`flex-1 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                    isOlive 
                      ? 'bg-gradient-to-r from-olive-beige to-raisin-black hover:from-olive-beige/90 hover:to-raisin-black/90' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600'
                  }`}>
                    <span>Apply Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className={`p-3 border rounded-xl transition-all duration-300 group/btn ${
                    isOlive 
                      ? 'border-olive-beige/30 hover:border-olive-beige hover:bg-olive-beige/10' 
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}>
                    <Bookmark className={`h-5 w-5 transition-colors duration-300 ${
                      isOlive 
                        ? 'text-olive-beige/60 group-hover/btn:text-olive-beige' 
                        : 'text-gray-400 group-hover/btn:text-purple-600'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Jobs Button */}
        <div className="text-center mt-16" data-animate>
          <p className={`text-lg mb-8 transition-colors duration-500 ${
            isOlive ? 'text-raisin-black/70' : 'text-gray-600'
          }`}>
            Showing 6 of <span className={`font-bold transition-colors duration-500 ${
              isOlive ? 'text-olive-beige' : 'text-purple-600'
            }`}>12,500+</span> available positions
          </p>
          <button className={`group text-white px-12 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
            isOlive 
              ? 'bg-gradient-to-r from-olive-beige to-raisin-black hover:from-olive-beige/90 hover:to-raisin-black/90' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600'
          }`}>
            <span className="flex items-center space-x-3">
              <span>Browse All Jobs</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
