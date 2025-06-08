# Real Job API Integration Setup

This application now integrates with real job data from external APIs instead of using mock data.

## API Setup

### 1. Get a Free JSearch API Key

1. Go to [RapidAPI JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
2. Sign up for a free account
3. Subscribe to the JSearch API (free tier available)
4. Copy your API key

### 2. Configure Environment Variables

1. Open `frontend/.env`
2. Replace `placeholder-key` with your actual RapidAPI key:
   ```
   VITE_RAPIDAPI_KEY=your-actual-rapidapi-key-here
   ```

## Features Integrated with Real Data

### ✅ Completed Integrations

1. **Job Statistics**: Real-time job market data on the homepage
2. **Featured Jobs**: Dynamic featured job listings from the API
3. **Job Categories**: Real job counts and salary data by category
4. **Job Search**: Live job search functionality

### 🔄 Fallback System

The application includes a robust fallback system:
- If the external API fails or quota is exceeded, it falls back to local backend
- If local backend is unavailable, it shows curated fallback data
- Ensures the application always works, even without API keys

### 📊 Real Data Sources

- **Job Listings**: JSearch API (powered by Indeed, LinkedIn, etc.)
- **Statistics**: Calculated from real job market data
- **Categories**: Dynamic counts based on actual job postings
- **Salaries**: Real salary ranges from job listings

## Usage

The application will automatically:
1. Try to fetch real job data from the external API
2. Fall back to local data if API fails
3. Show mock data as final fallback

No code changes needed - just add your API key and the real data integration is active!

## API Limits

Free tier limits:
- 150 requests per month
- Suitable for development and testing
- For production, consider upgrading to a paid plan

## Alternative APIs

If you prefer a different job API, you can modify `src/services/jobApiService.js` to use:
- Adzuna API
- USAJobs API
- CareerBuilder API
- Or any other job search API
