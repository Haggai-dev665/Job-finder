const Job = require('../models/Job');
const Company = require('../models/Company');

// Job data templates for different categories
const jobTemplates = {
  technology: {
    titles: [
      'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Software Engineer',
      'DevOps Engineer', 'Data Scientist', 'Product Manager', 'UX/UI Designer',
      'Mobile App Developer', 'Cloud Architect', 'Cybersecurity Specialist', 'QA Engineer',
      'Machine Learning Engineer', 'Database Administrator', 'Systems Analyst', 'Technical Lead'
    ],
    companies: [
      'TechCorp', 'InnovateSoft', 'Digital Solutions Inc', 'CloudTech', 'DataDriven Co',
      'NextGen Systems', 'AgileWorks', 'CodeCraft', 'TechHub', 'FutureSoft'
    ],
    skills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
      'Java', 'TypeScript', 'Angular', 'Vue.js', 'PostgreSQL', 'MongoDB', 'Git'
    ],
    salaryRanges: {
      'entry-level': { min: 50000, max: 75000 },
      'mid-level': { min: 75000, max: 120000 },
      'senior-level': { min: 120000, max: 180000 },
      'executive': { min: 180000, max: 300000 }
    }
  },
  healthcare: {
    titles: [
      'Registered Nurse', 'Medical Assistant', 'Healthcare Administrator', 'Physical Therapist',
      'Pharmacist', 'Medical Technologist', 'Healthcare Data Analyst', 'Nurse Practitioner',
      'Radiologic Technologist', 'Clinical Research Coordinator', 'Medical Coder', 'Dietitian'
    ],
    companies: [
      'City Medical Center', 'HealthFirst', 'MedCare Solutions', 'Regional Hospital',
      'Community Health', 'Prime Healthcare', 'Wellness Group', 'MediTech Corp'
    ],
    skills: [
      'Patient Care', 'Medical Records', 'Healthcare IT', 'Clinical Research',
      'Electronic Health Records', 'Medical Billing', 'HIPAA Compliance', 'Patient Education'
    ],
    salaryRanges: {
      'entry-level': { min: 35000, max: 50000 },
      'mid-level': { min: 50000, max: 80000 },
      'senior-level': { min: 80000, max: 120000 },
      'executive': { min: 120000, max: 200000 }
    }
  },
  finance: {
    titles: [
      'Financial Analyst', 'Accountant', 'Investment Advisor', 'Risk Manager',
      'Credit Analyst', 'Finance Manager', 'Tax Specialist', 'Auditor',
      'Treasury Analyst', 'Financial Planner', 'Compliance Officer', 'Portfolio Manager'
    ],
    companies: [
      'Global Finance Corp', 'Investment Partners', 'Capital Management', 'FinTech Solutions',
      'Banking Corp', 'Wealth Advisors', 'Financial Services Inc', 'Trust Bank'
    ],
    skills: [
      'Financial Analysis', 'Excel', 'Financial Modeling', 'Risk Assessment',
      'Accounting', 'Budgeting', 'Compliance', 'Investment Analysis', 'SQL', 'Bloomberg'
    ],
    salaryRanges: {
      'entry-level': { min: 45000, max: 65000 },
      'mid-level': { min: 65000, max: 100000 },
      'senior-level': { min: 100000, max: 150000 },
      'executive': { min: 150000, max: 250000 }
    }
  },
  marketing: {
    titles: [
      'Digital Marketing Specialist', 'Marketing Manager', 'Content Creator', 'SEO Specialist',
      'Social Media Manager', 'Brand Manager', 'Marketing Analyst', 'Campaign Manager',
      'Email Marketing Specialist', 'PPC Specialist', 'Marketing Coordinator', 'Growth Hacker'
    ],
    companies: [
      'Creative Agency', 'Marketing Pro', 'Digital First', 'Brand Builders',
      'Social Media Co', 'Content Kings', 'AdTech', 'Marketing Solutions'
    ],
    skills: [
      'Google Analytics', 'SEO/SEM', 'Social Media', 'Content Marketing',
      'Email Marketing', 'Adobe Creative Suite', 'PPC', 'Marketing Automation'
    ],
    salaryRanges: {
      'entry-level': { min: 35000, max: 50000 },
      'mid-level': { min: 50000, max: 75000 },
      'senior-level': { min: 75000, max: 110000 },
      'executive': { min: 110000, max: 180000 }
    }
  },
  sales: {
    titles: [
      'Sales Representative', 'Account Manager', 'Sales Manager', 'Business Development',
      'Inside Sales Rep', 'Territory Manager', 'Sales Coordinator', 'Key Account Manager',
      'Sales Director', 'Customer Success Manager', 'Pre-Sales Engineer', 'Sales Analyst'
    ],
    companies: [
      'SalesForce Pro', 'Growth Solutions', 'Business Partners', 'Sales Excellence',
      'Revenue Corp', 'Client Success Co', 'Partnership Inc', 'Deal Makers'
    ],
    skills: [
      'CRM', 'Salesforce', 'Lead Generation', 'Negotiation', 'Customer Relations',
      'B2B Sales', 'Pipeline Management', 'Cold Calling', 'Presentation Skills'
    ],
    salaryRanges: {
      'entry-level': { min: 40000, max: 55000 },
      'mid-level': { min: 55000, max: 85000 },
      'senior-level': { min: 85000, max: 130000 },
      'executive': { min: 130000, max: 200000 }
    }
  },
  education: {
    titles: [
      'Teacher', 'Principal', 'Education Administrator', 'Curriculum Developer',
      'Academic Advisor', 'Instructional Designer', 'Education Coordinator', 'Tutor',
      'Training Specialist', 'Educational Consultant', 'Research Assistant', 'Librarian'
    ],
    companies: [
      'Public School District', 'Private Academy', 'Education Corp', 'Learning Center',
      'Online Education', 'Training Institute', 'University System', 'Educational Services'
    ],
    skills: [
      'Curriculum Development', 'Classroom Management', 'Educational Technology',
      'Assessment', 'Student Support', 'Learning Management Systems', 'Training Design'
    ],
    salaryRanges: {
      'entry-level': { min: 35000, max: 45000 },
      'mid-level': { min: 45000, max: 65000 },
      'senior-level': { min: 65000, max: 85000 },
      'executive': { min: 85000, max: 120000 }
    }
  }
};

const locations = [
  { city: 'New York', state: 'NY', country: 'USA', zipCode: '10001' },
  { city: 'San Francisco', state: 'CA', country: 'USA', zipCode: '94102' },
  { city: 'Austin', state: 'TX', country: 'USA', zipCode: '73301' },
  { city: 'Seattle', state: 'WA', country: 'USA', zipCode: '98101' },
  { city: 'Boston', state: 'MA', country: 'USA', zipCode: '02101' },
  { city: 'Chicago', state: 'IL', country: 'USA', zipCode: '60601' },
  { city: 'Los Angeles', state: 'CA', country: 'USA', zipCode: '90210' },
  { city: 'Miami', state: 'FL', country: 'USA', zipCode: '33101' },
  { city: 'Denver', state: 'CO', country: 'USA', zipCode: '80201' },
  { city: 'Atlanta', state: 'GA', country: 'USA', zipCode: '30301' },
  { city: 'Toronto', state: 'ON', country: 'Canada', zipCode: 'M5H 2N2' },
  { city: 'Vancouver', state: 'BC', country: 'Canada', zipCode: 'V6B 1A1' },
  { city: 'London', state: '', country: 'UK', zipCode: 'SW1A 1AA' },
  { city: 'Berlin', state: '', country: 'Germany', zipCode: '10115' },
  { city: 'Amsterdam', state: '', country: 'Netherlands', zipCode: '1012' }
];

const jobTypes = ['full-time', 'part-time', 'contract', 'freelance'];
const experienceLevels = ['entry-level', 'mid-level', 'senior-level', 'executive'];

// Helper functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateJobDescription(title, skills, category) {
  const responsibilities = [
    `Develop and maintain high-quality ${category} solutions`,
    `Collaborate with cross-functional teams to deliver exceptional results`,
    `Participate in code reviews and maintain coding standards`,
    `Troubleshoot and debug applications to optimize performance`,
    `Stay updated with the latest industry trends and technologies`,
    `Mentor junior team members and contribute to team growth`,
    `Participate in agile development processes and sprint planning`,
    `Create and maintain technical documentation`
  ];

  const requirements = [
    `Proven experience with ${skills.slice(0, 3).join(', ')}`,
    `Strong problem-solving and analytical skills`,
    `Excellent communication and teamwork abilities`,
    `Bachelor's degree in relevant field or equivalent experience`,
    `Experience with ${skills.slice(3, 5).join(' and ')}`,
    `Understanding of best practices and design patterns`,
    `Ability to work in a fast-paced environment`
  ];

  const benefits = [
    'Competitive salary and benefits package',
    'Health, dental, and vision insurance',
    'Flexible working hours and remote work options',
    'Professional development opportunities',
    '401(k) with company matching',
    'Paid time off and holidays',
    'Modern office environment with latest tools',
    'Team building activities and company events'
  ];

  return `
We are seeking a talented ${title} to join our dynamic team. This is an excellent opportunity for a motivated professional to contribute to innovative projects and grow their career.

**Key Responsibilities:**
${responsibilities.slice(0, 5).map(r => `• ${r}`).join('\n')}

**Requirements:**
${requirements.map(r => `• ${r}`).join('\n')}

**What We Offer:**
${benefits.slice(0, 6).map(b => `• ${b}`).join('\n')}

Join us in building the future of ${category}!
  `.trim();
}

// Main generator functions
async function generateJobData(category, count = 10) {
  const template = jobTemplates[category];
  if (!template) {
    throw new Error(`Category ${category} not found`);
  }

  const jobs = [];

  for (let i = 0; i < count; i++) {
    const title = getRandomElement(template.titles);
    const company = getRandomElement(template.companies);
    const location = getRandomElement(locations);
    const jobType = getRandomElement(jobTypes);
    const experienceLevel = getRandomElement(experienceLevels);
    const skills = getRandomElements(template.skills, Math.floor(Math.random() * 5) + 3);
    const salaryRange = template.salaryRanges[experienceLevel];
    const isRemote = Math.random() > 0.7;
    const isHybrid = !isRemote && Math.random() > 0.8;

    const job = {
      title,
      description: generateJobDescription(title, skills, category),
      company: company,
      location: {
        ...location,
        remote: isRemote,
        hybrid: isHybrid
      },
      jobType,
      category,
      industry: template.companies[0].replace(/\s+(Inc|Corp|Co|Solutions|Systems|Group)$/i, ''),
      experienceLevel,
      salary: {
        min: salaryRange.min + Math.floor(Math.random() * 5000),
        max: salaryRange.max - Math.floor(Math.random() * 5000),
        currency: 'USD',
        period: 'yearly',
        negotiable: Math.random() > 0.6
      },
      requirements: skills,
      benefits: [
        'Health Insurance',
        'Paid Time Off',
        '401(k)',
        'Remote Work',
        'Professional Development'
      ],
      applicationDeadline: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      isActive: true,
      featured: Math.random() > 0.8,
      urgent: Math.random() > 0.9,
      views: Math.floor(Math.random() * 500),
      applications: Math.floor(Math.random() * 50),
      postedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    };

    jobs.push(job);
  }

  return jobs;
}

async function generateAllCategoriesData() {
  const allJobs = [];
  const categories = Object.keys(jobTemplates);
  
  for (const category of categories) {
    const categoryJobs = await generateJobData(category, 15);
    allJobs.push(...categoryJobs);
  }
  
  return allJobs;
}

function getJobStats(jobs) {
  const stats = {
    totalJobs: jobs.length,
    totalCompanies: new Set(jobs.map(job => job.company)).size,
    jobsByCategory: {},
    jobsByType: {},
    jobsByExperience: {},
    averageSalary: 0,
    featuredJobs: jobs.filter(job => job.featured).length,
    urgentJobs: jobs.filter(job => job.urgent).length,
    remoteJobs: jobs.filter(job => job.location.remote).length
  };

  // Count by category
  jobs.forEach(job => {
    stats.jobsByCategory[job.category] = (stats.jobsByCategory[job.category] || 0) + 1;
    stats.jobsByType[job.jobType] = (stats.jobsByType[job.jobType] || 0) + 1;
    stats.jobsByExperience[job.experienceLevel] = (stats.jobsByExperience[job.experienceLevel] || 0) + 1;
  });

  // Calculate average salary
  const salaries = jobs.map(job => (job.salary.min + job.salary.max) / 2);
  stats.averageSalary = Math.floor(salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length);

  return stats;
}

function getFeaturedJobs(jobs, limit = 6) {
  return jobs
    .filter(job => job.featured)
    .sort((a, b) => b.postedAt - a.postedAt)
    .slice(0, limit);
}

function getJobsByCategory(jobs, category, limit = 10) {
  return jobs
    .filter(job => job.category === category)
    .sort((a, b) => b.postedAt - a.postedAt)
    .slice(0, limit);
}

function searchJobs(jobs, { query, category, location, jobType, experienceLevel, salaryMin, salaryMax }) {
  let filteredJobs = [...jobs];

  if (query) {
    const searchTerm = query.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.requirements.some(req => req.toLowerCase().includes(searchTerm))
    );
  }

  if (category && category !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.category === category);
  }

  if (location) {
    const locationTerm = location.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.location.city.toLowerCase().includes(locationTerm) ||
      job.location.state.toLowerCase().includes(locationTerm) ||
      job.location.country.toLowerCase().includes(locationTerm)
    );
  }

  if (jobType && jobType !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.jobType === jobType);
  }

  if (experienceLevel && experienceLevel !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.experienceLevel === experienceLevel);
  }

  if (salaryMin) {
    filteredJobs = filteredJobs.filter(job => job.salary.max >= salaryMin);
  }

  if (salaryMax) {
    filteredJobs = filteredJobs.filter(job => job.salary.min <= salaryMax);
  }

  return filteredJobs.sort((a, b) => b.postedAt - a.postedAt);
}

module.exports = {
  generateJobData,
  generateAllCategoriesData,
  getJobStats,
  getFeaturedJobs,
  getJobsByCategory,
  searchJobs,
  jobTemplates
};
