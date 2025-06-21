import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  HeartIcon,
  EyeIcon,
  FireIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XMarkIcon,
  FunnelIcon,
  GlobeAltIcon,
  TagIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  TrophyIcon,
  AcademicCapIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const Jobs = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    salaryMin: '',
    salaryMax: '',
    company: '',
    skills: [],
    remote: false,
    featured: false,
    urgent: false,
    category: ''
  });

  // Comprehensive dummy data with plenty of jobs across all categories
  const allJobs = [
    // Tech/Software Development
    {
      id: 1,
      title: 'Senior React Developer',
      company: { name: 'Google', logo: '🔵', rating: 4.8, employees: '100K+' },
      location: { city: 'Mountain View', state: 'CA', country: 'USA', remote: true },
      salary: { min: 150000, max: 200000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Senior',
      category: 'Technology',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 234,
      views: 1200,
      description: 'Join our team to build next-generation web applications using cutting-edge technologies. Work on products used by billions of users worldwide.',
      benefits: ['Health Insurance', '401k Match', 'Remote Work', 'Stock Options', 'Learning Budget'],
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'GraphQL knowledge'],
      featured: true,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Frontend Engineer',
      company: { name: 'Apple', logo: '🍎', rating: 4.9, employees: '150K+' },
      location: { city: 'Cupertino', state: 'CA', country: 'USA', remote: true },
      salary: { min: 140000, max: 180000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Technology',
      skills: ['JavaScript', 'Vue.js', 'CSS3', 'WebKit', 'Safari'],
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 189,
      views: 890,
      description: 'Create beautiful and intuitive user interfaces for millions of users worldwide. Work on Safari, Apple.com, and other key products.',
      benefits: ['Health Insurance', 'Stock Purchase Plan', 'Flexible Hours', 'Free Apple Products'],
      requirements: ['3+ years frontend experience', 'JavaScript mastery', 'CSS expertise'],
      featured: true,
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: { name: 'Microsoft', logo: '🔷', rating: 4.7, employees: '220K+' },
      location: { city: 'Seattle', state: 'WA', country: 'USA', remote: true },
      salary: { min: 130000, max: 170000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Technology',
      skills: ['C#', 'React', 'Azure', 'SQL Server', '.NET'],
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 156,
      views: 654,
      description: 'Build scalable cloud solutions and modern web applications on the Azure platform.',
      benefits: ['Health Insurance', 'Azure Credits', 'Learning Budget', 'Hybrid Work'],
      requirements: ['3+ years full stack experience', 'C# proficiency', 'Cloud experience'],
      featured: false,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      company: { name: 'Amazon', logo: '📦', rating: 4.5, employees: '1.5M+' },
      location: { city: 'Austin', state: 'TX', country: 'USA', remote: false },
      salary: { min: 120000, max: 160000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Senior',
      category: 'Technology',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python'],
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 98,
      views: 456,
      description: 'Scale infrastructure for millions of customers worldwide. Work with cutting-edge cloud technologies.',
      benefits: ['Stock Options', 'Health Insurance', 'Career Development', 'AWS Training'],
      requirements: ['5+ years DevOps experience', 'AWS certification preferred', 'Kubernetes expertise'],
      featured: true,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Data Scientist',
      company: { name: 'Meta', logo: '📘', rating: 4.6, employees: '77K+' },
      location: { city: 'Menlo Park', state: 'CA', country: 'USA', remote: true },
      salary: { min: 145000, max: 185000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Data Science',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics'],
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 267,
      views: 1100,
      description: 'Analyze user behavior and build ML models to improve Facebook and Instagram experiences.',
      benefits: ['Stock Options', 'Health Insurance', 'Free Meals', 'Learning Budget'],
      requirements: ['PhD or Masters in related field', 'Python expertise', 'ML experience'],
      featured: true,
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
    },

    // Design
    {
      id: 6,
      title: 'UX/UI Designer',
      company: { name: 'Figma', logo: '🎨', rating: 4.8, employees: '800+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: true },
      salary: { min: 110000, max: 150000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Design',
      skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      postedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 145,
      views: 678,
      description: 'Design the future of collaborative design tools. Create intuitive interfaces used by millions of designers.',
      benefits: ['Equity', 'Health Insurance', 'Design Tools Budget', 'Conference Attendance'],
      requirements: ['3+ years UX/UI experience', 'Portfolio required', 'Design systems knowledge'],
      featured: false,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=200&fit=crop'
    },
    {
      id: 7,
      title: 'Product Designer',
      company: { name: 'Airbnb', logo: '🏠', rating: 4.7, employees: '6K+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: true },
      salary: { min: 125000, max: 165000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Senior',
      category: 'Design',
      skills: ['Product Design', 'User Research', 'Prototyping', 'A/B Testing', 'Design Systems'],
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 89,
      views: 423,
      description: 'Shape the future of travel by designing experiences that connect people to unique places worldwide.',
      benefits: ['Travel Credits', 'Stock Options', 'Health Insurance', 'Flexible PTO'],
      requirements: ['5+ years product design experience', 'Travel industry knowledge preferred', 'Strong portfolio'],
      featured: true,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=200&fit=crop'
    },

    // Marketing
    {
      id: 8,
      title: 'Digital Marketing Manager',
      company: { name: 'HubSpot', logo: '🧭', rating: 4.6, employees: '5K+' },
      location: { city: 'Boston', state: 'MA', country: 'USA', remote: true },
      salary: { min: 85000, max: 115000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Marketing',
      skills: ['SEO', 'SEM', 'Content Marketing', 'Analytics', 'HubSpot'],
      postedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 178,
      views: 567,
      description: 'Drive growth through innovative digital marketing strategies. Own the full marketing funnel.',
      benefits: ['Unlimited PTO', 'Learning Budget', 'Health Insurance', 'Stock Options'],
      requirements: ['3+ years digital marketing experience', 'Analytics proficiency', 'B2B experience preferred'],
      featured: false,
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop'
    },
    {
      id: 9,
      title: 'Content Marketing Specialist',
      company: { name: 'Buffer', logo: '📱', rating: 4.8, employees: '100+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: true },
      salary: { min: 70000, max: 95000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Junior',
      category: 'Marketing',
      skills: ['Content Writing', 'Social Media', 'SEO', 'Analytics', 'WordPress'],
      postedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 234,
      views: 789,
      description: 'Create compelling content that engages our community and drives business growth.',
      benefits: ['Remote First', 'Health Insurance', 'Learning Budget', 'Flexible Schedule'],
      requirements: ['2+ years content marketing experience', 'Excellent writing skills', 'Social media expertise'],
      featured: false,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=200&fit=crop'
    },

    // Sales
    {
      id: 10,
      title: 'Sales Development Representative',
      company: { name: 'Salesforce', logo: '☁️', rating: 4.5, employees: '73K+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: false },
      salary: { min: 65000, max: 85000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Entry-level',
      category: 'Sales',
      skills: ['Sales', 'CRM', 'Lead Generation', 'Cold Calling', 'Salesforce'],
      postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 456,
      views: 1234,
      description: 'Start your sales career with the #1 CRM platform. Generate leads and build pipeline.',
      benefits: ['Base + Commission', 'Health Insurance', 'Career Development', 'Training Program'],
      requirements: ['Bachelor degree preferred', 'Strong communication skills', 'Goal-oriented mindset'],
      featured: false,
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=200&fit=crop'
    },
    {
      id: 11,
      title: 'Account Executive',
      company: { name: 'Stripe', logo: '💳', rating: 4.7, employees: '4K+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: true },
      salary: { min: 120000, max: 180000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Sales',
      skills: ['Enterprise Sales', 'SaaS', 'Payments', 'Relationship Building', 'Negotiation'],
      postedDate: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 67,
      views: 234,
      description: 'Sell payment infrastructure to high-growth businesses. Own the full sales cycle.',
      benefits: ['Equity', 'Health Insurance', 'Unlimited PTO', 'Learning Budget'],
      requirements: ['3+ years enterprise sales experience', 'SaaS background', 'Proven track record'],
      featured: true,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop'
    },

    // Finance
    {
      id: 12,
      title: 'Financial Analyst',
      company: { name: 'Goldman Sachs', logo: '🏦', rating: 4.3, employees: '40K+' },
      location: { city: 'New York', state: 'NY', country: 'USA', remote: false },
      salary: { min: 95000, max: 130000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Junior',
      category: 'Finance',
      skills: ['Financial Modeling', 'Excel', 'Bloomberg', 'Valuation', 'Research'],
      postedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 345,
      views: 987,
      description: 'Analyze financial data and create models to support investment decisions.',
      benefits: ['Bonus Eligible', 'Health Insurance', 'Retirement Plan', 'Professional Development'],
      requirements: ['Finance or Economics degree', 'Strong analytical skills', 'Excel proficiency'],
      featured: false,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=200&fit=crop'
    },

    // Healthcare
    {
      id: 13,
      title: 'Registered Nurse',
      company: { name: 'Kaiser Permanente', logo: '🏥', rating: 4.4, employees: '218K+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: false },
      salary: { min: 85000, max: 115000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Healthcare',
      skills: ['Patient Care', 'Medical Procedures', 'EMR', 'Critical Thinking', 'Communication'],
      postedDate: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 123,
      views: 456,
      description: 'Provide exceptional patient care in our state-of-the-art medical facilities.',
      benefits: ['Pension Plan', 'Health Insurance', 'Continuing Education', 'Flexible Scheduling'],
      requirements: ['RN License', '2+ years experience', 'BSN preferred'],
      featured: false,
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop'
    },

    // Education
    {
      id: 14,
      title: 'Software Engineering Teacher',
      company: { name: 'Lambda School', logo: '🎓', rating: 4.1, employees: '200+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: true },
      salary: { min: 75000, max: 105000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Education',
      skills: ['Teaching', 'JavaScript', 'React', 'Curriculum Development', 'Mentoring'],
      postedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 89,
      views: 234,
      description: 'Teach the next generation of software engineers. Create curriculum and mentor students.',
      benefits: ['Health Insurance', 'Professional Development', 'Flexible Schedule', 'Stock Options'],
      requirements: ['3+ years software development experience', 'Teaching experience preferred', 'Strong communication skills'],
      featured: false,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop'
    },

    // Additional jobs to reach plenty of options...
    {
      id: 15,
      title: 'Mobile App Developer',
      company: { name: 'Uber', logo: '🚗', rating: 4.3, employees: '26K+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: true },
      salary: { min: 135000, max: 175000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Senior',
      category: 'Technology',
      skills: ['React Native', 'Swift', 'Kotlin', 'iOS', 'Android'],
      postedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 167,
      views: 543,
      description: 'Build mobile experiences that connect millions of riders and drivers worldwide.',
      benefits: ['Equity', 'Health Insurance', 'Commuter Benefits', 'Learning Budget'],
      requirements: ['5+ years mobile development', 'React Native expertise', 'App Store experience'],
      featured: true,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
    },
    {
      id: 16,
      title: 'Product Manager',
      company: { name: 'Slack', logo: '💬', rating: 4.5, employees: '2.5K+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: true },
      salary: { min: 140000, max: 190000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Senior',
      category: 'Product',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Roadmapping', 'Agile'],
      postedDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 234,
      views: 789,
      description: 'Drive product strategy for workplace communication tools used by millions.',
      benefits: ['Stock Options', 'Health Insurance', 'Flexible PTO', 'Learning Budget'],
      requirements: ['5+ years product management', 'B2B SaaS experience', 'Technical background'],
      featured: true,
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1553028826-f4804151e60f?w=400&h=200&fit=crop'
    },
    {
      id: 17,
      title: 'Cybersecurity Analyst',
      company: { name: 'CrowdStrike', logo: '🛡️', rating: 4.6, employees: '5K+' },
      location: { city: 'Austin', state: 'TX', country: 'USA', remote: true },
      salary: { min: 95000, max: 125000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Cybersecurity',
      skills: ['Security Analysis', 'Threat Detection', 'Incident Response', 'SIEM', 'Python'],
      postedDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 89,
      views: 345,
      description: 'Protect organizations from cyber threats using cutting-edge security technologies.',
      benefits: ['Stock Options', 'Health Insurance', 'Security Training', 'Remote Work'],
      requirements: ['3+ years security experience', 'Security certifications preferred', 'SIEM experience'],
      featured: false,
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=200&fit=crop'
    },
    {
      id: 18,
      title: 'HR Business Partner',
      company: { name: 'LinkedIn', logo: '💼', rating: 4.4, employees: '16K+' },
      location: { city: 'Sunnyvale', state: 'CA', country: 'USA', remote: true },
      salary: { min: 110000, max: 140000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Senior',
      category: 'Human Resources',
      skills: ['HR Strategy', 'Employee Relations', 'Performance Management', 'Coaching', 'Analytics'],
      postedDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 123,
      views: 456,
      description: 'Partner with business leaders to drive people strategy and organizational effectiveness.',
      benefits: ['Stock Options', 'Health Insurance', 'Learning Budget', 'Career Development'],
      requirements: ['5+ years HR experience', 'Business partnering experience', 'Tech industry background'],
      featured: false,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=200&fit=crop'
    },
    {
      id: 19,
      title: 'Machine Learning Engineer',
      company: { name: 'OpenAI', logo: '🤖', rating: 4.8, employees: '500+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: false },
      salary: { min: 180000, max: 250000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Senior',
      category: 'AI/ML',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'Deep Learning'],
      postedDate: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 456,
      views: 1567,
      description: 'Build artificial general intelligence that benefits all of humanity. Work on cutting-edge AI research.',
      benefits: ['Equity', 'Health Insurance', 'Research Budget', 'Conference Attendance'],
      requirements: ['PhD in ML/AI preferred', '5+ years ML experience', 'Research publications'],
      featured: true,
      urgent: true,
      companyLogo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=200&fit=crop'
    },
    {
      id: 20,
      title: 'Operations Manager',
      company: { name: 'DoorDash', logo: '🍕', rating: 4.2, employees: '8K+' },
      location: { city: 'San Francisco', state: 'CA', country: 'USA', remote: true },
      salary: { min: 100000, max: 130000, currency: 'USD', period: 'yearly' },
      type: 'Full-time',
      experience: 'Mid-level',
      category: 'Operations',
      skills: ['Operations Management', 'Analytics', 'Process Improvement', 'Leadership', 'SQL'],
      postedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      applications: 167,
      views: 543,
      description: 'Optimize operations for food delivery marketplace. Drive efficiency and growth.',
      benefits: ['Stock Options', 'Health Insurance', 'Food Credits', 'Career Development'],
      requirements: ['3+ years operations experience', 'Analytics background', 'Marketplace experience preferred'],
      featured: false,
      urgent: false,
      companyLogo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop',
      jobImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop'
    }
  ];

  // Filter jobs based on current filters
  const filteredJobs = allJobs.filter(job => {
    if (filters.jobType && job.type !== filters.jobType) return false;
    if (filters.experienceLevel && job.experience !== filters.experienceLevel) return false;
    if (filters.category && job.category !== filters.category) return false;
    if (filters.company && !job.company.name.toLowerCase().includes(filters.company.toLowerCase())) return false;
    if (filters.salaryMin && job.salary.min < parseInt(filters.salaryMin)) return false;
    if (filters.salaryMax && job.salary.max > parseInt(filters.salaryMax)) return false;
    if (filters.remote && !job.location.remote) return false;
    if (filters.featured && !job.featured) return false;
    if (filters.urgent && !job.urgent) return false;
    if (filters.skills.length > 0) {
      const hasSkill = filters.skills.some(skill => 
        job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
      );
      if (!hasSkill) return false;
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(searchLower);
      const matchesCompany = job.company.name.toLowerCase().includes(searchLower);
      const matchesSkills = job.skills.some(skill => skill.toLowerCase().includes(searchLower));
      if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
    }
    if (locationFilter) {
      const locationLower = locationFilter.toLowerCase();
      const matchesCity = job.location.city.toLowerCase().includes(locationLower);
      const matchesState = job.location.state.toLowerCase().includes(locationLower);
      const matchesCountry = job.location.country.toLowerCase().includes(locationLower);
      const isRemote = locationLower.includes('remote') && job.location.remote;
      if (!matchesCity && !matchesState && !matchesCountry && !isRemote) return false;
    }
    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate) - new Date(a.postedDate);
      case 'oldest':
        return new Date(a.postedDate) - new Date(b.postedDate);
      case 'salary-high':
        return b.salary.max - a.salary.max;
      case 'salary-low':
        return a.salary.min - b.salary.min;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'company':
        return a.company.name.localeCompare(b.company.name);
      case 'applications':
        return b.applications - a.applications;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const displayedJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const handleSkillToggle = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      jobType: '',
      experienceLevel: '',
      salaryMin: '',
      salaryMax: '',
      company: '',
      skills: [],
      remote: false,
      featured: false,
      urgent: false,
      category: ''
    });
    setCurrentPage(1);
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const categories = [
    'Technology', 'Design', 'Marketing', 'Sales', 'Finance', 'Healthcare', 
    'Education', 'Product', 'Cybersecurity', 'Human Resources', 'AI/ML', 'Operations'
  ];

  const popularSkills = [
    'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 'AWS', 'Docker', 
    'Kubernetes', 'Machine Learning', 'SQL', 'Java', 'C#', 'Go', 'Vue.js', 'Angular'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
              <p className="text-gray-600">Discover opportunities from top companies worldwide</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm border">
                <EyeIcon className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{sortedJobs.length} jobs found</span>
              </div>
              <div className="flex bg-white rounded-lg p-1 shadow-sm border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-5 relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-4 relative">
                  <MapPinIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                  >
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => handleFilterChange('remote', !filters.remote)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.remote 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <GlobeAltIcon className="w-4 h-4 inline mr-1" />
              Remote
            </button>
            <button
              onClick={() => handleFilterChange('featured', !filters.featured)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.featured 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <StarIcon className="w-4 h-4 inline mr-1" />
              Featured
            </button>
            <button
              onClick={() => handleFilterChange('urgent', !filters.urgent)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.urgent 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FireIcon className="w-4 h-4 inline mr-1" />
              Urgent
            </button>
            {categories.slice(0, 4).map(category => (
              <button
                key={category}
                onClick={() => handleFilterChange('category', filters.category === category ? '' : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filters.category === category 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <FunnelIcon className="h-5 w-5" />
                Advanced Filters
                {(Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true))) && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                    {Object.values(filters).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length}
                  </span>
                )}
              </button>
              {Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true)) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="title">Title A-Z</option>
                <option value="company">Company A-Z</option>
                <option value="applications">Most Applied</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Job Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                    <select
                      value={filters.jobType}
                      onChange={(e) => handleFilterChange('jobType', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select
                      value={filters.experienceLevel}
                      onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Levels</option>
                      <option value="Entry-level">Entry Level</option>
                      <option value="Junior">Junior</option>
                      <option value="Mid-level">Mid Level</option>
                      <option value="Senior">Senior</option>
                      <option value="Lead">Lead</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.salaryMin}
                        onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.salaryMax}
                        onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={filters.company}
                      onChange={(e) => handleFilterChange('company', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                      {popularSkills.map(skill => (
                        <button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            filters.skills.includes(skill)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Jobs Grid/List */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading amazing opportunities...</p>
                </div>
              </div>
            ) : displayedJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BriefcaseIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Jobs Display */}
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
                }>
                  {displayedJobs.map((job, index) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      viewMode={viewMode}
                      isSaved={savedJobs.has(job.id)}
                      onToggleSave={() => toggleSaveJob(job.id)}
                      animationDelay={index * 100}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-12 space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === pageNum
                              ? 'text-blue-600 bg-blue-50 border border-blue-300'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced JobCard Component
const JobCard = ({ job, viewMode, isSaved, onToggleSave, animationDelay }) => {
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (viewMode === 'list') {
    return (
      <div
        className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0">
              {job.company.logo}
            </div>
            
            {/* Job Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                    {job.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-lg font-semibold text-gray-800">{job.company.name}</p>
                    <div className="flex items-center">
                      <StarIconSolid className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{job.company.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {job.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <StarIcon className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <FireIcon className="w-3 h-3 mr-1" />
                      Urgent
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    {job.location.city}, {job.location.state}
                    {job.location.remote && <span className="text-green-600 ml-1">(Remote)</span>}
                  </span>
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm font-semibold text-gray-900">
                    ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">{job.type}</span>
                </div>
                <div className="flex items-center">
                  <AcademicCapIcon className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-sm text-gray-600">{job.experience}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.slice(0, 6).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                  >
                    <TagIcon className="w-3 h-3 mr-1" />
                    {skill}
                  </span>
                ))}
                {job.skills.length > 6 && (
                  <span className="text-xs text-gray-500">+{job.skills.length - 6} more</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col items-end space-y-3 ml-6">
            <div className="text-right">
              <span className="text-sm text-gray-500">{formatTimeAgo(job.postedDate)}</span>
              <div className="text-xs text-gray-400">{job.applications} applicants</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onToggleSave}
                className={`p-2 rounded-lg transition-colors ${
                  isSaved 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                {isSaved ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
              </button>
              <Link
                to={`/jobs/${job.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-bottom"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Job Image */}
      {job.jobImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={job.jobImage}
            alt={job.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            {job.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 backdrop-blur-sm">
                <StarIcon className="w-3 h-3 mr-1" />
                Featured
              </span>
            )}
            {job.urgent && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 backdrop-blur-sm">
                <FireIcon className="w-3 h-3 mr-1" />
                Urgent
              </span>
            )}
          </div>
          <button
            onClick={onToggleSave}
            className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-colors ${
              isSaved 
                ? 'text-red-500 bg-white/90 hover:bg-white' 
                : 'text-white hover:text-red-500 bg-black/20 hover:bg-white'
            }`}
          >
            {isSaved ? <HeartIconSolid className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
          </button>
        </div>
      )}

      <div className="p-6">
        {/* Company Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
              {job.company.logo}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{job.company.name}</h4>
              <div className="flex items-center">
                <StarIconSolid className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{job.company.rating}</span>
                <span className="text-xs text-gray-400 ml-2">{job.company.employees}</span>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500">{formatTimeAgo(job.postedDate)}</span>
        </div>

        {/* Job Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {job.title}
        </h3>

        {/* Job Meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">
              {job.location.city}, {job.location.state}
              {job.location.remote && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <GlobeAltIcon className="w-3 h-3 mr-1" />
                  Remote
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm font-semibold text-gray-900">
              ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <ClockIcon className="w-3 h-3 mr-1" />
                {job.type}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <AcademicCapIcon className="w-3 h-3 mr-1" />
                {job.experience}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="text-xs text-gray-500">+{job.skills.length - 4} more</span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <UserGroupIcon className="w-3 h-3 mr-1" />
              {job.applications} applied
            </span>
            <span className="flex items-center">
              <EyeIcon className="w-3 h-3 mr-1" />
              {job.views} views
            </span>
          </div>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {job.category}
          </span>
        </div>

        {/* Action Button */}
        <Link
          to={`/jobs/${job.id}`}
          className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View Details & Apply
        </Link>
      </div>
    </div>
  );
};

export default Jobs;
