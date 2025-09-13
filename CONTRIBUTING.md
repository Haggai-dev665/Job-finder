# Contributing to Job Finder

Thank you for your interest in contributing to Job Finder! We welcome contributions from developers of all skill levels. This document provides guidelines and information for contributors.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Contributing Guidelines](#contributing-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Issue Guidelines](#issue-guidelines)
7. [Code Style](#code-style)
8. [Testing](#testing)
9. [Documentation](#documentation)
10. [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to making participation in our project a harassment-free experience for everyone, regardless of:
- Age, body size, disability, ethnicity, gender identity and expression
- Level of experience, nationality, personal appearance, race, religion
- Sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Use of sexualized language or imagery and unwelcome sexual attention
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers who do not follow or enforce the Code of Conduct may be temporarily or permanently removed from the project team.

## Getting Started

### Ways to Contribute

- **Bug Reports**: Help us identify and fix issues
- **Feature Requests**: Suggest new features and improvements
- **Code Contributions**: Fix bugs, implement features, improve performance
- **Documentation**: Improve docs, write tutorials, create examples
- **Testing**: Write tests, perform manual testing, report issues
- **Design**: UI/UX improvements, accessibility enhancements

### Prerequisites

Before contributing, ensure you have:
- Basic knowledge of JavaScript, React, and Node.js
- Familiarity with Git and GitHub
- Understanding of REST APIs and databases
- Node.js (v16 or higher) installed
- MongoDB installed locally or access to MongoDB Atlas

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/Job-finder.git
cd Job-finder

# Add the original repository as upstream
git remote add upstream https://github.com/Haggai-dev665/Job-finder.git
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

Create environment files for development:

**Backend (.env):**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobfinder_dev
JWT_SECRET=your_development_jwt_secret
JSEARCH_API_KEY=your_jsearch_api_key
JSEARCH_API_HOST=jsearch.p.rapidapi.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Frontend (.env):**
```env
VITE_NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
```

### 4. Database Setup

```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Create development database (optional - will be created automatically)
mongo
> use jobfinder_dev
> exit
```

### 5. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 6. Verify Setup

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Test API: http://localhost:5000/api/health

## Contributing Guidelines

### Branch Naming

Use descriptive branch names with prefixes:
- `feature/add-job-alerts` - New features
- `fix/login-error` - Bug fixes
- `docs/api-documentation` - Documentation updates
- `refactor/user-service` - Code refactoring
- `test/job-search-component` - Test additions

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(auth): add two-factor authentication
fix(jobs): resolve search filter bug
docs(api): update authentication endpoints
test(components): add tests for job search
```

### Code Organization

#### Frontend Structure
```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── forms/           # Form components
│   └── ui/              # UI components
├── pages/               # Route components
├── hooks/               # Custom hooks
├── services/            # API services
├── utils/               # Utility functions
├── context/             # React contexts
└── __tests__/           # Test files
```

#### Backend Structure
```
backend/
├── controllers/         # Route handlers
├── models/              # Database models
├── routes/              # Express routes
├── middleware/          # Custom middleware
├── services/            # Business logic
├── utils/               # Utility functions
├── config/              # Configuration
└── __tests__/           # Test files
```

## Pull Request Process

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow code style guidelines
- Write tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Test Your Changes

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run linting
npm run lint

# Check formatting
npm run format:check
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat(scope): your descriptive message"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Link to related issues
- Screenshots for UI changes
- List of changes made
- Testing instructions

### 6. PR Review Process

- **Automated Checks**: CI/CD pipeline runs tests and linting
- **Code Review**: Maintainers review code quality and design
- **Testing**: Manual testing of new features
- **Documentation**: Ensure docs are updated
- **Approval**: At least one maintainer approval required

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Changes Made
- List specific changes
- Include any breaking changes

## Testing
- [ ] Tests pass locally
- [ ] New tests added
- [ ] Manual testing completed

## Screenshots (if applicable)
Include screenshots for UI changes

## Related Issues
Closes #[issue_number]
```

## Issue Guidelines

### Bug Reports

Use the bug report template:

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable, add screenshots

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., 1.2.3]

**Additional Context**
Any other relevant information
```

### Feature Requests

Use the feature request template:

```markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other relevant information
```

## Code Style

### JavaScript/TypeScript

We use ESLint and Prettier for code formatting:

```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "react-hooks/exhaustive-deps"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

### React Components

```javascript
// Use functional components with hooks
const JobCard = ({ job, onApply }) => {
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await onApply(job.id);
    } catch (error) {
      console.error('Application failed:', error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <button 
        onClick={handleApply}
        disabled={isApplying}
      >
        {isApplying ? 'Applying...' : 'Apply'}
      </button>
    </div>
  );
};
```

### Node.js/Express

```javascript
// Use async/await for asynchronous operations
const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    const query = search ? 
      { title: { $regex: search, $options: 'i' } } : 
      {};

    const jobs = await Job.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('company')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { jobs },
      pagination: {
        currentPage: page,
        totalJobs: await Job.countDocuments(query)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

## Testing

### Frontend Testing (Jest + React Testing Library)

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

describe('LoginForm', () => {
  test('renders login form', () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const mockLogin = jest.fn();
    
    render(
      <AuthProvider>
        <LoginForm onLogin={mockLogin} />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});
```

### Backend Testing (Jest + Supertest)

```javascript
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    test('should register new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        userType: 'candidate'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body).toHaveProperty('token');
    });

    test('should not register user with invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
        userType: 'candidate'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });
});
```

## Documentation

### Code Documentation

Use JSDoc for function documentation:

```javascript
/**
 * Searches for jobs based on criteria
 * @param {Object} criteria - Search criteria
 * @param {string} criteria.query - Search query
 * @param {string} criteria.location - Job location
 * @param {number} criteria.page - Page number
 * @param {number} criteria.limit - Results per page
 * @returns {Promise<Object>} Search results with jobs and pagination
 */
const searchJobs = async (criteria) => {
  // Implementation
};
```

### API Documentation

Update API documentation when adding new endpoints:

```markdown
### Create Job Application

```http
POST /api/applications
```

Creates a new job application for the authenticated user.

**Request Body:**
```json
{
  "jobId": "60d5ec49f1b2c8b1f8e4c8a2",
  "coverLetter": "I am excited to apply...",
  "resume": "https://example.com/resume.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "application": {
      "id": "60d5ec49f1b2c8b1f8e4c8a5",
      "status": "pending",
      "appliedAt": "2023-12-01T15:30:00.000Z"
    }
  }
}
```
```

## Community

### Communication Channels

- **GitHub Discussions**: General questions and discussions
- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Real-time chat with contributors
- **Email**: maintainers@jobfinder.com

### Getting Help

1. **Check Documentation**: README, API docs, user guide
2. **Search Issues**: Look for existing solutions
3. **Ask Questions**: Create discussion or issue
4. **Join Community**: Discord for real-time help

### Recognition

Contributors are recognized in:
- Contributors file
- Release notes
- Project README
- Annual contributor spotlight

### Mentorship

New contributors can request mentorship:
- Pair programming sessions
- Code review guidance
- Architecture discussions
- Career advice

## Release Process

### Versioning

We follow Semantic Versioning (SemVer):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backward-compatible functionality
- **PATCH** version for backward-compatible bug fixes

### Release Schedule

- **Major releases**: Quarterly
- **Minor releases**: Monthly
- **Patch releases**: As needed for critical bugs

### Release Notes

Each release includes:
- New features and improvements
- Bug fixes
- Breaking changes
- Migration guides
- Contributors acknowledgment

## Conclusion

Thank you for contributing to Job Finder! Your contributions help make job searching and hiring better for everyone. If you have questions or need help, don't hesitate to reach out to the community.

**Happy coding!** 🚀