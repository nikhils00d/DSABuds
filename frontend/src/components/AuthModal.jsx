import React, { useState, useContext } from 'react';
import {
  X, Mail, Lock, User as UserIcon, Activity, Sparkles,
  Shield, ArrowRight, Check, AlertTriangle, Loader2,
  Eye, EyeOff, BookOpen, Flame, Users, Trophy, TrendingUp,
  KeyRound
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Reusable Custom Input Component ── */
const InputField = ({ label, name, type, value, onChange, placeholder, icon: Icon, rightElement, required = true }) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />}
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 ${rightElement ? 'pr-10' : 'pr-4'} py-2.5 bg-slate-900/60 border border-white/[0.08] rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 text-sm transition-all`}
          placeholder={placeholder}
        />
        {rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Inline SVG Logos for Social Providers ── */
const GoogleLogo = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const GithubLogo = () => (
  <svg className="w-5 h-5 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const AuthModal = ({ isOpen, onClose }) => {
  const [authState, setAuthState] = useState('login'); // 'login' | 'register' | 'forgot'
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    college: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const checkPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 3) return { score, label: 'Medium', color: 'bg-orange-500' };
    return { score, label: 'Strong', color: 'bg-brand-500' };
  };

  const passStrength = checkPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (authState === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!formData.acceptTerms) {
        setError('You must accept the terms & conditions');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (authState === 'login') {
        await login(formData.email, formData.password);
        onClose();
      } else if (authState === 'register') {
        // existing API only takes username, email, password
        await signup(formData.username, formData.email, formData.password);
        onClose();
      } else if (authState === 'forgot') {
        // mock success for forgot password link
        await new Promise((res) => setTimeout(res, 1200));
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1120] overflow-y-auto">
      <div className="min-h-screen flex flex-col lg:flex-row">
        
        {/* ══ LEFT PANEL (60% Brand Showcase) ════════════════ */}
        <div className="hidden lg:flex lg:w-[60%] bg-[#0B1120] relative flex-col justify-between p-12 overflow-hidden border-r border-white/[0.05]">
          
          {/* Grids and Glowing Auroras */}
          <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 hero-noise pointer-events-none opacity-40" aria-hidden="true" />
          
          {/* Aurora Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.15] blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-[0.12] blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />

          {/* Top Info */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-center justify-center shadow-lg shadow-brand-500/10">
              <Sparkles className="w-5 h-5 text-brand-400" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">DSABuds</span>
          </div>

          {/* Center Showcase */}
          <div className="relative z-10 my-auto max-w-xl space-y-10">
            <div className="space-y-4">
              <h1 className="text-5xl font-black tracking-tight text-white leading-[1.1]">
                Stay Consistent.<br />
                <span className="text-shimmer">Crack Every Interview.</span>
              </h1>
              <p className="text-slate-400 text-base leading-relaxed">
                Connect with peers, create coding rooms, track automatic LeetCode sync status, and stay accountable with dynamic habit-forming fines.
              </p>
            </div>

            {/* Dashboard Preview Cards Mockup */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Flame, color: '#f97316', bg: 'rgba(249,115,22,0.12)', val: '23', label: 'Day Streak', trend: '🔥 Active' },
                { icon: Users, color: '#a855f7', bg: 'rgba(168,85,247,0.12)', val: '4', label: 'Active Groups', trend: '👥 Connected' },
                { icon: Trophy, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', val: '#2', label: 'Rank', trend: '🏆 Top 10%' },
                { icon: TrendingUp, color: '#22c55e', bg: 'rgba(34,197,94,0.12)', val: '92%', label: 'Consistency', trend: '📈 Strong' },
              ].map(({ icon: Icon, color, bg, val, label, trend }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="rounded-2xl p-5 border border-white/[0.06] flex flex-col gap-3 group relative cursor-default"
                  style={{ background: 'linear-gradient(145deg, #111827 0%, #0d1424 100%)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                      <Icon size={16} color={color} />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">{trend}</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">{val}</div>
                    <div className="text-xs text-slate-500 font-semibold">{label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Metas */}
          <div className="relative z-10 text-xs text-slate-500">
            © {new Date().getFullYear()} DSABuds Inc. All rights reserved.
          </div>
        </div>

        {/* ══ RIGHT PANEL (40% Auth Form) ════════════════════ */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:w-[40%] bg-[#0B1120] relative">
          
          {/* Close button for Modal behavior */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.05] transition-all"
            aria-label="Close authentication page"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Centered card wrapper */}
          <div className="w-full max-w-[420px] space-y-6">
            
            {/* Header info for mobile (Show logo) */}
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/25 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-brand-400" />
              </div>
              <span className="text-lg font-black text-white">DSABuds</span>
            </div>

            {/* Auth panel */}
            <div className="space-y-6">
              
              {/* Form Heading Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {authState === 'login' && 'Welcome Back 👋'}
                  {authState === 'register' && 'Get Started ✨'}
                  {authState === 'forgot' && 'Reset Password 🔒'}
                </h2>
                <p className="text-sm text-slate-500 mt-1.5">
                  {authState === 'login' && 'Continue your coding journey.'}
                  {authState === 'register' && 'Build coding habits with your peers.'}
                  {authState === 'forgot' && 'Enter your email to receive a reset link.'}
                </p>
              </div>

              {/* API and Validation Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Forgot password success state */}
              {success && authState === 'forgot' && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold flex flex-col gap-2 text-center items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 mb-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>Reset link has been sent! Check your inbox.</span>
                </motion.div>
              )}

              {/* Form block */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Social Login buttons (Only on login / register views) */}
                {authState !== 'forgot' && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="flex items-center justify-center py-2.5 rounded-xl border border-white/[0.08] bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-900 transition-all font-semibold text-xs"
                      >
                        <GoogleLogo /> Google
                      </button>
                      <button
                        type="button"
                        className="flex items-center justify-center py-2.5 rounded-xl border border-white/[0.08] bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-900 transition-all font-semibold text-xs"
                      >
                        <GithubLogo /> GitHub
                      </button>
                    </div>

                    <div className="flex items-center gap-3 py-2">
                      <div className="h-px flex-1 bg-white/[0.06]" />
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">or continue with email</span>
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                  </div>
                )}

                {/* Fields Switch */}
                {authState === 'register' && (
                  <>
                    <InputField
                      label="Full Name"
                      name="fullName"
                      type="text"
                      placeholder="Sumit Thakur"
                      value={formData.fullName}
                      onChange={handleChange}
                      icon={UserIcon}
                    />
                    <InputField
                      label="Username"
                      name="username"
                      type="text"
                      placeholder="sumitthakur"
                      value={formData.username}
                      onChange={handleChange}
                      icon={UserIcon}
                    />
                    <InputField
                      label="College (Optional)"
                      name="college"
                      type="text"
                      placeholder="IIT Bombay"
                      value={formData.college}
                      onChange={handleChange}
                      icon={BookOpen}
                      required={false}
                    />
                  </>
                )}

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                />

                {authState !== 'forgot' && (
                  <InputField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    icon={Lock}
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-500 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                )}

                {/* Password strength progress indicator */}
                {authState !== 'forgot' && formData.password && (
                  <div className="space-y-1 mt-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 font-medium">Password strength</span>
                      <span className="font-bold text-slate-400">{passStrength.label}</span>
                    </div>
                    <div className="h-1 rounded-full bg-slate-800 overflow-hidden flex gap-0.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 transition-colors ${
                            i < passStrength.score ? passStrength.color : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {authState === 'register' && (
                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    icon={Lock}
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-slate-500 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                )}

                {/* Additional controls (Forgot link/Accept terms) */}
                {authState === 'login' && (
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={() => { setAuthState('forgot'); setError(''); setSuccess(false) }}
                      className="text-xs font-semibold text-slate-500 hover:text-white hover:underline transition-all"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {authState === 'register' && (
                  <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="mt-0.5 rounded border-white/[0.08] bg-slate-900 text-brand-500 focus:ring-brand-500/40"
                    />
                    <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors leading-snug">
                      I accept the <span className="text-brand-400 hover:underline">Terms of Service</span> and <span className="text-brand-400 hover:underline">Privacy Policy</span>.
                    </span>
                  </label>
                )}

                {/* Primary Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand-500/25 mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <>
                      <span>
                        {authState === 'login' && 'Sign In'}
                        {authState === 'register' && 'Create Account'}
                        {authState === 'forgot' && 'Send Reset Link'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Form Footer Toggles */}
              <div className="text-center pt-2">
                {authState === 'login' && (
                  <p className="text-xs text-slate-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthState('register'); setError(''); setSuccess(false) }}
                      className="text-brand-400 font-bold hover:underline transition-colors"
                    >
                      Create one
                    </button>
                  </p>
                )}

                {authState === 'register' && (
                  <p className="text-xs text-slate-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthState('login'); setError(''); setSuccess(false) }}
                      className="text-brand-400 font-bold hover:underline transition-colors"
                    >
                      Log in
                    </button>
                  </p>
                )}

                {authState === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => { setAuthState('login'); setError(''); setSuccess(false) }}
                    className="text-xs text-brand-400 font-bold hover:underline transition-colors"
                  >
                    Back to Log In
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
