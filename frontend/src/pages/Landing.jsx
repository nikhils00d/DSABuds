import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Target,
  Shield,
  Users,
  Trophy,
  Flame,
  Zap,
  CheckCircle2,
  GitBranch,
  TrendingUp,
  Star,
  ArrowRight,
  Play,
  Code2,
  Cpu,
} from 'lucide-react'


/* ─── Animation Variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

/* ─── Dashboard Preview Card ──────────────────────────────── */
function DashCard({ children, className = '', delay = 0, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`hero-card rounded-2xl p-4 shadow-2xl ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─── Floating Icon Bubble ────────────────────────────────── */
function FloatingIcon({ icon: Icon, color, size = 18, top, left, right, bottom, animClass, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
      className={`absolute z-10 w-10 h-10 rounded-xl flex items-center justify-center shadow-xl hero-card ${animClass}`}
      style={{ top, left, right, bottom, border: `1px solid ${color}30` }}
    >
      <Icon size={size} color={color} strokeWidth={2} />
    </motion.div>
  )
}

/* ─── Streak Ring ─────────────────────────────────────────── */
function StreakRing({ value }) {
  const radius = 28
  const circ = 2 * Math.PI * radius
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setProgress((value / 30) * circ), 600)
    return () => clearTimeout(t)
  }, [value, circ])

  return (
    <div className="relative flex items-center justify-center w-[72px] h-[72px]">
      <svg width="72" height="72" className="-rotate-90">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={radius}
          fill="none"
          stroke="url(#grad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - progress}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }}
        />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-white leading-none">{value}</span>
        <span className="text-[9px] text-slate-400 leading-none mt-0.5">days</span>
      </div>
    </div>
  )
}

/* ─── Main Landing Page ───────────────────────────────────── */
export default function Landing() {
  const heroRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const bgX = useTransform(springX, [-0.5, 0.5], ['-2%', '2%'])
  const bgY = useTransform(springY, [-0.5, 0.5], ['-2%', '2%'])

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div className="min-h-screen bg-[#0B1120] overflow-hidden">

      {/* ── Hero Section ─────────────────────────────────── */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[92vh] flex items-center pt-[72px]"
        aria-label="Hero section"
      >

        {/* — Background Layers — */}
        <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden />
        <div className="absolute inset-0 hero-noise pointer-events-none opacity-60" aria-hidden />

        {/* Aurora blobs */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div className="absolute top-[-10%] left-[-5%] w-[620px] h-[620px] rounded-full opacity-20 blur-[120px]"
            style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }} />
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-5%] left-[30%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
            style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
        </motion.div>

        {/* Radial center glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden>
          <div className="w-[800px] h-[800px] rounded-full animate-pulse-slow opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 65%)' }} />
        </div>

        {/* ── Two-column content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* ══ LEFT COLUMN ══════════════════════════════ */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-7 max-w-xl"
            >

              {/* Announcement Badge */}
              <motion.div variants={fadeUp} custom={0}>
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium cursor-default select-none"
                  style={{
                    background: 'rgba(34,197,94,0.08)',
                    border: '1px solid rgba(34,197,94,0.22)',
                    color: '#4ade80',
                  }}
                  aria-label="Product announcement"
                >
                  <Flame size={14} className="text-orange-400" aria-hidden />
                  Built for DSA Aspirants &amp; Interview Prep
                </motion.span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} custom={0.08}>
                <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.07]">
                  <span className="text-white">Stay Consistent.</span>
                  <br />
                  <span className="text-shimmer">Crack Every</span>
                  <br />
                  <span className="text-white">Interview.</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} custom={0.16}>
                <p className="text-lg text-slate-400 leading-relaxed max-w-[540px]">
                  Join accountability groups, automatically track your LeetCode streaks,
                  compete with friends, and stay interview-ready with smart penalties
                  that keep you accountable every single day.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} custom={0.24} className="flex flex-wrap items-center gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-base btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70"
                  aria-label="Start building streaks"
                >
                  Start Building Streaks
                  <ArrowRight size={17} aria-hidden />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-slate-300 hover:text-white font-semibold text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  aria-label="View features"
                >
                  <Play size={15} className="text-brand-400" aria-hidden />
                  View Features
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={fadeUp} custom={0.32}>
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2" role="list" aria-label="Product features">
                  {[
                    { icon: CheckCircle2, text: 'Free Forever' },
                    { icon: GitBranch,    text: 'GitHub Login' },
                    { icon: Shield,       text: 'Secure Auth' },
                    { icon: Target,       text: 'LeetCode Sync' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-1.5 text-sm text-slate-500" role="listitem">
                      <Icon size={14} className="text-brand-400 shrink-0" aria-hidden />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </motion.div>

            {/* ══ RIGHT COLUMN — Dashboard Preview ════════════════ */}
            <div className="relative hidden lg:flex items-center justify-center min-h-[520px]">

              {/* Background glow behind cards */}
              <div
                className="absolute w-[420px] h-[420px] rounded-full blur-[90px] opacity-20 animate-pulse-slow"
                style={{ background: 'radial-gradient(circle, #22c55e, transparent 70%)' }}
                aria-hidden
              />

              {/* Floating ambient icons */}
              <FloatingIcon icon={Flame}    color="#f97316" top="6%"   left="2%"   animClass="animate-drift"         delay={0.8} />
              <FloatingIcon icon={Code2}    color="#3b82f6" top="12%"  right="4%"  animClass="animate-float-slow"    delay={1.0} />
              <FloatingIcon icon={GitBranch} color="#a855f7" bottom="20%" left="4%"  animClass="animate-drift-reverse" delay={1.2} />
              <FloatingIcon icon={Cpu}      color="#22c55e" bottom="8%" right="6%"  animClass="animate-float-medium"  delay={1.4} />
              <FloatingIcon icon={Zap}      color="#eab308" top="45%"  right="-2%" animClass="animate-drift"         delay={0.9} />

              {/* ── Cards grid ── */}
              <div className="relative w-full max-w-[400px] space-y-3">

                {/* Row 1: Streak + Group */}
                <div className="flex gap-3">

                  {/* Card 1 — Current Streak */}
                  <DashCard className="flex-1" delay={0.5}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                          <Flame size={12} className="text-orange-400" aria-hidden />
                          Current Streak
                        </div>
                        <div className="text-2xl font-bold text-white">23 Days</div>
                        <div className="flex items-center gap-1 mt-1">
                          <TrendingUp size={11} className="text-brand-400" aria-hidden />
                          <span className="text-xs text-brand-400">+2 this week</span>
                        </div>
                      </div>
                      <StreakRing value={23} />
                    </div>
                    {/* Mini bar chart */}
                    <div className="flex items-end gap-0.5 h-7 mt-2">
                      {[60, 80, 45, 90, 70, 100, 85].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm bg-brand-500/40"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.8 + i * 0.06, duration: 0.4 }}
                          style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                        />
                      ))}
                    </div>
                  </DashCard>

                  {/* Card 2 — Active Group */}
                  <DashCard className="w-[140px]" delay={0.6}>
                    <div className="text-xs text-slate-500 font-medium mb-2 flex items-center gap-1">
                      <Users size={11} aria-hidden />
                      Active Group
                    </div>
                    <div className="text-sm font-bold text-white mb-1">DSA Warriors</div>
                    <div className="text-xs text-slate-400 mb-3">7 Members</div>
                    {/* Avatars */}
                    <div className="flex -space-x-2">
                      {['S','A','R','K','+3'].map((initial, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border-2 border-[#0B1120] flex items-center justify-center text-[9px] font-bold text-white"
                          style={{
                            background: ['#22c55e','#3b82f6','#a855f7','#f97316','#475569'][i],
                          }}
                        >
                          {initial}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                      <span className="text-[10px] text-brand-400">4 active now</span>
                    </div>
                  </DashCard>
                </div>

                {/* Card 3 — Weekly Progress */}
                <DashCard delay={0.7}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1">
                        <TrendingUp size={11} className="text-blue-400" aria-hidden />
                        Weekly Progress
                      </div>
                      <div className="text-xl font-bold text-white">8 Problems Solved</div>
                      <div className="text-xs text-slate-400 mt-0.5">92% Consistency Rate</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-xs text-slate-500">Goal: 10</div>
                      {/* Donut indicator */}
                      <div className="relative w-12 h-12">
                        <svg width="48" height="48" className="-rotate-90">
                          <circle cx="24" cy="24" r="19" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                          <motion.circle
                            cx="24" cy="24" r="19"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 19}
                            initial={{ strokeDashoffset: 2 * Math.PI * 19 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 19 * (1 - 0.8) }}
                            transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">80%</span>
                      </div>
                    </div>
                  </div>
                  {/* Segment bars */}
                  <div className="mt-3 flex gap-1">
                    {['M','T','W','T','F','S','S'].map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          className={`w-full rounded-sm ${i < 5 ? 'bg-brand-500/70' : 'bg-white/[0.06]'}`}
                          initial={{ height: 0 }}
                          animate={{ height: i < 5 ? `${[14,18,12,20,16][i]}px` : '8px' }}
                          transition={{ delay: 0.9 + i * 0.07, duration: 0.4 }}
                        />
                        <span className="text-[8px] text-slate-600">{d}</span>
                      </div>
                    ))}
                  </div>
                </DashCard>

                {/* Row 3: Leaderboard + Fine */}
                <div className="flex gap-3">

                  {/* Card 4 — Leaderboard */}
                  <DashCard className="flex-1" delay={0.8}>
                    <div className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1">
                      <Trophy size={11} className="text-amber-400" aria-hidden />
                      Leaderboard
                    </div>
                    {[
                      { rank: 1, name: 'Amit',  score: 247, color: '#f59e0b' },
                      { rank: 2, name: 'You',   score: 231, color: '#22c55e', highlight: true },
                      { rank: 3, name: 'Rahul', score: 198, color: '#94a3b8' },
                    ].map(({ rank, name, score, color, highlight }) => (
                      <div
                        key={rank}
                        className={`flex items-center gap-2 py-1 px-2 rounded-lg mb-1 ${highlight ? 'bg-brand-500/10' : ''}`}
                      >
                        <span className="text-[10px] font-bold w-4" style={{ color }}>#{rank}</span>
                        <span className={`text-xs flex-1 ${highlight ? 'text-brand-400 font-semibold' : 'text-slate-300'}`}>{name}</span>
                        <span className="text-[10px] text-slate-500">{score}</span>
                      </div>
                    ))}
                    <div className="text-[10px] text-brand-400 mt-1 font-medium">#2 This Week 🏆</div>
                  </DashCard>

                  {/* Card 5 — Fine */}
                  <DashCard className="w-[130px]" delay={0.9}>
                    <div className="text-xs text-slate-500 font-medium mb-2 flex items-center gap-1">
                      <Star size={11} className="text-amber-400" aria-hidden />
                      Fine Status
                    </div>
                    <div
                      className="text-xl font-bold mb-1"
                      style={{ color: '#f97316' }}
                    >
                      ₹20
                    </div>
                    <div className="text-xs text-slate-400 mb-3">Pending</div>
                    <div
                      className="text-[10px] px-2 py-1 rounded-lg text-center font-medium"
                      style={{ background: 'rgba(249,115,22,0.12)', color: '#fb923c', border: '1px solid rgba(249,115,22,0.2)' }}
                    >
                      Pay Now
                    </div>
                    <div className="text-[9px] text-slate-600 mt-2 leading-snug">
                      Day 2 miss • ₹10→₹20
                    </div>
                  </DashCard>

                </div>

              </div>{/* /cards grid */}

            </div>{/* /right column */}

          </div>{/* /grid */}
        </div>{/* /content */}
      </section>

      {/* ── Premium Features Section ──────────────────────── */}
      <FeaturesSection />

    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   FEATURES SECTION — standalone component
══════════════════════════════════════════════════════════════ */

/* ── Decorative dot grid ── */
function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
      }}
    />
  )
}

/* ── Streak Day Pill ── */
function StreakDay({ label, done, active, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium ${
        active
          ? 'bg-brand-500/15 border border-brand-500/30 text-brand-400'
          : done
          ? 'bg-white/[0.04] border border-white/[0.06] text-slate-400'
          : 'bg-white/[0.02] border border-white/[0.04] text-slate-600'
      }`}
    >
      <span>{label}</span>
      <span>
        {active ? (
          <Flame size={12} className="text-orange-400" />
        ) : done ? (
          <CheckCircle2 size={12} className="text-brand-400" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
        )}
      </span>
    </motion.div>
  )
}

/* ── Fine Step Row ── */
function FineStep({ day, amount, active, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center justify-between px-3 py-2 rounded-xl ${
        active
          ? 'bg-orange-500/10 border border-orange-500/20'
          : 'bg-white/[0.03] border border-white/[0.05]'
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
            active ? 'bg-orange-500/20 text-orange-400' : 'bg-white/[0.05] text-slate-500'
          }`}
        >
          Day {day}
        </span>
        <span className={`text-xs ${active ? 'text-orange-300' : 'text-slate-500'}`}>
          Miss streak
        </span>
      </div>
      <span className={`text-sm font-bold ${active ? 'text-orange-400' : 'text-slate-500'}`}>
        ₹{amount}
      </span>
    </motion.div>
  )
}

/* ── Individual Feature Card ── */
function FeatureCard({ icon: Icon, iconColor, iconBg, iconBorder, accentColor, title, description, footer, footerIcon: FooterIcon, children, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.015 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col rounded-2xl overflow-hidden cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
      style={{
        background: 'linear-gradient(145deg, rgba(15,23,42,0.85) 0%, rgba(10,16,32,0.95) 100%)',
        border: hovered ? `1px solid ${accentColor}40` : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}20, 0 0 40px ${accentColor}15`
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'border 0.25s ease, box-shadow 0.25s ease',
        backdropFilter: 'blur(20px)',
      }}
      aria-label={title}
      tabIndex={0}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: hovered
            ? `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`
            : `linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)`,
          transition: 'background 0.3s ease',
        }}
        aria-hidden
      />

      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 30% 0%, ${accentColor}08, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col h-full p-6 gap-5">

        {/* Icon */}
        <motion.div
          animate={{ rotate: hovered ? 8 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shrink-0"
          style={{
            background: iconBg,
            border: `1px solid ${iconBorder}`,
            boxShadow: hovered ? `0 0 20px ${accentColor}30` : 'none',
            transition: 'box-shadow 0.25s ease',
          }}
        >
          <Icon size={24} color={iconColor} strokeWidth={2} aria-hidden />
        </motion.div>

        {/* Title & Description */}
        <div>
          <h3 className="text-[1.05rem] font-bold text-white mb-2 leading-snug">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Rich inner content */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <div
          className="flex items-center gap-2 pt-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {FooterIcon && <FooterIcon size={13} color={accentColor} aria-hidden />}
          <span className="text-xs text-slate-500 font-medium">{footer}</span>
        </div>

      </div>
    </motion.article>
  )
}

/* ── Main FeaturesSection ── */
function FeaturesSection() {
  return (
    <section
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="features-heading"
    >

      {/* Decorative backgrounds */}
      <DotGrid />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[130px] pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse, #22c55e 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1280px] mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 flex flex-col items-center gap-5"
        >
          {/* Badge */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium cursor-default select-none"
            style={{
              background: 'rgba(34,197,94,0.07)',
              border: '1px solid rgba(34,197,94,0.2)',
              color: '#4ade80',
              boxShadow: '0 0 20px rgba(34,197,94,0.12)',
            }}
            aria-label="Features badge"
          >
            <Star size={13} className="text-brand-400" aria-hidden />
            Why Choose DSABuds
          </motion.span>

          {/* Heading */}
          <h2
            id="features-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.1] max-w-2xl"
          >
            Everything You Need
            <br />
            to{' '}
            <span className="text-shimmer">Stay Consistent</span>
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-lg leading-relaxed max-w-[650px] text-center">
            DSABuds combines accountability, automatic progress tracking, and healthy competition
            to help you build lasting coding habits — one day at a time.
          </p>
        </motion.div>

        {/* ── Feature Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

          {/* ─ Card 1: Accountability Groups ─ */}
          <FeatureCard
            index={0}
            icon={Shield}
            iconColor="#3b82f6"
            iconBg="rgba(59,130,246,0.1)"
            iconBorder="rgba(59,130,246,0.25)"
            accentColor="#3b82f6"
            title="Accountability Groups"
            description="Create or join peer groups. When you miss a day, everyone in your group is notified — keeping you on track."
            footer="Create or Join Groups"
            footerIcon={Users}
          >
            {/* Member avatars + activity */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[
                    { initials: 'S', color: '#22c55e' },
                    { initials: 'A', color: '#3b82f6' },
                    { initials: 'R', color: '#a855f7' },
                    { initials: 'K', color: '#f97316' },
                  ].map(({ initials, color }) => (
                    <div
                      key={initials}
                      className="w-7 h-7 rounded-full border-2 border-[#0b1120] flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ background: color }}
                    >
                      {initials}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-[#0b1120] bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    +3
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                  <span className="text-[10px] text-brand-400 font-medium">5 active now</span>
                </div>
              </div>

              {/* Group card */}
              <div
                className="rounded-xl p-3"
                style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-300">DSA Warriors</span>
                  <span className="text-[10px] text-slate-500">7 members</span>
                </div>
                <div className="flex gap-1">
                  {[100, 85, 90, 60, 75, 95, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm bg-blue-500/40"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.06, duration: 0.35 }}
                      style={{ height: `${h * 0.28}px`, transformOrigin: 'bottom' }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  {['M','T','W','T','F','S','S'].map((d) => (
                    <span key={d} className="flex-1 text-center text-[8px] text-slate-600">{d}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Group streak</span>
                <span className="text-blue-400 font-semibold">12 days 🔥</span>
              </div>
            </div>
          </FeatureCard>

          {/* ─ Card 2: Streak Tracking ─ */}
          <FeatureCard
            index={1}
            icon={Target}
            iconColor="#22c55e"
            iconBg="rgba(34,197,94,0.1)"
            iconBorder="rgba(34,197,94,0.25)"
            accentColor="#22c55e"
            title="Automatic Streak Tracking"
            description="We sync directly with LeetCode. Solve a problem and your streak updates automatically — no manual input needed."
            footer="Synced with LeetCode"
            footerIcon={Zap}
          >
            {/* Streak day list */}
            <div className="space-y-1.5">
              <StreakDay label="Monday"    done delay={0.3} />
              <StreakDay label="Tuesday"   done delay={0.36} />
              <StreakDay label="Wednesday" done delay={0.42} />
              <StreakDay label="Thursday"  done active delay={0.48} />
              <StreakDay label="Friday"    active delay={0.54} />
            </div>
            {/* Streak counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-3 flex items-center justify-between px-3 py-2 rounded-xl"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}
            >
              <div className="flex items-center gap-2">
                <Flame size={14} className="text-orange-400" />
                <span className="text-sm font-bold text-white">23-day streak</span>
              </div>
              <span className="text-xs text-brand-400 font-medium">+2 this week</span>
            </motion.div>
          </FeatureCard>

          {/* ─ Card 3: Dynamic Fine System ─ */}
          <FeatureCard
            index={2}
            icon={Trophy}
            iconColor="#f59e0b"
            iconBg="rgba(245,158,11,0.1)"
            iconBorder="rgba(245,158,11,0.25)"
            accentColor="#f59e0b"
            title="Dynamic Fine System"
            description="Miss a day and face an escalating fine. The longer you stay off-track, the higher the penalty — until you solve a problem and reset."
            footer="Stay motivated. Don't break the streak."
            footerIcon={Flame}
          >
            {/* Fine progression */}
            <div className="space-y-1.5">
              <FineStep day={1} amount={10}  delay={0.3} />
              <FineStep day={2} amount={20}  active delay={0.38} />
              <FineStep day={3} amount={40}  delay={0.46} />
              <FineStep day={4} amount={80}  delay={0.54} />
            </div>
            {/* Reset indicator */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.4 }}
              className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.14)' }}
            >
              <CheckCircle2 size={13} className="text-brand-400 shrink-0" aria-hidden />
              <span className="text-xs text-slate-400">Solve today → fine resets to ₹0</span>
            </motion.div>
          </FeatureCard>

        </div>{/* /grid */}

      </div>{/* /max-w */}

      {/* ── Bottom gradient divider ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.18) 30%, rgba(59,130,246,0.12) 70%, transparent 100%)',
        }}
        aria-hidden
      />

    </section>
  )
}
