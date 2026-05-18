import { useState, useEffect } from 'react'
import { Sun, Moon, Target, Shield, Users, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Target className="w-8 h-8 text-brand-500" />
              <span className="font-bold text-xl tracking-tight">DSAbuds</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:text-brand-500 transition-colors">
                Log In
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors shadow-lg shadow-brand-500/30">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center py-20 relative">
          {/* Decorative blur elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Consistency is the key to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
              Cracking the Interview
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10"
          >
            Join accountability groups, track your LeetCode streaks automatically, and put your money where your code is with our dynamic fine system.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="px-8 py-4 text-lg font-bold bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-all hover:scale-105 shadow-xl shadow-brand-500/30">
              Create a Group
            </button>
            <button className="px-8 py-4 text-lg font-bold glass-card hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-105">
              Join with Code
            </button>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-blue-500" />}
            title="Social Accountability"
            description="Create groups with your peers. Miss a day of practice? Your whole group sees it, and you pay a fine."
          />
          <FeatureCard 
            icon={<Target className="w-8 h-8 text-brand-500" />}
            title="Auto Streak Tracking"
            description="We sync directly with LeetCode. Just solve a problem and your streak is automatically updated."
          />
          <FeatureCard 
            icon={<Trophy className="w-8 h-8 text-amber-500" />}
            title="Dynamic Fines"
            description="₹10 on day 1. ₹20 on day 2. The more days you miss, the higher the fine. Don't break the streak."
          />
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 shadow-inner">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default App
