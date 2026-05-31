import { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users, Hash, TrendingUp, AlertCircle, ArrowRight, Trophy, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  
  // Forms state
  const [groupName, setGroupName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('dsabuds_token')
      if (!token) return

      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (res.ok) {
        const data = await res.json()
        setUserData(data)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      setFormError('Group name is required')
      return
    }

    try {
      setFormLoading(true)
      setFormError('')
      const token = localStorage.getItem('dsabuds_token')
      
      const res = await fetch('http://localhost:5000/api/groups/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ groupName })
      })
      
      const data = await res.json()
      if (res.ok) {
        setShowCreateModal(false)
        setGroupName('')
        navigate(`/groups/${data._id}`)
      } else {
        setFormError(data.message || 'Failed to create group')
      }
    } catch (err) {
      setFormError('Server error. Try again.')
    } finally {
      setFormLoading(false)
    }
  }

  const handleJoinGroup = async () => {
    if (!inviteCode.trim() || inviteCode.length !== 7) {
      setFormError('Valid 7-character invite code is required')
      return
    }

    try {
      setFormLoading(true)
      setFormError('')
      const token = localStorage.getItem('dsabuds_token')
      
      const res = await fetch('http://localhost:5000/api/groups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ groupCode: inviteCode.toUpperCase() })
      })
      
      const data = await res.json()
      if (res.ok) {
        setShowJoinModal(false)
        setInviteCode('')
        navigate(`/groups/${data.group._id}`)
      } else {
        setFormError(data.message || 'Failed to join group')
      }
    } catch (err) {
      setFormError('Server error. Try again.')
    } finally {
      setFormLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 text-center px-4">
        <h2 className="text-2xl font-bold">Please sign in to view your dashboard</h2>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.username}! 👋</h1>
          <p className="text-[var(--text-secondary)]">
            {userData.streak > 0 
              ? `You are on a ${userData.streak} day streak! Keep it up.` 
              : `Time to start a new streak today!`}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          {!userData.leetcodeUsername && (
            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium border-orange-500/30 text-orange-500">
              Link LeetCode
            </Link>
          )}
          <button onClick={() => { setShowJoinModal(true); setFormError(''); }} className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">
            <Hash className="w-4 h-4" /> Join Group
          </button>
          <button onClick={() => { setShowCreateModal(true); setFormError(''); }} className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-brand-500/30">
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
          <div className="text-4xl font-extrabold text-brand-500">{userData.streak || 0} <span className="text-xl font-medium text-[var(--text-secondary)]">days</span></div>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-card p-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl"><Trophy className="w-6 h-6 text-blue-500" /></div>
            <h3 className="text-lg font-semibold text-[var(--text-secondary)]">Longest Streak</h3>
          </div>
          <div className="text-4xl font-extrabold">{userData.streak || 0} <span className="text-xl font-medium text-[var(--text-secondary)]">days</span></div>
        </motion.div>

        <motion.div whileHover={{ y: -3 }} className="glass-card p-6 border-red-500/20">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-500/10 rounded-xl"><AlertCircle className="w-6 h-6 text-red-500" /></div>
            <h3 className="text-lg font-semibold text-[var(--text-secondary)]">Total Debt (Fines)</h3>
          </div>
          <div className="text-4xl font-extrabold text-red-500">₹{userData.totalFine || 0}</div>
        </motion.div>
      </div>

      {/* Groups Section */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Users className="w-6 h-6 text-brand-500" /> Your Accountability Groups</h2>
      
      {userData.joinedGroups && userData.joinedGroups.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.joinedGroups.map(group => (
            <motion.div key={group._id} whileHover={{ scale: 1.02 }} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{group.groupName}</h3>
                  <span className="px-2 py-1 text-xs font-semibold bg-brand-500/10 text-brand-500 rounded-md">{group.members?.length || 1} Members</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-6">
                  <Trophy className="w-4 h-4" /> Group Fund: <span className="font-bold text-[var(--text-primary)]">₹{group.groupFund || 0}</span>
                </div>
              </div>
              <Link to={`/groups/${group._id}`} className="w-full py-3 flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors font-medium">
                View Leaderboard <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center border-dashed">
          <Users className="w-12 h-12 text-[var(--text-secondary)] opacity-50 mb-4" />
          <h3 className="text-xl font-bold mb-2">You aren't in any groups yet</h3>
          <p className="text-[var(--text-secondary)] max-w-md mb-6">Accountability works best with friends. Create a group and invite your peers, or join an existing one using an invite code!</p>
          <div className="flex gap-4">
            <button onClick={() => { setShowCreateModal(true); setFormError(''); }} className="px-6 py-3 bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-500/30">
              Create Group
            </button>
            <button onClick={() => { setShowJoinModal(true); setFormError(''); }} className="px-6 py-3 glass-card font-bold hover:bg-slate-100 dark:hover:bg-slate-800">
              Join Group
            </button>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card bg-[var(--bg-primary)] p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Create New Group</h2>
            {formError && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded-lg">{formError}</p>}
            
            <input 
              type="text" 
              placeholder="Group Name (e.g. Daily Grinders)" 
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-brand-500 mb-6" 
            />
            
            <div className="flex gap-4 justify-end">
              <button 
                onClick={() => setShowCreateModal(false)} 
                disabled={formLoading}
                className="px-4 py-2 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateGroup}
                disabled={formLoading}
                className="px-6 py-2 bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 flex items-center gap-2"
              >
                {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Create
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card bg-[var(--bg-primary)] p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Join a Group</h2>
            {formError && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded-lg">{formError}</p>}
            
            <input 
              type="text" 
              placeholder="Enter 7-character invite code" 
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 uppercase tracking-widest text-center font-mono font-bold bg-transparent border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-brand-500 mb-6" 
              maxLength={7} 
            />
            
            <div className="flex gap-4 justify-end">
              <button 
                onClick={() => setShowJoinModal(false)} 
                disabled={formLoading}
                className="px-4 py-2 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleJoinGroup}
                disabled={formLoading}
                className="px-6 py-2 bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 flex items-center gap-2"
              >
                {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Join
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
