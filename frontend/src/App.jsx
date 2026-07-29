import { useState, useEffect, useContext, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import ProtectedRoute from './components/routing/ProtectedRoute'
import RouteTransition from './components/routing/RouteTransition'
import PageSkeleton from './components/common/PageSkeleton'
import SiteFooter from './components/common/SiteFooter'

const Landing = lazy(() => import('./pages/Landing'))
const Features = lazy(() => import('./pages/Features'))
const Pricing = lazy(() => import('./pages/Pricing'))
const About = lazy(() => import('./pages/About'))
const Brand = lazy(() => import('./pages/Brand'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Support = lazy(() => import('./pages/Support'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const GroupView = lazy(() => import('./pages/GroupView'))
const Groups = lazy(() => import('./pages/Groups'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const Challenges = lazy(() => import('./pages/Challenges'))
const Profile = lazy(() => import('./pages/Profile'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Achievements = lazy(() => import('./pages/Achievements'))
const Notifications = lazy(() => import('./pages/Notifications'))
const Settings = lazy(() => import('./pages/Settings'))
const Billing = lazy(() => import('./pages/Billing'))


const TITLE_MAP = [
  ['/', 'DSABuds - DSA Accountability SaaS'],
  ['/features', 'Features - DSABuds'],
  ['/pricing', 'Pricing - DSABuds'],
  ['/about', 'About - DSABuds'],
  ['/brand', 'Brand Guidelines - DSABuds'],
  ['/contact', 'Contact - DSABuds'],
  ['/privacy', 'Privacy Policy - DSABuds'],
  ['/terms', 'Terms of Service - DSABuds'],
  ['/support', 'Support - DSABuds'],
  ['/login', 'Login - DSABuds'],
  ['/register', 'Sign Up - DSABuds'],
  ['/dashboard', 'Dashboard - DSABuds'],
  ['/groups', 'Groups - DSABuds'],
  ['/leaderboard', 'Leaderboard - DSABuds'],
  ['/challenges', 'Challenges - DSABuds'],
  ['/analytics', 'Analytics - DSABuds'],
  ['/profile', 'Profile - DSABuds'],
  ['/achievements', 'Achievements - DSABuds'],
  ['/settings', 'Settings - DSABuds'],
  ['/billing', 'Billing - DSABuds'],
  ['/notifications', 'Notifications - DSABuds'],
]

function useDocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const entry = TITLE_MAP.find(([path]) => (
      path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)
    ))

    document.title = entry?.[1] || 'DSABuds'
  }, [pathname])
}

function AppRoutes({ user, darkMode, setDarkMode }) {
  const location = useLocation()

  useDocumentTitle()

  return (
    <Suspense fallback={<PageSkeleton />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RouteTransition><Landing /></RouteTransition>} />
          <Route path="/features" element={<RouteTransition><Features /></RouteTransition>} />
          <Route path="/pricing" element={<RouteTransition><Pricing /></RouteTransition>} />
          <Route path="/about" element={<RouteTransition><About /></RouteTransition>} />
          <Route path="/brand" element={<RouteTransition><Brand /></RouteTransition>} />
          <Route path="/contact" element={<RouteTransition><Contact /></RouteTransition>} />
          <Route path="/privacy" element={<RouteTransition><Privacy /></RouteTransition>} />
          <Route path="/terms" element={<RouteTransition><Terms /></RouteTransition>} />
          <Route path="/support" element={<RouteTransition><Support /></RouteTransition>} />
          <Route path="/login" element={<RouteTransition><Login /></RouteTransition>} />
          <Route path="/register" element={<RouteTransition><Register /></RouteTransition>} />

          <Route
            path="/dashboard"
            element={<ProtectedRoute user={user}><RouteTransition><Dashboard /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/groups"
            element={<ProtectedRoute user={user}><RouteTransition><Groups /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/groups/:id"
            element={<ProtectedRoute user={user}><RouteTransition><GroupView /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/leaderboard"
            element={<ProtectedRoute user={user}><RouteTransition><Leaderboard /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/challenges"
            element={<ProtectedRoute user={user}><RouteTransition><Challenges /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute user={user}><RouteTransition><Profile /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/analytics"
            element={<ProtectedRoute user={user}><RouteTransition><Analytics /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/achievements"
            element={<ProtectedRoute user={user}><RouteTransition><Achievements /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/notifications"
            element={<ProtectedRoute user={user}><RouteTransition><Notifications /></RouteTransition></ProtectedRoute>}
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute user={user}>
                <RouteTransition>
                  <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
                </RouteTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={<ProtectedRoute user={user}><RouteTransition><Billing /></RouteTransition></ProtectedRoute>}
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })
  const { user, loading, logout } = useContext(AuthContext)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <PageSkeleton />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-300">
        {/* Premium Navbar */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          logout={logout}
        />

        <main className="flex-1">
          <AppRoutes user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
        </main>

        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
