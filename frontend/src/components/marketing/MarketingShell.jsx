import { motion } from 'framer-motion'
import SiteFooter from '../common/SiteFooter'

export default function MarketingShell({ eyebrow, title, description, actions, children }) {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 pt-[72px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="hero-noise absolute inset-0 opacity-50" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-[100px]" />
        <div className="absolute right-0 top-44 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <main className="relative z-10">
        <section className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300"
            >
              {eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300"
            >
              {description}
            </motion.p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-16">{children}</div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
