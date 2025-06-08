import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Briefcase, 
  Users, 
  Building2,
  Star
} from 'lucide-react';
import { JobContext } from '../contexts/JobContext';
import { AuthContext } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { jobs = [] } = useContext(JobContext) || {};
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleSearch = (filters) => {
    navigate('/jobs', { state: { filters } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Simple Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-gray-900">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-gray-600">
              Connect with opportunities that match your skills and passion
            </p>
            
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch}
                showAdvanced={false}
                className="bg-white rounded-xl shadow-lg"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                to="/register"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Briefcase className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">125,847</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div>
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">2.8M+</div>
              <div className="text-gray-600">Professionals</div>
            </div>
            <div>
              <Building2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">45,000+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div>
              <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900">96.8%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
