import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import DesktopNav from './navbar/DesktopNav'
import MobileNav from './navbar/MobileNav'

export default function Navbar({ darkMode, setDarkMode, user, logout }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-[#0b1120]/80 backdrop-blur-2xl"
      style={{
        boxShadow: scrolled ? '0 6px 30px rgba(0, 0, 0, 0.35)' : 'none',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DesktopNav darkMode={darkMode} setDarkMode={setDarkMode} user={user} onLogout={logout} />
        <MobileNav
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onLogout={logout}
        />
      </div>
    </motion.header>
  )
}
