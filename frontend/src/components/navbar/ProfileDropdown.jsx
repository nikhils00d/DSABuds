import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogOut } from 'lucide-react'
import { profileMenuLinks } from './navConfig'

export default function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const onOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onEscape)

    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  const initial = useMemo(() => {
    const candidate = user?.username || user?.name || user?.email || 'U'
    return candidate.charAt(0).toUpperCase()
  }, [user])

  const displayName = user?.name || user?.username || user?.email

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-2 py-1.5 text-white hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
        aria-label="Open profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white shadow-[0_0_12px_rgba(74,222,128,0.35)]">
          {initial}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-300 transition-transform ${open ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-3xl border border-white/[0.12] bg-[#09111f]/90 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
            role="menu"
          >
            <div className="border-b border-white/[0.08] px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Signed in as</p>
              <p className="truncate text-sm font-semibold text-white">{displayName}</p>
            </div>

            <div className="py-2">
              {profileMenuLinks.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="mx-2 flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                  >
                    <Icon className="h-4 w-4 text-slate-400" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="border-t border-white/[0.08] p-2">
              <button
                onClick={() => {
                  setOpen(false)
                  onLogout()
                }}
                role="menuitem"
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10 hover:text-red-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
