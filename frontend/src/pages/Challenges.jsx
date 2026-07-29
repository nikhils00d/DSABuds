import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck2, CheckCircle2, Flame, Sparkles, Target, Trophy, Users, Zap } from 'lucide-react'

const challenges = [
  { title: 'Graph Sprint', target: '7 problems', progress: 71, status: 'Active', detail: 'Finish BFS and shortest path drills', reward: '+120 XP' },
  { title: 'Daily Consistency', target: '5-day streak', progress: 80, status: 'Active', detail: 'Check in before midnight every day', reward: '+1 rank boost' },
  { title: 'Mock Interview Loop', target: '2 mocks', progress: 50, status: 'In review', detail: 'Pair with a teammate and swap feedback', reward: 'Badge unlock' },
]

const completed = [
  'Array Warmup completed by 12 members',
  'Bit Manipulation Sprint closed on time',
  'Weekly Review challenge reached 92% completion',
]

const highlights = [
  { label: 'Live challenges', value: '3', detail: 'Current active sprints' },
  { label: 'Completion rate', value: '84%', detail: 'Challenges finished this month' },
  { label: 'Team participation', value: '18', detail: 'Members with one or more wins' },
]

export default function Challenges() {
  return (
    <div className="min-h-screen bg-[#0b1120] px-4 pb-20 pt-[96px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="max-w-3xl">
          <span className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
            Challenges
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Short, focused sprints that turn practice into a habit loop.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Challenge cards keep the next objective obvious, measurable, and socially accountable so momentum does not fade between study sessions.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.label} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
              <p className="mt-3 text-3xl font-extrabold text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.article
                key={challenge.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-brand-300">
                      <Target className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{challenge.status}</span>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-white">{challenge.title}</h2>
                    <p className="mt-1 text-sm text-slate-400">Target: {challenge.target}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{challenge.detail}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:w-[260px]">
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-center">
                      <Flame className="mx-auto h-4 w-4 text-orange-400" />
                      <p className="mt-1 text-lg font-bold text-white">{challenge.progress}%</p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">progress</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-center">
                      <Trophy className="mx-auto h-4 w-4 text-brand-300" />
                      <p className="mt-1 text-lg font-bold text-white">{challenge.reward}</p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">reward</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Completion</span>
                    <span className="font-semibold text-white">{challenge.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/[0.06]">
                    <div className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-emerald-400" style={{ width: `${challenge.progress}%` }} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600">
                    Join challenge
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/[0.08]">
                    <CheckCircle2 className="h-4 w-4" />
                    Mark progress
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-brand-400/25 bg-brand-500/10 p-6 shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="flex items-center gap-2 text-brand-300">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Next challenge</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-white">Weekly Focus: Binary Search + two mock interviews.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">The challenge board keeps the next two actions explicit, so every session starts with a target instead of a vague plan.</p>
              <Link to="/dashboard" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#08101e] hover:bg-slate-100">
                Review progress
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-brand-300">
                <CalendarCheck2 className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Completed this week</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {completed.map((item) => (
                  <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-300" />{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-brand-300">
                <Users className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Challenge design</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Each sprint balances effort and reward so teams can keep a steady cadence without overloading the week.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
