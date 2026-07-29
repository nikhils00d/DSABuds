import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
  Bell, CheckCircle2, AlertTriangle, Info, Zap, Flame, Trophy,
  Users, Target, Award, Star, Clock, Sparkles, Shield, Trash2,
  Check, ArrowRight, Settings, Loader2
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ── Animation presets ── */
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };

/* ── Mock Initial Notifications Data ── */
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    category: 'Streaks',
    type: 'success',
    title: 'Streak Milestone! 🔥',
    description: 'Your LeetCode streak has reached 30 days! Keep up the incredible consistency.',
    time: '12 minutes ago',
    unread: true,
    action: { label: 'View Streaks', to: '/profile' }
  },
  {
    id: 2,
    category: 'Groups',
    type: 'warning',
    title: 'Leaderboard Update 🏆',
    description: 'Rahul solved 3 problems today and overtook you on the DSA Warriors leaderboard.',
    time: '2 hours ago',
    unread: true,
    action: { label: 'View Leaderboard', to: '/dashboard' }
  },
  {
    id: 3,
    category: 'Fines',
    type: 'danger',
    title: 'Fine Notification 💰',
    description: 'You received a ₹20 fine for missing your daily solve target yesterday.',
    time: '5 hours ago',
    unread: true,
    action: { label: 'Pay Now', to: '/dashboard' }
  },
  {
    id: 4,
    category: 'Groups',
    type: 'info',
    title: 'New Member Joined 👥',
    description: 'Aman Sood used your invite code and joined the DSA Warriors accountability group.',
    time: 'Yesterday',
    unread: false,
    action: { label: 'View Group', to: '/dashboard' }
  },
  {
    id: 5,
    category: 'Special',
    type: 'info',
    title: 'Daily Challenge Available 🎯',
    description: 'Today\'s recommended problem is "Rotten Oranges" (Graph BFS). Est. time: 25 mins.',
    time: 'Yesterday',
    unread: false,
    action: { label: 'Solve Now', to: '/dashboard' }
  },
  {
    id: 6,
    category: 'Achievements',
    type: 'success',
    title: 'New Achievement Unlocked! ⭐',
    description: 'Congratulations! You unlocked the "Graph Explorer" milestone by solving 25 graph problems.',
    time: '2 days ago',
    unread: false,
    action: { label: 'View Trophies', to: '/achievements' }
  },
];

/* ── Notification Card Component ── */
const NotificationCard = ({ notification, onMarkRead, onDismiss }) => {
  const { id, category, type, title, description, time, unread, action } = notification;

  const config = {
    success: { icon: CheckCircle2, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.18)' },
    info: { icon: Info, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.18)' },
    warning: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.18)' },
    danger: { icon: AlertTriangle, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.18)' },
  };

  const current = config[type] || config.info;
  const Icon = current.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group relative cursor-default ${
        unread
          ? 'border-white/[0.09] bg-[#111827] shadow-xl'
          : 'border-white/[0.04] bg-white/[0.01] opacity-70'
      }`}
    >
      {/* Unread blue pulsing dot on left */}
      {unread && (
        <span className="absolute top-1/2 left-3 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)] animate-pulse hidden md:block" />
      )}

      {/* Content block */}
      <div className={`flex items-start gap-4 ${unread ? 'md:pl-4' : ''}`}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
          style={{ background: current.bg, border: `1px solid ${current.border}` }}>
          <Icon size={18} color={current.color} strokeWidth={2} />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`text-sm font-bold leading-tight ${unread ? 'text-white' : 'text-slate-300'}`}>{title}</h4>
            <span className="text-[10px] text-slate-500 font-semibold">• {time}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">{description}</p>
        </div>
      </div>

      {/* Action triggers */}
      <div className="flex items-center gap-2 shrink-0 self-end md:self-center ml-auto md:ml-0 relative z-10">
        {action && (
          <Link
            to={action.to}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white/[0.04] border border-white/[0.07] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1"
          >
            {action.label} <ArrowRight size={11} />
          </Link>
        )}
        
        {unread && (
          <button
            onClick={() => onMarkRead(id)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-brand-400 hover:bg-brand-500/10 transition-colors"
            title="Mark as Read"
          >
            <Check size={14} />
          </button>
        )}

        <button
          onClick={() => onDismiss(id)}
          className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="Dismiss Notification"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default function Notifications() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
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
        console.error('Failed to load user profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const filteredNotifications = useMemo(() => {
    let list = notifications;
    if (activeTab === 'Unread') {
      return list.filter(n => n.unread);
    }
    if (activeTab !== 'All') {
      return list.filter(n => n.category === activeTab);
    }
    return list;
  }, [notifications, activeTab]);

  const handleMarkRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center pt-[72px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 size={36} className="text-brand-500" />
          </motion.div>
          <p className="text-slate-500 text-sm">Syncing feeds…</p>
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
          <p className="text-slate-500">Sign in to view your notification feed.</p>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-[#0B1120] pt-[72px] pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* ══ HEADER SECTION ════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center gap-1">
                <Bell size={10} /> Notification Center
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              Updates
              {unreadCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full font-black bg-blue-500 text-white shadow-lg shadow-blue-500/25">
                  {unreadCount} New
                </span>
              )}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Stay updated with your coding journey.</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white transition-all text-xs font-semibold"
              >
                <Check size={13} /> Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 transition-all text-xs font-semibold"
              >
                <Trash2 size={13} /> Clear all
              </button>
            )}
          </div>
        </div>

        {/* ══ FILTER TABS ═══════════════════════════════════ */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 border-b border-white/[0.06] scrollbar-none">
          {['All', 'Unread', 'Groups', 'Achievements', 'Streaks', 'Fines'].map(tab => {
            const count = tab === 'All'
              ? notifications.length
              : tab === 'Unread'
              ? unreadCount
              : notifications.filter(n => n.category === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                  activeTab === tab
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {tab}
                {count > 0 && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === tab ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-500'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ══ NOTIFICATION FEED ═════════════════════════════ */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(n => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onMarkRead={handleMarkRead}
                  onDismiss={handleDismiss}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-white/[0.05] p-12 text-center flex flex-col items-center justify-center bg-white/[0.005]"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
                  <CheckCircle2 size={24} className="text-brand-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">You're all caught up!</h3>
                <p className="text-xs text-slate-500 max-w-xs">No notifications found in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
