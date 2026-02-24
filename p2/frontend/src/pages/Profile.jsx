import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Upload as UploadIcon, FileText, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCurrentUser, uploadResume } from '../api/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setUploadSuccess(false);
    setUploading(true);

    try {
      const response = await uploadResume(file);
      setUploadSuccess(true);
      // Reload user profile to get updated resume info
      await loadUserProfile();
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-gray-400">Manage your account and resume</p>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8 border border-white/10 mb-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user?.full_name || user?.username}</h2>
                  <p className="text-gray-400">@{user?.username}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-all flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="flex items-center space-x-3 glass rounded-lg p-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>{user?.email}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
                <div className="glass rounded-lg p-3">
                  <span>{new Date(user?.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Resume Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Resume</h3>
                <p className="text-gray-400">Upload your resume for AI interview preparation</p>
              </div>
              <FileText className="w-12 h-12 text-blue-400" />
            </div>

            {/* Success/Error Messages */}
            {uploadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center space-x-3 mb-6"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-sm text-green-400">Resume uploaded successfully!</p>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3 mb-6"
              >
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Current Resume Status */}
            {user?.resume_filename ? (
              <div className="glass rounded-lg p-6 mb-6 border border-green-500/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Resume Uploaded</h4>
                      <p className="text-sm text-gray-400 mb-1">{user.resume_filename}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded on {new Date(user.resume_uploaded_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-lg p-6 mb-6 border border-yellow-500/30">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                  <p className="text-sm text-yellow-400">No resume uploaded yet</p>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div className="relative">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <label htmlFor="resume-upload">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-6 py-4 bg-gradient-accent text-white rounded-xl font-semibold text-lg professional-glow hover:shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                    uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-5 h-5" />
                      <span>{user?.resume_filename ? 'Update Resume' : 'Upload Resume'}</span>
                    </>
                  )}
                </motion.div>
              </label>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
            </p>
          </motion.div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="glass rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-2">Personalized Questions</h3>
              <p className="text-sm text-gray-400">
                AI generates interview questions based on your resume
              </p>
            </div>
            <div className="glass rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-gray-400">
                Monitor your interview performance over time
              </p>
            </div>
            <div className="glass rounded-xl p-6 border border-white/10">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold mb-2">Secure Storage</h3>
              <p className="text-sm text-gray-400">
                Your resume is encrypted and kept private
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
