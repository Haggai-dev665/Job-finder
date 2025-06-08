import React, { useState, useEffect } from 'react';
import { useJob } from '../contexts/JobContext';
import { Search, MapPin, Users, Briefcase, ExternalLink, Building2, Star } from 'lucide-react';

const Companies = () => {
  const { jobs } = useJob();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sizeFilter, setSizeFilter] = useState('all');

  useEffect(() => {
    // Extract unique companies from jobs
    const companyMap = new Map();
    
    jobs.forEach(job => {
      if (!companyMap.has(job.company)) {
        companyMap.set(job.company, {
          id: job.company.toLowerCase().replace(/\s+/g, '-'),
          name: job.company,
          logo: job.companyLogo || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=2563eb&color=ffffff&size=128`,
          industry: job.industry || 'Technology',
          location: job.location,
          description: `${job.company} is a leading company in the ${job.industry || 'technology'} sector, committed to innovation and excellence.`,
          size: getRandomSize(),
          founded: getRandomYear(),
          website: `https://${job.company.toLowerCase().replace(/\s+/g, '')}.com`,
          openPositions: 0,
          rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
          employees: getRandomEmployeeCount(),
          benefits: getRandomBenefits()
        });
      }
      
      // Count open positions
      const company = companyMap.get(job.company);
      company.openPositions += 1;
    });

    setCompanies(Array.from(companyMap.values()));
  }, [jobs]);

  useEffect(() => {
    let filtered = [...companies];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply size filter
    if (sizeFilter !== 'all') {
      filtered = filtered.filter(company => company.size === sizeFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'jobs':
        filtered.sort((a, b) => b.openPositions - a.openPositions);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'employees':
        filtered.sort((a, b) => b.employees - a.employees);
        break;
      default:
        break;
    }

    setFilteredCompanies(filtered);
  }, [companies, searchTerm, sortBy, sizeFilter]);

  function getRandomSize() {
    const sizes = ['startup', 'small', 'medium', 'large', 'enterprise'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  function getRandomYear() {
    return Math.floor(Math.random() * (2020 - 1990) + 1990);
  }

  function getRandomEmployeeCount() {
    const ranges = {
      startup: Math.floor(Math.random() * 50) + 10,
      small: Math.floor(Math.random() * 200) + 51,
      medium: Math.floor(Math.random() * 500) + 201,
      large: Math.floor(Math.random() * 5000) + 501,
      enterprise: Math.floor(Math.random() * 50000) + 5001
    };
    return ranges[getRandomSize()] || 100;
  }

  function getRandomBenefits() {
    const allBenefits = [
      'Health Insurance',
      'Dental Coverage',
      'Vision Insurance',
      '401(k) Matching',
      'Flexible PTO',
      'Remote Work',
      'Learning Budget',
      'Gym Membership',
      'Free Meals',
      'Stock Options',
      'Parental Leave',
      'Mental Health Support'
    ];
    
    const numBenefits = Math.floor(Math.random() * 6) + 4; // 4-9 benefits
    const shuffled = allBenefits.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numBenefits);
  }

  const getSizeLabel = (size) => {
    const labels = {
      startup: 'Startup (1-50)',
      small: 'Small (51-200)',
      medium: 'Medium (201-500)',
      large: 'Large (501-5000)',
      enterprise: 'Enterprise (5000+)'
    };
    return labels[size] || size;
  };

  const getSizeColor = (size) => {
    const colors = {
      startup: 'bg-purple-100 text-purple-800',
      small: 'bg-blue-100 text-blue-800',
      medium: 'bg-green-100 text-green-800',
      large: 'bg-orange-100 text-orange-800',
      enterprise: 'bg-red-100 text-red-800'
    };
    return colors[size] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
        <p className="text-gray-600">
          Discover amazing companies and their job opportunities
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Sizes</option>
              <option value="startup">Startup</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="enterprise">Enterprise</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="jobs">Sort by Open Jobs</option>
              <option value="rating">Sort by Rating</option>
              <option value="employees">Sort by Size</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredCompanies.length} companies found
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <div key={company.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {/* Company Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start space-x-4">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 truncate">
                      {company.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{company.industry}</p>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{company.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="p-6">
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {company.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{company.openPositions}</div>
                    <div className="text-xs text-gray-600">Open Jobs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{company.rating}</div>
                    <div className="text-xs text-gray-600 flex items-center justify-center">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      Rating
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Founded</span>
                    <span className="font-medium">{company.founded}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Employees</span>
                    <span className="font-medium">{company.employees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-600">Size</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSizeColor(company.size)}`}>
                      {getSizeLabel(company.size)}
                    </span>
                  </div>
                </div>

                {/* Benefits Preview */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Benefits</p>
                  <div className="flex flex-wrap gap-1">
                    {company.benefits.slice(0, 3).map((benefit, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                    {company.benefits.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{company.benefits.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    <Briefcase className="w-4 h-4 mr-2 inline" />
                    View Jobs ({company.openPositions})
                  </button>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? `No companies match your search for "${searchTerm}"`
              : 'No companies available at the moment'
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Featured Companies Section */}
      {filteredCompanies.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Join These Companies?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Great Teams</h3>
              <p className="text-gray-600 text-sm">
                Work with talented professionals and grow your career in collaborative environments.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellent Benefits</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive benefits packages including health, dental, and professional development.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Growth</h3>
              <p className="text-gray-600 text-sm">
                Opportunities for advancement and skill development in innovative companies.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
