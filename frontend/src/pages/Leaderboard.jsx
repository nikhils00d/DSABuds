import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, ArrowRight, Flame, Trophy, Zap, Target, Medal, Users } from 'lucide-react'

const podium = [
  { rank: 1, name: 'Aarav Mehta', streak: 31, solved: 184, xp: 4620, badge: 'Gold', glow: 'from-yellow-400/40 to-amber-500/10' },
  { rank: 2, name: 'Riya Jain', streak: 28, solved: 171, xp: 4300, badge: 'Silver', glow: 'from-slate-300/30 to-slate-500/10' },
  { rank: 3, name: 'Kabir Shah', streak: 24, solved: 165, xp: 4040, badge: 'Bronze', glow: 'from-orange-400/30 to-orange-600/10' },
]

const leaderboard = [
  { rank: 4, name: 'Ananya Rao', streak: 21, solved: 152, xp: 3760, delta: '+4' },
  { rank: 5, name: 'You', streak: 19, solved: 148, xp: 3640, delta: '+2' },
  { rank: 6, name: 'Dev Gupta', streak: 17, solved: 141, xp: 3510, delta: '+1' },
  { rank: 7, name: 'Meera Nair', streak: 16, solved: 136, xp: 3380, delta: '+3' },
]

const insights = [
  { label: 'Weekly top movers', value: '8', detail: 'Members gained 3+ places this week' },
  { label: 'Challenge finish rate', value: '78%', detail: 'Active sprints closed on time' },
  { label: 'Streak leaders', value: '19', detail: 'Users with 14+ active days' },
]

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-[#0b1120] px-4 pb-20 pt-[96px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="max-w-3xl">
          <span className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
            Leaderboard
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Friendly competition that rewards consistency, not only volume.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Track streaks, solved counts, and challenge wins in a rank board that keeps momentum visible across the group.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {insights.map((item) => (
            <article key={item.label} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
              <p className="mt-3 text-3xl font-extrabold text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-brand-300">
              <Crown className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Top rankings</span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {podium.map((member) => (
                <motion.article
                  key={member.rank}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-3xl border border-white/[0.08] bg-gradient-to-b ${member.glow} p-5 text-center`}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.12] bg-[#08101e] text-2xl font-extrabold text-white">
                    {member.rank}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">{member.badge}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-300">
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-2">
                      <Flame className="mx-auto h-4 w-4 text-orange-400" />
                      <p className="mt-1 font-semibold text-white">{member.streak}</p>
                      <p>streak</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-2">
                      <Target className="mx-auto h-4 w-4 text-brand-300" />
                      <p className="mt-1 font-semibold text-white">{member.solved}</p>
                      <p>solved</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-2">
                      <Zap className="mx-auto h-4 w-4 text-amber-300" />
                      <p className="mt-1 font-semibold text-white">{member.xp}</p>
                      <p>xp</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03]">
              {leaderboard.map((member, index) => (
                <div key={member.rank} className={`grid grid-cols-[72px_1fr_auto_auto] items-center gap-3 border-b border-white/[0.06] px-4 py-4 last:border-b-0 ${member.name === 'You' ? 'bg-brand-500/10' : ''}`}>
                  <div className="text-center text-sm font-bold text-slate-400">#{member.rank}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{member.name}</span>
                      {member.name === 'You' ? <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-white">YOU</span> : null}
                    </div>
                    <p className="text-xs text-slate-500">Streak {member.streak} days</p>
                  </div>
                  <div className="text-right text-sm font-semibold text-slate-200">{member.solved} solved</div>
                  <div className="text-right text-sm font-semibold text-brand-300">{member.delta}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-brand-400/25 bg-brand-500/10 p-6 shadow-[0_0_30px_rgba(74,222,128,0.12)]">
              <div className="flex items-center gap-2 text-brand-300">
                <Trophy className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Weekly objective</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold text-white">Solve 25 problems and hold a 5-day streak.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">The leaderboard boosts momentum when the goal is clear, public, and reset on a predictable cadence.</p>
              <Link to="/dashboard" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#08101e] hover:bg-slate-100">
                Review your plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-brand-300">
                <Medal className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Ranking signals</span>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3"><Flame className="mt-0.5 h-4 w-4 text-orange-400" /> Streak consistency contributes more than single-day bursts.</li>
                <li className="flex items-start gap-3"><Users className="mt-0.5 h-4 w-4 text-brand-300" /> Group activity lifts placement through shared progress.</li>
                <li className="flex items-start gap-3"><Zap className="mt-0.5 h-4 w-4 text-amber-300" /> Bonus points reward challenge completion and review cadence.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
