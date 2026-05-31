import { motion } from 'framer-motion'
import { Trophy, TrendingUp, AlertCircle, Copy, ArrowLeft, Loader2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function GroupView() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const token = localStorage.getItem('dsabuds_token')
        if (!token) {
          setError('Please sign in to view this group')
          setLoading(false)
          return
        }

        const res = await fetch(`http://localhost:5000/api/groups/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        
        const data = await res.json()
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch group')
        }
        
        setGroup(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGroupData()
  }, [id])

  const handleCopyCode = () => {
    if (group && group.groupCode) {
      navigator.clipboard.writeText(group.groupCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-3xl font-bold mb-4">Oops!</h2>
        <p className="text-[var(--text-secondary)] mb-6">{error || 'Group not found'}</p>
        <Link to="/dashboard" className="px-6 py-3 bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-500/30">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="glass-card p-8 mb-10 border-brand-500/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">{group.groupName}</h1>
            <div className="flex items-center gap-4 text-[var(--text-secondary)]">
              <span className="flex items-center gap-1"><Trophy className="w-4 h-4" /> Fund: <span className="text-brand-500 font-bold">₹{group.groupFund || 0}</span></span>
              <span className="flex items-center gap-1">• {group.leaderboard?.length || 0} Members</span>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-4 border border-[var(--border-color)]">
            <div>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-bold mb-1">Invite Code</p>
              <p className="font-mono text-xl font-bold tracking-widest">{group.groupCode}</p>
            </div>
            <button 
              onClick={handleCopyCode}
              className={`p-3 rounded-lg transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
            >
              {copied ? <span className="text-xs font-bold px-1">COPIED</span> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500" /> Leaderboard</h2>
      
      <div className="space-y-4">
        {group.leaderboard?.map((member, index) => {
          const isMe = user && member._id === user.id;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={member._id} 
              className={`glass-card p-5 flex items-center justify-between ${isMe ? 'border-brand-500/50 shadow-brand-500/10' : ''}`}
            >
              <div className="flex items-center gap-6">
                <div className="text-2xl font-black text-slate-300 dark:text-slate-700 w-8 text-center">
                  #{index + 1}
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg">
                  {member.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    {member.username} {isMe && <span className="text-xs bg-brand-500 text-white px-2 py-0.5 rounded-full">YOU</span>}
                  </h3>
                  {member.leetcodeUsername && <p className="text-xs text-[var(--text-secondary)]">LC: {member.leetcodeUsername}</p>}
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-xs text-[var(--text-secondary)] uppercase font-bold mb-1">Streak</p>
                  <div className="flex items-center gap-1 justify-center text-brand-500 font-bold">
                    <TrendingUp className="w-4 h-4" /> {member.streak}
                  </div>
                </div>
                <div className="text-center w-20">
                  <p className="text-xs text-[var(--text-secondary)] uppercase font-bold mb-1">Fine</p>
                  <div className={`flex items-center gap-1 justify-center font-bold ${member.totalFine > 0 ? 'text-red-500' : 'text-slate-400'}`}>
                    {member.totalFine > 0 && <AlertCircle className="w-3 h-3" />} ₹{member.totalFine}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
