import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, LogOut, ChevronRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import NavLinks from './NavLinks'
import { privateNavLinks, publicNavLinks, profileQuickLinks } from './navConfig'
import BrandMark from '../common/BrandMark'

export default function MobileNav({
  darkMode,
  setDarkMode,
  user,
  mobileOpen,
  setMobileOpen,
  onLogout,
}) {
  const links = user ? privateNavLinks : publicNavLinks
  const displayName = user?.name || user?.username || user?.email

  return (
    <div className="flex h-[72px] items-center justify-between gap-3 md:hidden">
      <Link to="/" className="inline-flex items-center gap-2" aria-label="DSABuds home">
        <BrandMark />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((prev) => !prev)} />
        {user ? <button className="flex h-10 items-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 text-sm font-semibold text-slate-200">{displayName?.[0]?.toUpperCase() || 'U'}</button> : null}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
          aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-[72px] z-40 bg-black/55 backdrop-blur-lg"
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              className="fixed right-0 top-[72px] z-50 flex h-[calc(100vh-72px)] w-[88vw] max-w-sm flex-col border-l border-white/[0.12] bg-[#08101e]/96 p-5 backdrop-blur-2xl"
              aria-label="Mobile navigation"
            >
              <nav className="mb-5 flex-1 overflow-y-auto pr-1" aria-label={user ? 'Application navigation' : 'Main navigation'}>
                <NavLinks links={links} onNavigate={() => setMobileOpen(false)} vertical />

                {user ? (
                  <div className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Signed in as</p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">{displayName}</p>
                    <div className="mt-4 space-y-1.5">
                      {profileQuickLinks.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/[0.06] hover:text-white"
                          >
                            <span className="flex items-center gap-3">
                              <Icon className="h-4 w-4 text-slate-400" />
                              {item.label}
                            </span>
                            <ChevronRight className="h-4 w-4 text-slate-500" />
                          </Link>
                        )
                      })}
                      <button
                        onClick={() => {
                          setMobileOpen(false)
                          onLogout()
                        }}
                        className="mt-2 flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : null}
              </nav>

              {!user && (
                <div className="space-y-2 border-t border-white/[0.08] pt-5">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border border-white/[0.12] px-4 py-3 text-center font-semibold text-slate-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl bg-brand-500 px-4 py-3 text-center font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
