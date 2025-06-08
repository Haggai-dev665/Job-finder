import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useJob } from '../contexts/JobContext';
import JobCard from '../components/JobCard';
import { Bookmark, Search, Filter } from 'lucide-react';

const SavedJobs = () => {
  const { user } = useAuth();
  const { jobs, savedJobs, getSavedJobs } = useJob();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSavedJobs = async () => {
      setLoading(true);
      try {
        await getSavedJobs();
      } catch (error) {
        console.error('Failed to load saved jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadSavedJobs();
    }
  }, [user, getSavedJobs]);

  useEffect(() => {
    // Filter and sort saved jobs
    let filtered = jobs.filter(job => savedJobs.includes(job.id));

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'company':
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'salary':
        filtered.sort((a, b) => {
          const salaryA = parseInt(a.salary.replace(/[^0-9]/g, '')) || 0;
          const salaryB = parseInt(b.salary.replace(/[^0-9]/g, '')) || 0;
          return salaryB - salaryA;
        });
        break;
      default:
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, savedJobs, searchTerm, sortBy]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view saved jobs</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
        <p className="text-gray-600">
          Jobs you've bookmarked for later review
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search saved jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="company">Sort by Company</option>
                <option value="salary">Sort by Salary</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          {loading ? 'Loading...' : `${filteredJobs.length} saved job${filteredJobs.length !== 1 ? 's' : ''}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          {searchTerm ? (
            <div>
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                No saved jobs match your search for "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div>
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved jobs yet</h3>
              <p className="text-gray-600 mb-4">
                Start saving jobs you're interested in to see them here
              </p>
              <a
                href="/jobs"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Jobs
              </a>
            </div>
          )}
        </div>
      )}

      {/* Tips Section */}
      {filteredJobs.length > 0 && (
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Tips for your saved jobs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-1">Stay Organized</h4>
              <p>Review and remove outdated saved jobs regularly to keep your list relevant.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Set Job Alerts</h4>
              <p>Create alerts for similar positions to stay updated on new opportunities.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Research Companies</h4>
              <p>Use the saved time to research the companies and prepare better applications.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Apply Soon</h4>
              <p>Don't wait too long to apply - popular positions fill up quickly.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
