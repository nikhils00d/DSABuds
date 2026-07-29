import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
  TrendingUp, Calendar, BarChart3, Clock, Star, Zap, Award, Target,
  Flame, Users, Trophy, Shield, ArrowUpRight, ArrowDownRight, Download,
  Filter, Brain, AlertCircle, CheckCircle2, ChevronRight, Play, Sparkles,
  Info, HelpCircle, Code2, BookOpen, Loader2, Lock
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, PieChart, Pie, Cell
} from 'recharts';

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ── Quick Stat Card Component ── */
const StatCard = ({ icon: Icon, iconColor, iconBg, label, value, trend, trendUp = true, delay = 0 }) => {
  return (
    <motion.div
      variants={fadeUp} custom={delay}
      whileHover={{ y: -4, scale: 1.015 }}
      className="relative rounded-2xl p-5 flex flex-col justify-between overflow-hidden cursor-default group"
      style={{
        background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.25s ease'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${iconColor}50, transparent)` }} />

      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: iconBg }}>
          <Icon size={18} color={iconColor} strokeWidth={2} />
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 ${
            trendUp ? 'bg-brand-500/10 text-brand-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {trend}
          </span>
        )}
      </div>

      <div>
        <div className="text-3xl font-extrabold text-white tracking-tight">{value}</div>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
      </div>

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 20% 0%, ${iconColor}06, transparent)` }} />
    </motion.div>
  );
};

/* ── GitHub Style Heatmap ── */
function ContributionHeatmap({ streak = 0 }) {
  const weeks = 26;
  const days = weeks * 7;
  const today = new Date();

  const cells = useMemo(() => {
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (days - 1 - i));
      const daysAgo = days - 1 - i;
      const solved = daysAgo < streak
        ? Math.random() > 0.1
        : daysAgo < streak + 8
        ? Math.random() > 0.6
        : Math.random() > 0.85;
      const intensity = solved ? Math.floor(Math.random() * 3) + 1 : 0;
      return { date, intensity };
    });
  }, [streak]);

  const colors = ['rgba(255,255,255,0.04)', '#14532d', '#16a34a', '#22c55e', '#4ade80'];

  return (
    <div className="overflow-x-auto">
      <div className="grid gap-1 min-w-[500px]" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
        {Array.from({ length: weeks }, (_, w) =>
          Array.from({ length: 7 }, (_, d) => {
            const cell = cells[w * 7 + d];
            return (
              <div
                key={`${w}-${d}`}
                title={`${cell.date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}`}
                className="w-3.5 h-3.5 rounded-sm cursor-pointer hover:ring-1 hover:ring-brand-400 transition-all"
                style={{ background: colors[cell.intensity] }}
              />
            );
          })
        )}
      </div>
      <div className="flex items-center gap-1.5 mt-3 justify-end text-[10px] text-slate-500">
        <span>Less</span>
        {colors.map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

/* ── Mock Data for charts based on selected date filter ── */
const MOCK_CHART_DATA = {
  '7 Days': [
    { name: 'Mon', Solved: 3, Hours: 1.2, Rate: 65 },
    { name: 'Tue', Solved: 5, Hours: 2.0, Rate: 80 },
    { name: 'Wed', Solved: 2, Hours: 1.0, Rate: 50 },
    { name: 'Thu', Solved: 7, Hours: 3.2, Rate: 88 },
    { name: 'Fri', Solved: 4, Hours: 1.8, Rate: 75 },
    { name: 'Sat', Solved: 6, Hours: 2.5, Rate: 82 },
    { name: 'Sun', Solved: 1, Hours: 0.5, Rate: 90 }
  ],
  '30 Days': [
    { name: 'Wk 1', Solved: 18, Hours: 8.5, Rate: 72 },
    { name: 'Wk 2', Solved: 22, Hours: 11.2, Rate: 78 },
    { name: 'Wk 3', Solved: 15, Hours: 7.0, Rate: 68 },
    { name: 'Wk 4', Solved: 25, Hours: 12.8, Rate: 85 }
  ],
  '90 Days': [
    { name: 'Month 1', Solved: 64, Hours: 32.5, Rate: 74 },
    { name: 'Month 2', Solved: 72, Hours: 38.0, Rate: 79 },
    { name: 'Month 3', Solved: 88, Hours: 45.2, Rate: 84 }
  ],
  'All Time': [
    { name: 'Q1', Solved: 120, Hours: 65.0, Rate: 70 },
    { name: 'Q2', Solved: 145, Hours: 80.5, Rate: 76 },
    { name: 'Q3', Solved: 190, Hours: 95.0, Rate: 81 },
    { name: 'Q4', Solved: 230, Hours: 110.8, Rate: 86 }
  ]
};

const TOPIC_DISTRIBUTION = [
  { name: 'Arrays', value: 45, color: '#3b82f6' },
  { name: 'Trees', value: 38, color: '#10b981' },
  { name: 'Graphs', value: 32, color: '#f59e0b' },
  { name: 'Dynamic Programming', value: 28, color: '#ef4444' },
  { name: 'Greedy', value: 24, color: '#a855f7' },
  { name: 'Binary Search', value: 20, color: '#ec4899' },
  { name: 'Linked List', value: 18, color: '#06b6d4' },
  { name: 'Heap / Stack / Queue', value: 15, color: '#8b5cf6' }
];

const ACHIEVEMENTS = [
  { label: 'Consistency King', emoji: '⚡', desc: '90%+ consistency rate over 14 days', progress: 100, unlocked: true },
  { label: '50 Day Streak', emoji: '🔥', desc: 'Keep a streak alive for 50 days', progress: 46, unlocked: false },
  { label: 'Graph Explorer', emoji: '📈', desc: 'Solve 25+ Graph Problems', progress: 100, unlocked: true },
  { label: 'Algorithm Master', emoji: '🏆', desc: 'Solve 200 problems total', progress: 75, unlocked: false }
];

export default function Analytics() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [leetcodeSync, setLeetcodeSync] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('7 Days');
  const [activeDataset, setActiveDataset] = useState('Solved'); // 'Solved' | 'Hours' | 'Rate'

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('dsabuds_token');
        if (!token) return;
        
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          
          if (data.leetcodeUsername) {
            const lcRes = await fetch('/api/leetcode/sync', {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (lcRes.ok) {
              const lcData = await lcRes.json();
              setLeetcodeSync(lcData);
              if (lcData.streak !== undefined) {
                setUserData(prev => ({ ...prev, streak: lcData.streak }));
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to load analytics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const streak = userData?.streak || 0;
  const leetcodeUser = userData?.leetcodeUsername || 'Not connected';
  const solvedCount = leetcodeSync?.totalSolved || 38;

  // Process data for charts
  const performanceData = useMemo(() => MOCK_CHART_DATA[dateFilter], [dateFilter]);

  const pieData = useMemo(() => [
    { name: 'Easy', value: Math.max(5, Math.round(solvedCount * 0.45)), color: '#22c55e' },
    { name: 'Medium', value: Math.max(3, Math.round(solvedCount * 0.40)), color: '#f59e0b' },
    { name: 'Hard', value: Math.max(1, Math.round(solvedCount * 0.15)), color: '#ef4444' }
  ], [solvedCount]);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ userData, leetcodeSync }));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dsabuds_analytics_${dateFilter.replace(' ', '_').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center pt-[72px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 size={36} className="text-brand-500" />
          </motion.div>
          <p className="text-slate-500 text-sm">Gathering insights…</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center pt-[72px] px-4">
        <div className="text-center">
          <Shield size={48} className="text-slate-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-500">Sign in to view your detailed metrics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] pt-[72px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ══ HEADER SECTION ════════════════════════════════ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center gap-1">
                <Brain size={10} /> Insights
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Analytics</h1>
            <p className="text-sm text-slate-500 mt-1">Track your consistency and improve your interview preparation.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date Filters */}
            <div className="flex rounded-xl bg-slate-900/60 p-1 border border-white/[0.05]">
              {['7 Days', '30 Days', '90 Days', 'All Time'].map(f => (
                <button
                  key={f}
                  onClick={() => setDateFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateFilter === f ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white transition-all text-xs font-semibold"
            >
              <Download size={14} /> Export JSON
            </button>
          </div>
        </div>

        {/* ══ QUICK STATS GRID ══════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={Target} iconColor="#22c55e" iconBg="rgba(34,197,94,0.1)"
            label="Problems Solved" value={solvedCount} trend="+8 this week" trendUp
          />
          <StatCard
            icon={Flame} iconColor="#f97316" iconBg="rgba(249,115,22,0.1)"
            label="Current Streak" value={streak} trend="Personal Max" trendUp
          />
          <StatCard
            icon={Trophy} iconColor="#3b82f6" iconBg="rgba(59,130,246,0.1)"
            label="Longest Streak" value={Math.max(streak, 14)} trend="Top 12%" trendUp
          />
          <StatCard
            icon={TrendingUp} iconColor="#f59e0b" iconBg="rgba(245,158,11,0.1)"
            label="Acceptance Rate" value="76%" trend="Good Standing" trendUp
          />
          <StatCard
            icon={Clock} iconColor="#8b5cf6" iconBg="rgba(139,92,246,0.1)"
            label="Coding Hours" value="18.5 hrs" trend="+3.2 hrs" trendUp
          />
          <StatCard
            icon={Zap} iconColor="#ec4899" iconBg="rgba(236,72,153,0.1)"
            label="XP Earned" value={`${solvedCount * 25} XP`} trend="+150 XP" trendUp
          />
          <StatCard
            icon={Users} iconColor="#06b6d4" iconBg="rgba(6,182,212,0.1)"
            label="Average Solved" value="2.8 / day" trend="consistent" trendUp
          />
          <StatCard
            icon={Shield} iconColor="#a855f7" iconBg="rgba(168,85,247,0.1)"
            label="Global Rank" value="#12,450" trend="top 15%" trendUp
          />
        </div>

        {/* ══ HEATMAP & PERFORMANCE CHARTS ══════════════════ */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          
          {/* Consistency Heatmap */}
          <div className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar size={16} className="text-brand-400" /> Consistency Calendar
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Every solved problem makes you stronger.</p>
            </div>
            <ContributionHeatmap streak={streak} />
          </div>

          {/* Consistency Score Circular Progress */}
          <div className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Star size={16} className="text-amber-400" /> Consistency Rating
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Based on weekly activity metrics</p>
            </div>
            
            <div className="flex flex-col items-center py-4">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                  <motion.circle
                    cx="56" cy="56" r="48" fill="none" stroke="#22c55e" strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 48}
                    initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - 0.92) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">92%</span>
                  <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">Excellent</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 text-center">Your weekly consistency score is <strong>higher than 88%</strong> of active members.</p>
            </div>
          </div>
        </div>

        {/* ══ WEEKLY LINE CHART & DONUT CHART ═══════════════ */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          
          {/* Weekly Performance Line Chart */}
          <div className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp size={16} className="text-brand-400" /> Performance Trend
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Visualize your habits over time</p>
              </div>

              {/* Toggles */}
              <div className="flex gap-1 bg-slate-900/60 p-0.5 rounded-lg border border-white/[0.05]">
                {['Solved', 'Hours', 'Rate'].map(ds => (
                  <button
                    key={ds}
                    onClick={() => setActiveDataset(ds)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                      activeDataset === ds ? 'bg-white/[0.08] text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {ds}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[240px] w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="#64748b" tickLine={false} />
                  <YAxis stroke="#64748b" tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '12px' }}
                    labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                  />
                  <Line
                    type="monotone"
                    dataKey={activeDataset}
                    stroke={activeDataset === 'Solved' ? '#22c55e' : activeDataset === 'Hours' ? '#3b82f6' : '#f59e0b'}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Difficulty Donut Chart */}
          <div className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 size={16} className="text-brand-400" /> Difficulty Breakdown
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Problems solved by difficulty level</p>
            </div>

            <div className="h-[180px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-white">{solvedCount}</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Total Solved</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {pieData.map(d => (
                <div key={d.name} className="p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="font-bold text-white">{d.value}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-wide flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: d.color }} />
                    {d.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ TOPIC DISTRIBUTION & RECOMMENDATIONS ══════════ */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Topic Distribution Horizontal Bars */}
          <div className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="mb-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 size={16} className="text-brand-400" /> Topic Distribution
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Focus areas across core data structures</p>
            </div>

            <div className="space-y-3.5">
              {TOPIC_DISTRIBUTION.map((item, i) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-slate-500">{item.value} solved</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.value / 45) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations AI style card */}
          <div className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-400" /> Recommended Action Items
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20">AI Insight</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { title: 'Practice more Dynamic Programming', desc: 'Your topic coverage shows only 28 DP questions. Target Knapsack or LIS problems next.', color: '#3b82f6' },
                  { title: 'Graph Problems Need Attention', desc: 'Accountability room weekly goal focuses on DFS/BFS. Solve rotten oranges to progress.', color: '#f59e0b' },
                  { title: 'High Ratio of Easy Solves', desc: 'You solved 90% Easy problems this month. Try moving to Medium tags to build interview consistency.', color: '#ef4444' },
                  { title: 'Maintain your current streak', desc: 'Streak is currently at 23 days. Solve a fast Array question today to preserve metrics.', color: '#22c55e' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01] flex items-start gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/[0.05] flex justify-between items-center text-xs text-slate-500">
              <span>LeetCode Username: <strong>{leetcodeUser}</strong></span>
              <Link to="/profile" className="text-brand-400 hover:underline">Manage Account</Link>
            </div>
          </div>
        </div>

        {/* ══ ACHIEVEMENTS GRID ═════════════════════════════ */}
        <div className="rounded-2xl p-6"
          style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mb-6">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award size={16} className="text-amber-400" /> Milestone Achievements
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Collect trophies as you stay consistent</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div
                key={ach.label}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`p-4 rounded-xl border flex flex-col gap-3 relative cursor-default ${
                  ach.unlocked ? 'border-white/[0.08] bg-white/[0.02]' : 'border-white/[0.04] bg-white/[0.01] opacity-60'
                }`}
              >
                {!ach.unlocked && (
                  <div className="absolute inset-0 bg-[#0d1424]/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Lock size={16} className="text-slate-600" />
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xl shadow-lg">
                    {ach.emoji}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{ach.label}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{ach.desc}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-semibold text-slate-500">
                    <span>Progress</span>
                    <span>{ach.progress}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${ach.progress}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
