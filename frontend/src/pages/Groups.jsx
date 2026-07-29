import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Crown, Flame, Users, CalendarDays, ShieldCheck, Target, MessageSquare } from 'lucide-react'

const groups = [
  {
    name: 'DSA Warriors',
    members: 7,
    streak: 23,
    cadence: 'Daily check-ins',
    progress: 86,
    focus: 'Graphs + Trees',
    status: 'Active now',
  },
  {
    name: 'System Design Sprint',
    members: 5,
    streak: 18,
    cadence: 'Mon/Wed/Fri',
    progress: 72,
    focus: 'Scalability + caching',
    status: '2 members online',
  },
  {
    name: 'Interview Final Prep',
    members: 4,
    streak: 11,
    cadence: 'Challenge based',
    progress: 64,
    focus: 'Revision + mocks',
    status: 'Reviewing today',
  },
]

const signals = [
  { label: 'Commitment rate', value: '92%', detail: 'Members posting daily updates' },
  { label: 'Missed check-ins', value: '3', detail: 'Automatically flagged for follow-up' },
  { label: 'Group challenges', value: '14', detail: 'Completed this month' },
  { label: 'Avg. streak gain', value: '+6', detail: 'Days added per active cycle' },
]

export default function Groups() {
  return (
    <div className="min-h-screen bg-[#0b1120] px-4 pb-20 pt-[96px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="max-w-3xl">
          <span className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
            Accountability Groups
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Run consistent prep with a real accountability layer.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            DSABuds groups keep goals visible, streaks public, and follow-through social so practice stops depending on willpower alone.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {signals.map((signal, index) => (
            <motion.article
              key={signal.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{signal.label}</p>
              <p className="mt-3 text-3xl font-extrabold text-white">{signal.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{signal.detail}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-4">
            {groups.map((group, index) => (
              <motion.article
                key={group.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * index }}
                className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-brand-300">
                      <Crown className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">{group.status}</span>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-white">{group.name}</h2>
                    <p className="mt-2 text-sm text-slate-300">Focus: {group.focus}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center sm:w-[320px]">
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Members</p>
                      <p className="mt-1 text-xl font-bold text-white">{group.members}</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Streak</p>
                      <p className="mt-1 text-xl font-bold text-white">{group.streak}</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Cadence</p>
                      <p className="mt-1 text-sm font-semibold text-white">{group.cadence}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Group consistency</span>
                    <span className="font-semibold text-white">{group.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/[0.06]">
                    <div className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-emerald-400" style={{ width: `${group.progress}%` }} />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link to={`/groups/${group.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600">
                    View group
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/[0.08]">
                    <MessageSquare className="h-4 w-4" />
                    Message team
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-brand-400/25 bg-brand-500/10 p-6 shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="flex items-center gap-2 text-brand-300">
                <Target className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">New group flow</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-white">Start a private accountability room in under 2 minutes.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Invite your cohort, pin a weekly target, and let progress stay visible without adding admin overhead.
              </p>
              <Link to="/dashboard" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#08101e] hover:bg-slate-100">
                Create from dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-brand-300">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">No open invites</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Invite links, access rules, and visibility settings are controlled from settings so groups stay focused and secure.
              </p>
              <div className="mt-4 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-4 text-sm text-slate-400">
                No pending invites right now. Use the dashboard to generate a new invite when your group is ready.
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-brand-300">
                <CalendarDays className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Weekly rhythm</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3"><Flame className="mt-0.5 h-4 w-4 text-orange-400" /> Daily check-in post and streak confirmation.</li>
                <li className="flex items-start gap-3"><Users className="mt-0.5 h-4 w-4 text-brand-300" /> Peer review and group leaderboard refresh.
</li>
                <li className="flex items-start gap-3"><Target className="mt-0.5 h-4 w-4 text-emerald-400" /> Weekly target review and challenge reset.
</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
