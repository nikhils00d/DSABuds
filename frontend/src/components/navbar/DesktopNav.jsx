import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NavLinks from './NavLinks'
import ThemeToggle from './ThemeToggle'
import NotificationBell from './NotificationBell'
import ProfileDropdown from './ProfileDropdown'
import { privateNavLinks, publicNavLinks } from './navConfig'
import BrandMark from '../common/BrandMark'

export default function DesktopNav({ darkMode, setDarkMode, user, onLogout }) {
  const links = user ? privateNavLinks : publicNavLinks

  return (
    <div className="hidden h-[72px] items-center justify-between gap-8 md:flex">
      <Link
        to="/"
        className="group inline-flex items-center gap-2 rounded-lg px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
        aria-label="DSABuds home"
      >
        <BrandMark className="group-hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.35)]" />
      </Link>

      <nav aria-label={user ? 'Application navigation' : 'Main navigation'} className="flex-1">
        <div className="mx-auto w-fit">
          <NavLinks links={links} />
        </div>
      </nav>

      <div className="flex items-center gap-2.5">
        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((prev) => !prev)} />

        {!user && (
          <>
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
            >
              Login
            </Link>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(74,222,128,0.3)] hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70"
              >
                Sign Up
              </Link>
            </motion.div>
          </>
        )}

        {user && (
          <>
            <NotificationBell />
            <ProfileDropdown user={user} onLogout={onLogout} />
          </>
        )}
      </div>
    </div>
  )
}
