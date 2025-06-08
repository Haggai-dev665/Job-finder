import React, { useState } from 'react';
import { Search, MapPin, Building2 } from 'lucide-react';

const SearchBar = ({ onSearch, className = "" }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    company: '',
    jobType: 'all',
    experienceLevel: 'all',
    salaryMin: '',
    salaryMax: ''
  });

  const handleInputChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onSearch && onSearch(newFilters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch(filters);
  };

  const jobTypes = [
    { value: 'all', label: 'All Job Types' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
  ];

  const experienceLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead/Manager' }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Search Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Job title, keywords..."
              value={filters.keyword}
              onChange={(e) => handleInputChange('keyword', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Location (city, country)"
              value={filters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Company name"
              value={filters.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Search Jobs
          </button>
        </div>

        {/* Advanced Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <select
            value={filters.jobType}
            onChange={(e) => handleInputChange('jobType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {jobTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select
            value={filters.experienceLevel}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {experienceLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Salary (USD)"
            value={filters.salaryMin}
            onChange={(e) => handleInputChange('salaryMin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="number"
            placeholder="Max Salary (USD)"
            value={filters.salaryMax}
            onChange={(e) => handleInputChange('salaryMax', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
