import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NavLinks({ links, onNavigate, vertical = false }) {
  const { pathname } = useLocation()

  return (
    <ul className={vertical ? 'flex flex-col gap-2' : 'flex items-center gap-7'}>
      {links.map((link) => {
        const isActive = pathname === link.to || (link.to !== '/' && pathname.startsWith(`${link.to}/`))

        return (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={onNavigate}
              aria-current={isActive ? 'page' : undefined}
              className={`relative inline-flex items-center ${vertical ? 'w-full px-4 py-3 rounded-xl' : 'py-2'} text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 ${
                isActive
                  ? 'text-brand-500 dark:text-brand-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              } ${vertical && !isActive ? 'hover:bg-slate-100 dark:hover:bg-white/[0.06]' : ''}`}
            >
              {link.label}
              {isActive && (
                <motion.span
                  layoutId={vertical ? 'mobile-active-underline' : 'desktop-active-underline'}
                  className={`absolute left-0 ${vertical ? 'bottom-1 h-px w-full' : '-bottom-0.5 h-0.5 w-full'} bg-gradient-to-r from-brand-400 to-brand-600`}
                />
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
