import React, { useState, useEffect, useContext } from 'react';
import {
  Settings as SettingsIcon, User, Lock, Eye, Bell, Shield,
  Link as LinkIcon, Users, Trash2, Check, AlertTriangle,
  Loader2, Sun, Moon, Sparkles, Monitor, Palette, Globe, MapPin
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Custom Reusable Toggle Switch Component ── */
const Toggle = ({ checked, onChange, ariaLabel }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${
        checked ? 'bg-brand-500' : 'bg-slate-800'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

/* ── Reusable Settings Card Component ── */
const SettingsCard = ({ id, title, description, icon: Icon, iconColor = '#22c55e', children }) => {
  return (
    <section
      id={id}
      className="rounded-2xl p-6 space-y-6 transition-colors duration-300"
      style={{
        background: 'var(--panel-bg)',
        border: '1px solid var(--panel-border)',
        boxShadow: 'var(--panel-shadow)',
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${iconColor}12`, border: `1px solid ${iconColor}22` }}>
          <Icon size={15} color={iconColor} />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight">{title}</h3>
          {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
        </div>
      </div>
      <div className="pt-2">{children}</div>
    </section>
  );
};

export default function Settings({ darkMode, setDarkMode }) {
  const { user: authUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('general');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: '',
    location: '',
    timezone: 'Asia/Kolkata',
    leetcodeUsername: '',
    githubUsername: '',
    linkedinUsername: ''
  });

  // Toggles State
  const [preferences, setPreferences] = useState({
    theme: darkMode ? 'dark' : 'light',
    accentColor: 'green',
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    achievementAlerts: true,
    fineAlerts: true,
    groupActivity: true,
    profileVisibility: 'public',
    showStats: true,
    showStreak: true,
    showActivity: true,
    autoJoinGroups: true,
    invitePreferences: 'anyone'
  });

  useEffect(() => {
    setPreferences(prev => ({ ...prev, theme: darkMode ? 'dark' : 'light' }));
  }, [darkMode]);

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch initial profile values
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('dsabuds_token');
        if (!token) return;
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          setFormData({
            fullName: data.username || '',
            username: data.username || '',
            bio: 'DSA Enthusiast | Full Stack Developer',
            location: 'Mumbai, India',
            timezone: 'Asia/Kolkata',
            leetcodeUsername: data.leetcodeUsername || '',
            githubUsername: data.githubUsername || '',
            linkedinUsername: data.linkedinUsername || ''
          });
        }
      } catch (err) {
        console.error('Failed to load settings data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreferenceChange = (key, val) => {
    setPreferences({ ...preferences, [key]: val });
    if (key === 'theme') {
      if (val === 'dark') {
        setDarkMode(true);
      } else if (val === 'light') {
        setDarkMode(false);
      } else if (val === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(systemPrefersDark);
      }
    }
  };

  const handleSaveGeneral = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('dsabuds_token');
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username,
          leetcodeUsername: formData.leetcodeUsername,
          githubUsername: formData.githubUsername,
          linkedinUsername: formData.linkedinUsername
        })
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || 'Failed to update preferences');
      }
    } catch (err) {
      setErrorMsg('Network error. Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const sidebarItems = [
    { id: 'general', label: 'General', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Safety', icon: Shield },
    { id: 'connections', label: 'Connections', icon: LinkIcon },
    { id: 'groups', label: 'Group Prefs', icon: Users },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, color: '#ef4444' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 flex items-center justify-center pt-[72px]">
        <div className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
            <Loader2 size={36} className="text-brand-500" />
          </motion.div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading configurations…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 pt-[72px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ══ HEADER SECTION ════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-brand-500/10 border border-brand-500/20 text-brand-500 dark:text-brand-400 flex items-center gap-1 w-fit">
              <SettingsIcon size={10} /> Control Center
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences and connection sync rules.</p>
        </div>

        {/* ══ SETTINGS LAYOUT ═══════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
          
          {/* Sidebar navigation */}
          <aside className="lg:sticky lg:top-24 space-y-1.5 bg-slate-100/50 dark:bg-slate-900/40 p-2 rounded-2xl border border-slate-200 dark:border-white/[0.04] scrollbar-none transition-colors duration-300">
            {sidebarItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-slate-800 dark:text-white font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.03]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="settings-active"
                      className="absolute inset-0 bg-white dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] rounded-xl shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon size={16} color={isActive ? (item.color || '#22c55e') : '#64748b'} className="relative z-10 animate-[pulse_4s_infinite]" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Main Content Area */}
          <div className="space-y-6 lg:max-w-3xl">
            
            {/* ─ Section 1: General ─ */}
            <div id="general">
              <SettingsCard id="general" title="General Settings" description="Update your display profile metadata." icon={User} iconColor="#4ade80">
                <form onSubmit={handleSaveGeneral} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Display Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 text-sm transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Bio</label>
                    <textarea
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 text-sm transition-all"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 text-sm transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Timezone</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <select
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 text-sm transition-all appearance-none"
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                          <option value="America/New_York">America/New_York (EST)</option>
                          <option value="Europe/London">Europe/London (GMT)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle size={14} /> {errorMsg}
                    </div>
                  )}

                  {saveSuccess && (
                    <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold flex items-center gap-2">
                      <Check size={14} /> Profile settings saved successfully!
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-2 shadow-lg shadow-brand-500/25"
                    >
                      {saving && <Loader2 size={14} className="animate-spin" />}
                      Save Preferences
                    </button>
                  </div>
                </form>
              </SettingsCard>
            </div>

            {/* ─ Section 2: Appearance ─ */}
            <div id="appearance">
              <SettingsCard id="appearance" title="Appearance Settings" description="Customize themes and highlights." icon={Palette} iconColor="#3b82f6">
                <div className="space-y-6">
                  {/* Theme Select */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Choose Theme</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'dark', label: 'Dark Mode', icon: Moon, activeBg: 'bg-slate-900 border-white/20' },
                        { id: 'light', label: 'Light Mode', icon: Sun, activeBg: 'bg-white text-slate-900 border-slate-300' },
                        { id: 'system', label: 'System Defaults', icon: Monitor, activeBg: 'bg-slate-900/50 border-white/10' }
                      ].map(t => {
                        const Icon = t.icon;
                        const isSelected = preferences.theme === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handlePreferenceChange('theme', t.id)}
                            className={`p-4 rounded-xl border text-center flex flex-col items-center gap-2 transition-all ${
                              isSelected
                                ? `${t.activeBg} border-brand-500 ring-2 ring-brand-500/30`
                                : 'border-white/[0.05] bg-white/[0.01] text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <Icon size={18} />
                            <span className="text-xs font-bold">{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Accent Highlight Color */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accent Highlight Color</h4>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        { id: 'green', color: '#22c55e', label: 'Green Accent' },
                        { id: 'blue', color: '#3b82f6', label: 'Blue Accent' },
                        { id: 'purple', color: '#a855f7', label: 'Purple Accent' },
                        { id: 'pink', color: '#ec4899', label: 'Pink Accent' }
                      ].map(c => {
                        const isSelected = preferences.accentColor === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => handlePreferenceChange('accentColor', c.id)}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all text-xs font-bold"
                            style={{
                              borderColor: isSelected ? c.color : 'rgba(255,255,255,0.06)',
                              background: isSelected ? `${c.color}15` : 'rgba(255,255,255,0.01)',
                              color: isSelected ? c.color : '#94a3b8'
                            }}
                          >
                            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: c.color }} />
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SettingsCard>
            </div>

            {/* ─ Section 3: Notifications ─ */}
            <div id="notifications">
              <SettingsCard id="notifications" title="Notification Preferences" description="Configure notification alert channels." icon={Bell} iconColor="#f59e0b">
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive daily status mail logs.' },
                    { key: 'pushNotifications', label: 'Desktop Push Notifications', desc: 'Receive in-app alerts on streaks.' },
                    { key: 'weeklyReports', label: 'Weekly Summary Reports', desc: 'Receive weekend performance breakdown sheets.' },
                    { key: 'achievementAlerts', label: 'Achievement Alert Banners', desc: 'Alert when a milestone is completed.' },
                    { key: 'fineAlerts', label: 'Fine Overdue Alerts', desc: 'Send warnings when streak miss triggers penalties.' },
                    { key: 'groupActivity', label: 'Group Chat activity flags', desc: 'Alert when a peer updates leader standings.' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.005]">
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.label}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                      </div>
                      <Toggle
                        checked={preferences[item.key]}
                        onChange={val => handlePreferenceChange(item.key, val)}
                        ariaLabel={item.label}
                      />
                    </div>
                  ))}
                </div>
              </SettingsCard>
            </div>

            {/* ─ Section 4: Privacy ─ */}
            <div id="privacy">
              <SettingsCard id="privacy" title="Privacy & Profile Settings" description="Restrict visibility of metrics." icon={Shield} iconColor="#ef4444">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Profile Visibility</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['public', 'friends', 'private'].map(v => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => handlePreferenceChange('profileVisibility', v)}
                          className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-all border ${
                            preferences.profileVisibility === v
                              ? 'bg-brand-500 text-white border-brand-500'
                              : 'border-white/[0.06] bg-transparent text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/[0.05]">
                    {[
                      { key: 'showStats', label: 'Show solved statistics on dashboard', desc: 'Make LeetCode count visible to groups.' },
                      { key: 'showStreak', label: 'Show active consistency streaks', desc: 'Permit peers to view streak meters.' },
                      { key: 'showActivity', label: 'Show recent timeline activities', desc: 'Log solve updates to peer rooms.' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-white/[0.04] bg-white/[0.005]">
                        <div>
                          <h4 className="text-xs font-bold text-white">{item.label}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                        <Toggle
                          checked={preferences[item.key]}
                          onChange={val => handlePreferenceChange(item.key, val)}
                          ariaLabel={item.label}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </SettingsCard>
            </div>

            {/* ─ Section 5: Connections ─ */}
            <div id="connections">
              <SettingsCard id="connections" title="Connections" description="Manage connected developer accounts." icon={LinkIcon} iconColor="#a855f7">
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: 'leetcode', platform: 'LeetCode Sync', icon: Star, color: '#f59e0b', field: 'leetcodeUsername' },
                    { id: 'github', platform: 'GitHub Integration', icon: Code2, color: '#94a3b8', field: 'githubUsername' },
                    { id: 'linkedin', platform: 'LinkedIn Connector', icon: Briefcase, color: '#3b82f6', field: 'linkedinUsername' }
                  ].map(c => {
                    const val = formData[c.field];
                    const isLinked = val && val !== '';
                    return (
                      <div key={c.id} className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.005] space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                            <c.icon size={15} color={c.color} />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{c.platform}</h4>
                            <p className="text-[10px] text-slate-500 truncate max-w-[140px]">{isLinked ? val : 'Not connected'}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-1.5">
                          {isLinked ? (
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, [c.field]: '' })}
                              className="w-full py-1.5 rounded-lg border border-red-500/20 text-[10px] font-bold text-red-400 hover:bg-red-500/10 transition-colors text-center"
                            >
                              Disconnect
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveSection('general');
                                document.getElementById('general')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="w-full py-1.5 rounded-lg border border-brand-500/20 text-[10px] font-bold text-brand-400 hover:bg-brand-500/10 transition-colors text-center"
                            >
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SettingsCard>
            </div>

            {/* ─ Section 6: Groups ─ */}
            <div id="groups">
              <SettingsCard id="groups" title="Group Settings" description="Preferences for peer accountability groups." icon={Users} iconColor="#06b6d4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.04] bg-slate-50 dark:bg-white/[0.005]">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">Auto-Join Accountability Groups</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">Automatically accept matching invites from verified peer streaks.</p>
                    </div>
                    <Toggle
                      checked={preferences.autoJoinGroups}
                      onChange={val => handlePreferenceChange('autoJoinGroups', val)}
                      ariaLabel="Auto Join Groups"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Group Invite Preferences</label>
                    <select
                      value={preferences.invitePreferences}
                      onChange={e => handlePreferenceChange('invitePreferences', e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 text-sm transition-all appearance-none"
                    >
                      <option value="anyone">Allow invites from anyone</option>
                      <option value="friends">Allow invites from friends only</option>
                      <option value="none">Block all incoming invites</option>
                    </select>
                  </div>
                </div>
              </SettingsCard>
            </div>

            {/* ─ Section 7: Danger Zone ─ */}
            <div id="danger">
              <section className="rounded-2xl p-6 border border-red-500/20 bg-red-500/[0.02] shadow-xl space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <AlertTriangle size={15} color="#ef4444" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight">Danger Zone</h3>
                    <p className="text-xs text-slate-500 mt-1">Destructive actions related to progress metrics.</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { label: 'Reset Coding Progress', desc: 'Clear all solved counts, streaks, and XP points. This action is irreversible.', trigger: () => alert('Confirming reset progress...') },
                    { label: 'Leave All Groups', desc: 'Remove user from all accountability folders. Fines will double if you re-join.', trigger: () => alert('Leaving all groups...') },
                    { label: 'Delete Account', desc: 'Delete credentials and details from the DB. This will terminate streak entries.', trigger: () => alert('Deleting account...') }
                  ].map(action => (
                    <div key={action.label} className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-red-500/10 bg-red-500/[0.01]">
                      <div>
                        <h4 className="text-xs font-bold text-red-400">{action.label}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{action.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={action.trigger}
                        className="px-3.5 py-1.5 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-all shrink-0"
                      >
                        Execute
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
