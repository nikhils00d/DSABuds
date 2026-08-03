import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlarmClock,
  Award,
  BarChart3,
  BellRing,
  CalendarCheck,
  Code2,
  Flame,
  GitBranch,
  Goal,
  HandCoins,
  LineChart,
  Medal,
  Route,
  Shield,
  ShieldCheck,
  Swords,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import MarketingShell from '../components/marketing/MarketingShell'

const features = [
  { icon: Flame, title: 'Daily Streak Tracking', description: 'Track every solve and protect consistency with automatic streak windows and recovery prompts.' },
  { icon: Code2, title: 'LeetCode Sync', description: 'Pull solved problem history and streak data directly from LeetCode to keep stats accurate.' },
  { icon: Shield, title: 'GitHub Login', description: 'Fast onboarding with secure GitHub authentication and profile hydration.' },
  { icon: Route, title: 'Interview Roadmaps', description: 'Follow topic-based prep plans from arrays to dynamic programming with milestones.' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'See trends in solve rate, difficulty mix, and consistency performance across weeks.' },
  { icon: CalendarCheck, title: 'Weekly Reports', description: 'Receive concise reports with wins, misses, and focused recommendations for next week.' },
  { icon: Trophy, title: 'Leaderboard', description: 'Compete fairly with peers using weighted ranking that rewards sustained progress.' },
  { icon: Swords, title: 'Friend Challenges', description: 'Run head-to-head challenge sprints with transparent goals and outcomes.' },
  { icon: Users, title: 'Accountability Groups', description: 'Form private or public squads that hold each member to a daily or weekly target.' },
  { icon: HandCoins, title: 'Penalty/Fine System', description: 'Add optional penalties to discourage skip days and make habits stick under pressure.' },
  { icon: Award, title: 'Achievements', description: 'Unlock badges for streaks, topic mastery, and consistency streak depth.' },
  { icon: BellRing, title: 'Smart Reminders', description: 'Receive reminders tuned to your schedule, missed sessions, and challenge deadlines.' },
  { icon: Goal, title: 'Progress Tracking', description: 'Define daily quotas and monitor completion with real-time completion indicators.' },
  { icon: GitBranch, title: 'Coding Heatmaps', description: 'Visualize long-term effort through contribution-style calendars and activity density.' },
]

export default function Features() {
  return (
    <MarketingShell
      eyebrow="Product Features"
      title="Everything You Need To Stay Consistent."
      description="DSABuds blends accountability, analytics, and social momentum so your preparation survives tough weeks and busy schedules."
      actions={[
        <Link
          key="primary"
          to="/register"
          className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:bg-brand-600"
        >
          Start Free
        </Link>,
        <Link
          key="secondary"
          to="/support"
          className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:bg-brand-600"
        >
          Talk To us
        </Link>,
      ]}
    >
      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-400/30 bg-brand-500/10 text-brand-300 shadow-[0_0_20px_rgba(74,222,128,0.18)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
                <div className="pointer-events-none mt-4 h-px w-full bg-gradient-to-r from-brand-500/0 via-brand-400/50 to-brand-500/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-white/[0.08] bg-gradient-to-r from-brand-500/10 via-cyan-500/5 to-transparent p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Why DSABuds Works</h2>
            <p className="mt-3 text-slate-300">
              Motivation fluctuates. Systems scale. DSABuds is built around accountability loops, visible progress, and peer pressure that keeps you showing up when willpower drops.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-brand-300" /> Consistency-first workflows built around realistic daily commitments.</li>
              <li className="flex items-start gap-2"><LineChart className="mt-0.5 h-4 w-4 text-brand-300" /> Transparent analytics to measure effort quality, not just raw solve count.</li>
              <li className="flex items-start gap-2"><AlarmClock className="mt-0.5 h-4 w-4 text-brand-300" /> Smart reminders before you miss streak windows or challenge deadlines.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.12] bg-[#081226]/80 p-6">
            <p className="text-sm uppercase tracking-wider text-brand-300">Consistency Snapshot</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-xs text-slate-400">Avg streak growth</p>
                <p className="mt-1 text-2xl font-bold text-white">+41%</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-xs text-slate-400">Weekly completion</p>
                <p className="mt-1 text-2xl font-bold text-white">89%</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-xs text-slate-400">Challenge finish rate</p>
                <p className="mt-1 text-2xl font-bold text-white">76%</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-xs text-slate-400">Active groups</p>
                <p className="mt-1 text-2xl font-bold text-white">1.8k</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-brand-400/30 bg-brand-500/10 p-8 text-center shadow-[0_0_50px_rgba(74,222,128,0.12)]">
        <Medal className="mx-auto h-10 w-10 text-brand-300" />
        <h2 className="mt-4 text-3xl font-extrabold text-white">Start Building Your Streak Today</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">
          Build disciplined prep habits with accountability that compounds over time.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">Create Free Account</Link>
          <Link to="/dashboard" className="rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.1]">Go to Dashboard</Link>
        </div>
      </section>
    </MarketingShell>
  )
}
