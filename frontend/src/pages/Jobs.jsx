import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, MapPin, Filter, Star, Briefcase, DollarSign, Clock, Building } from 'lucide-react';
import { JobContext } from '../contexts/JobContext';
import { countries, jobTypes, experienceLevels, skills } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const { 
    filteredJobs, 
    updateSearchFilters,
    searchFilters,
    loading,
    searchJobs,
    savedJobs,
    saveJob,
    unsaveJob
  } = useContext(JobContext);
  
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    experience: '',
    salaryMin: '',
    salaryMax: '',
    skills: [],
    country: ''
  });

  // Apply filters from navigation state (from Home page search)
  useEffect(() => {
    if (location.state?.filters) {
      updateSearchFilters(location.state.filters);
    }
  }, [location.state, updateSearchFilters]);

  useEffect(() => {
    // Apply filters when they change
    updateSearchFilters(filters);
  }, [filters, updateSearchFilters]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchJobs(searchTerm, locationFilter);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSkillToggle = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      experience: '',
      salaryMin: '',
      salaryMax: '',
      skills: [],
      country: ''
    });
  };

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate) - new Date(a.postedDate);
      case 'salary-high':
        return b.salary.max - a.salary.max;
      case 'salary-low':
        return a.salary.min - b.salary.min;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Jobs</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 outline-none text-gray-900"
                />
              </div>
              <div className="flex-1 flex items-center border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-4">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="City, state, or country"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="flex-1 outline-none text-gray-900"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>
              <span className="text-gray-600">
                {sortedJobs.length} jobs found
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                <option value="newest">Newest</option>
                <option value="salary-high">Salary (High to Low)</option>
                <option value="salary-low">Salary (Low to High)</option>
                <option value="title">Job Title</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 bg-white rounded-lg shadow-md p-6 h-fit">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  Clear all
                </button>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">All Types</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Experience Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={filters.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary Range Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.salaryMin}
                    onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.salaryMax}
                    onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Skills Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="max-h-40 overflow-y-auto">
                  {skills.slice(0, 20).map(skill => (
                    <label key={skill} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={filters.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="mr-2"
                      />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Job Listings */}
          <div className="flex-1">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : sortedJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
