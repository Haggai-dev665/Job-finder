import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { JobProvider } from './contexts/JobContext';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SavedJobs from './pages/SavedJobs';
import Applications from './pages/Applications';
import Companies from './pages/Companies';
import PostJob from './pages/PostJob';
import Settings from './pages/Settings';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <JobProvider>
          <Router>
            <Main />
          </Router>
        </JobProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function Main() {
  const { olive } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col ${olive ? 'bg-olive-beige text-black' : 'bg-raisin-black text-white'}`}>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
