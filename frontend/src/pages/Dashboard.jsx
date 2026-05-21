import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users, Hash, TrendingUp, AlertCircle, ArrowRight, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  // Mock Data for UI
  const userStats = { streak: 14, longestStreak: 45, totalFine: 120 }
  const groups = [
    { id: '1', name: 'FAANG Crackers', members: 5, fund: 450 },
    { id: '2', name: 'Daily CP Grinders', members: 12, fund: 1200 }
  ]

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Nikhil! 👋</h1>
          <p className="text-[var(--text-secondary)]">Keep your streak alive. You're doing great!</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium border-orange-500/30 text-orange-500">
            Link LeetCode
          </button>
          <button onClick={() => setShowJoinModal(true)} className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">
            <Hash className="w-4 h-4" /> Join Group
          </button>
          <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-brand-500/30">
            <Plus className="w-4 h-4" /> Create Group
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div whileHover={{ y: -3 }} className="glass-card p-6 border-brand-500/20">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-brand-500/10 rounded-xl"><TrendingUp className="w-6 h-6 text-brand-500" /></div>
            <h3 className="text-lg font-semibold text-[var(--text-secondary)]">Current Streak</h3>
          </div>
          <div className="text-4xl font-extrabold text-brand-500">{userStats.streak} <span className="text-xl font-medium text-[var(--text-secondary)]">days</span></div>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-card p-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl"><Trophy className="w-6 h-6 text-blue-500" /></div>
            <h3 className="text-lg font-semibold text-[var(--text-secondary)]">Longest Streak</h3>
          </div>
          <div className="text-4xl font-extrabold">{userStats.longestStreak} <span className="text-xl font-medium text-[var(--text-secondary)]">days</span></div>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-card p-6 border-red-500/20">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-500/10 rounded-xl"><AlertCircle className="w-6 h-6 text-red-500" /></div>
            <h3 className="text-lg font-semibold text-[var(--text-secondary)]">Total Debt (Fines)</h3>
          </div>
          <div className="text-4xl font-extrabold text-red-500">₹{userStats.totalFine}</div>
        </motion.div>
      </div>

      {/* Groups Section */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Users className="w-6 h-6 text-brand-500" /> Your Accountability Groups</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <motion.div key={group.id} whileHover={{ scale: 1.02 }} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{group.name}</h3>
                <span className="px-2 py-1 text-xs font-semibold bg-brand-500/10 text-brand-500 rounded-md">{group.members} Members</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-6">
                <Trophy className="w-4 h-4" /> Group Fund: <span className="font-bold text-[var(--text-primary)]">₹{group.fund}</span>
              </div>
            </div>
            <Link to={`/groups/${group.id}`} className="w-full py-3 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors font-medium">
              View Leaderboard <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Modals placeholders */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card bg-[var(--bg-primary)] p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Create New Group</h2>
            <input type="text" placeholder="Group Name (e.g. Daily Grinders)" className="w-full px-4 py-3 bg-transparent border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-brand-500 mb-6" />
            <div className="flex gap-4 justify-end">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 font-medium">Cancel</button>
              <button className="px-6 py-2 bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30">Create</button>
            </div>
          </motion.div>
        </div>
      )}

      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card bg-[var(--bg-primary)] p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Join a Group</h2>
            <input type="text" placeholder="Enter 7-character invite code" className="w-full px-4 py-3 uppercase tracking-widest text-center bg-transparent border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-brand-500 mb-6" maxLength={7} />
            <div className="flex gap-4 justify-end">
              <button onClick={() => setShowJoinModal(false)} className="px-4 py-2 font-medium">Cancel</button>
              <button className="px-6 py-2 bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30">Join</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
// Note: In a real app we'd import Trophy, but I didn't add it in lucide-react destructuring above initially. Wait, I should add Trophy.
