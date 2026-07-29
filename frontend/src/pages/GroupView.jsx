import { motion, useInView } from 'framer-motion'
import {
  Trophy, TrendingUp, AlertCircle, Copy, ArrowLeft, Loader2,
  Edit2, Check, X, Users, Flame, Shield, Star, Zap,
  Clock, CheckCircle2, Crown, Activity, Hash, BarChart3,
  Share2, Link as LinkIcon, Calendar, Target, GitBranch,
  ChevronRight, Sparkles,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'

/* ── animation presets ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

/* ── animated counter ──────────────────────────────── */
function Counter({ to, prefix = '', suffix = '', duration = 1.2 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const numTo = typeof to === 'number' ? to : parseInt(to) || 0

  useEffect(() => {
    if (!inView || numTo === 0) { setVal(numTo); return }
    let start = 0
    const step = numTo / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= numTo) { setVal(numTo); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, numTo, duration])

  return <span ref={ref}>{prefix}{val}{suffix}</span>
}

/* ── section card ───────────────────────────────────── */
function Card({ children, className = '', style = {}, hover = false }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(145deg,#111827 0%,#0d1424 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.35)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ── card section header ────────────────────────────── */
function CardHeader({ icon: Icon, iconColor = '#22c55e', title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}25` }}
        >
          <Icon size={15} color={iconColor} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-bold text-white leading-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

/* ── quick stat card ────────────────────────────────── */
function StatCard({ icon: Icon, iconColor, iconBg, label, value, prefix = '', suffix = '', trend, accentBorder, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      whileHover={{ y: -5, scale: 1.01 }}
      className="relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden cursor-default group"
      style={{
        background: 'linear-gradient(145deg,#111827 0%,#0d1424 100%)',
        border: accentBorder ? `1px solid ${accentBorder}` : '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.25s, border 0.25s',
      }}
    >
      {/* top shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg,transparent,${iconColor}50,transparent)` }}
      />
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
          <Icon size={18} color={iconColor} strokeWidth={2} />
        </div>
        {trend && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400">
            {trend}
          </span>
        )}
      </div>
      <div>
        <div className="text-3xl font-extrabold text-white tracking-tight">
          <Counter to={typeof value === 'number' ? value : 0} prefix={prefix} suffix={suffix} />
        </div>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
      </div>
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 20% 0%,${iconColor}06,transparent)` }}
      />
    </motion.div>
  )
}

/* ── rank medal colors ──────────────────────────────── */
const RANK_CONFIG = [
  { medal: '🥇', bg: 'linear-gradient(135deg,#f59e0b,#d97706)', glow: '#f59e0b', label: 'Gold' },
  { medal: '🥈', bg: 'linear-gradient(135deg,#94a3b8,#64748b)', glow: '#94a3b8', label: 'Silver' },
  { medal: '🥉', bg: 'linear-gradient(135deg,#cd7c2f,#a16207)', glow: '#cd7c2f', label: 'Bronze' },
]

/* ── leaderboard member row ─────────────────────────── */
function LeaderRow({ member, index, isMe, delay }) {
  const rank = RANK_CONFIG[index] || null
  const initials = member.username.charAt(0).toUpperCase()

  return (
    <motion.div
      variants={fadeUp} custom={delay}
      whileHover={{ x: 4, scale: 1.005 }}
      className="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group"
      style={{
        background: isMe ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.025)',
        border: isMe
          ? '1px solid rgba(34,197,94,0.22)'
          : '1px solid rgba(255,255,255,0.05)',
        boxShadow: isMe ? '0 0 20px rgba(34,197,94,0.08)' : 'none',
      }}
      aria-label={`Rank ${index + 1}: ${member.username}`}
    >
      {/* Rank */}
      <div className="w-8 text-center shrink-0">
        {rank ? (
          <span className="text-xl">{rank.medal}</span>
        ) : (
          <span className="text-sm font-bold text-slate-500">#{index + 1}</span>
        )}
      </div>

      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg"
        style={{
          background: isMe
            ? 'linear-gradient(135deg,#22c55e,#16a34a)'
            : rank
            ? rank.bg
            : 'linear-gradient(135deg,#334155,#1e293b)',
        }}
      >
        {initials}
      </div>

      {/* Name + LC */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-bold ${isMe ? 'text-brand-400' : 'text-white'} truncate`}>
            {member.username}
          </span>
          {isMe && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-brand-500 text-white shrink-0">
              YOU
            </span>
          )}
        </div>
        {member.leetcodeUsername && (
          <p className="text-[10px] text-slate-600 mt-0.5 truncate">LC: {member.leetcodeUsername}</p>
        )}
      </div>

      {/* Streak */}
      <div className="text-center hidden sm:block shrink-0">
        <p className="text-[10px] text-slate-600 uppercase font-semibold mb-0.5">Streak</p>
        <div className="flex items-center gap-1 text-orange-400 font-bold text-sm justify-center">
          <Flame size={12} /> {member.streak || 0}
        </div>
      </div>

      {/* XP */}
      <div className="text-center hidden md:block shrink-0 w-16">
        <p className="text-[10px] text-slate-600 uppercase font-semibold mb-0.5">XP</p>
        <span className="text-sm font-bold text-blue-400">{(member.streak || 0) * 20}</span>
      </div>

      {/* Fine */}
      <div className="text-center shrink-0 w-16">
        <p className="text-[10px] text-slate-600 uppercase font-semibold mb-0.5">Fine</p>
        <div
          className={`flex items-center justify-center gap-1 text-sm font-bold ${
            (member.totalFine || 0) > 0 ? 'text-red-400' : 'text-brand-400'
          }`}
        >
          {(member.totalFine || 0) > 0 && <AlertCircle size={10} />}
          ₹{member.totalFine || 0}
        </div>
      </div>
    </motion.div>
  )
}

/* ── weekly challenge card ──────────────────────────── */
function WeeklyChallenge() {
  const progress = 5
  const goal = 7
  const pct = Math.round((progress / goal) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}
        >
          <Target size={22} color="#3b82f6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Graph Mastery</h3>
          <p className="text-xs text-slate-500">Solve 7 graph problems this week</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Progress</span>
          <span className="font-bold text-white">{progress}/{goal}</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-brand-500"
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-600">
          <span>{pct}% complete</span>
          <span className="flex items-center gap-1"><Clock size={9} /> 2 days left</span>
        </div>
      </div>

      {/* Reward */}
      <div
        className="flex items-center justify-between px-3 py-2.5 rounded-xl"
        style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.18)' }}
      >
        <div className="flex items-center gap-2">
          <Star size={14} color="#f59e0b" />
          <span className="text-xs font-semibold text-amber-400">Reward</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-amber-400">+150 XP</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            🏅 Graph Explorer
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── mock activity feed ─────────────────────────────── */
const MOCK_ACTIVITY = [
  { icon: CheckCircle2, color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  text: 'Rahul solved Course Schedule', time: '12 min ago' },
  { icon: Trophy,       color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', text: 'Sumit reached a 20-day streak 🏆', time: '1 hr ago' },
  { icon: AlertCircle,  color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  text: 'Aman received a ₹20 fine', time: '2 hr ago' },
  { icon: Zap,          color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', text: 'Group completed weekly graph goal ⚡', time: '3 hr ago' },
  { icon: CheckCircle2, color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  text: 'Priya solved Number of Islands', time: '5 hr ago' },
]

/* ── group achievements ─────────────────────────────── */
const GROUP_ACHIEVEMENTS = [
  { emoji: '🔥', label: '7-Day Group Streak',   gradient: 'from-orange-500 to-red-500',   unlocked: true  },
  { emoji: '🏆', label: 'Top 10 Group',          gradient: 'from-amber-400 to-orange-500', unlocked: false },
  { emoji: '📈', label: '30-Day Group Streak',   gradient: 'from-brand-400 to-emerald-600',unlocked: false },
  { emoji: '⚡', label: '1000 XP Collected',     gradient: 'from-blue-400 to-indigo-500',  unlocked: true  },
  { emoji: '💯', label: '100 Problems Together', gradient: 'from-pink-400 to-purple-500',  unlocked: false },
  { emoji: '🌟', label: 'Perfect Week',          gradient: 'from-yellow-400 to-amber-500', unlocked: false },
]

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════ */
export default function GroupView() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)

  /* ── original state — untouched ── */
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [newName, setNewName] = useState('')

  /* ── original fetch — untouched ── */
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const token = localStorage.getItem('dsabuds_token')
        if (!token) {
          setError('Please sign in to view this group')
          setLoading(false)
          return
        }
        const res = await fetch(`/api/groups/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Failed to fetch group')
        setGroup(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchGroupData()
  }, [id])

  /* ── original handlers — untouched ── */
  const handleCopyCode = () => {
    if (group && group.groupCode) {
      navigator.clipboard.writeText(group.groupCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleUpdateName = async () => {
    if (!newName.trim() || newName === group.groupName) {
      setIsEditingName(false)
      return
    }
    try {
      const token = localStorage.getItem('dsabuds_token')
      const res = await fetch(`/api/groups/${id}/name`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ groupName: newName }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setGroup({ ...group, groupName: data.groupName })
      setIsEditingName(false)
    } catch (err) {
      alert(err.message)
    }
  }

  /* ── loading state ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center pt-[72px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 size={36} className="text-brand-500" />
          </motion.div>
          <p className="text-slate-500 text-sm">Loading group workspace…</p>
        </div>
      </div>
    )
  }

  /* ── error state ── */
  if (error || !group) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center pt-[72px] text-center px-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <AlertCircle size={28} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Group Not Found</h2>
        <p className="text-slate-400 mb-6 max-w-sm">{error || 'This group does not exist or you may not have access.'}</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-brand-500/25"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
    )
  }

  const memberCount = group.leaderboard?.length || 0
  const totalFine = group.groupFund || 0
  const maxStreak = Math.max(...(group.leaderboard?.map(m => m.streak || 0) || [0]))

  return (
    <div className="min-h-screen bg-[#0B1120] pt-[72px] pb-24">

      {/* ══ Group Banner ═════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ minHeight: 240 }}>
        {/* Background layers */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg,#0a1a0d 0%,#0B1120 45%,#0d0f1e 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Aurora blobs */}
        <div
          className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full blur-[110px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#22c55e,transparent 70%)' }}
        />
        <div
          className="absolute -top-10 right-0 w-[320px] h-[320px] rounded-full blur-[90px] opacity-12 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#3b82f6,transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          {/* Back link */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 mb-6 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left: avatar + name */}
            <div className="flex items-center gap-5">
              {/* Group avatar */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-extrabold shadow-2xl shrink-0"
                style={{
                  background: 'linear-gradient(135deg,#22c55e 0%,#16a34a 100%)',
                  boxShadow: '0 0 32px rgba(34,197,94,0.35)',
                }}
              >
                {group.groupName?.charAt(0).toUpperCase()}
              </div>
              <div>
                {/* Editable name */}
                {isEditingName ? (
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleUpdateName(); if (e.key === 'Escape') setIsEditingName(false) }}
                      className="text-2xl sm:text-3xl font-extrabold bg-transparent border-b-2 border-brand-500 focus:outline-none text-white w-full max-w-[280px]"
                      autoFocus
                      aria-label="Edit group name"
                    />
                    <button
                      onClick={handleUpdateName}
                      className="p-2 rounded-lg bg-brand-500/20 text-brand-400 hover:bg-brand-500/30 transition-colors"
                      aria-label="Save name"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                      aria-label="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {group.groupName}
                    </h1>
                    <button
                      onClick={() => { setNewName(group.groupName); setIsEditingName(true) }}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-brand-400 hover:bg-brand-500/10 transition-colors"
                      title="Edit Group Name"
                      aria-label="Edit group name"
                    >
                      <Edit2 size={15} />
                    </button>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Users size={12} /> {memberCount} members</span>
                  <span className="flex items-center gap-1"><Trophy size={12} className="text-amber-400" /> Fund ₹{totalFine}</span>
                  <span className="flex items-center gap-1 text-brand-400"><Flame size={12} /> Top streak: {maxStreak} days</span>
                </div>
              </div>
            </div>

            {/* Right: invite code + action buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Invite code pill */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
              >
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Invite Code</p>
                  <p className="font-mono text-lg font-black text-white tracking-[0.25em]">{group.groupCode}</p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className={`p-2.5 rounded-xl transition-all font-semibold text-xs flex items-center gap-1.5 ${
                    copied
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                      : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1] hover:text-white'
                  }`}
                  aria-label="Copy invite code"
                >
                  {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>

              {/* Share button */}
              <button
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                aria-label="Share group"
              >
                <Share2 size={15} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Page Body ════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">

        {/* ── Quick Stats ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            icon={Users}   iconColor="#a855f7" iconBg="rgba(168,85,247,0.12)"
            label="Members"      value={memberCount}     suffix="" trend="Active"    delay={0}
          />
          <StatCard
            icon={Flame}   iconColor="#f97316" iconBg="rgba(249,115,22,0.12)"
            label="Top Streak"   value={maxStreak}       suffix=" days" trend="+2 wk" delay={0.07}
            accentBorder="rgba(249,115,22,0.2)"
          />
          <StatCard
            icon={BarChart3} iconColor="#3b82f6" iconBg="rgba(59,130,246,0.12)"
            label="Problems Solved" value={memberCount * 8} suffix="" trend="This week" delay={0.14}
          />
          <StatCard
            icon={Trophy}  iconColor="#f59e0b" iconBg="rgba(245,158,11,0.12)"
            label="Group Fund"   value={totalFine}       prefix="₹" trend="Collected"  delay={0.21}
            accentBorder={totalFine > 0 ? 'rgba(245,158,11,0.2)' : undefined}
          />
        </motion.div>

        {/* ── Leaderboard + Weekly Challenge ── */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">

          {/* Leaderboard */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card className="p-6">
              <CardHeader
                icon={Trophy} iconColor="#f59e0b"
                title="Leaderboard"
                subtitle="Ranked by streak + consistency"
                action={<span className="text-xs text-slate-600 font-medium">This Week</span>}
              />

              {group.leaderboard && group.leaderboard.length > 0 ? (
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
                  {group.leaderboard.map((member, index) => (
                    <LeaderRow
                      key={member._id}
                      member={member}
                      index={index}
                      isMe={user && member._id === user.id}
                      delay={index * 0.07}
                    />
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <Users size={24} className="text-slate-600" />
                  </div>
                  <p className="text-base font-bold text-white mb-1">No members yet</p>
                  <p className="text-sm text-slate-500 max-w-xs">Share the invite code to bring your friends in.</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Weekly Challenge */}
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <Card className="p-5">
                <CardHeader
                  icon={Target} iconColor="#3b82f6"
                  title="Weekly Challenge"
                  subtitle="Complete together for a bonus reward"
                />
                <WeeklyChallenge />
              </Card>
            </motion.div>

            {/* Invite card */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.07 }}>
              <Card className="p-5 relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top right,rgba(34,197,94,0.07),transparent 70%)' }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={15} className="text-brand-400" />
                    <span className="text-sm font-bold text-white">Invite Members</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Share the code below with your friends to grow your accountability group.
                  </p>
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-xl mb-3"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div>
                      <p className="text-[10px] text-slate-500 mb-0.5">Invite Code</p>
                      <p className="font-mono font-black tracking-[0.2em] text-white">{group.groupCode}</p>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        copied ? 'bg-brand-500 text-white' : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.1] hover:text-white'
                      }`}
                      aria-label="Copy invite code"
                    >
                      {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <Share2 size={12} /> Share Link
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-brand-400 hover:text-white hover:bg-brand-500 transition-all"
                      style={{ border: '1px solid rgba(34,197,94,0.25)' }}
                    >
                      <LinkIcon size={12} /> Copy Link
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* ── Members Grid ── */}
        {group.leaderboard && group.leaderboard.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card className="p-6">
              <CardHeader icon={Users} iconColor="#a855f7" title="Members" subtitle={`${memberCount} active members`} />
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {group.leaderboard.map((member, i) => {
                  const isMe = user && member._id === user.id
                  const initials = member.username.charAt(0).toUpperCase()
                  return (
                    <motion.div
                      key={member._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="relative flex items-center gap-3 p-3.5 rounded-2xl group cursor-default"
                      style={{
                        background: isMe ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.03)',
                        border: isMe ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.05)',
                        transition: 'border 0.2s,box-shadow 0.2s',
                      }}
                    >
                      {/* Avatar */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                        style={{ background: isMe ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#334155,#1e293b)' }}
                      >
                        {initials}
                      </div>
                      {/* Online dot */}
                      <div
                        className="absolute top-3 left-3 w-3 h-3 rounded-full border-2 border-[#0d1424]"
                        style={{ background: i < Math.ceil(memberCount / 2) ? '#22c55e' : '#374151' }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-sm font-bold truncate ${isMe ? 'text-brand-400' : 'text-white'}`}>
                            {member.username}
                          </span>
                          {isMe && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-500 text-white font-bold shrink-0">YOU</span>}
                          {i === 0 && <Crown size={11} className="text-amber-400 shrink-0" />}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span className="flex items-center gap-0.5">
                            <Flame size={9} className="text-orange-400" />{member.streak || 0}d
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-0.5 text-blue-400">
                            <Zap size={9} />{(member.streak || 0) * 20} XP
                          </span>
                          {(member.totalFine || 0) > 0 && (
                            <>
                              <span>·</span>
                              <span className="text-red-400">₹{member.totalFine}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-slate-600 font-semibold shrink-0">#{i + 1}</span>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* ── Recent Activity + Fine Tracker ── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Activity Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <Card className="p-6 h-full">
              <CardHeader
                icon={Activity} iconColor="#22c55e"
                title="Recent Activity"
                subtitle="Live group feed"
                action={<span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">Live</span>}
              />
              <div className="space-y-1">
                {MOCK_ACTIVITY.map(({ icon: Icon, color, bg, text, time }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.025] transition-colors group"
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: bg }}
                    >
                      <Icon size={13} color={color} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 font-medium leading-snug truncate">{text}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Fine Tracker */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}>
            <Card className="p-6 h-full">
              <CardHeader
                icon={AlertCircle} iconColor="#ef4444"
                title="Fine Tracker"
                subtitle="Individual fine status"
              />
              {group.leaderboard && group.leaderboard.length > 0 ? (
                <div className="space-y-2">
                  {group.leaderboard.map((member, i) => {
                    const hasFine = (member.totalFine || 0) > 0
                    const isMe = user && member._id === user.id
                    return (
                      <motion.div
                        key={member._id}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        style={{
                          background: hasFine
                            ? 'rgba(239,68,68,0.05)'
                            : 'rgba(34,197,94,0.04)',
                          border: hasFine
                            ? '1px solid rgba(239,68,68,0.15)'
                            : '1px solid rgba(34,197,94,0.12)',
                        }}
                      >
                        {/* Status dot */}
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ background: hasFine ? '#ef4444' : '#22c55e' }}
                        />
                        {/* Avatar */}
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: isMe ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#334155,#1e293b)' }}
                        >
                          {member.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-sm font-semibold ${isMe ? 'text-brand-400' : 'text-white'} truncate`}>
                              {member.username}
                            </span>
                            {isMe && <span className="text-[9px] px-1 py-0.5 rounded bg-brand-500/20 text-brand-400 shrink-0">you</span>}
                          </div>
                          <p className="text-[10px] text-slate-600">
                            {hasFine ? `${Math.ceil((member.totalFine || 0) / 10)} day${Math.ceil((member.totalFine || 0) / 10) !== 1 ? 's' : ''} missed` : 'No missed days'}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className={`text-sm font-extrabold ${hasFine ? 'text-red-400' : 'text-brand-400'}`}>
                            {hasFine ? `₹${member.totalFine}` : '✓ Clear'}
                          </div>
                          <div
                            className={`text-[9px] font-semibold mt-0.5 ${hasFine ? 'text-red-400' : 'text-brand-400'}`}
                          >
                            {hasFine ? 'Pending' : 'Paid'}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle2 size={32} className="text-brand-400 mb-3" />
                  <p className="text-sm font-semibold text-white mb-1">All Clear!</p>
                  <p className="text-xs text-slate-500">No fines yet. Keep the streak going!</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

        {/* ── Group Achievements ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Card className="p-6">
            <CardHeader
              icon={Star} iconColor="#f59e0b"
              title="Group Achievements"
              subtitle={`${GROUP_ACHIEVEMENTS.filter(a => a.unlocked).length} of ${GROUP_ACHIEVEMENTS.length} unlocked`}
            />
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {GROUP_ACHIEVEMENTS.map(({ emoji, label, gradient, unlocked }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp} custom={i * 0.07}
                  whileHover={{ scale: unlocked ? 1.06 : 1.02, y: unlocked ? -4 : 0 }}
                  className={`relative flex flex-col items-center gap-2 p-3.5 rounded-2xl text-center cursor-default ${!unlocked ? 'opacity-40' : ''}`}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${unlocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)'}`,
                  }}
                >
                  {!unlocked && (
                    <div
                      className="absolute inset-0 rounded-2xl flex items-center justify-center"
                      style={{ backdropFilter: 'blur(1px)', background: 'rgba(11,17,32,0.3)' }}
                    >
                      <CheckCircle2 size={16} className="text-slate-600" />
                    </div>
                  )}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl shadow-lg`}>
                    {emoji}
                  </div>
                  <p className="text-[11px] font-semibold text-white leading-tight">{label}</p>
                  {unlocked && (
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-brand-500/20 flex items-center justify-center">
                      <CheckCircle2 size={9} className="text-brand-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </Card>
        </motion.div>

      </div>
    </div>
  )
}
