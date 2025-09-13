# Job Finder Architecture

This document describes the system architecture and design decisions for the Job Finder application.

## System Overview

Job Finder is a full-stack web application built with a modern microservices-inspired architecture:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Client  │    │   Express API    │    │    MongoDB      │
│   (Frontend)    │◄──►│   (Backend)      │◄──►│   (Database)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │  External APIs   │
                       │  (JSearch, etc.) │
                       └──────────────────┘
```

## Frontend Architecture (React)

### Component Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Modal, etc.)
│   ├── forms/           # Form components
│   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   └── ui/              # UI-specific components
├── pages/               # Page-level components
│   ├── auth/           # Authentication pages
│   ├── jobs/           # Job-related pages
│   ├── profile/        # User profile pages
│   └── dashboard/      # Dashboard pages
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state
│   ├── JobContext.js   # Job search state
│   └── ThemeContext.js # UI theme state
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication logic
│   ├── useJobs.js      # Job search logic
│   └── useApi.js       # API communication
├── services/           # API service layer
│   ├── authService.js  # Authentication API calls
│   ├── jobService.js   # Job-related API calls
│   └── userService.js  # User management API calls
└── utils/              # Utility functions
    ├── validation.js   # Form validation
    ├── formatting.js   # Data formatting
    └── constants.js    # Application constants
```

### State Management

- **React Context**: Global state for authentication, user preferences, and theme
- **Local State**: Component-specific state using useState and useReducer
- **Server State**: Cached API responses using custom hooks

### Key Design Patterns

1. **Container/Presentation Pattern**: Separation of logic and UI
2. **Custom Hooks**: Reusable stateful logic
3. **Context Providers**: Global state management
4. **Higher-Order Components**: Cross-cutting concerns

## Backend Architecture (Node.js/Express)

### Directory Structure

```
backend/
├── controllers/         # Request handlers
│   ├── authController.js    # Authentication logic
│   ├── jobController.js     # Job management
│   ├── userController.js    # User management
│   └── companyController.js # Company management
├── models/             # Database models
│   ├── User.js         # User schema
│   ├── Job.js          # Job schema
│   ├── Company.js      # Company schema
│   └── Application.js  # Application schema
├── routes/             # API routes
│   ├── auth.js         # Authentication routes
│   ├── jobs.js         # Job routes
│   ├── users.js        # User routes
│   └── companies.js    # Company routes
├── middleware/         # Custom middleware
│   ├── auth.js         # Authentication middleware
│   ├── validation.js   # Request validation
│   └── errorHandler.js # Error handling
├── config/             # Configuration
│   ├── database.js     # Database connection
│   └── config.js       # Environment configuration
├── utils/              # Utility functions
│   ├── email.js        # Email utilities
│   ├── helpers.js      # General helpers
│   └── logger.js       # Logging utilities
└── server.js           # Application entry point
```

### API Design

#### RESTful Endpoints

```
Authentication:
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
POST /api/auth/logout       # User logout
GET  /api/auth/me          # Get current user

Jobs:
GET    /api/jobs           # List jobs (with filtering)
POST   /api/jobs           # Create job (employers only)
GET    /api/jobs/:id       # Get job details
PUT    /api/jobs/:id       # Update job (employers only)
DELETE /api/jobs/:id       # Delete job (employers only)
POST   /api/jobs/search    # Advanced job search

Applications:
GET  /api/applications     # List user applications
POST /api/applications     # Apply to job
GET  /api/applications/:id # Get application details
PUT  /api/applications/:id # Update application status

Users:
GET  /api/users/profile    # Get user profile
PUT  /api/users/profile    # Update user profile
GET  /api/users/:id        # Get public user profile

Companies:
GET  /api/companies        # List companies
POST /api/companies        # Create company profile
GET  /api/companies/:id    # Get company details
PUT  /api/companies/:id    # Update company profile
```

### Middleware Stack

1. **CORS**: Cross-origin resource sharing
2. **Morgan**: HTTP request logging
3. **Helmet**: Security headers
4. **Rate Limiting**: API rate limiting
5. **Authentication**: JWT token validation
6. **Validation**: Request data validation
7. **Error Handling**: Centralized error handling

## Database Design (MongoDB)

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  userType: String ('candidate' | 'employer' | 'admin'),
  profile: {
    avatar: String,
    bio: String,
    skills: [String],
    experience: String,
    education: String,
    location: String,
    resume: String
  },
  preferences: {
    jobTypes: [String],
    locations: [String],
    salaryRange: { min: Number, max: Number },
    remote: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  company: ObjectId (ref: Company),
  location: String,
  jobType: String ('full-time' | 'part-time' | 'contract' | 'remote'),
  experience: String ('entry' | 'mid' | 'senior'),
  salary: {
    min: Number,
    max: Number,
    currency: String
  },
  skills: [String],
  requirements: [String],
  benefits: [String],
  postedBy: ObjectId (ref: User),
  status: String ('active' | 'closed' | 'draft'),
  applicationsCount: Number,
  externalId: String, // For JSearch API jobs
  source: String ('internal' | 'jsearch'),
  createdAt: Date,
  updatedAt: Date
}
```

#### Companies Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  logo: String,
  website: String,
  industry: String,
  size: String,
  location: String,
  founded: Date,
  owner: ObjectId (ref: User),
  reviews: [{
    user: ObjectId (ref: User),
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  jobs: [ObjectId] (ref: Job),
  createdAt: Date,
  updatedAt: Date
}
```

#### Applications Collection
```javascript
{
  _id: ObjectId,
  job: ObjectId (ref: Job),
  candidate: ObjectId (ref: User),
  status: String ('pending' | 'reviewed' | 'interviewed' | 'accepted' | 'rejected'),
  coverLetter: String,
  resume: String,
  appliedAt: Date,
  statusHistory: [{
    status: String,
    changedAt: Date,
    changedBy: ObjectId (ref: User)
  }],
  notes: String
}
```

### Indexing Strategy

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ userType: 1 })

// Jobs
db.jobs.createIndex({ title: "text", description: "text" })
db.jobs.createIndex({ location: 1 })
db.jobs.createIndex({ jobType: 1 })
db.jobs.createIndex({ createdAt: -1 })
db.jobs.createIndex({ status: 1 })

// Applications
db.applications.createIndex({ candidate: 1, job: 1 }, { unique: true })
db.applications.createIndex({ job: 1 })
db.applications.createIndex({ status: 1 })

// Companies
db.companies.createIndex({ name: "text", description: "text" })
db.companies.createIndex({ industry: 1 })
```

## External Integrations

### JSearch API Integration

```javascript
// Job fetching service
class JSearchService {
  async searchJobs(query, location, page = 1) {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: `${query} in ${location}`,
        page: page.toString(),
        num_pages: '1'
      },
      headers: {
        'X-RapidAPI-Key': process.env.JSEARCH_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };
    
    const response = await axios.request(options);
    return this.transformJobs(response.data.data);
  }
  
  transformJobs(jobs) {
    return jobs.map(job => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city + ', ' + job.job_state,
      description: job.job_description,
      salary: job.job_min_salary && job.job_max_salary ? {
        min: job.job_min_salary,
        max: job.job_max_salary
      } : null,
      externalId: job.job_id,
      source: 'jsearch'
    }));
  }
}
```

## Security Architecture

### Authentication & Authorization

1. **JWT Tokens**: Stateless authentication
2. **Password Hashing**: bcrypt with salt rounds
3. **Role-based Access**: Different permissions for candidates, employers, and admins
4. **Input Validation**: Comprehensive request validation
5. **Rate Limiting**: API abuse prevention

### Security Headers

```javascript
// Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## Performance Optimizations

### Frontend
- **Code Splitting**: React.lazy() for route-based splitting
- **Memoization**: React.memo for expensive components
- **Virtualization**: Virtual scrolling for large lists
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack bundle analyzer

### Backend
- **Database Indexing**: Optimized queries
- **Caching**: Redis for frequently accessed data
- **Pagination**: Efficient data loading
- **Connection Pooling**: MongoDB connection optimization
- **Compression**: gzip compression for responses

### API Optimization
```javascript
// Pagination middleware
const paginate = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  req.pagination = { skip, limit, page };
  next();
};

// Caching middleware
const cache = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = redis.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      redis.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};
```

## Deployment Architecture

### Development Environment
- **Frontend**: Vite dev server (localhost:5173)
- **Backend**: Nodemon (localhost:5000)
- **Database**: Local MongoDB instance

### Production Environment
- **Frontend**: Static files served by CDN
- **Backend**: PM2 process manager
- **Database**: MongoDB Atlas cluster
- **Load Balancer**: Nginx reverse proxy
- **SSL**: Let's Encrypt certificates

### CI/CD Pipeline
```yaml
# GitHub Actions workflow
name: Deploy Job Finder
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: |
          cd frontend && npm install
          cd ../backend && npm install
      - name: Run tests
        run: |
          cd frontend && npm test
          cd ../backend && npm test
      - name: Build frontend
        run: cd frontend && npm run build
      - name: Deploy to server
        run: |
          # Deployment scripts
```

## Monitoring & Logging

### Application Monitoring
- **Error Tracking**: Sentry for error monitoring
- **Performance**: New Relic for application performance
- **Uptime**: Pingdom for service availability
- **Logs**: Winston for structured logging

### Analytics
- **User Analytics**: Google Analytics
- **Custom Events**: Custom tracking for job applications, searches
- **A/B Testing**: Feature flag implementation

## Scalability Considerations

### Horizontal Scaling
- **Load Balancing**: Multiple backend instances
- **Database Sharding**: MongoDB sharding for large datasets
- **CDN**: Global content delivery
- **Microservices**: Future service decomposition

### Caching Strategy
- **Browser Caching**: Static asset caching
- **API Caching**: Redis for API responses
- **Database Caching**: MongoDB query result caching
- **CDN Caching**: Geographic content caching

This architecture supports the current application requirements while providing a foundation for future growth and feature expansion.