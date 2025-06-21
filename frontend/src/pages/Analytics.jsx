import React, { useState } from 'react';
import {
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Dummy analytics data
  const stats = {
    profileViews: { value: 245, change: 12.5, trend: 'up' },
    applications: { value: 24, change: -8.3, trend: 'down' },
    savedJobs: { value: 18, change: 25.0, trend: 'up' },
    responses: { value: 8, change: 33.3, trend: 'up' }
  };

  const applicationData = [
    { name: 'Mon', applications: 4, views: 12 },
    { name: 'Tue', applications: 3, views: 19 },
    { name: 'Wed', applications: 5, views: 15 },
    { name: 'Thu', applications: 2, views: 22 },
    { name: 'Fri', applications: 6, views: 18 },
    { name: 'Sat', applications: 1, views: 8 },
    { name: 'Sun', applications: 3, views: 14 }
  ];

  const skillsData = [
    { skill: 'React', percentage: 95 },
    { skill: 'JavaScript', percentage: 90 },
    { skill: 'Node.js', percentage: 85 },
    { skill: 'TypeScript', percentage: 80 },
    { skill: 'Python', percentage: 70 },
    { skill: 'AWS', percentage: 65 }
  ];

  const jobStatusData = [
    { name: 'Applied', value: 45, color: '#3B82F6' },
    { name: 'Interview', value: 12, color: '#10B981' },
    { name: 'Rejected', value: 18, color: '#EF4444' },
    { name: 'Offer', value: 3, color: '#8B5CF6' }
  ];

  const weeklyTrend = [
    { week: 'Week 1', applications: 8, interviews: 2, offers: 0 },
    { week: 'Week 2', applications: 12, interviews: 3, offers: 1 },
    { week: 'Week 3', applications: 15, interviews: 4, offers: 1 },
    { week: 'Week 4', applications: 10, interviews: 5, offers: 2 }
  ];

  const recentApplications = [
    { id: 1, company: 'Google', position: 'Senior Frontend Developer', status: 'Interview', appliedDate: '2024-01-15', statusColor: 'text-green-600' },
    { id: 2, company: 'Apple', position: 'React Developer', status: 'Applied', appliedDate: '2024-01-14', statusColor: 'text-blue-600' },
    { id: 3, company: 'Microsoft', position: 'Full Stack Engineer', status: 'Rejected', appliedDate: '2024-01-12', statusColor: 'text-red-600' },
    { id: 4, company: 'Netflix', position: 'Frontend Engineer', status: 'Offer', appliedDate: '2024-01-10', statusColor: 'text-purple-600' },
    { id: 5, company: 'Amazon', position: 'Software Engineer', status: 'Applied', appliedDate: '2024-01-08', statusColor: 'text-blue-600' }
  ];

  const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trend === 'up' ? (
          <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}%
        </span>
        <span className="text-sm text-gray-500 ml-1">vs last week</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your job search progress and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Profile Views"
          value={stats.profileViews.value}
          change={stats.profileViews.change}
          trend={stats.profileViews.trend}
          icon={EyeIcon}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Applications"
          value={stats.applications.value}
          change={stats.applications.change}
          trend={stats.applications.trend}
          icon={DocumentTextIcon}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Saved Jobs"
          value={stats.savedJobs.value}
          change={stats.savedJobs.change}
          trend={stats.savedJobs.trend}
          icon={HeartIcon}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
        <StatCard
          title="Responses"
          value={stats.responses.value}
          change={stats.responses.change}
          trend={stats.responses.trend}
          icon={UserGroupIcon}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={applicationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="applications" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Area type="monotone" dataKey="views" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Job Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {jobStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} />
            <Line type="monotone" dataKey="interviews" stroke="#10B981" strokeWidth={2} />
            <Line type="monotone" dataKey="offers" stroke="#8B5CF6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Skills Progress & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Profile Match</h3>
          <div className="space-y-4">
            {skillsData.map((skill) => (
              <div key={skill.skill} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-10">{skill.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          <div className="space-y-3">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{app.position}</h4>
                  <p className="text-sm text-gray-600">{app.company}</p>
                  <p className="text-xs text-gray-500">{app.appliedDate}</p>
                </div>
                <span className={`text-sm font-medium ${app.statusColor}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ChartBarIcon className="w-5 h-5 mr-2 text-blue-600" />
          Key Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">Peak Activity</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">You apply to most jobs on Fridays</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center">
              <CalendarDaysIcon className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">Best Response Rate</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Tuesday applications get 40% more responses</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">Average Response Time</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Companies typically respond within 5 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
