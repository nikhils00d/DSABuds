import { useContext, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import BrandMark from '../components/common/BrandMark'

export default function AuthPage({ mode = 'login' }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, signup } = useContext(AuthContext)

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const from = location.state?.from?.pathname || '/dashboard'

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (isRegister && form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      if (isRegister) {
        await signup(form.username, form.email, form.password)
      } else {
        await login(form.email, form.password)
      }
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1120] pt-[72px] text-slate-100">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 hero-noise opacity-50" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <section className="hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-brand-500/15 to-cyan-500/10 p-8 lg:block">
          <Link to="/" className="inline-flex items-center gap-2 text-white">
            <BrandMark />
          </Link>
          <h1 className="mt-7 text-4xl font-extrabold leading-tight text-white">
            {isRegister ? 'Create Your Prep System' : 'Welcome Back To Your Streak'}
          </h1>
          <p className="mt-4 text-slate-300">
            {isRegister
              ? 'Join accountability groups, sync your coding profile, and build momentum that compounds.'
              : 'Pick up where you left off and continue your interview prep with focused consistency.'}
          </p>
          <div className="mt-10 space-y-4 text-sm text-slate-200">
            <p>Daily streak tracking with visible accountability</p>
            <p>Group-based challenges and leaderboard dynamics</p>
            <p>Analytics to improve consistency week after week</p>
          </div>
        </section>

        <section className="flex items-center">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={onSubmit}
            className="w-full rounded-3xl border border-white/[0.1] bg-[#0d162a]/90 p-7 backdrop-blur-xl sm:p-8"
          >
            <h2 className="text-3xl font-bold text-white">{isRegister ? 'Sign Up' : 'Login'}</h2>
            <p className="mt-2 text-sm text-slate-400">
              {isRegister ? 'Start with a free account.' : 'Access your dashboard and groups.'}
            </p>

            <div className="mt-6 space-y-4">
              {isRegister && (
                <div>
                  <label htmlFor="username" className="mb-1 block text-sm font-medium text-slate-200">Username</label>
                  <input
                    id="username"
                    name="username"
                    required
                    value={form.username}
                    onChange={onChange}
                    className="w-full rounded-xl border border-white/[0.14] bg-[#091122] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                    placeholder="sumitthakur"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="w-full rounded-xl border border-white/[0.14] bg-[#091122] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-200">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={onChange}
                    className="w-full rounded-xl border border-white/[0.14] bg-[#091122] px-4 py-3 pr-11 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isRegister && (
                <div>
                  <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-200">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={onChange}
                    className="w-full rounded-xl border border-white/[0.14] bg-[#091122] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
                    placeholder="Re-enter password"
                  />
                </div>
              )}
            </div>

            {error ? <p className="mt-4 text-sm font-medium text-red-300">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isRegister ? 'Create Account' : 'Login'}
            </button>

            <p className="mt-4 text-sm text-slate-400">
              {isRegister ? 'Already have an account? ' : 'New to DSABuds? '}
              <Link to={isRegister ? '/login' : '/register'} className="font-semibold text-brand-300 hover:text-brand-200">
                {isRegister ? 'Login' : 'Create one'}
              </Link>
            </p>
          </motion.form>
        </section>
      </div>
    </div>
  )
}
