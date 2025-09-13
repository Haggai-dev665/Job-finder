# Job Finder API Documentation

This document provides comprehensive documentation for the Job Finder REST API.

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.jobfinder.com/api`

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c8b1f8e4c8a1",
    "name": "John Doe",
    "email": "user@example.com",
    "userType": "candidate"
  }
}
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {} // Optional additional details
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Authentication Endpoints

### Register User

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "candidate" // or "employer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d5ec49f1b2c8b1f8e4c8a1",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "candidate"
  }
}
```

### Login User

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout User

```http
POST /api/auth/logout
```
*Requires authentication*

### Get Current User

```http
GET /api/auth/me
```
*Requires authentication*

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "60d5ec49f1b2c8b1f8e4c8a1",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "candidate",
    "profile": {
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Software developer with 5 years experience",
      "skills": ["JavaScript", "React", "Node.js"],
      "experience": "mid-level",
      "location": "New York, NY"
    }
  }
}
```

## Job Endpoints

### List Jobs

```http
GET /api/jobs
```

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Number of results per page (default: 10, max: 50)
- `search` (optional) - Search term for job title or description
- `location` (optional) - Job location
- `jobType` (optional) - Job type (full-time, part-time, contract, remote)
- `experience` (optional) - Experience level (entry, mid, senior)
- `company` (optional) - Company name or ID
- `sort` (optional) - Sort by (createdAt, salary, title) default: -createdAt

**Example:**
```http
GET /api/jobs?search=developer&location=New+York&jobType=full-time&page=1&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "60d5ec49f1b2c8b1f8e4c8a2",
        "title": "Senior Software Developer",
        "description": "We are looking for a senior software developer...",
        "company": {
          "id": "60d5ec49f1b2c8b1f8e4c8a3",
          "name": "TechCorp Inc.",
          "logo": "https://example.com/logo.jpg"
        },
        "location": "New York, NY",
        "jobType": "full-time",
        "experience": "senior",
        "salary": {
          "min": 120000,
          "max": 150000,
          "currency": "USD"
        },
        "skills": ["JavaScript", "React", "Node.js"],
        "postedAt": "2023-12-01T10:00:00.000Z",
        "applicationsCount": 45
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalJobs": 87,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### Get Job Details

```http
GET /api/jobs/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "job": {
      "id": "60d5ec49f1b2c8b1f8e4c8a2",
      "title": "Senior Software Developer",
      "description": "We are looking for a senior software developer with expertise in modern web technologies...",
      "requirements": [
        "5+ years of experience in software development",
        "Proficiency in JavaScript, React, and Node.js",
        "Experience with databases (MongoDB, PostgreSQL)",
        "Strong problem-solving skills"
      ],
      "benefits": [
        "Competitive salary",
        "Health insurance",
        "Remote work options",
        "Professional development budget"
      ],
      "company": {
        "id": "60d5ec49f1b2c8b1f8e4c8a3",
        "name": "TechCorp Inc.",
        "description": "Leading technology company...",
        "logo": "https://example.com/logo.jpg",
        "website": "https://techcorp.com",
        "industry": "Technology",
        "size": "501-1000"
      },
      "location": "New York, NY",
      "jobType": "full-time",
      "experience": "senior",
      "salary": {
        "min": 120000,
        "max": 150000,
        "currency": "USD"
      },
      "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
      "postedBy": {
        "id": "60d5ec49f1b2c8b1f8e4c8a4",
        "name": "Jane Smith",
        "title": "HR Manager"
      },
      "status": "active",
      "applicationsCount": 45,
      "createdAt": "2023-12-01T10:00:00.000Z",
      "updatedAt": "2023-12-01T10:00:00.000Z"
    }
  }
}
```

### Create Job (Employers Only)

```http
POST /api/jobs
```
*Requires authentication and employer role*

**Request Body:**
```json
{
  "title": "Frontend Developer",
  "description": "We are seeking a talented frontend developer...",
  "requirements": [
    "3+ years of React experience",
    "Strong CSS and JavaScript skills"
  ],
  "benefits": [
    "Competitive salary",
    "Health insurance"
  ],
  "location": "San Francisco, CA",
  "jobType": "full-time",
  "experience": "mid",
  "salary": {
    "min": 80000,
    "max": 120000,
    "currency": "USD"
  },
  "skills": ["React", "JavaScript", "CSS", "HTML"],
  "company": "60d5ec49f1b2c8b1f8e4c8a3"
}
```

### Update Job (Employers Only)

```http
PUT /api/jobs/:id
```
*Requires authentication and ownership*

### Delete Job (Employers Only)

```http
DELETE /api/jobs/:id
```
*Requires authentication and ownership*

### Advanced Job Search

```http
POST /api/jobs/search
```

**Request Body:**
```json
{
  "query": "software engineer",
  "location": "New York",
  "filters": {
    "jobType": ["full-time", "remote"],
    "experience": ["mid", "senior"],
    "salaryRange": {
      "min": 80000,
      "max": 150000
    },
    "skills": ["JavaScript", "React"],
    "company": ["TechCorp", "StartupXYZ"]
  },
  "sort": {
    "field": "createdAt",
    "order": "desc"
  },
  "page": 1,
  "limit": 20
}
```

## Application Endpoints

### Get User Applications

```http
GET /api/applications
```
*Requires authentication*

**Query Parameters:**
- `status` (optional) - Filter by application status
- `page` (optional) - Page number
- `limit` (optional) - Results per page

**Response:**
```json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "60d5ec49f1b2c8b1f8e4c8a5",
        "job": {
          "id": "60d5ec49f1b2c8b1f8e4c8a2",
          "title": "Senior Software Developer",
          "company": {
            "name": "TechCorp Inc.",
            "logo": "https://example.com/logo.jpg"
          }
        },
        "status": "pending",
        "appliedAt": "2023-12-01T15:30:00.000Z",
        "coverLetter": "I am excited to apply for this position..."
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalApplications": 15
    }
  }
}
```

### Apply to Job

```http
POST /api/applications
```
*Requires authentication and candidate role*

**Request Body:**
```json
{
  "jobId": "60d5ec49f1b2c8b1f8e4c8a2",
  "coverLetter": "I am excited to apply for this position because...",
  "resume": "https://example.com/resume.pdf" // Optional if user has default resume
}
```

### Get Application Details

```http
GET /api/applications/:id
```
*Requires authentication and ownership*

### Update Application Status (Employers Only)

```http
PUT /api/applications/:id/status
```
*Requires authentication and employer role*

**Request Body:**
```json
{
  "status": "reviewed", // pending, reviewed, interviewed, accepted, rejected
  "notes": "Great candidate, moving to next round"
}
```

## User Profile Endpoints

### Get User Profile

```http
GET /api/users/profile
```
*Requires authentication*

### Update User Profile

```http
PUT /api/users/profile
```
*Requires authentication*

**Request Body:**
```json
{
  "name": "John Doe",
  "profile": {
    "bio": "Experienced software developer",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": "senior",
    "education": "Bachelor's in Computer Science",
    "location": "New York, NY",
    "resume": "https://example.com/resume.pdf",
    "portfolio": "https://johndoe.dev"
  },
  "preferences": {
    "jobTypes": ["full-time", "remote"],
    "locations": ["New York", "Remote"],
    "salaryRange": {
      "min": 100000,
      "max": 150000
    },
    "remote": true
  }
}
```

### Get Public User Profile

```http
GET /api/users/:id
```

### Upload Profile Picture

```http
POST /api/users/avatar
```
*Requires authentication*

**Request:** Multipart form data with image file

## Company Endpoints

### List Companies

```http
GET /api/companies
```

**Query Parameters:**
- `search` (optional) - Search company name or description
- `industry` (optional) - Filter by industry
- `size` (optional) - Filter by company size
- `page` (optional) - Page number
- `limit` (optional) - Results per page

### Get Company Details

```http
GET /api/companies/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "company": {
      "id": "60d5ec49f1b2c8b1f8e4c8a3",
      "name": "TechCorp Inc.",
      "description": "Leading technology company specializing in...",
      "logo": "https://example.com/logo.jpg",
      "website": "https://techcorp.com",
      "industry": "Technology",
      "size": "501-1000",
      "location": "San Francisco, CA",
      "founded": "2010-01-01T00:00:00.000Z",
      "reviews": [
        {
          "id": "60d5ec49f1b2c8b1f8e4c8a6",
          "user": {
            "name": "Anonymous"
          },
          "rating": 4.5,
          "comment": "Great place to work with excellent benefits",
          "createdAt": "2023-11-15T10:00:00.000Z"
        }
      ],
      "averageRating": 4.2,
      "totalReviews": 156,
      "activeJobs": 12,
      "totalEmployees": 750
    }
  }
}
```

### Create Company Profile (Employers Only)

```http
POST /api/companies
```
*Requires authentication and employer role*

### Update Company Profile (Employers Only)

```http
PUT /api/companies/:id
```
*Requires authentication and ownership*

### Add Company Review

```http
POST /api/companies/:id/reviews
```
*Requires authentication*

**Request Body:**
```json
{
  "rating": 4.5,
  "comment": "Great company culture and work-life balance",
  "anonymous": false
}
```

## Analytics Endpoints (Admin Only)

### Get Dashboard Statistics

```http
GET /api/analytics/dashboard
```
*Requires authentication and admin role*

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 15420,
      "totalJobs": 8765,
      "totalApplications": 234560,
      "totalCompanies": 1250
    },
    "growth": {
      "usersThisMonth": 1250,
      "jobsThisMonth": 340,
      "applicationsThisMonth": 12450
    },
    "topCategories": [
      { "category": "Technology", "count": 2340 },
      { "category": "Healthcare", "count": 1890 },
      { "category": "Finance", "count": 1456 }
    ]
  }
}
```

## Notification Endpoints

### Get User Notifications

```http
GET /api/notifications
```
*Requires authentication*

### Mark Notification as Read

```http
PUT /api/notifications/:id/read
```
*Requires authentication*

### Get Notification Preferences

```http
GET /api/notifications/preferences
```
*Requires authentication*

### Update Notification Preferences

```http
PUT /api/notifications/preferences
```
*Requires authentication*

## File Upload Endpoints

### Upload Resume

```http
POST /api/upload/resume
```
*Requires authentication*

**Request:** Multipart form data with PDF file

### Upload Company Logo

```http
POST /api/upload/logo
```
*Requires authentication and employer role*

**Request:** Multipart form data with image file

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **Job search**: 60 requests per minute
- **General endpoints**: 100 requests per minute
- **File uploads**: 10 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1609459200
```

## Webhooks

### Job Application Webhook

When a candidate applies to a job, a webhook can be sent to the employer's configured endpoint:

```json
{
  "event": "application.created",
  "data": {
    "application": {
      "id": "60d5ec49f1b2c8b1f8e4c8a5",
      "job": {
        "id": "60d5ec49f1b2c8b1f8e4c8a2",
        "title": "Senior Software Developer"
      },
      "candidate": {
        "id": "60d5ec49f1b2c8b1f8e4c8a1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "appliedAt": "2023-12-01T15:30:00.000Z"
    }
  },
  "timestamp": "2023-12-01T15:30:05.000Z"
}
```

## SDK Examples

### JavaScript/Node.js

```javascript
const JobFinderAPI = require('jobfinder-api-sdk');

const client = new JobFinderAPI({
  baseURL: 'https://api.jobfinder.com/api',
  apiKey: 'your_api_key'
});

// Search for jobs
const jobs = await client.jobs.search({
  query: 'developer',
  location: 'New York',
  jobType: 'full-time'
});

// Apply to a job
const application = await client.applications.create({
  jobId: 'job_id',
  coverLetter: 'I am interested in this position...'
});
```

### Python

```python
from jobfinder_api import JobFinderClient

client = JobFinderClient(
    base_url='https://api.jobfinder.com/api',
    api_key='your_api_key'
)

# Search for jobs
jobs = client.jobs.search(
    query='developer',
    location='New York',
    job_type='full-time'
)

# Apply to a job
application = client.applications.create(
    job_id='job_id',
    cover_letter='I am interested in this position...'
)
```

## Testing

Use the following test credentials for API testing:

**Candidate Account:**
- Email: `candidate@test.com`
- Password: `password123`

**Employer Account:**
- Email: `employer@test.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@test.com`
- Password: `password123`

## Support

For API support and questions:
- Email: api-support@jobfinder.com
- Documentation: https://docs.jobfinder.com
- Status Page: https://status.jobfinder.com