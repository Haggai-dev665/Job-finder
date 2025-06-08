import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobContext';
import { Building, MapPin, DollarSign, Clock, Users, FileText } from 'lucide-react';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    level: 'mid',
    salary: { min: '', max: '', currency: 'USD' },
    description: '',
    requirements: [],
    benefits: [],
    skills: [],
    remote: false,
    applicationDeadline: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [requirementInput, setRequirementInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const { user } = useAuth();
  const { addJob } = useJobs();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleArrayInput = (field, input, setInput) => (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (input.trim() && !formData[field].includes(input.trim())) {
        setFormData(prev => ({
          ...prev,
          [field]: [...prev[field], input.trim()]
        }));
        setInput('');
      }
    }
  };

  const removeFromArray = (field, item) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(i => i !== item)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user || user.role !== 'employer') {
      setError('You must be logged in as an employer to post jobs');
      return;
    }

    if (!formData.title || !formData.description) {
      setError('Title and description are required');
      return;
    }

    setLoading(true);

    try {
      const jobData = {
        ...formData,
        company: formData.company || user.company,
        postedBy: user.id,
        postedAt: new Date().toISOString(),
        applicants: [],
        status: 'active'
      };

      addJob(jobData);
      navigate('/jobs');
    } catch (err) {
      setError('Failed to post job. Please try again.');
    }

    setLoading(false);
  };

  const jobTypes = ['full-time', 'part-time', 'contract', 'freelance', 'internship'];
  const jobLevels = ['entry', 'mid', 'senior', 'lead', 'executive'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="mt-2 text-gray-600">Find your next great hire</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Senior Frontend Developer"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <div className="mt-1 relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder={user?.company || "Company Name"}
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1 relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="New York, NY"
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <div className="mt-1 relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Experience Level
              </label>
              <div className="mt-1 relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  {jobLevels.map(level => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Remote Work */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="remote"
                checked={formData.remote}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Remote work available
              </span>
            </label>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    name="salary.min"
                    value={formData.salary.min}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Min"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    name="salary.max"
                    value={formData.salary.max}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Max"
                  />
                </div>
              </div>
              <div>
                <select
                  name="salary.currency"
                  value={formData.salary.currency}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Application Deadline */}
          <div>
            <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
              Application Deadline
            </label>
            <input
              type="date"
              id="applicationDeadline"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description *
            </label>
            <div className="mt-1 relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="pl-10 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Describe the role, responsibilities, and what makes this opportunity unique..."
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map(skill => (
                <span
                  key={skill}
                  className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeFromArray('skills', skill)}
                    className="ml-1 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={handleArrayInput('skills', skillInput, setSkillInput)}
                className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add a required skill"
              />
              <button
                type="button"
                onClick={handleArrayInput('skills', skillInput, setSkillInput)}
                className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            <div className="space-y-2 mb-2">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{req}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('requirements', req)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                onKeyPress={handleArrayInput('requirements', requirementInput, setRequirementInput)}
                className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add a requirement"
              />
              <button
                type="button"
                onClick={handleArrayInput('requirements', requirementInput, setRequirementInput)}
                className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefits
            </label>
            <div className="space-y-2 mb-2">
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{benefit}</span>
                  <button
                    type="button"
                    onClick={() => removeFromArray('benefits', benefit)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyPress={handleArrayInput('benefits', benefitInput, setBenefitInput)}
                className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add a benefit"
              />
              <button
                type="button"
                onClick={handleArrayInput('benefits', benefitInput, setBenefitInput)}
                className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
