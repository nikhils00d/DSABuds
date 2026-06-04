import React, { useState, useEffect, useContext } from 'react';
import { User, Activity, AlertTriangle, Link as LinkIcon, Edit2, Code, Briefcase, Calendar, Trophy, Flame, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user: authUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  
  // Edit Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    leetcodeUsername: '',
    githubUsername: '',
    linkedinUsername: ''
  });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('dsabuds_token');
      if (!token) {
        setLoading(false);
        return;
      }

      // 1. Fetch user profile from DB
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        
        // Populate edit form with existing data
        setEditFormData({
          leetcodeUsername: data.leetcodeUsername || '',
          githubUsername: data.githubUsername || '',
          linkedinUsername: data.linkedinUsername || ''
        });

        // 2. Fetch LeetCode sync data
        if (data.leetcodeUsername) {
          const lcRes = await fetch('/api/leetcode/sync', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const lcData = await lcRes.json();
          
          if (lcRes.ok) {
            if (lcData.recentSubmissions) {
              const activities = lcData.recentSubmissions.map((sub, index) => ({
                id: sub.id || index,
                type: 'solve',
                text: `Solved "${sub.title}"`,
                date: new Date(sub.timestamp * 1000).toLocaleString(),
                points: '+1'
              }));
              setRecentActivity(activities.slice(0, 5));
            }
            if (lcData.streak !== undefined) {
              setUserData(prev => ({ ...prev, streak: lcData.streak }));
            }
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setSaving(true);
      setEditError('');
      const token = localStorage.getItem('dsabuds_token');
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });

      if (res.ok) {
        // Refresh profile data to get updated links and trigger Leetcode sync if changed
        await fetchProfileData();
        setIsEditingProfile(false);
      } else {
        const data = await res.json();
        setEditError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      setEditError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 bg-[var(--bg-primary)] text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Please sign in to view your profile</h2>
        <p className="text-[var(--text-secondary)]">Create an account to start tracking your LeetCode streaks!</p>
      </div>
    );
  }

  const displayUser = {
    name: userData.username,
    username: `@${userData.username}`,
    bio: 'DSA Enthusiast | Full Stack Developer',
    leetcodeUsername: userData.leetcodeUsername || 'Not linked',
    github: userData.githubUsername || 'Not linked',
    linkedin: userData.linkedinUsername || 'Not linked',
    stats: {
      currentStreak: userData.streak || 0,
      longestStreak: userData.streak || 0,
      totalFinesPaid: userData.totalFine || 0,
      problemsSolved: recentActivity.length > 0 ? recentActivity.length + '+' : 0,
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      
      {/* Header Section */}
      <div className="glass-card p-8 mb-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-400 to-indigo-500 p-1">
              <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600">
                  {displayUser.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsEditingProfile(true)}
              className="absolute bottom-0 right-0 p-2 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-1">{displayUser.name}</h1>
            <p className="text-[var(--text-secondary)] font-medium mb-4">{displayUser.username}</p>
            <p className="text-sm max-w-md mx-auto md:mx-0 mb-6">{displayUser.bio}</p>
            
            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a href={displayUser.leetcodeUsername !== 'Not linked' ? `https://leetcode.com/${displayUser.leetcodeUsername}` : '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 transition-colors">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">{displayUser.leetcodeUsername}</span>
              </a>
              <a href={displayUser.github !== 'Not linked' ? `https://github.com/${displayUser.github}` : '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-300 hover:bg-slate-500/20 transition-colors">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">{displayUser.github === 'Not linked' ? 'GitHub' : displayUser.github}</span>
              </a>
              <a href={displayUser.linkedin !== 'Not linked' ? `https://linkedin.com/in/${displayUser.linkedin}` : '#'} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">{displayUser.linkedin === 'Not linked' ? 'LinkedIn' : displayUser.linkedin}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-3 text-orange-500">
                <Flame className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold">{displayUser.stats.currentStreak}</p>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider mt-1">Current Streak</p>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center mb-3 text-brand-500">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold">{displayUser.stats.longestStreak}</p>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider mt-1">Best Streak</p>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3 text-red-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-red-500">₹{displayUser.stats.totalFinesPaid}</p>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider mt-1">Fines Paid</p>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3 text-indigo-500">
                <Activity className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold">{displayUser.stats.problemsSolved}</p>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider mt-1">Total Solved</p>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-500" />
                Recent Activity
              </h2>
              <button className="text-sm text-brand-500 hover:text-brand-600 font-medium">View All</button>
            </div>
            
            <div className="space-y-6">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 relative">
                    <div className="relative flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        activity.type === 'solve' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {activity.type === 'solve' ? <Activity className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                      </div>
                      {/* Line connecting timeline items */}
                      <div className="w-0.5 h-full bg-[var(--border-color)] absolute top-10 -bottom-6"></div>
                    </div>
                    <div className="pb-6">
                      <p className="font-medium text-[var(--text-primary)]">{activity.text}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-[var(--text-secondary)]">{activity.date}</span>
                        {activity.points && <span className="text-xs font-bold text-green-500">{activity.points}</span>}
                        {activity.amount && <span className="text-xs font-bold text-red-500">-{activity.amount}</span>}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[var(--text-secondary)]">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>No recent activity found.</p>
                  {displayUser.leetcodeUsername === 'Not linked' && (
                    <p className="text-sm mt-2 text-brand-500">Link your LeetCode account to see your solves!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Settings/Widgets */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-brand-500" />
              Connected Accounts
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">LeetCode</p>
                    <p className="text-xs text-[var(--text-secondary)]">{displayUser.leetcodeUsername !== 'Not linked' ? displayUser.leetcodeUsername : 'Not connected'}</p>
                  </div>
                </div>
                <button onClick={() => setIsEditingProfile(true)} className="text-xs font-medium text-brand-500">Manage</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center">
                    <Code className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-[var(--text-secondary)]">{displayUser.github !== 'Not linked' ? displayUser.github : 'Not connected'}</p>
                  </div>
                </div>
                <button onClick={() => setIsEditingProfile(true)} className="text-xs font-medium text-brand-500">Manage</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-xs text-[var(--text-secondary)]">{displayUser.linkedin !== 'Not linked' ? displayUser.linkedin : 'Not connected'}</p>
                  </div>
                </div>
                <button onClick={() => setIsEditingProfile(true)} className="text-xs font-medium text-brand-500">Manage</button>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-brand-500/5 to-indigo-500/5">
            <h3 className="font-bold mb-2">Upgrade to Pro</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Get detailed analytics, custom themes, and exclusive profile badges.</p>
            <button className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/25">
              View Plans
            </button>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card bg-[var(--bg-primary)] p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><LinkIcon className="w-6 h-6 text-brand-500" /> Manage Connections</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">LeetCode Username</label>
                <div className="mb-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-600 dark:text-blue-400">
                  <p className="font-medium mb-1">Verification Required</p>
                  <p>To link your LeetCode account, you must add <strong className="font-mono bg-blue-500/20 px-1 py-0.5 rounded text-blue-700 dark:text-blue-300">DSABUDS-{authUser?.id?.substring(0, 8).toUpperCase()}</strong> to your LeetCode profile's <strong>"About Me"</strong> section.</p>
                </div>
                <input 
                  type="text" 
                  value={editFormData.leetcodeUsername}
                  onChange={(e) => setEditFormData({...editFormData, leetcodeUsername: e.target.value})}
                  placeholder="e.g. nikhils00d" 
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-brand-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">GitHub Username</label>
                <input 
                  type="text" 
                  value={editFormData.githubUsername}
                  onChange={(e) => setEditFormData({...editFormData, githubUsername: e.target.value})}
                  placeholder="e.g. nikhils00d" 
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-brand-500" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">LinkedIn Username</label>
                <input 
                  type="text" 
                  value={editFormData.linkedinUsername}
                  onChange={(e) => setEditFormData({...editFormData, linkedinUsername: e.target.value})}
                  placeholder="e.g. nikhil-sood" 
                  className="w-full px-4 py-3 bg-transparent border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-brand-500" 
                />
              </div>
            </div>
            
            {editError && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {editError}
              </div>
            )}
            
            <div className="flex gap-4 justify-end">
              <button 
                onClick={() => setIsEditingProfile(false)} 
                disabled={saving}
                className="px-4 py-2 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdateProfile}
                disabled={saving}
                className="px-6 py-2 bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default Profile;
