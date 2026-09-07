import { useState, useEffect, useContext, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import {
  Plus, Users, Hash, TrendingUp, AlertCircle, ArrowRight,
  Trophy, Loader2, Flame, Zap, Target, Star, Check,
  Clock, Code2, ChevronRight, Activity, GitCommit,
  UserPlus, Sparkles, Calendar, BarChart3, Shield,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

/* ── animation presets ────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

/* ── animated counter ────────────────────────────────────── */
function Counter({ to, duration = 1.2 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (latest) => setVal(Math.round(latest))
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return <span ref={ref}>{val}</span>
}

/* ── mini sparkline ──────────────────────────────────────── */
function Sparkline({ data, color, label }) {
  const width = 120
  const height = 32
  const max = Math.max(...data)
  const min = Math.min(...data)
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = max === min ? height / 2 : height - ((val - min) / (max - min)) * (height - 8) - 4
    return `${x},${y}`
  })
  
  const pathD = `M ${points.join(' L ')}`
  const fillD = `${pathD} L ${width},${height} L 0,${height} Z`
  const gradientId = `spark-grad-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="w-full flex items-center justify-between gap-4 mt-2">
      <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
        Activity Trend
      </span>
      <div className="w-24 h-8 select-none pointer-events-none">
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${width} ${height}`} 
          preserveAspectRatio="none"
          className="overflow-visible opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          
          <motion.path
            d={fillD}
            fill={`url(#${gradientId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: { 
                pathLength: 1,
                transition: { duration: 1.2, ease: "easeInOut", delay: 0.1 }
              }
            }}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </div>
    </div>
  )
}

/* ── stat card ───────────────────────────────────────────── */
function StatCard({ icon: Icon, iconColor, iconBg, label, value, suffix = '', trend, trendUp = true, delay = 0, accentBorder }) {
  const numValue = typeof value === 'number' ? value : 0
  let sparklineData = [0, 0, 0, 0, 0, 0, 0, 0]
  
  if (label.includes('Current Streak')) {
    sparklineData = [
      Math.max(0, numValue - 7),
      Math.max(0, numValue - 5),
      Math.max(0, numValue - 4),
      Math.max(0, numValue - 4),
      Math.max(0, numValue - 3),
      Math.max(0, numValue - 2),
      Math.max(0, numValue - 1),
      numValue
    ]
  } else if (label.includes('Longest Streak')) {
    sparklineData = [
      Math.max(0, numValue - 10),
      Math.max(0, numValue - 8),
      Math.max(0, numValue - 6),
      Math.max(0, numValue - 4),
      Math.max(0, numValue - 2),
      numValue,
      numValue,
      numValue
    ]
  } else if (label.includes('Active Groups')) {
    sparklineData = [
      Math.max(0, numValue - 2),
      Math.max(0, numValue - 1),
      Math.max(0, numValue - 1),
      numValue,
      numValue,
      numValue
    ]
  } else if (label.includes('Pending Fines')) {
    if (numValue === 0) {
      sparklineData = [0, 0, 0, 0, 0, 0, 0, 0]
    } else {
      sparklineData = [
        numValue + 200,
        numValue + 150,
        numValue + 100,
        numValue + 50,
        numValue
      ]
    }
  }

  const formattedSuffix = suffix === '₹' ? 'Rupees' : suffix.charAt(0).toUpperCase() + suffix.slice(1)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      custom={delay}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="relative flex flex-col items-start rounded-[24px] p-8 overflow-hidden cursor-default select-none group border border-slate-200 dark:border-white/[0.08] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-300 hover:border-emerald-500/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1),0_0_25px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.45),0_0_25px_rgba(16,185,129,0.15)] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      style={{
        background: 'var(--card-bg)',
      }}
      aria-label={`${label}: ${value} ${suffix}`}
      tabIndex={0}
    >
      {/* Top shimmer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-100 group-hover:from-emerald-500/[0.04] transition-all duration-300 pointer-events-none" />

      {/* Top: Colored Icon */}
      <div 
        className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center relative mb-5 transition-transform duration-300 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${iconColor}20 0%, ${iconColor}05 100%)`,
          border: `1px solid ${iconColor}30`,
          boxShadow: `0 0 15px ${iconColor}15`
        }}
      >
        <div className="absolute inset-0 rounded-2xl opacity-40 blur-sm pointer-events-none" style={{ background: iconColor }} />
        <Icon className="relative z-10 animate-[pulse_3s_infinite_ease-in-out]" size={24} color={iconColor} strokeWidth={2} />
      </div>

      {/* Title */}
      <h3 className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2">
        {label}
      </h3>

      {/* Large Metric */}
      <div className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white select-all leading-none">
        <Counter to={numValue} />
      </div>

      {/* Small Unit */}
      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 mb-4">
        {formattedSuffix}
      </div>

      {/* Trend Badge */}
      <div className="flex items-center mb-6 min-h-[26px]">
        {trend !== undefined && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${
              trendUp 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
            }`}
          >
            <span className="text-[10px]">{trendUp ? '↑' : '↓'}</span>
            <span>{trend}</span>
          </motion.div>
        )}
      </div>

      {/* Mini Sparkline */}
      <div className="w-full mt-auto pt-4 border-t border-slate-100 dark:border-white/[0.04] group-hover:border-emerald-500/10 transition-colors duration-300">
        <Sparkline data={sparklineData} color={iconColor} label={label} />
      </div>

      {/* Radial Hover Gradient Light */}
      <div 
        className="absolute -inset-px rounded-[24px] border border-transparent group-hover:border-emerald-500/20 transition-all duration-300 pointer-events-none" 
        style={{
          background: `radial-gradient(circle 100px at 50% -10px, ${iconColor}15, transparent)`
        }}
      />
    </motion.div>
  )
}


/* ── heatmap ─────────────────────────────────────────────── */
function Heatmap({ streak = 0 }) {
  const weeks = 26
  const days = weeks * 7
  const today = new Date()

  const cells = Array.from({ length: days }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (days - 1 - i))
    const daysAgo = days - 1 - i
    const solved = daysAgo < streak
      ? Math.random() > 0.15
      : daysAgo < streak + 10
      ? Math.random() > 0.6
      : Math.random() > 0.85
    const intensity = solved ? Math.floor(Math.random() * 3) + 1 : 0
    return { date, intensity }
  })

  const colors = ['rgba(255,255,255,0.05)', '#14532d', '#16a34a', '#22c55e', '#4ade80']
  const labels = ['Less', '', '', '', 'More']

  return (
    <div className="overflow-x-auto">
      <div className="grid gap-1 min-w-[500px]"
        style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
        {Array.from({ length: weeks }, (_, w) =>
          Array.from({ length: 7 }, (_, d) => {
            const cell = cells[w * 7 + d]
            return (
              <motion.div
                key={`${w}-${d}`}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (w * 7 + d) * 0.001, duration: 0.2 }}
                title={cell.date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                className="w-3.5 h-3.5 rounded-sm cursor-pointer hover:ring-1 hover:ring-brand-400 transition-all"
                style={{ background: colors[cell.intensity] }}
              />
            )
          })
        )}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-xs text-slate-600 mr-1">Less</span>
        {colors.map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-xs text-slate-600 ml-1">More</span>
      </div>
    </div>
  )
}

/* ── mini bar chart ──────────────────────────────────────── */
const weeklyData = [
  { day: 'Mon', solved: 3, hrs: 1.5 },
  { day: 'Tue', solved: 5, hrs: 2.0 },
  { day: 'Wed', solved: 2, hrs: 1.0 },
  { day: 'Thu', solved: 7, hrs: 3.5 },
  { day: 'Fri', solved: 4, hrs: 2.2 },
  { day: 'Sat', solved: 6, hrs: 2.8 },
  { day: 'Sun', solved: 1, hrs: 0.5 },
]
const maxSolved = Math.max(...weeklyData.map(d => d.solved))

function WeeklyChart() {
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2 h-28">
        {weeklyData.map(({ day, solved }, i) => (
          <div key={day} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t-md"
              style={{ background: i === 3 ? '#22c55e' : 'rgba(34,197,94,0.3)' }}
              initial={{ height: 0 }}
              whileInView={{ height: `${(solved / maxSolved) * 100}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="text-[10px] text-slate-500">{day}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Problems', value: '28', sub: 'this week' },
          { label: 'Avg / Day', value: '4.0', sub: 'problems' },
          { label: 'Consistency', value: '86%', sub: 'rate' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="text-center p-2 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="text-lg font-bold text-white">{value}</div>
            <div className="text-[10px] text-slate-500">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── today's challenge ───────────────────────────────────── */
function TodayChallenge() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
          <Code2 size={18} color="#f59e0b" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold text-white">Rotten Oranges</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Medium</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">Graph · BFS</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Given an m×n grid with oranges, find the minimum time until all fresh oranges rot.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Clock, label: 'Est. Time', value: '25 min', color: '#8b5cf6' },
          { icon: BarChart3, label: 'Acceptance', value: '52.4%', color: '#3b82f6' },
          { icon: Star, label: 'XP Reward', value: '+50 XP', color: '#f59e0b' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex flex-col items-center gap-1 p-2 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Icon size={14} color={color} />
            <span className="text-xs font-semibold text-white">{value}</span>
            <span className="text-[9px] text-slate-600">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Link to="/dashboard"
          className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold text-center transition-colors shadow-lg shadow-brand-500/25">
          Solve Now
        </Link>
        <button className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          View Solution
        </button>
      </div>
    </div>
  )
}

/* ── leaderboard ─────────────────────────────────────────── */
const mockLeaders = [
  { rank: 1, name: 'Rahul', pts: 42, streak: 16, medal: '🥇', color: '#f59e0b' },
  { rank: 2, name: 'You',   pts: 39, streak: 12, medal: '🥈', color: '#94a3b8', isMe: true },
  { rank: 3, name: 'Aman',  pts: 37, streak: 9,  medal: '🥉', color: '#cd7c2f' },
  { rank: 4, name: 'Priya', pts: 31, streak: 7,  medal: null,  color: '#6b7280' },
  { rank: 5, name: 'Dev',   pts: 28, streak: 5,  medal: null,  color: '#6b7280' },
]

function Leaderboard() {
  return (
    <div className="space-y-2">
      {mockLeaders.map(({ rank, name, pts, streak, medal, color, isMe }, i) => (
        <motion.div
          key={rank}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isMe ? 'ring-1 ring-brand-500/30' : ''}`}
          style={{
            background: isMe ? 'rgba(34,197,94,0.07)' : 'rgba(255,255,255,0.025)',
            border: isMe ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <span className="text-base w-6 text-center">{medal || `#${rank}`}</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: isMe ? '#22c55e' : '#334155' }}>
            {name[0]}
          </div>
          <div className="flex-1">
            <div className={`text-sm font-semibold ${isMe ? 'text-brand-400' : 'text-slate-200'}`}>{name}</div>
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <Flame size={9} className="text-orange-400" />{streak} day streak
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-white">{pts}</div>
            <div className="text-[9px] text-slate-600">pts</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ── activity timeline ───────────────────────────────────── */
const mockActivity = [
  { icon: Check, color: '#22c55e', bg: 'rgba(34,197,94,0.1)', title: 'Solved Merge Intervals', diff: 'Easy',   diffColor: '#22c55e', xp: '+20 XP', time: '15 min ago' },
  { icon: Check, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', title: 'Solved Binary Tree LCA', diff: 'Medium', diffColor: '#f59e0b', xp: '+35 XP', time: '2 hrs ago' },
  { icon: Check, color: '#ef4444', bg: 'rgba(239,68,68,0.1)',  title: 'Attempted Word Ladder II', diff: 'Hard',   diffColor: '#ef4444', xp: '+10 XP', time: 'Yesterday' },
  { icon: GitCommit, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'Joined DSA Warriors group', diff: null, diffColor: null, xp: '+5 XP', time: '2 days ago' },
]

function ActivityTimeline() {
  return (
    <div className="space-y-1">
      {mockActivity.map(({ icon: Icon, color, bg, title, diff, diffColor, xp, time }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors group"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
            <Icon size={14} color={color} strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-slate-200 font-medium truncate">{title}</span>
              {diff && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold shrink-0"
                  style={{ background: `${diffColor}15`, color: diffColor, border: `1px solid ${diffColor}25` }}>
                  {diff}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-600">{time}</span>
          </div>
          <span className="text-xs font-semibold text-brand-400 shrink-0">{xp}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ── group card ──────────────────────────────────────────── */
function GroupCard({ group, delay = 0 }) {
  const members = group.members?.length || 1
  const initials = ['S', 'A', 'R', 'K', '+']
  const colors = ['#22c55e', '#3b82f6', '#a855f7', '#f97316', '#64748b']

  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      whileHover={{ y: -5, scale: 1.01 }}
      className="relative flex flex-col rounded-2xl p-5 gap-4 overflow-hidden group"
      style={{
        background: 'linear-gradient(145deg,#111827 0%,#0d1424 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'border 0.25s,box-shadow 0.25s',
      }}
      onHoverStart={e => { }}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(34,197,94,0.4),transparent)' }} />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-white mb-0.5">{group.groupName}</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span className="text-xs text-slate-500">{members} members</span>
          </div>
        </div>
        <span className="text-xs px-2 py-1 rounded-lg font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
          Active
        </span>
      </div>

      {/* Avatar stack */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {Array.from({ length: Math.min(members, 4) }, (_, i) => (
            <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0b1120] flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: colors[i] }}>
              {initials[i]}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto text-xs text-slate-500">
          <Trophy size={11} className="text-amber-400" />
          Fund: <span className="font-semibold text-white ml-0.5">₹{group.groupFund || 0}</span>
        </div>
      </div>

      <Link
        to={`/groups/${group._id}`}
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-brand-400 hover:text-white hover:bg-brand-500 transition-all duration-200"
        style={{ border: '1px solid rgba(34,197,94,0.25)' }}
      >
        View Leaderboard <ArrowRight size={14} />
      </Link>
    </motion.div>
  )
}

/* ── section card shell ──────────────────────────────────── */
function Card({ children, className = '', title, subtitle, icon: Icon, iconColor = '#22c55e', action }) {
  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-5 transition-colors duration-300 ${className}`}
      style={{
        background: 'var(--panel-bg)',
        border: '1px solid var(--panel-border)',
        boxShadow: 'var(--panel-shadow)',
      }}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-[pulse_6s_infinite]"
                style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}25` }}>
                <Icon size={15} color={iconColor} strokeWidth={2} />
              </div>
            )}
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white leading-tight">{title}</h2>
              {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

/* ── modal shell ─────────────────────────────────────────── */
function Modal({ title, onClose, onSubmit, loading, error, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl transition-colors duration-300"
        style={{
          background: 'var(--modal-bg)',
          border: '1px solid var(--modal-border)',
        }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{title}</h2>
        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg text-sm text-red-500 dark:text-red-400 flex items-center gap-2"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}
        {children}
        <div className="flex gap-3 justify-end mt-6">
          <button onClick={onClose} disabled={loading}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-xl">
            Cancel
          </button>
          <button onClick={onSubmit} disabled={loading}
            className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-colors">
            {loading && <Loader2 size={14} className="animate-spin" />}
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════════════════════ */
export default function Dashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  const [groupName, setGroupName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')

  /* ── unchanged API logic ── */
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('dsabuds_token')
      if (!token) return
      const res = await fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setUserData(data)
        if (data.leetcodeUsername) {
          try {
            const lcRes = await fetch('/api/leetcode/sync', { headers: { 'Authorization': `Bearer ${token}` } })
            if (lcRes.ok) {
              const lcData = await lcRes.json()
              if (lcData.streak !== undefined) setUserData(prev => ({ ...prev, streak: lcData.streak }))
            }
          } catch (syncError) { console.error('Failed to sync LeetCode data:', syncError) }
        }
      } else if (res.status === 401) {
        logout();
      }
    } catch (error) { console.error('Failed to fetch dashboard data:', error) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchDashboardData() }, [])

  const handleCreateGroup = async () => {
    if (!groupName.trim()) { setFormError('Group name is required'); return }
    try {
      setFormLoading(true); setFormError('')
      const token = localStorage.getItem('dsabuds_token')
      const res = await fetch('/api/groups/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ groupName }),
      })
      const data = await res.json()
      if (res.ok) { setShowCreateModal(false); setGroupName(''); navigate(`/groups/${data._id}`) }
      else setFormError(data.message || 'Failed to create group')
    } catch { setFormError('Server error. Try again.') }
    finally { setFormLoading(false) }
  }

  const handleJoinGroup = async () => {
    if (!inviteCode.trim() || inviteCode.length !== 7) { setFormError('Valid 7-character invite code is required'); return }
    try {
      setFormLoading(true); setFormError('')
      const token = localStorage.getItem('dsabuds_token')
      const res = await fetch('/api/groups/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ groupCode: inviteCode.toUpperCase() }),
      })
      const data = await res.json()
      if (res.ok) { setShowJoinModal(false); setInviteCode(''); navigate(`/groups/${data.group._id}`) }
      else setFormError(data.message || 'Failed to join group')
    } catch { setFormError('Server error. Try again.') }
    finally { setFormLoading(false) }
  }

  /* ── loading state ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex items-center justify-center pt-[72px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 size={36} className="text-brand-500" />
          </motion.div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex items-center justify-center pt-[72px] px-4">
        <div className="text-center">
          <Shield size={48} className="text-slate-400 dark:text-slate-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Authentication Required</h2>
          <p className="text-slate-500 dark:text-slate-400">Please sign in to view your dashboard.</p>
        </div>
      </div>
    )
  }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
  const username = userData.username || 'Developer'
  const streak = userData.streak || 0
  const totalFine = userData.totalFine || 0
  const groups = userData.joinedGroups || []

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 pt-[72px] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ══ Greeting + Quick Actions ══════════════════════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <motion.div variants={fadeUp} custom={0}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80' }}>
                <Sparkles size={10} className="inline mr-1" />Dashboard
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              {greeting}, {username} 👋
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-base">
              {streak > 0
                ? `🔥 You're on a ${streak}-day streak. Keep building momentum!`
                : '⚡ Start a streak today — every expert was once a beginner.'}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1} className="flex flex-wrap gap-2.5 shrink-0">
            {!userData.leetcodeUsername && (
              <Link to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
                <Target size={15} /> Link LeetCode
              </Link>
            )}
            <button
              onClick={() => { setShowJoinModal(true); setFormError('') }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <Hash size={15} /> Join Group
            </button>
            <button
              onClick={() => { setShowCreateModal(true); setFormError('') }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25">
              <Plus size={15} /> Create Group
            </button>
          </motion.div>
        </motion.div>

        {/* ══ Stats Cards ═══════════════════════════════════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            icon={Flame} iconColor="#f97316" iconBg="rgba(249,115,22,0.12)"
            label="Current Streak" value={streak} suffix="days"
            trend="+4 this week" trendUp delay={0}
            accentBorder="rgba(249,115,22,0.2)"
          />
          <StatCard
            icon={Trophy} iconColor="#3b82f6" iconBg="rgba(59,130,246,0.12)"
            label="Longest Streak" value={streak} suffix="days"
            trend="personal best" trendUp delay={0.07}
          />
          <StatCard
            icon={Users} iconColor="#a855f7" iconBg="rgba(168,85,247,0.12)"
            label="Active Groups" value={groups.length} suffix="groups"
            trend={groups.length > 0 ? `${groups.length} active` : 'Join one!'} trendUp delay={0.14}
          />
          <StatCard
            icon={AlertCircle} iconColor="#ef4444" iconBg="rgba(239,68,68,0.12)"
            label="Pending Fines" value={totalFine} suffix="₹"
            trend={totalFine > 0 ? 'Pay now' : 'Clear!'} trendUp={totalFine === 0} delay={0.21}
            accentBorder={totalFine > 0 ? 'rgba(239,68,68,0.2)' : undefined}
          />
        </motion.div>

        {/* ══ Heatmap + Weekly Chart ════════════════════════════ */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Card
              title="Consistency Calendar"
              subtitle="Keep your streak alive every day"
              icon={Calendar} iconColor="#22c55e"
            >
              <Heatmap streak={streak} />
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card
              title="Weekly Progress"
              subtitle="Problems solved this week"
              icon={BarChart3} iconColor="#3b82f6"
            >
              <WeeklyChart />
            </Card>
          </motion.div>
        </div>

        {/* ══ Today's Challenge + Leaderboard ══════════════════ */}
        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <Card title="Today's Challenge" subtitle="Daily problem • Recommended" icon={Code2} iconColor="#f59e0b">
              <TodayChallenge />
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <Card
              title="Leaderboard"
              subtitle="This week's top performers"
              icon={Trophy} iconColor="#f59e0b"
              action={
                <span className="text-xs text-slate-600 font-medium">Weekly</span>
              }
            >
              <Leaderboard />
            </Card>
          </motion.div>
        </div>

        {/* ══ Activity + Groups ══════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <Card title="Recent Activity" subtitle="Your latest problem-solving history" icon={Activity} iconColor="#22c55e">
              <ActivityTimeline />
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
            <Card
              title="Your Groups"
              subtitle={groups.length > 0 ? `${groups.length} accountability group${groups.length !== 1 ? 's' : ''}` : 'No groups yet'}
              icon={Users} iconColor="#a855f7"
              action={
                <button
                  onClick={() => { setShowCreateModal(true); setFormError('') }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-400 hover:text-white hover:bg-brand-500 transition-all"
                  style={{ border: '1px solid rgba(34,197,94,0.25)' }}>
                  <Plus size={12} /> New
                </button>
              }
            >
              {groups.length > 0 ? (
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
                  {groups.map((group, i) => (
                    <GroupCard key={group._id} group={group} delay={i * 0.1} />
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center mb-4">
                    <Users size={24} className="text-slate-600" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">No Groups Yet</h3>
                  <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-5">
                    Accountability is more powerful with friends. Create or join a group to get started.
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => { setShowCreateModal(true); setFormError('') }}
                      className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-brand-500/25">
                      Create Group
                    </button>
                    <button onClick={() => { setShowJoinModal(true); setFormError('') }}
                      className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white rounded-xl transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      Join Group
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>

      </div>

      {/* ══ Modals ════════════════════════════════════════════ */}
      {showCreateModal && (
        <Modal
          title="Create New Group"
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateGroup}
          loading={formLoading}
          error={formError}
        >
          <input
            type="text"
            placeholder="Group Name (e.g. Daily Grinders)"
            value={groupName}
            onChange={e => setGroupName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-sm"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </Modal>
      )}

      {showJoinModal && (
        <Modal
          title="Join a Group"
          onClose={() => setShowJoinModal(false)}
          onSubmit={handleJoinGroup}
          loading={formLoading}
          error={formError}
        >
          <input
            type="text"
            placeholder="Enter 7-character invite code"
            value={inviteCode}
            onChange={e => setInviteCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-sm font-mono tracking-widest text-center uppercase"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            maxLength={7}
          />
        </Modal>
      )}
    </div>
  )
}
