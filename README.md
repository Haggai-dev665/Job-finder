# Job Finder - Your Gateway to Career Success

![Job Finder Landing Page](https://github.com/user-attachments/assets/22d576e8-746c-438b-a6ac-df3433a8e9fc)

A comprehensive full-stack job search platform that connects job seekers with employers, featuring real-time job listings, company reviews, messaging, and career resources.

## 🚀 Features

### For Job Seekers
- **Smart Job Search**: Advanced filtering and search capabilities with real-time job listings
- **Profile Management**: Create comprehensive profiles with skills, experience, and preferences
- **Job Applications**: Easy one-click applications with tracking and status updates
- **Company Reviews**: Read and write company reviews to make informed decisions
- **Job Alerts**: Get notified about relevant job opportunities
- **Career Resources**: Access learning materials and career development content
- **Real-time Messaging**: Direct communication with recruiters and employers

### For Employers & Recruiters
- **Job Posting**: Create and manage job listings with detailed requirements
- **Candidate Search**: Find qualified candidates using advanced filters
- **Company Profiles**: Build attractive company pages to attract talent
- **Application Management**: Track and manage incoming applications
- **Analytics Dashboard**: Monitor recruitment metrics and performance
- **Messaging System**: Communicate directly with candidates

### Platform Features
- **Multi-user Authentication**: Separate interfaces for candidates, employers, and admins
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Live notifications and updates
- **Search & Filtering**: Advanced search capabilities across all data
- **Analytics & Reporting**: Comprehensive insights and metrics

## 📊 Platform Statistics

- **8M+** Job listings from verified companies
- **150K+** Active recruiters and employers
- **10M+** Successful job applications processed

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks and context
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **React Icons** - Comprehensive icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for scalable data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing and security

### External APIs
- **JSearch API** - Real-time job listings from major job boards
- **Email Services** - Automated notifications and communications

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Git** - Version control

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v5.0 or higher)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Haggai-dev665/Job-finder.git
cd Job-finder
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

Create environment files for both frontend and backend:

#### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/jobfinder

# JWT Secret
JWT_SECRET=your_super_secure_jwt_secret_key_here

# JSearch API
JSEARCH_API_KEY=your_jsearch_api_key
JSEARCH_API_HOST=jsearch.p.rapidapi.com

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```env
# API Base URL
VITE_API_URL=http://localhost:5000/api

# Environment
VITE_NODE_ENV=development
```

### 4. Database Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB service (varies by OS)
# Ubuntu/Debian
sudo systemctl start mongod

# macOS with Homebrew
brew services start mongodb-community

# Windows
net start MongoDB
```

### 5. Start the Application

Run both frontend and backend servers:

```bash
# Terminal 1 - Start backend server
cd backend
npm run dev

# Terminal 2 - Start frontend development server
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🔧 API Configuration

### Getting JSearch API Key

1. Visit [RapidAPI JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
2. Subscribe to the API plan that fits your needs
3. Copy your API key from the dashboard
4. Add it to your backend `.env` file

### Database Schema

The application uses MongoDB with the following main collections:

- **users** - User accounts (candidates, employers, admins)
- **jobs** - Job listings and details
- **applications** - Job applications and status
- **companies** - Company profiles and information
- **reviews** - Company reviews and ratings
- **messages** - Real-time messaging between users

## 📱 Application Structure

```
Job-finder/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # CSS and styling
│   ├── package.json
│   └── vite.config.js
├── backend/                 # Node.js backend API
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   └── server.js          # Main server file
├── docs/                   # Documentation files
├── .gitignore
└── README.md
```

## 🎯 Usage Examples

### Job Search

```javascript
// Search for jobs with filters
const searchJobs = async () => {
  const response = await fetch('/api/jobs/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query: 'software engineer',
      location: 'New York',
      jobType: 'full-time',
      experience: 'mid-level'
    })
  });
  const jobs = await response.json();
  return jobs;
};
```

### User Authentication

```javascript
// Register a new user
const registerUser = async (userData) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      userType: userData.userType // 'candidate' or 'employer'
    })
  });
  return await response.json();
};
```

## 🧪 Testing

Run the test suites:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production mode
cd backend
npm start
```

### Environment Variables for Production

Ensure all environment variables are properly set for production:

- Use strong JWT secrets
- Configure production database URLs
- Set up email services
- Configure CORS for your domain
- Enable HTTPS

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add new feature'`
6. Push to branch: `git push origin feature/new-feature`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod
```

**API Key Issues**
- Verify your JSearch API key is correct
- Check your API subscription status
- Ensure the API key is properly set in environment variables

**Port Already in Use**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <process_id>
```

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Email: support@jobfinder.com
- Documentation: [docs.jobfinder.com](https://docs.jobfinder.com)

## 🔗 Links

- [Live Demo](https://jobfinder-demo.com)
- [API Documentation](https://api.jobfinder.com/docs)
- [User Guide](docs/USER_GUIDE.md)
- [Architecture Diagram](docs/ARCHITECTURE.md)

---

**Built with ❤️ by the Job Finder Team**