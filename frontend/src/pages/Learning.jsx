import React, { useState } from 'react';
import {
  AcademicCapIcon,
  BookOpenIcon,
  PlayIcon,
  ClockIcon,
  StarIcon,
  TrophyIcon,
  CheckCircleIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const Learning = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy learning data
  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts including hooks, context, and performance optimization',
      category: 'frontend',
      level: 'Advanced',
      duration: '8 hours',
      rating: 4.8,
      students: 1234,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      progress: 75,
      instructor: 'Sarah Johnson',
      price: 'Free',
      skills: ['React', 'JavaScript', 'Hooks'],
      isEnrolled: true
    },
    {
      id: 2,
      title: 'Node.js Microservices Architecture',
      description: 'Build scalable microservices with Node.js, Docker, and Kubernetes',
      category: 'backend',
      level: 'Intermediate',
      duration: '12 hours',
      rating: 4.9,
      students: 856,
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop',
      progress: 0,
      instructor: 'Mike Chen',
      price: '$49',
      skills: ['Node.js', 'Docker', 'Kubernetes'],
      isEnrolled: false
    },
    {
      id: 3,
      title: 'System Design Fundamentals',
      description: 'Learn to design large-scale distributed systems and ace technical interviews',
      category: 'interview',
      level: 'Advanced',
      duration: '15 hours',
      rating: 4.7,
      students: 2341,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      progress: 30,
      instructor: 'David Park',
      price: '$79',
      skills: ['System Design', 'Architecture', 'Scalability'],
      isEnrolled: true
    },
    {
      id: 4,
      title: 'Data Structures & Algorithms',
      description: 'Master coding interview questions with comprehensive data structures and algorithms',
      category: 'interview',
      level: 'Beginner',
      duration: '20 hours',
      rating: 4.6,
      students: 3456,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
      progress: 45,
      instructor: 'Emily Rodriguez',
      price: 'Free',
      skills: ['Algorithms', 'Data Structures', 'Problem Solving'],
      isEnrolled: true
    },
    {
      id: 5,
      title: 'AWS Cloud Practitioner',
      description: 'Get AWS certified and learn cloud computing fundamentals',
      category: 'cloud',
      level: 'Beginner',
      duration: '10 hours',
      rating: 4.5,
      students: 1789,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop',
      progress: 0,
      instructor: 'Alex Thompson',
      price: '$39',
      skills: ['AWS', 'Cloud Computing', 'DevOps'],
      isEnrolled: false
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      description: 'Introduction to machine learning concepts and Python implementation',
      category: 'ai',
      level: 'Intermediate',
      duration: '18 hours',
      rating: 4.4,
      students: 987,
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
      progress: 0,
      instructor: 'Lisa Wang',
      price: '$59',
      skills: ['Python', 'Machine Learning', 'Data Science'],
      isEnrolled: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', count: courses.length },
    { id: 'frontend', name: 'Frontend', count: courses.filter(c => c.category === 'frontend').length },
    { id: 'backend', name: 'Backend', count: courses.filter(c => c.category === 'backend').length },
    { id: 'interview', name: 'Interview Prep', count: courses.filter(c => c.category === 'interview').length },
    { id: 'cloud', name: 'Cloud', count: courses.filter(c => c.category === 'cloud').length },
    { id: 'ai', name: 'AI/ML', count: courses.filter(c => c.category === 'ai').length }
  ];

  const achievements = [
    { id: 1, title: 'First Course Completed', description: 'Completed your first learning course', icon: TrophyIcon, earned: true },
    { id: 2, title: 'Frontend Master', description: 'Completed 3 frontend courses', icon: StarIcon, earned: true },
    { id: 3, title: 'Interview Ready', description: 'Completed interview preparation track', icon: CheckCircleIcon, earned: false },
    { id: 4, title: 'Cloud Explorer', description: 'Completed 2 cloud computing courses', icon: AcademicCapIcon, earned: false }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const enrolledCourses = courses.filter(course => course.isEnrolled);
  const completedCourses = enrolledCourses.filter(course => course.progress === 100);
  const averageProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)
    : 0;

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Center</h1>
          <p className="text-gray-600">Enhance your skills and advance your career</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrophyIcon className="w-5 h-5" />
            <span className="font-semibold">Progress: {averageProgress}%</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <BookOpenIcon className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{completedCourses.length}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <ClockIcon className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">42h</p>
              <p className="text-sm text-gray-600">Learning Time</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <TrophyIcon className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{achievements.filter(a => a.earned).length}</p>
              <p className="text-sm text-gray-600">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Learning */}
      {enrolledCourses.filter(course => course.progress > 0 && course.progress < 100).length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses
              .filter(course => course.progress > 0 && course.progress < 100)
              .map(course => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Continue Learning
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, skills, topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Categories:</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <div className="flex items-center text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                  </div>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-sm text-gray-600">{course.students.toLocaleString()} students</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {course.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900">{course.price}</span>
                    {course.isEnrolled && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Enrolled
                      </span>
                    )}
                  </div>
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    course.isEnrolled
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                    {course.isEnrolled ? 'Continue' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map(achievement => {
            const Icon = achievement.icon;
            return (
              <div key={achievement.id} className={`p-4 rounded-lg border ${
                achievement.earned 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center mb-2">
                  <Icon className={`w-6 h-6 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                  <span className={`ml-2 font-semibold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </span>
                </div>
                <p className={`text-sm ${achievement.earned ? 'text-gray-700' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <div className="mt-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Earned
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Learning;
