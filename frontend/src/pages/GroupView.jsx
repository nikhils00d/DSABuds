import { motion } from 'framer-motion'
import { Trophy, TrendingUp, AlertCircle, Copy, Share2, ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'

export default function GroupView() {
  const { id } = useParams()
  const [copied, setCopied] = useState(false)
  
  // Mock data for UI
  const group = {
    name: 'FAANG Crackers',
    code: 'A7B2X9Y',
    fund: 450,
    members: [
      { id: 1, name: 'Nikhil S.', streak: 14, fine: 0, isMe: true },
      { id: 2, name: 'Rahul V.', streak: 12, fine: 10, isMe: false },
      { id: 3, name: 'Anjali P.', streak: 5, fine: 150, isMe: false },
      { id: 4, name: 'Vikram K.', streak: 0, fine: 290, isMe: false },
    ]
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(group.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="glass-card p-8 mb-10 border-brand-500/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">{group.name}</h1>
            <div className="flex items-center gap-4 text-[var(--text-secondary)]">
              <span className="flex items-center gap-1"><Trophy className="w-4 h-4" /> Fund: <span className="text-brand-500 font-bold">₹{group.fund}</span></span>
              <span className="flex items-center gap-1">• {group.members.length} Members</span>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center gap-4 border border-[var(--border-color)]">
            <div>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-bold mb-1">Invite Code</p>
              <p className="font-mono text-xl font-bold tracking-widest">{group.code}</p>
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
        {group.members.map((member, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={member.id} 
            className={`glass-card p-5 flex items-center justify-between ${member.isMe ? 'border-brand-500/50 shadow-brand-500/10' : ''}`}
          >
            <div className="flex items-center gap-6">
              <div className="text-2xl font-black text-slate-300 dark:text-slate-700 w-8 text-center">
                #{index + 1}
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {member.name} {member.isMe && <span className="text-xs bg-brand-500 text-white px-2 py-0.5 rounded-full">YOU</span>}
                </h3>
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
                <div className={`flex items-center gap-1 justify-center font-bold ${member.fine > 0 ? 'text-red-500' : 'text-slate-400'}`}>
                  {member.fine > 0 && <AlertCircle className="w-3 h-3" />} ₹{member.fine}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
