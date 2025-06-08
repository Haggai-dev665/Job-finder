import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Clock, DollarSign, Bookmark } from 'lucide-react';

const JobCard = ({ job, onSave, isSaved = false, compact = false }) => {
  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return 'Salary not specified';
    const currency = salary.currency || 'USD';
    if (salary.min && salary.max) {
      return `${currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
    }
    if (salary.min) {
      return `${currency} ${salary.min.toLocaleString()}+`;
    }
    if (salary.max) {
      return `Up to ${currency} ${salary.max.toLocaleString()}`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getJobTypeColor = (type) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-purple-100 text-purple-800',
      'freelance': 'bg-orange-100 text-orange-800',
      'internship': 'bg-pink-100 text-pink-800',
      'remote': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (compact) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link 
              to={`/jobs/${job.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-primary-600"
            >
              {job.title}
            </Link>
            <p className="text-gray-600 flex items-center mt-1">
              <Building className="h-4 w-4 mr-1" />
              {job.company}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {typeof job.location === 'string' 
                  ? job.location 
                  : job.location?.city && job.location?.state
                    ? `${job.location.city}, ${job.location.state}`
                    : job.location?.city || 'Remote'
                }
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {formatDate(job.postedAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
              {job.type}
            </span>
            {onSave && (
              <button
                onClick={() => onSave(job.id)}
                className={`p-2 rounded-full transition-colors ${
                  isSaved 
                    ? 'text-primary-600 bg-primary-50 hover:bg-primary-100' 
                    : 'text-gray-400 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <Link 
                to={`/jobs/${job.id}`}
                className="text-xl font-semibold text-gray-900 hover:text-primary-600"
              >
                {job.title}
              </Link>
              <p className="text-gray-600 flex items-center mt-1">
                <Building className="h-4 w-4 mr-2" />
                {job.company}
              </p>
            </div>
            {onSave && (
              <button
                onClick={() => onSave(job.id)}
                className={`p-2 rounded-full transition-colors ${
                  isSaved 
                    ? 'text-primary-600 bg-primary-50 hover:bg-primary-100' 
                    : 'text-gray-400 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <Bookmark className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {typeof job.location === 'string' 
                ? job.location 
                : job.location?.city && job.location?.state
                  ? `${job.location.city}, ${job.location.state}`
                  : job.location?.city || 'Remote'
              }
              {(job.remote || job.location?.remote) && <span className="ml-1 text-green-600">(Remote)</span>}
            </span>
            <span className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {formatSalary(job.salary)}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDate(job.postedAt)}
            </span>
          </div>

          <p className="text-gray-700 mt-3 line-clamp-2">
            {job.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                {job.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.level)}`}>
                {job.level}
              </span>
              {job.skills && job.skills.slice(0, 3).map(skill => (
                <span 
                  key={skill}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {job.skills && job.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
            
            <Link
              to={`/jobs/${job.id}`}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
