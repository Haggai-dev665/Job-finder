export const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'New York, NY',
    type: 'full-time',
    experience: 'senior',
    salary: { min: 80000, max: 120000, currency: 'USD' },
    description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks.',
    requirements: [
      '5+ years of experience in Frontend Development',
      'Proficiency in React.js and JavaScript ES6+',
      'Experience with state management libraries (Redux, Zustand)',
      'Knowledge of HTML5, CSS3, and responsive design',
      'Familiarity with version control systems (Git)'
    ],
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux', 'TypeScript'],
    benefits: ['Health Insurance', 'Dental Coverage', '401k', 'Remote Work', 'Flexible Hours'],
    postedAt: '2024-01-15T10:00:00Z',
    deadline: '2024-02-15T23:59:59Z',
    remote: true,
    logo: 'https://via.placeholder.com/100x100?text=TC'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupHub',
    location: 'San Francisco, CA',
    type: 'full-time',
    experience: 'mid-level',
    salary: { min: 90000, max: 140000, currency: 'USD' },
    description: 'Join our innovative startup as a Full Stack Engineer. Work on cutting-edge projects and help shape the future of our platform.',
    requirements: [
      '3+ years of full-stack development experience',
      'Strong knowledge of Node.js and Express',
      'Experience with React and modern frontend frameworks',
      'Database experience (MongoDB, PostgreSQL)',
      'RESTful API design and implementation'
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'AWS'],
    benefits: ['Equity Package', 'Health Insurance', 'Learning Budget', 'Catered Lunch'],
    postedAt: '2024-01-14T14:30:00Z',
    deadline: '2024-02-20T23:59:59Z',
    remote: false,
    logo: 'https://via.placeholder.com/100x100?text=SH'
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataFlow Analytics',
    location: 'Austin, TX',
    type: 'full-time',
    experience: 'mid-level',
    salary: { min: 95000, max: 130000, currency: 'USD' },
    description: 'We are seeking a talented Data Scientist to analyze complex datasets and derive actionable insights for our clients.',
    requirements: [
      'Master\'s degree in Data Science, Statistics, or related field',
      'Proficiency in Python and R',
      'Experience with machine learning algorithms',
      'Knowledge of SQL and database management',
      'Strong statistical analysis skills'
    ],
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Pandas', 'NumPy'],
    benefits: ['Health Insurance', 'Retirement Plan', 'Professional Development', 'Remote Work'],
    postedAt: '2024-01-13T09:15:00Z',
    deadline: '2024-02-10T23:59:59Z',
    remote: true,
    logo: 'https://via.placeholder.com/100x100?text=DA'
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'Seattle, WA',
    type: 'full-time',
    experience: 'senior',
    salary: { min: 110000, max: 150000, currency: 'USD' },
    description: 'Lead product strategy and development for our next-generation software solutions. Work closely with engineering and design teams.',
    requirements: [
      '5+ years of product management experience',
      'Experience with agile development methodologies',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership abilities',
      'Technical background preferred'
    ],
    skills: ['Product Management', 'Agile', 'Leadership', 'Strategy', 'Analytics'],
    benefits: ['Stock Options', 'Health Insurance', 'Unlimited PTO', 'Team Retreats'],
    postedAt: '2024-01-12T16:45:00Z',
    deadline: '2024-02-25T23:59:59Z',
    remote: false,
    logo: 'https://via.placeholder.com/100x100?text=IL'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Remote',
    type: 'contract',
    experience: 'mid-level',
    salary: { min: 70000, max: 100000, currency: 'USD' },
    description: 'Join our DevOps team to build and maintain scalable infrastructure. Work with modern cloud technologies and automation tools.',
    requirements: [
      '3+ years of DevOps experience',
      'Proficiency with AWS or Azure',
      'Experience with Docker and Kubernetes',
      'Knowledge of CI/CD pipelines',
      'Scripting skills in Python or Bash'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python', 'Jenkins', 'Terraform'],
    benefits: ['Remote Work', 'Flexible Schedule', 'Health Stipend', 'Tech Allowance'],
    postedAt: '2024-01-11T11:20:00Z',
    deadline: '2024-02-05T23:59:59Z',
    remote: true,
    logo: 'https://via.placeholder.com/100x100?text=CT'
  },
  {
    id: '6',
    title: 'UX/UI Designer',
    company: 'DesignStudio Pro',
    location: 'Los Angeles, CA',
    type: 'part-time',
    experience: 'junior',
    salary: { min: 40000, max: 60000, currency: 'USD' },
    description: 'Create beautiful and intuitive user interfaces for web and mobile applications. Work with cross-functional teams to deliver exceptional user experiences.',
    requirements: [
      '2+ years of UX/UI design experience',
      'Proficiency in Figma and Adobe Creative Suite',
      'Understanding of user-centered design principles',
      'Experience with prototyping and wireframing',
      'Portfolio showcasing design projects'
    ],
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping', 'User Research'],
    benefits: ['Flexible Hours', 'Creative Environment', 'Learning Opportunities', 'Team Events'],
    postedAt: '2024-01-10T13:30:00Z',
    deadline: '2024-02-12T23:59:59Z',
    remote: false,
    logo: 'https://via.placeholder.com/100x100?text=DS'
  },
  {
    id: '7',
    title: 'Mobile App Developer',
    company: 'AppMakers Ltd',
    location: 'Chicago, IL',
    type: 'full-time',
    experience: 'mid-level',
    salary: { min: 75000, max: 105000, currency: 'USD' },
    description: 'Develop and maintain mobile applications for iOS and Android platforms. Work on innovative projects that reach millions of users.',
    requirements: [
      '3+ years of mobile development experience',
      'Proficiency in React Native or Flutter',
      'Knowledge of native iOS/Android development',
      'Experience with mobile app deployment',
      'Understanding of mobile UI/UX principles'
    ],
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'JavaScript', 'Swift', 'Kotlin'],
    benefits: ['Health Insurance', 'Device Allowance', 'Professional Development', 'Gym Membership'],
    postedAt: '2024-01-09T08:45:00Z',
    deadline: '2024-02-18T23:59:59Z',
    remote: true,
    logo: 'https://via.placeholder.com/100x100?text=AM'
  },
  {
    id: '8',
    title: 'Backend Developer',
    company: 'ServerSide Systems',
    location: 'Denver, CO',
    type: 'full-time',
    experience: 'junior',
    salary: { min: 60000, max: 85000, currency: 'USD' },
    description: 'Build robust and scalable backend systems. Work with modern technologies and contribute to high-performance applications.',
    requirements: [
      '1-3 years of backend development experience',
      'Proficiency in Python or Node.js',
      'Experience with databases (SQL and NoSQL)',
      'Knowledge of RESTful API development',
      'Understanding of software engineering principles'
    ],
    skills: ['Python', 'Node.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Docker'],
    benefits: ['Health Insurance', 'Learning Budget', 'Remote Work Options', 'Team Building'],
    postedAt: '2024-01-08T15:10:00Z',
    deadline: '2024-02-08T23:59:59Z',
    remote: false,
    logo: 'https://via.placeholder.com/100x100?text=SS'
  }
];

export const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy',
  'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Australia', 'New Zealand',
  'Japan', 'South Korea', 'Singapore', 'Hong Kong', 'India', 'Brazil', 'Mexico',
  'Argentina', 'Chile', 'South Africa', 'Israel', 'Switzerland', 'Austria', 'Belgium',
  'Ireland', 'Portugal', 'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Bulgaria',
  'Croatia', 'Slovenia', 'Slovakia', 'Estonia', 'Latvia', 'Lithuania', 'Luxembourg',
  'Malta', 'Cyprus', 'Greece', 'Turkey', 'Russia', 'Ukraine', 'Belarus', 'Kazakhstan'
];

export const skills = [
  'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go',
  'TypeScript', 'Angular', 'Vue.js', 'Express', 'Django', 'Flask', 'Spring Boot',
  'ASP.NET', 'Laravel', 'Rails', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'Git',
  'HTML', 'CSS', 'SASS', 'LESS', 'Bootstrap', 'Tailwind CSS', 'Material UI',
  'REST APIs', 'GraphQL', 'WebSockets', 'Microservices', 'DevOps', 'CI/CD',
  'Machine Learning', 'Data Science', 'AI', 'TensorFlow', 'PyTorch', 'Pandas',
  'NumPy', 'R', 'Tableau', 'Power BI', 'SQL', 'NoSQL', 'Elasticsearch',
  'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch', 'InVision',
  'Project Management', 'Agile', 'Scrum', 'Product Management', 'Leadership'
];

export const jobTypes = [
  'full-time',
  'part-time',
  'contract',
  'freelance',
  'internship',
  'temporary'
];

export const experienceLevels = [
  'entry-level',
  'junior',
  'mid-level',
  'senior',
  'lead',
  'executive'
];

export const salaryRanges = [
  { label: 'Any', min: 0, max: 1000000 },
  { label: '$30k - $50k', min: 30000, max: 50000 },
  { label: '$50k - $75k', min: 50000, max: 75000 },
  { label: '$75k - $100k', min: 75000, max: 100000 },
  { label: '$100k - $150k', min: 100000, max: 150000 },
  { label: '$150k+', min: 150000, max: 1000000 }
];
