import React, { useState } from 'react';
import {
  BellIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  FireIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';

const JobAlerts = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    keywords: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    jobType: 'full-time',
    experienceLevel: 'any',
    frequency: 'daily'
  });

  // Dummy job alerts data
  const [jobAlerts, setJobAlerts] = useState([
    {
      id: 1,
      title: 'Senior React Developer in San Francisco',
      keywords: ['React', 'JavaScript', 'TypeScript'],
      location: 'San Francisco, CA',
      salaryRange: '$120k - $180k',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      frequency: 'Daily',
      isActive: true,
      createdDate: '2024-01-15',
      lastTriggered: '2 hours ago',
      newJobs: 8,
      totalMatches: 156
    },
    {
      id: 2,
      title: 'Remote Frontend Developer',
      keywords: ['Frontend', 'Vue.js', 'Angular'],
      location: 'Remote',
      salaryRange: '$80k - $140k',
      jobType: 'Full-time',
      experienceLevel: 'Mid-level',
      frequency: 'Weekly',
      isActive: true,
      createdDate: '2024-01-10',
      lastTriggered: '1 day ago',
      newJobs: 12,
      totalMatches: 89
    },
    {
      id: 3,
      title: 'Node.js Backend Engineer',
      keywords: ['Node.js', 'Express', 'MongoDB'],
      location: 'New York, NY',
      salaryRange: '$100k - $160k',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      frequency: 'Daily',
      isActive: false,
      createdDate: '2024-01-05',
      lastTriggered: '1 week ago',
      newJobs: 0,
      totalMatches: 34
    },
    {
      id: 4,
      title: 'Full Stack Developer - Startup',
      keywords: ['Full Stack', 'Python', 'React'],
      location: 'Austin, TX',
      salaryRange: '$90k - $130k',
      jobType: 'Full-time',
      experienceLevel: 'Mid-level',
      frequency: 'Real-time',
      isActive: true,
      createdDate: '2024-01-12',
      lastTriggered: '6 hours ago',
      newJobs: 5,
      totalMatches: 67
    }
  ]);

  const activeAlerts = jobAlerts.filter(alert => alert.isActive);
  const inactiveAlerts = jobAlerts.filter(alert => !alert.isActive);

  const handleCreateAlert = () => {
    const alert = {
      id: Date.now(),
      title: newAlert.title || `${newAlert.keywords} in ${newAlert.location}`,
      keywords: newAlert.keywords.split(',').map(k => k.trim()),
      location: newAlert.location,
      salaryRange: newAlert.salaryMin && newAlert.salaryMax ? `$${newAlert.salaryMin}k - $${newAlert.salaryMax}k` : 'Not specified',
      jobType: newAlert.jobType,
      experienceLevel: newAlert.experienceLevel,
      frequency: newAlert.frequency,
      isActive: true,
      createdDate: new Date().toISOString().split('T')[0],
      lastTriggered: 'Never',
      newJobs: 0,
      totalMatches: Math.floor(Math.random() * 100) + 10
    };

    setJobAlerts([alert, ...jobAlerts]);
    setNewAlert({
      title: '',
      keywords: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      jobType: 'full-time',
      experienceLevel: 'any',
      frequency: 'daily'
    });
    setShowCreateAlert(false);
  };

  const toggleAlert = (id) => {
    setJobAlerts(jobAlerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id) => {
    setJobAlerts(jobAlerts.filter(alert => alert.id !== id));
  };

  const AlertCard = ({ alert }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              alert.isActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {alert.isActive ? 'Active' : 'Paused'}
            </span>
            {alert.newJobs > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
                {alert.newJobs} new
              </span>
            )}
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2" />
              <span>{alert.location}</span>
            </div>
            <div className="flex items-center">
              <CurrencyDollarIcon className="w-4 h-4 mr-2" />
              <span>{alert.salaryRange}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-2" />
              <span>{alert.frequency} notifications • {alert.experienceLevel} level</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {alert.keywords.map((keyword, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => toggleAlert(alert.id)}
            className={`p-2 rounded-lg transition-colors ${
              alert.isActive 
                ? 'text-yellow-600 hover:bg-yellow-50' 
                : 'text-green-600 hover:bg-green-50'
            }`}
            title={alert.isActive ? 'Pause alert' : 'Activate alert'}
          >
            {alert.isActive ? <BellIconSolid className="w-5 h-5" /> : <BellIcon className="w-5 h-5" />}
          </button>
          <button
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit alert"
          >
            <PencilIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteAlert(alert.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete alert"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{alert.totalMatches}</p>
            <p className="text-xs text-gray-600">Total matches</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{alert.newJobs}</p>
            <p className="text-xs text-gray-600">New jobs</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{alert.lastTriggered}</p>
            <p className="text-xs text-gray-600">Last triggered</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Alerts</h1>
          <p className="text-gray-600">Get notified when new jobs match your criteria</p>
        </div>
        <button
          onClick={() => setShowCreateAlert(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Alert
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <BellIconSolid className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{activeAlerts.length}</p>
              <p className="text-sm text-gray-600">Active Alerts</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <FireIcon className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {activeAlerts.reduce((sum, alert) => sum + alert.newJobs, 0)}
              </p>
              <p className="text-sm text-gray-600">New Matches</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {jobAlerts.reduce((sum, alert) => sum + alert.totalMatches, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Matches</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <ClockIcon className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">24h</p>
              <p className="text-sm text-gray-600">Average Response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'active'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Active Alerts ({activeAlerts.length})
            </button>
            <button
              onClick={() => setActiveTab('paused')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'paused'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Paused ({inactiveAlerts.length})
            </button>
          </nav>
        </div>

        {/* Alert List */}
        <div className="p-6">
          {activeTab === 'active' ? (
            activeAlerts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BellIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No active alerts</h3>
                <p className="text-gray-600 mb-4">Create your first job alert to get started</p>
                <button
                  onClick={() => setShowCreateAlert(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create Alert
                </button>
              </div>
            )
          ) : (
            inactiveAlerts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {inactiveAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircleIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No paused alerts</h3>
                <p className="text-gray-600">All your alerts are currently active</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Create Job Alert</h2>
              <button
                onClick={() => setShowCreateAlert(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Title (optional)
                </label>
                <input
                  type="text"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  placeholder="e.g., Senior React Developer Jobs"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords *
                </label>
                <input
                  type="text"
                  value={newAlert.keywords}
                  onChange={(e) => setNewAlert({...newAlert, keywords: e.target.value})}
                  placeholder="React, JavaScript, Frontend (comma separated)"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newAlert.location}
                  onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                  placeholder="San Francisco, CA or Remote"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Salary (k)
                  </label>
                  <input
                    type="number"
                    value={newAlert.salaryMin}
                    onChange={(e) => setNewAlert({...newAlert, salaryMin: e.target.value})}
                    placeholder="80"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Salary (k)
                  </label>
                  <input
                    type="number"
                    value={newAlert.salaryMax}
                    onChange={(e) => setNewAlert({...newAlert, salaryMax: e.target.value})}
                    placeholder="140"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    value={newAlert.jobType}
                    onChange={(e) => setNewAlert({...newAlert, jobType: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience
                  </label>
                  <select
                    value={newAlert.experienceLevel}
                    onChange={(e) => setNewAlert({...newAlert, experienceLevel: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="any">Any level</option>
                    <option value="entry">Entry level</option>
                    <option value="mid">Mid level</option>
                    <option value="senior">Senior level</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Frequency
                </label>
                <select
                  value={newAlert.frequency}
                  onChange={(e) => setNewAlert({...newAlert, frequency: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="real-time">Real-time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateAlert(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlert}
                disabled={!newAlert.keywords}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAlerts;
