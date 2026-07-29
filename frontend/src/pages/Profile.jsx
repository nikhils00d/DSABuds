import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  User, Activity, AlertTriangle, Link as LinkIcon, Edit2, Code, Briefcase,
  Calendar, Trophy, Flame, Loader2, CheckCircle2, Lock, Zap, Star,
  TrendingUp, Award, Target, GitBranch, BarChart3, Clock, Sparkles,
  Users, ArrowRight, Shield, MapPin, ExternalLink,
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ── animation helpers ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ── animated counter ──────────────────────────────────── */
function Counter({ to, prefix = '', suffix = '', duration = 1.2 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numTo = typeof to === 'number' ? to : parseInt(to) || 0;

  useEffect(() => {
    if (!inView || numTo === 0) { setVal(numTo); return; }
    let start = 0;
    const step = numTo / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= numTo) { setVal(numTo); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, numTo, duration]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ── section card ──────────────────────────────────────── */
function SectionCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden transition-colors duration-300 ${className}`}
      style={{
        background: 'var(--panel-bg)',
        border: '1px solid var(--panel-border)',
        boxShadow: 'var(--panel-shadow)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── card header ───────────────────────────────────────── */
function CardHeader({ icon: Icon, iconColor = '#22c55e', title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 animate-[pulse_5s_infinite]"
          style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}25` }}>
          <Icon size={15} color={iconColor} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800 dark:text-white leading-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

/* ── stat card ─────────────────────────────────────────── */
function StatCard({ icon: Icon, iconColor, iconBg, label, value, prefix = '', suffix = '', trend, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden cursor-default group border border-slate-200 dark:border-white/[0.07] transition-all duration-300"
      style={{
        background: 'var(--card-bg)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg,transparent,${iconColor}50,transparent)` }} />

      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
          <Icon size={18} color={iconColor} strokeWidth={2} />
        </div>
        {trend && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
            {trend}
          </span>
        )}
      </div>
      <div>
        <div className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          <Counter to={value} prefix={prefix} suffix={suffix} />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{label}</p>
      </div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 20% 0%,${iconColor}06,transparent)` }} />
    </motion.div>
  );
}

/* ── github-style heatmap ──────────────────────────────── */
function ContributionHeatmap({ streak = 0 }) {
  const weeks = 26;
  const days = weeks * 7;
  const today = new Date();
  const cells = Array.from({ length: days }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - i));
    const daysAgo = days - 1 - i;
    const active = daysAgo < streak
      ? Math.random() > 0.12
      : daysAgo < streak + 8
      ? Math.random() > 0.55
      : Math.random() > 0.88;
    const intensity = active ? Math.floor(Math.random() * 3) + 1 : 0;
    return { date, intensity };
  });
  const colors = ['rgba(255,255,255,0.04)', '#14532d', '#16a34a', '#22c55e', '#4ade80'];
  return (
    <div className="overflow-x-auto">
      <div className="grid gap-1 min-w-[480px]"
        style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
        {Array.from({ length: weeks }, (_, w) =>
          Array.from({ length: 7 }, (_, d) => {
            const cell = cells[w * 7 + d];
            return (
              <motion.div
                key={`${w}-${d}`}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (w * 7 + d) * 0.0008, duration: 0.18 }}
                title={cell.date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                className="w-3.5 h-3.5 rounded-sm cursor-pointer hover:ring-1 hover:ring-brand-400/70 transition-all"
                style={{ background: colors[cell.intensity] }}
              />
            );
          })
        )}
      </div>
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[10px] text-slate-600">Less</span>
        {colors.map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-[10px] text-slate-600">More</span>
      </div>
    </div>
  );
}

/* ── difficulty donut ──────────────────────────────────── */
function DifficultyChart({ easy = 0, medium = 0, hard = 0 }) {
  const total = easy + medium + hard || 1;
  const items = [
    { label: 'Easy',   val: easy,   color: '#22c55e', pct: Math.round((easy / total) * 100) },
    { label: 'Medium', val: medium, color: '#f59e0b', pct: Math.round((medium / total) * 100) },
    { label: 'Hard',   val: hard,   color: '#ef4444', pct: Math.round((hard / total) * 100) },
  ];
  const r = 36, circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative w-24 h-24 shrink-0">
        <svg width="96" height="96" className="-rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
          {items.map(({ color, pct }, i) => {
            const dash = (pct / 100) * circ;
            const el = (
              <motion.circle
                key={i}
                cx="48" cy="48" r={r}
                fill="none" stroke={color} strokeWidth="8" strokeLinecap="butt"
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={-offset}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white">{easy + medium + hard}</span>
          <span className="text-[9px] text-slate-500">solved</span>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        {items.map(({ label, val, color, pct }) => (
          <div key={label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span style={{ color }} className="font-medium">{label}</span>
              <span className="text-slate-500">{val} ({pct}%)</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── weekly mini bar chart ─────────────────────────────── */
const weeklyMock = [3, 5, 2, 7, 4, 6, 1];
const maxW = Math.max(...weeklyMock);
function WeeklyBars() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className="flex items-end gap-1.5 h-20 mt-2">
      {weeklyMock.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div
            className="w-full rounded-t-md"
            style={{ background: i === 3 ? '#22c55e' : 'rgba(34,197,94,0.25)' }}
            initial={{ height: 0 }}
            whileInView={{ height: `${(v / maxW) * 100}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="text-[9px] text-slate-600">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ── achievements ──────────────────────────────────────── */
const ACHIEVEMENTS = [
  { id: 1, icon: '🔥', label: '7-Day Streak',    desc: 'Stayed consistent for a week',      gradient: 'from-orange-500 to-red-500',    unlocked: true  },
  { id: 2, icon: '🏆', label: '30-Day Streak',   desc: 'One month of daily practice',       gradient: 'from-amber-400 to-orange-500',  unlocked: false },
  { id: 3, icon: '💯', label: '100 Problems',    desc: 'Solved 100+ problems',              gradient: 'from-brand-400 to-emerald-600', unlocked: false },
  { id: 4, icon: '🌳', label: 'Tree Master',     desc: 'Solved 20 tree problems',           gradient: 'from-green-400 to-teal-500',    unlocked: false },
  { id: 5, icon: '📈', label: 'Graph Explorer',  desc: 'Conquered graph algorithms',        gradient: 'from-blue-400 to-indigo-500',   unlocked: true  },
  { id: 6, icon: '⚡', label: 'Consistency King',desc: '90% consistency over 2 weeks',      gradient: 'from-purple-400 to-pink-500',   unlocked: false },
];

function AchievementBadge({ achievement, delay }) {
  const { icon, label, desc, gradient, unlocked } = achievement;
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      whileHover={{ scale: unlocked ? 1.06 : 1.02, y: unlocked ? -4 : 0 }}
      className={`relative rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-default ${!unlocked ? 'opacity-50' : ''}`}
      style={{
        background: unlocked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${unlocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
      }}
    >
      {!unlocked && (
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center"
          style={{ backdropFilter: 'blur(2px)', background: 'rgba(11,17,32,0.4)' }}>
          <Lock size={18} className="text-slate-600" />
        </div>
      )}
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-xl shadow-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-white">{label}</p>
        <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{desc}</p>
      </div>
      {unlocked && (
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand-500/20 flex items-center justify-center">
          <CheckCircle2 size={10} className="text-brand-400" />
        </div>
      )}
    </motion.div>
  );
}

/* ── connected account row ─────────────────────────────── */
function ConnectedAccount({ icon: Icon, iconColor, iconBg, platform, username, onManage }) {
  const isLinked = username && username !== 'Not linked';
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-white/[0.03]"
      style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
        <Icon size={16} color={iconColor} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">{platform}</p>
        <p className="text-xs text-slate-500 truncate">{isLinked ? username : 'Not connected'}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {isLinked && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
            ✓ Live
          </span>
        )}
        <button onClick={onManage}
          className="text-xs font-semibold text-slate-500 hover:text-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded">
          {isLinked ? 'Manage' : 'Connect'}
        </button>
      </div>
    </div>
  );
}

/* ── activity item ─────────────────────────────────────── */
function ActivityItem({ activity, idx, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.07, duration: 0.45 }}
      className="flex gap-3"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 z-10">
          <Activity size={13} className="text-brand-400" />
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-1" style={{ background: 'rgba(255,255,255,0.06)', minHeight: '16px' }} />
        )}
      </div>
      {/* Content */}
      <div className="pb-4 flex-1">
        <p className="text-sm font-medium text-slate-200 leading-snug">{activity.text}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[10px] text-slate-600">{activity.date}</span>
          {activity.points && (
            <span className="text-[10px] font-bold text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded-full">
              {activity.points} XP
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── edit profile modal ────────────────────────────────── */
function EditProfileModal({ editFormData, setEditFormData, onSave, onClose, saving, editError, authUser }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center gap-3 mb-7">
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
            <Edit2 size={16} className="text-brand-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
        </div>

        <div className="space-y-4 mb-6">
          {[
            { key: 'username',        label: 'Username',          placeholder: 'Your username',    type: 'text' },
            { key: 'githubUsername',  label: 'GitHub Username',   placeholder: 'e.g. nikhils00d',  type: 'text' },
            { key: 'linkedinUsername',label: 'LinkedIn Username', placeholder: 'e.g. nikhil-sood', type: 'text' },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
              <input
                type={type}
                value={editFormData[key]}
                onChange={e => setEditFormData({ ...editFormData, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-shadow"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
              />
            </div>
          ))}

          {/* LeetCode with verification note */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">LeetCode Username</label>
            <div className="mb-2 p-3 rounded-xl text-xs text-blue-400 leading-relaxed"
              style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)' }}>
              <p className="font-semibold mb-1">Verification Required</p>
              <p>Add <code className="font-mono bg-blue-500/20 px-1 py-0.5 rounded text-blue-300">
                DSABUDS-{authUser?.id?.substring(0, 8).toUpperCase()}
              </code> to your LeetCode profile's <strong>"About Me"</strong> section.</p>
            </div>
            <input
              type="text"
              value={editFormData.leetcodeUsername}
              onChange={e => setEditFormData({ ...editFormData, leetcodeUsername: e.target.value })}
              placeholder="e.g. nikhils00d"
              className="w-full px-4 py-3 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
            />
          </div>
        </div>

        {editError && (
          <div className="mb-5 flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-400"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <AlertTriangle size={14} /> {editError}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} disabled={saving}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-xl">
            Cancel
          </button>
          <button onClick={onSave} disabled={saving}
            className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-colors">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PROFILE COMPONENT
══════════════════════════════════════════════════════════ */
const Profile = () => {
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [recentActivity, setRecentActivity] = useState([]);

  // Edit Profile State — exactly as original
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    leetcodeUsername: '',
    githubUsername: '',
    linkedinUsername: '',
  });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState('');

  // ── unchanged API logic ──
  useEffect(() => {
    if (!authLoading) fetchProfileData();
  }, [authUser, authLoading]);

  const fetchProfileData = async () => {
    setApiError('');
    try {
      const token = localStorage.getItem('dsabuds_token');
      if (!token) { setLoading(false); return; }

      const res = await fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        setEditFormData({
          username: data.username || '',
          leetcodeUsername: data.leetcodeUsername || '',
          githubUsername: data.githubUsername || '',
          linkedinUsername: data.linkedinUsername || '',
        });
        if (data.leetcodeUsername) {
          const lcRes = await fetch('/api/leetcode/sync', { headers: { 'Authorization': `Bearer ${token}` } });
          const lcData = await lcRes.json();
          if (lcRes.ok) {
            if (lcData.recentSubmissions) {
              const activities = lcData.recentSubmissions.map((sub, index) => ({
                id: sub.id || index,
                type: 'solve',
                text: `Solved "${sub.title}"`,
                date: new Date(sub.timestamp * 1000).toLocaleString(),
                points: '+1',
              }));
              setRecentActivity(activities.slice(0, 5));
            }
            if (lcData.streak !== undefined) {
              setUserData(prev => ({ ...prev, streak: lcData.streak }));
            }
          }
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        const msg = errData.message || `Request failed (${res.status})`;
        console.error('Profile API error:', msg);
        setApiError(msg);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setApiError('Network error – could not reach the server.');
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
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editFormData),
      });
      if (res.ok) {
        await fetchProfileData();
        setIsEditingProfile(false);
      } else {
        const data = await res.json();
        setEditError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile', error);
      setEditError('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  /* ── loading state ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex items-center justify-center pt-[72px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 size={36} className="text-brand-500" />
          </motion.div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading your profile…</p>
        </div>
      </div>
    );
  }

  /* ── error state ── */
  if (!userData && apiError) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col items-center justify-center pt-[72px] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Could not load profile</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{apiError}</p>
        <button onClick={fetchProfileData}
          className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-brand-500/25">
          Try Again
        </button>
      </div>
    );
  }

  /* ── unauthenticated state ── */
  if (!userData) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex flex-col items-center justify-center pt-[72px] text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
          <Shield size={28} className="text-brand-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">Sign in to view your profile</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">Create an account to start tracking your LeetCode streaks and join accountability groups.</p>
      </div>
    );
  }

  /* ── derived display data ── */
  const streak = userData.streak || 0;
  const totalFine = userData.totalFine || 0;
  const username = userData.username || 'Developer';
  const initials = username.substring(0, 2).toUpperCase();
  const lcUsername = userData.leetcodeUsername;
  const ghUsername = userData.githubUsername;
  const liUsername = userData.linkedinUsername;
  const groups = userData.joinedGroups || [];
  const memberSince = userData.createdAt
    ? new Date(userData.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : 'Recently';

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 pt-[72px] pb-20">

      {/* ══ Cover Banner ════════════════════════════════════ */}
      <div className="relative h-[220px] overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0d1a0e 0%, #0B1120 40%, #0d0f1e 100%)' }} />
        {/* Grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        {/* Aurora blobs */}
        <div className="absolute top-[-40px] left-[-80px] w-[420px] h-[420px] rounded-full blur-[100px] opacity-25"
          style={{ background: 'radial-gradient(circle,#22c55e,transparent 70%)' }} />
        <div className="absolute top-[-20px] right-[-60px] w-[320px] h-[320px] rounded-full blur-[90px] opacity-15"
          style={{ background: 'radial-gradient(circle,#3b82f6,transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[200px] -translate-x-1/2 rounded-full blur-[80px] opacity-10"
          style={{ background: 'radial-gradient(ellipse,#a855f7,transparent 70%)' }} />

        {/* Floating particles */}
        {[
          { size: 3, top: '20%', left: '15%', delay: 0 },
          { size: 2, top: '60%', left: '25%', delay: 0.8 },
          { size: 4, top: '35%', left: '70%', delay: 0.4 },
          { size: 2, top: '75%', left: '80%', delay: 1.2 },
          { size: 3, top: '15%', left: '88%', delay: 0.6 },
        ].map(({ size, top, left, delay }, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-400/30"
            style={{ width: size, height: size, top, left }}
            animate={{ y: [-4, 4, -4], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Edit profile button top-right */}
        <div className="absolute top-4 right-4 sm:right-8">
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsEditingProfile(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
            aria-label="Edit profile"
          >
            <Edit2 size={14} /> Edit Profile
          </motion.button>
        </div>
      </div>

      {/* ══ Page body ══════════════════════════════════════= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Avatar overlapping banner ── */}
        <div className="relative -mt-16 mb-8 flex flex-col sm:flex-row items-start sm:items-end gap-4">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative shrink-0"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[20px] p-[3px] shadow-2xl"
              style={{ background: 'linear-gradient(135deg,#22c55e,#3b82f6,#a855f7)' }}>
              <div className="w-full h-full rounded-[17px] flex items-center justify-center"
                style={{ background: '#0B1120' }}>
                <span className="text-4xl font-black text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg,#4ade80,#3b82f6)' }}>
                  {initials}
                </span>
              </div>
            </div>
            {/* Online dot */}
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-brand-400 border-2 border-[#0B1120] shadow-lg"
              style={{ boxShadow: '0 0 8px 2px rgba(74,222,128,0.5)' }} />
          </motion.div>

          {/* Name + meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex-1 pb-1"
          >
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{username}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
                DSA Enthusiast
              </span>
            </div>
            <p className="text-slate-500 text-sm mb-2">@{username.toLowerCase()}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar size={11} /> Joined {memberSince}</span>
              {lcUsername && <span className="flex items-center gap-1 text-orange-400"><Target size={11} /> {lcUsername}</span>}
              {ghUsername  && <span className="flex items-center gap-1 text-slate-400"><GitBranch size={11} /> {ghUsername}</span>}
            </div>
          </motion.div>

          {/* Quick action */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Link to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-brand-400 hover:text-white hover:bg-brand-500 transition-all"
              style={{ border: '1px solid rgba(34,197,94,0.25)' }}>
              <BarChart3 size={14} /> Dashboard <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* ══ Main Grid ════════════════════════════════════ */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

          {/* ── Left column ── */}
          <div className="space-y-6">

            {/* Quick Stats */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={Flame}    iconColor="#f97316" iconBg="rgba(249,115,22,0.12)" label="Current Streak"  value={streak}     suffix=" days" trend="+4 wk" delay={0}    />
              <StatCard icon={Trophy}   iconColor="#3b82f6" iconBg="rgba(59,130,246,0.12)"  label="Longest Streak" value={streak}     suffix=" days"            delay={0.07}  />
              <StatCard icon={Activity} iconColor="#a855f7" iconBg="rgba(168,85,247,0.12)"  label="Problems Solved" value={recentActivity.length} suffix="+"  delay={0.14}  />
              <StatCard icon={Star}     iconColor="#f59e0b" iconBg="rgba(245,158,11,0.12)"  label="Total XP"        value={streak * 20} suffix=" xp"            delay={0.21}  />
            </motion.div>

            {/* Heatmap */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <SectionCard className="p-6">
                <CardHeader icon={Calendar} title="Consistency Calendar" subtitle="Every solved problem makes you stronger." />
                <ContributionHeatmap streak={streak} />
              </SectionCard>
            </motion.div>

            {/* Coding Analytics */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}>
              <SectionCard className="p-6">
                <CardHeader icon={BarChart3} iconColor="#3b82f6" title="Coding Analytics" subtitle="Your problem-solving breakdown" />
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Difficulty Breakdown</p>
                    <DifficultyChart
                      easy={recentActivity.filter(a => a.type === 'solve').length}
                      medium={Math.max(1, recentActivity.length - 2)}
                      hard={1}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Weekly Activity</p>
                    <WeeklyBars />
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {[
                        { label: 'Acceptance', value: '72%', color: '#22c55e' },
                        { label: 'Avg/Day', value: '4.2', color: '#3b82f6' },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="p-2.5 rounded-xl text-center"
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div className="text-lg font-bold" style={{ color }}>{value}</div>
                          <div className="text-[10px] text-slate-500">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>
            </motion.div>

            {/* Achievements */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <SectionCard className="p-6">
                <CardHeader icon={Award} iconColor="#f59e0b" title="Achievements" subtitle={`${ACHIEVEMENTS.filter(a => a.unlocked).length} of ${ACHIEVEMENTS.length} unlocked`} />
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ACHIEVEMENTS.map((ach, i) => (
                    <AchievementBadge key={ach.id} achievement={{ ...ach, unlocked: i < (streak > 7 ? 2 : 1) }} delay={i * 0.07} />
                  ))}
                </motion.div>
              </SectionCard>
            </motion.div>

            {/* Activity Timeline */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <SectionCard className="p-6">
                <CardHeader icon={Clock} iconColor="#22c55e" title="Recent Activity" subtitle="Your latest problem-solving history"
                  action={<button className="text-xs text-brand-400 hover:text-brand-300 font-semibold transition-colors">View All</button>}
                />
                {recentActivity.length > 0 ? (
                  <div>
                    {recentActivity.map((activity, idx) => (
                      <ActivityItem key={activity.id} activity={activity} idx={idx} isLast={idx === recentActivity.length - 1} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center mb-3">
                      <Activity size={20} className="text-slate-600" />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">No recent activity</p>
                    <p className="text-xs text-slate-500 max-w-xs">
                      {lcUsername ? 'Solve a problem on LeetCode to see it here.' : 'Link your LeetCode account to see your solves!'}
                    </p>
                    {!lcUsername && (
                      <button onClick={() => setIsEditingProfile(true)}
                        className="mt-4 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-brand-500/25">
                        Link LeetCode
                      </button>
                    )}
                  </div>
                )}
              </SectionCard>
            </motion.div>

            {/* Groups */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <SectionCard className="p-6">
                <CardHeader icon={Users} iconColor="#a855f7" title="Accountability Groups" subtitle={`${groups.length} group${groups.length !== 1 ? 's' : ''} joined`} />
                {groups.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {groups.map((group, i) => (
                      <motion.div
                        key={group._id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="rounded-2xl p-4 group cursor-default"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-sm font-bold text-white">{group.groupName}</h3>
                            <p className="text-xs text-slate-500">{group.members?.length || 1} members</p>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">Active</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1"><Trophy size={10} className="text-amber-400" /> ₹{group.groupFund || 0} fund</span>
                          <span className="flex items-center gap-1"><Flame size={10} className="text-orange-400" /> Streak active</span>
                        </div>
                        <Link to={`/groups/${group._id}`}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-brand-400 hover:text-white hover:bg-brand-500 transition-all"
                          style={{ border: '1px solid rgba(34,197,94,0.2)' }}>
                          View Leaderboard <ArrowRight size={11} />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center mb-4">
                      <Users size={24} className="text-slate-600" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">No Groups Yet</h3>
                    <p className="text-sm text-slate-500 max-w-xs mb-5">Accountability is more powerful with friends.</p>
                    <Link to="/dashboard"
                      className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-brand-500/25">
                      Browse Groups
                    </Link>
                  </div>
                )}
              </SectionCard>
            </motion.div>
          </div>

          {/* ── Right column (sidebar) ── */}
          <div className="space-y-5">

            {/* Connected Accounts */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <SectionCard className="p-5">
                <CardHeader icon={LinkIcon} title="Connected Accounts" subtitle="Link your developer profiles" />
                <div className="space-y-2">
                  <ConnectedAccount
                    icon={Activity} iconColor="#f97316" iconBg="rgba(249,115,22,0.1)"
                    platform="LeetCode" username={lcUsername}
                    onManage={() => setIsEditingProfile(true)}
                  />
                  <ConnectedAccount
                    icon={GitBranch} iconColor="#94a3b8" iconBg="rgba(148,163,184,0.1)"
                    platform="GitHub" username={ghUsername}
                    onManage={() => setIsEditingProfile(true)}
                  />
                  <ConnectedAccount
                    icon={Briefcase} iconColor="#3b82f6" iconBg="rgba(59,130,246,0.1)"
                    platform="LinkedIn" username={liUsername}
                    onManage={() => setIsEditingProfile(true)}
                  />
                </div>
              </SectionCard>
            </motion.div>

            {/* Rank card */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.07 }}>
              <SectionCard className="p-5">
                <CardHeader icon={Star} iconColor="#f59e0b" title="Current Rank" subtitle="Based on streak + problems" />
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg text-2xl shrink-0">
                    🏅
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-white">Silver II</div>
                    <div className="text-xs text-slate-500 mb-2">Top 30% globally</div>
                    <div className="h-1.5 rounded-full w-32" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: '62%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-600 mt-1">620 / 1000 XP to Gold</div>
                  </div>
                </div>
              </SectionCard>
            </motion.div>

            {/* Today's Goal */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}>
              <SectionCard className="p-5">
                <CardHeader icon={Target} iconColor="#22c55e" title="Today's Goal" subtitle="Keep the streak alive" />
                <div className="space-y-2">
                  {[
                    { label: 'Solve 1 problem', done: streak > 0 },
                    { label: 'Review yesterday\'s solution', done: false },
                    { label: 'Study a new concept', done: false },
                  ].map(({ label, done }) => (
                    <div key={label} className="flex items-center gap-2.5 p-2.5 rounded-xl"
                      style={{ background: done ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${done ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)'}` }}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-brand-500' : 'border border-slate-600'}`}>
                        {done && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className={`text-xs font-medium ${done ? 'text-brand-400 line-through opacity-70' : 'text-slate-300'}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </motion.div>

            {/* Fine status */}
            {totalFine > 0 && (
              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.21 }}>
                <SectionCard className="p-5" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
                  <CardHeader icon={AlertTriangle} iconColor="#ef4444" title="Pending Fine" subtitle="Pay to clear your debt" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-extrabold text-red-400">₹{totalFine}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Outstanding balance</div>
                    </div>
                    <Link to="/dashboard"
                      className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                      Pay Now
                    </Link>
                  </div>
                </SectionCard>
              </motion.div>
            )}

            {/* Pro upsell */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.28 }}>
              <SectionCard className="p-5 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top right,rgba(168,85,247,0.08),transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-purple-400" />
                    <span className="text-sm font-bold text-white">Upgrade to Pro</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Detailed analytics, custom themes, and exclusive profile badges — take your profile to the next level.
                  </p>
                  <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', boxShadow: '0 4px 16px rgba(168,85,247,0.2)' }}>
                    View Plans
                  </button>
                </div>
              </SectionCard>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ══ Edit Profile Modal ════════════════════════════ */}
      {isEditingProfile && (
        <EditProfileModal
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          onSave={handleUpdateProfile}
          onClose={() => setIsEditingProfile(false)}
          saving={saving}
          editError={editError}
          authUser={authUser}
        />
      )}
    </div>
  );
};

export default Profile;
