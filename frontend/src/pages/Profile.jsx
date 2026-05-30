import React, { useState } from 'react';
import { User, Activity, AlertTriangle, Link as LinkIcon, Edit2, Code, Briefcase, Calendar, Trophy, Flame } from 'lucide-react';

const Profile = () => {
  // Mock user data for now
  const [user, setUser] = useState({
    name: 'Nikhil Sood',
    username: '@nikhils00d',
    bio: 'DSA Enthusiast | Full Stack Developer',
    leetcodeUsername: 'yuy3JV3iNB',
    github: 'nikhils00d',
    linkedin: 'nikhils00d',
    stats: {
      currentStreak: 12,
      longestStreak: 45,
      totalFinesPaid: 440,
      problemsSolved: 342,
    },
    recentActivity: [
      { id: 1, type: 'solve', text: 'Solved 2 problems on LeetCode', date: 'Today, 10:30 AM', points: '+10' },
      { id: 2, type: 'fine', text: 'Missed daily streak - Fine applied', date: 'Yesterday', amount: '₹110' },
      { id: 3, type: 'solve', text: 'Solved "Two Sum"', date: 'May 29', points: '+5' },
    ]
  });

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
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600">NS</span>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-brand-500 text-white rounded-full hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
            <p className="text-[var(--text-secondary)] font-medium mb-4">{user.username}</p>
            <p className="text-sm max-w-md mx-auto md:mx-0 mb-6">{user.bio}</p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a href={`https://leetcode.com/${user.leetcodeUsername}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 transition-colors">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">{user.leetcodeUsername}</span>
              </a>
              <a href={`https://github.com/${user.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-500/10 text-slate-600 dark:text-slate-300 hover:bg-slate-500/20 transition-colors">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 transition-colors">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">LinkedIn</span>
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
              <p className="text-2xl font-bold">{user.stats.currentStreak}</p>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider mt-1">Current Streak</p>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center mb-3 text-brand-500">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold">{user.stats.longestStreak}</p>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider mt-1">Best Streak</p>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3 text-red-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-red-500">₹{user.stats.totalFinesPaid}</p>
              <p className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wider mt-1">Fines Paid</p>
            </div>
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3 text-indigo-500">
                <Activity className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold">{user.stats.problemsSolved}</p>
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
              {user.recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${activity.type === 'solve' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
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
              ))}
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
                    <p className="text-xs text-[var(--text-secondary)]">Connected</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-brand-500">Manage</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center">
                    <Code className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-xs text-[var(--text-secondary)]">Connected</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-brand-500">Manage</button>
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
    </div>
  );
};

export default Profile;
