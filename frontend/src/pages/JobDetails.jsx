import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Building, Calendar, DollarSign, Clock, Users, 
  Star, Share2, Flag, ArrowLeft, CheckCircle, Briefcase
} from 'lucide-react';
import { JobContext } from '../contexts/JobContext';
import { AuthContext } from '../contexts/AuthContext';
import ApplicationForm from '../components/ApplicationForm';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    jobs, 
    applyToJob, 
    saveJob, 
    unsaveJob, 
    savedJobs, 
    applications,
    getRecommendedJobs 
  } = useContext(JobContext);  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const job = jobs.find(j => j._id === id || j.id === id);
  const isSaved = savedJobs.some(savedJob => savedJob._id === id || savedJob.id === id);
  const hasApplied = applications.some(app => app.jobId === id || app.job?._id === id || app.job?.id === id);
  const recommendedJobs = getRecommendedJobs ? getRecommendedJobs().filter(j => (j._id || j.id) !== id).slice(0, 3) : [];

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
          <Link
            to="/jobs"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveToggle = async () => {
    const jobId = job._id || job.id;
    if (isSaved) {
      const result = await unsaveJob(jobId);
      if (!result.success) {
        console.error('Failed to unsave job:', result.message);
      }
    } else {
      const result = await saveJob(jobId);
      if (!result.success) {
        console.error('Failed to save job:', result.message);
      }
    }
  };

  const handleApply = () => {
    if (!user) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = async (applicationData) => {
    const jobId = job._id || job.id;
    const result = await applyToJob(jobId, applicationData);
    
    setShowApplicationForm(false);
    if (result.success) {
      setShowModal(true);
    } else {
      console.error('Application failed:', result.message);
      // You might want to show an error message to the user here
    }
  };

  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Jobs
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              {/* Job Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <img
                    src={job.company.logo}
                    alt={job.company.name}
                    className="w-20 h-20 rounded-lg mr-6"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center">
                        <Building className="h-5 w-5 mr-2" />
                        {job.company.name}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        {job.location.city}, {job.location.country}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        {timeAgo(job.postedDate)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveToggle}
                    className={`p-3 rounded-full transition-colors ${
                      isSaved 
                        ? 'bg-accent-100 text-accent-600' 
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    <Star className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                    <Flag className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Job Info Cards */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-primary-600 mb-2">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span className="font-medium">Salary</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {job.salary?.min && job.salary?.max 
                      ? `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`
                      : job.salary?.min 
                        ? `$${job.salary.min.toLocaleString()}+`
                        : 'Competitive salary'
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-primary-600 mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-medium">Type</span>
                  </div>
                  <p className="text-lg font-semibold">{job.type}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-primary-600 mb-2">
                    <Briefcase className="h-5 w-5 mr-2" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <p className="text-lg font-semibold">{job.experience}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center text-primary-600 mb-2">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="font-medium">Remote</span>
                  </div>
                  <p className="text-lg font-semibold">
                    {job.remote ? 'Yes' : 'On-site'}
                  </p>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Job Description
                </h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4">{job.description}</p>
                  <p className="mb-4">
                    We are looking for a talented {job.title} to join our growing team. 
                    In this role, you will be responsible for developing and maintaining 
                    high-quality software solutions that meet our business requirements.
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Key Responsibilities
                </h2>
                <ul className="space-y-2 text-gray-600">
                  {job.responsibilities?.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {responsibility}
                    </li>
                  )) || [
                    'Develop and maintain software applications',
                    'Collaborate with cross-functional teams',
                    'Write clean, maintainable code',
                    'Participate in code reviews',
                    'Stay updated with latest technologies'
                  ].map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2 text-gray-600">
                  {job.requirements?.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {requirement}
                    </li>
                  )) || [
                    `${job.experience} experience in software development`,
                    'Strong problem-solving skills',
                    'Excellent communication skills',
                    'Ability to work in a team environment',
                    'Bachelor\'s degree in Computer Science or related field'
                  ].map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-800 px-3 py-2 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About {job.company.name}
              </h2>
              <div className="flex items-start mb-6">
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.company.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {job.company.description || 
                     `${job.company.name} is a leading technology company focused on innovation and excellence. We are committed to creating amazing products and fostering a collaborative work environment.`}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {job.company.industry || 'Technology'}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {job.company.size || '100-500 employees'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-8">
              {hasApplied ? (
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Application Submitted
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your application has been successfully submitted.
                  </p>
                  <Link
                    to="/applications"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors block"
                  >
                    View Applications
                  </Link>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleApply}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-4"
                  >
                    {user ? 'Apply Now' : 'Login to Apply'}
                  </button>
                  <button
                    onClick={handleSaveToggle}
                    className={`w-full border-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      isSaved
                        ? 'border-accent-600 text-accent-600 bg-accent-50'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {isSaved ? 'Saved' : 'Save Job'}
                  </button>
                </>
              )}
            </div>

            {/* Recommended Jobs */}
            {recommendedJobs.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Similar Jobs
                </h3>
                <div className="space-y-4">
                  {recommendedJobs.map(recJob => (
                    <Link
                      key={recJob.id}
                      to={`/jobs/${recJob.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex items-center mb-2">
                        <img
                          src={recJob.company.logo}
                          alt={recJob.company.name}
                          className="w-8 h-8 rounded mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">
                            {recJob.title}
                          </h4>
                          <p className="text-gray-600 text-xs">
                            {recJob.company.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{recJob.location.city}</span>
                        <span>
                          {recJob.salary?.min 
                            ? `$${recJob.salary.min.toLocaleString()}+`
                            : 'Competitive salary'
                          }
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-600 mb-6">
                Your application for {job.title} at {job.company.name} has been successfully submitted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
                <Link
                  to="/applications"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
                >
                  View Applications
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      <ApplicationForm
        job={job}
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default JobDetails;
