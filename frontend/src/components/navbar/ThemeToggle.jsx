import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="h-10 w-10 rounded-xl border border-white/[0.12] bg-white/[0.04] text-slate-300 hover:bg-white/[0.1] hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
    >
      {darkMode ? <Sun className="mx-auto h-4.5 w-4.5 text-amber-400" /> : <Moon className="mx-auto h-4.5 w-4.5" />}
    </motion.button>
  )
}
