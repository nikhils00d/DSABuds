import { useState, useEffect, useContext } from 'react'
import { Sun, Moon, Target, UserCircle, LogOut } from 'lucide-react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import GroupView from './pages/GroupView'
import Profile from './pages/Profile'
import AuthModal from './components/AuthModal'
import { AuthContext } from './context/AuthContext'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-300">
        {/* Navbar */}
        <nav className="fixed w-full z-40 glass top-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <Target className="w-8 h-8 text-brand-500" />
                <span className="font-bold text-xl tracking-tight">DSAbuds</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
                </button>
                <Link to="/dashboard" className="px-4 py-2 text-sm font-medium hover:text-brand-500 transition-colors">
                  Dashboard
                </Link>
                {user ? (
                  <>
                    <Link to="/profile" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Profile">
                      <UserCircle className="w-6 h-6 text-brand-500" />
                    </Link>
                    <button 
                      onClick={logout}
                      className="px-4 py-2 flex items-center gap-2 text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors shadow-lg shadow-brand-500/30"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups/:id" element={<GroupView />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </div>
    </BrowserRouter>
  )
}

export default App
