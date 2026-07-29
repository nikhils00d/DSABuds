import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
  Trophy, Flame, Target, Star, Users, Briefcase, Award,
  Sparkles, Shield, ArrowRight, CheckCircle2, Lock, Clock,
  BookOpen, Code2, Play, Heart, ChevronRight, Zap, RefreshCw, Loader2
} from 'lucide-react';


import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Animation presets ── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ── Badge Illustration Icons ── */
const BadgeIcon = ({ category, difficulty, size = 32 }) => {
  const colors = {
    Legendary: 'from-yellow-400 to-amber-500 text-amber-950',
    Gold: 'from-amber-300 to-yellow-500 text-yellow-950',
    Silver: 'from-slate-300 to-slate-400 text-slate-900',
    Bronze: 'from-amber-600 to-orange-700 text-orange-950',
  };

  const getEmoji = () => {
    switch (category) {
      case 'Streaks': return '🔥';
      case 'Problems': return '📚';
      case 'Topics': return '🌳';
      case 'Competitions': return '🏆';
      case 'Community': return '👥';
      default: return '🎯';
    }
  };

  return (
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors[difficulty] || 'from-brand-400 to-indigo-500'} flex items-center justify-center text-xl shadow-lg`}>
      {getEmoji()}
    </div>
  );
};

/* ── Achievement Card Component ── */
const AchievementCard = ({ ach, index }) => {
  const { title, desc, xp, difficulty, category, progress, unlocked, date } = ach;

  const difficultyColors = {
    Legendary: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    Gold: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5',
    Silver: 'text-slate-400 border-slate-500/20 bg-slate-500/5',
    Bronze: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
  };

  return (
    <motion.div
      variants={fadeUp} custom={index * 0.05}
      whileHover={{ y: unlocked ? -5 : 0, scale: unlocked ? 1.015 : 1 }}
      className={`relative p-5 rounded-2xl border transition-all flex flex-col gap-4 overflow-hidden group cursor-default ${
        unlocked
          ? 'border-white/[0.08] bg-[#111827] shadow-xl'
          : 'border-white/[0.04] bg-white/[0.01] opacity-50'
      }`}
    >
      {!unlocked && (
        <div className="absolute inset-0 bg-[#0d1424]/40 backdrop-blur-[2px] rounded-2xl z-20 flex items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/[0.08] flex items-center justify-center">
            <Lock size={15} className="text-slate-500" />
          </div>
        </div>
      )}

      {/* Top banner shimmer on hover */}
      {unlocked && (
        <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)' }} />
      )}

      <div className="flex items-start gap-3.5 relative z-10">
        <BadgeIcon category={category} difficulty={difficulty} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="text-sm font-extrabold text-white truncate leading-snug">{title}</h4>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug mt-1">{desc}</p>
        </div>
      </div>

      <div className="space-y-2 mt-auto relative z-10">
        <div className="flex justify-between items-center text-[10px] font-semibold">
          <span className="text-slate-500">Progress</span>
          <span className="text-slate-400">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] text-[10px] font-medium text-slate-600 relative z-10">
        <span>+{xp} XP Reward</span>
        {unlocked && date && <span className="text-brand-400">Unlocked {date}</span>}
      </div>
    </motion.div>
  );
};

/* ── Mock Achievements Data ── */
const MOCK_ACHIEVEMENTS = [
  { id: 1, category: 'Streaks', difficulty: 'Bronze', title: '7 Day Streak', desc: 'Stay consistent for a full week.', xp: 50, progress: 100, unlocked: true, date: 'July 1' },
  { id: 2, category: 'Streaks', difficulty: 'Silver', title: '30 Day Streak', desc: 'Complete 30 consecutive active days.', xp: 150, progress: 100, unlocked: true, date: 'July 15' },
  { id: 3, category: 'Streaks', difficulty: 'Legendary', title: '100 Day Streak', desc: 'Become an accountability icon.', xp: 500, progress: 46, unlocked: false },
  
  { id: 4, category: 'Problems', difficulty: 'Bronze', title: 'Solve 50 Problems', desc: 'Crack 50 problems on LeetCode.', xp: 80, progress: 76, unlocked: false },
  { id: 5, category: 'Problems', difficulty: 'Gold', title: 'Solve 500 Problems', desc: 'Master DSA and solve 500 tasks.', xp: 400, progress: 8, unlocked: false },
  
  { id: 6, category: 'Topics', difficulty: 'Silver', title: 'Tree Master', desc: 'Solve 20+ Tree-tagged tasks.', xp: 120, progress: 100, unlocked: true, date: 'July 10' },
  { id: 7, category: 'Topics', difficulty: 'Gold', title: 'Graph Explorer', desc: 'Conquer BFS, DFS, and MST.', xp: 200, progress: 100, unlocked: true, date: 'July 14' },
  { id: 8, category: 'Topics', difficulty: 'Legendary', title: 'DP Warrior', desc: 'Solve 15+ complex Dynamic Programming tasks.', xp: 350, progress: 40, unlocked: false },
  
  { id: 9, category: 'Competitions', difficulty: 'Gold', title: 'Top 3 Leaderboard', desc: 'Finish top 3 in your weekly group.', xp: 250, progress: 100, unlocked: true, date: 'July 12' },
  { id: 10, category: 'Community', difficulty: 'Bronze', title: 'Invite 5 Friends', desc: 'Bring your peers into accountability.', xp: 100, progress: 60, unlocked: false },
  { id: 11, category: 'Community', difficulty: 'Silver', title: 'First Group Created', desc: 'Initialize an accountability room.', xp: 80, progress: 100, unlocked: true, date: 'June 28' },
  { id: 12, category: 'Special', difficulty: 'Gold', title: 'First Hard Problem', desc: 'Submit a hard-tagged solve.', xp: 300, progress: 100, unlocked: true, date: 'July 5' },
];

export default function Achievements() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('dsabuds_token');
        if (!token) return;
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        }
      } catch (err) {
        console.error('Failed to load achievements profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const streak = userData?.streak || 0;
  
  // Calculate dynamic items based on real streak
  const achievements = useMemo(() => {
    return MOCK_ACHIEVEMENTS.map(ach => {
      if (ach.title === '7 Day Streak') {
        const met = streak >= 7;
        return { ...ach, unlocked: met, progress: met ? 100 : Math.round((streak / 7) * 100), date: met ? 'Recently' : null };
      }
      if (ach.title === '30 Day Streak') {
        const met = streak >= 30;
        return { ...ach, unlocked: met, progress: met ? 100 : Math.round((streak / 30) * 100), date: met ? 'Recently' : null };
      }
      if (ach.title === '100 Day Streak') {
        const met = streak >= 100;
        return { ...ach, unlocked: met, progress: met ? 100 : Math.round((streak / 100) * 100), date: met ? 'Recently' : null };
      }
      return ach;
    });
  }, [streak]);

  const filteredAchievements = useMemo(() => {
    if (activeTab === 'All') return achievements;
    return achievements.filter(ach => ach.category === activeTab);
  }, [achievements, activeTab]);

  const totalUnlocked = achievements.filter(a => a.unlocked).length;
  const completionPercentage = Math.round((totalUnlocked / achievements.length) * 100);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center pt-[72px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 size={36} className="text-brand-500" />
          </motion.div>
          <p className="text-slate-500 text-sm">Polishing trophies…</p>
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
          <p className="text-slate-500">Sign in to view your milestones.</p>
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
                <Sparkles size={10} /> Achievements
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Milestones</h1>
            <p className="text-sm text-slate-500 mt-1">Celebrate your coding accomplishments and stay consistent.</p>
          </div>

          <div className="flex items-center gap-6 bg-slate-900/60 border border-white/[0.05] p-4 rounded-2xl shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black text-brand-400">Lv. 18</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wide">Current Level</div>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-2xl font-black text-white">{totalUnlocked * 150}</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wide">Total XP</div>
            </div>
            <div className="w-px h-8 bg-white/[0.06]" />
            <div className="text-center">
              <div className="text-2xl font-black text-amber-400">{completionPercentage}%</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-wide">Completion</div>
            </div>
          </div>
        </div>

        {/* ══ HERO LEVEL CARD & FEATURED ACHIEVEMENT ═══════ */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Level Hero Card */}
          <div className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            
            <div className="absolute top-0 right-0 w-44 h-44 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">Trophy Progress</span>
                  <h2 className="text-xl font-extrabold text-white mt-0.5">Duolingo-Style Levels</h2>
                </div>
                <Trophy className="text-amber-400" size={24} />
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Level 18 Experience</span>
                  <span className="text-white">1,240 / 1,500 XP</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-white/[0.04]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-indigo-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: '82%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Next Unlock Reward</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Algorithm Master Badge</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-indigo-400">+250 XP</span>
            </div>
          </div>

          {/* Featured Achievement */}
          <div className="rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Featured Achievement</span>
                <h3 className="text-2xl font-black text-white mt-1 leading-tight">30 Day Streak</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">Conquered consistency rules and synchronized 30 days consecutive solves on LeetCode.</p>
              </div>
              
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-3xl shadow-xl shadow-amber-500/10 shrink-0">
                🔥
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-brand-400" /> Completed</span>
              <span>Awarded <strong>July 12, 2026</strong></span>
            </div>
          </div>

        </div>

        {/* ══ CATEGORY SELECTION TABS ═══════════════════════ */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 border-b border-white/[0.06] scrollbar-none">
          {['All', 'Streaks', 'Problems', 'Topics', 'Competitions', 'Community', 'Special'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeTab === tab
                  ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {tab === 'All' ? '📂 View All' : tab}
            </button>
          ))}
        </div>

        {/* ══ GRID LAYOUT OF TROPHIES ═══════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAchievements.map((ach, i) => (
            <AchievementCard key={ach.id} ach={ach} index={i} />
          ))}
        </div>

        {/* ══ PROGRESS CARDS & GOALS ════════════════════════ */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6">
          
          {/* Progress Tracker Card */}
          <div className="rounded-2xl p-6 space-y-5"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target size={16} className="text-brand-400" /> Progress Trackers
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Interactive milestones in progress</p>
            </div>

            <div className="space-y-4">
              {[
                { title: 'Solve 100 Problems', current: 74, target: 100, color: 'from-blue-500 to-indigo-500' },
                { title: 'Consistency streak target', current: streak, target: 30, color: 'from-orange-500 to-red-500' },
                { title: 'Peer Room Invites', current: 3, target: 5, color: 'from-purple-500 to-pink-500' }
              ].map(({ title, current, target, color }) => {
                const pct = Math.min(100, Math.round((current / target) * 100));
                return (
                  <div key={title} className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-white">{title}</span>
                      <span className="text-slate-400">{current} / {target}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">{pct}% completed</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline & Unlocks */}
          <div className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock size={16} className="text-brand-400" /> Recent Unlocks
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Your latest trophy records</p>
            </div>

            <div className="space-y-4 my-6">
              {[
                { icon: Trophy, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', title: 'Graph Explorer Unlocked', time: '2 days ago' },
                { icon: Flame, color: '#f97316', bg: 'rgba(249,115,22,0.1)', title: '30 Day Streak Completed', time: '1 week ago' },
                { icon: Target, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'First Group Created', time: '2 weeks ago' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.bg }}>
                    <item.icon size={14} color={item.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{item.title}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs border-t border-white/[0.05] pt-4 text-slate-500">
              <span>Next challenge in progress</span>
              <span className="text-brand-400 font-semibold flex items-center gap-1">Solve Graphs <ChevronRight size={12} /></span>
            </div>
          </div>

        </div>

        {/* ══ badge showcase horizontal gallery ════════════ */}
        <div className="rounded-2xl p-6"
          style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="mb-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award size={16} className="text-amber-400" /> Badge Showroom
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Collect milestones across all tiers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Legendary', bg: 'from-purple-500 to-indigo-600', emoji: '✨', desc: 'Rarest coding unlocks' },
              { type: 'Gold', bg: 'from-amber-400 to-yellow-500', emoji: '🌟', desc: 'Advanced DSA masteries' },
              { type: 'Silver', bg: 'from-slate-400 to-slate-500', emoji: '🥈', desc: 'Intermediate tags completed' },
              { type: 'Bronze', bg: 'from-orange-600 to-amber-700', emoji: '🥉', desc: 'Starting habit foundations' }
            ].map((showroom, i) => (
              <motion.div
                key={showroom.type}
                whileHover={{ scale: 1.03, y: -2 }}
                className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] flex flex-col items-center gap-3 text-center cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${showroom.bg} flex items-center justify-center text-2xl shadow-xl`}>
                  {showroom.emoji}
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">{showroom.type} Tier</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{showroom.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
