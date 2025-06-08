import React, { useContext } from 'react';
import { ArrowRight, Users, MapPin, Briefcase } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const FeaturedCompanies = () => {
  const { isOlive } = useContext(ThemeContext);
  const companies = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      logo: image1,
      employees: '2,500+',
      location: 'San Francisco, CA',
      openJobs: 45,
      description: 'Leading technology solutions provider specializing in AI and cloud computing.',
      industry: 'Technology',
      rating: 4.8,
      benefits: ['Remote Work', 'Health Insurance', '401k Match', 'Stock Options']
    },
    {
      id: 2,
      name: 'Healthcare Partners',
      logo: image2,
      employees: '10,000+',
      location: 'New York, NY',
      openJobs: 128,
      description: 'Premier healthcare network providing comprehensive medical services nationwide.',
      industry: 'Healthcare',
      rating: 4.9,
      benefits: ['Flexible Hours', 'Continuing Education', 'Health Benefits', 'Retirement Plan']
    },
    {
      id: 3,
      name: 'Creative Studios Inc',
      logo: image3,
      employees: '850+',
      location: 'Los Angeles, CA',
      openJobs: 32,
      description: 'Award-winning creative agency specializing in digital marketing and brand design.',
      industry: 'Creative Arts',
      rating: 4.7,
      benefits: ['Creative Freedom', 'Flexible PTO', 'Team Events', 'Learning Budget']
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden transition-all duration-500 ${
      isOlive 
        ? 'bg-gradient-to-br from-olive-beige/10 to-olive-beige/20' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-olive-beige/20 to-raisin-black/10'
            : 'bg-gradient-to-r from-blue-200/30 to-purple-200/30'
        }`}></div>
        <div className={`absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl transition-all duration-700 ${
          isOlive
            ? 'bg-gradient-to-r from-raisin-black/10 to-olive-beige/15'
            : 'bg-gradient-to-r from-cyan-200/20 to-teal-200/20'
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
                : 'bg-gradient-to-r from-blue-600 to-purple-600'
            }`}>Companies</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-500 ${
            isOlive ? 'text-raisin-black/70' : 'text-gray-600'
          }`}>
            Join industry leaders who are actively hiring talented professionals like you
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className={`group rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 ${
                isOlive 
                  ? 'bg-white border border-olive-beige/20 hover:border-olive-beige/40 hover:bg-olive-beige/5' 
                  : 'bg-white border border-gray-100 hover:border-blue-200'
              }`}
              data-animate
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Company Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                      <span className="text-white text-sm font-semibold">{company.industry}</span>
                    </div>
                    <div className="flex items-center bg-yellow-400/90 rounded-full px-3 py-1">
                      <span className="text-yellow-900 text-sm font-bold">★ {company.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="p-8">
                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                  isOlive 
                    ? 'text-raisin-black group-hover:text-olive-beige' 
                    : 'text-gray-900 group-hover:text-blue-600'
                }`}>
                  {company.name}
                </h3>
                
                <p className={`mb-6 leading-relaxed transition-colors duration-300 ${
                  isOlive ? 'text-raisin-black/70' : 'text-gray-600'
                }`}>
                  {company.description}
                </p>

                {/* Company Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className={`h-5 w-5 transition-colors duration-300 ${
                      isOlive ? 'text-olive-beige' : 'text-blue-500'
                    }`} />
                    <span className={`text-sm transition-colors duration-300 ${
                      isOlive ? 'text-raisin-black/70' : 'text-gray-600'
                    }`}>{company.employees} employees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className={`h-5 w-5 transition-colors duration-300 ${
                      isOlive ? 'text-olive-beige' : 'text-green-500'
                    }`} />
                    <span className={`text-sm transition-colors duration-300 ${
                      isOlive ? 'text-raisin-black/70' : 'text-gray-600'
                    }`}>{company.location}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                    isOlive ? 'text-raisin-black' : 'text-gray-700'
                  }`}>Top Benefits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {company.benefits.slice(0, 3).map((benefit, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          isOlive 
                            ? 'bg-olive-beige/20 text-raisin-black hover:bg-olive-beige/30' 
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        }`}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Open Jobs CTA */}
                <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-300 ${
                  isOlive ? 'border-olive-beige/20' : 'border-gray-100'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Briefcase className={`h-5 w-5 transition-colors duration-300 ${
                      isOlive ? 'text-olive-beige' : 'text-purple-500'
                    }`} />
                    <span className={`text-lg font-bold transition-colors duration-300 ${
                      isOlive ? 'text-olive-beige' : 'text-purple-600'
                    }`}>{company.openJobs} open jobs</span>
                  </div>
                  <button className={`group/btn flex items-center space-x-2 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    isOlive 
                      ? 'bg-gradient-to-r from-olive-beige to-raisin-black hover:from-olive-beige/90 hover:to-raisin-black/90' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  }`}>
                    <span>View Jobs</span>
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Companies Button */}
        <div className="text-center mt-16">
          <button className={`group border-2 px-12 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
            isOlive 
              ? 'bg-white border-olive-beige text-olive-beige hover:bg-olive-beige hover:text-white' 
              : 'bg-white border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
          }`}>
            <span className="flex items-center space-x-3">
              <span>Explore All Companies</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
