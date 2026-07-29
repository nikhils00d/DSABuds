import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'

export default function NotificationBell() {
  const { pathname } = useLocation()
  const active = pathname === '/notifications'

  return (
    <Link to="/notifications" aria-label="View notifications" className="relative">
      <motion.span
        whileHover={{ scale: 1.06, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
          active
            ? 'border-brand-400/60 bg-brand-500/10 text-brand-400 shadow-[0_0_18px_rgba(74,222,128,0.25)]'
            : 'border-white/[0.12] bg-white/[0.04] text-slate-300 hover:bg-white/[0.1] hover:text-white'
        }`}
      >
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-400" />
      </motion.span>
    </Link>
  )
}
