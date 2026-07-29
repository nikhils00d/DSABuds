import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Compass, Eye, HeartHandshake, Rocket, Shield, Users } from 'lucide-react'
import MarketingShell from '../components/marketing/MarketingShell'

const timeline = [
  {
    year: '2023',
    title: 'Problem Observed',
    text: 'We noticed candidates could solve hard questions but still fail due to inconsistency and burnout cycles.',
  },
  {
    year: '2024',
    title: 'First Accountability Loops',
    text: 'We launched streak tracking and group-based challenges to make prep social, visible, and measurable.',
  },
  {
    year: '2025',
    title: 'Analytics + Roadmaps',
    text: 'We added prep roadmaps and analytics to help users improve strategy, not only activity volume.',
  },
  {
    year: '2026',
    title: 'Community Platform',
    text: 'DSABuds evolved into a full preparation OS with accountability groups, reminders, and coaching signals.',
  },
]

const values = [
  {
    icon: HeartHandshake,
    title: 'Community Driven',
    desc: 'We build with feedback from learners, mentors, and hiring candidates every sprint.',
  },
  {
    icon: Shield,
    title: 'Consistency Over Hype',
    desc: 'Tiny reliable steps beat random high-intensity bursts. We optimize for durable habits.',
  },
  {
    icon: Rocket,
    title: 'Progress With Purpose',
    desc: 'Every feature maps to a prep outcome: more solved problems, better recall, stronger interview confidence.',
  },
]

export default function About() {
  return (
    <MarketingShell
      eyebrow="About DSABuds"
      title="Built For Long-Term Interview Readiness"
      description="DSABuds exists to turn coding prep into a system you can trust, repeat, and scale with your peers."
      actions={[
        <Link key="cta1" to="/features" className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">Explore Features</Link>,
        <Link key="cta2" to="/register" className="rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.1]">Join DSABuds</Link>,
      ]}
    >
      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white"><Compass className="h-6 w-6 text-brand-300" /> Mission</h2>
          <p className="mt-3 text-slate-300">
            Help every aspiring engineer build interview-ready consistency through transparent progress, peer accountability, and habit systems that survive low-motivation days.
          </p>
        </article>
        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white"><Eye className="h-6 w-6 text-brand-300" /> Vision</h2>
          <p className="mt-3 text-slate-300">
            Become the most trusted preparation companion for coding interviews, where disciplined effort compounds into career-changing outcomes.
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-white/[0.1] bg-gradient-to-r from-brand-500/10 to-transparent p-8">
        <h2 className="text-3xl font-bold text-white">Why We Built It</h2>
        <p className="mt-3 max-w-4xl text-slate-300">
          Most people do not fail interviews because they cannot understand algorithms. They fail because preparation breaks after a few intense weeks. DSABuds was designed to close that gap: social accountability, structured goals, and honest signals of progress.
        </p>
      </section>

      <section className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-8">
        <h2 className="text-3xl font-bold text-white">How Accountability Works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c1529] p-5">
            <p className="text-sm font-semibold text-brand-300">1. Set Daily Targets</p>
            <p className="mt-2 text-sm text-slate-300">Define realistic solve goals based on your schedule and interview timeline.</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c1529] p-5">
            <p className="text-sm font-semibold text-brand-300">2. Commit With Your Group</p>
            <p className="mt-2 text-sm text-slate-300">Your team sees your check-ins, challenge results, and consistency streak in real time.</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c1529] p-5">
            <p className="text-sm font-semibold text-brand-300">3. Review Weekly Signals</p>
            <p className="mt-2 text-sm text-slate-300">Use analytics to adjust pace, strengthen weak topics, and sustain long-term progress.</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-8">
        <h2 className="text-3xl font-bold text-white">Our Story Timeline</h2>
        <ol className="mt-8 space-y-6">
          {timeline.map((item, index) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="grid gap-3 border-l border-brand-500/30 pl-5 md:grid-cols-[90px_1fr]"
            >
              <span className="text-sm font-bold text-brand-300">{item.year}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon
          return (
            <article key={value.title} className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-6">
              <Icon className="h-7 w-7 text-brand-300" />
              <h3 className="mt-3 text-xl font-bold text-white">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{value.desc}</p>
            </article>
          )
        })}
      </section>

      <section className="rounded-3xl border border-brand-400/30 bg-brand-500/10 p-8 text-center">
        <Users className="mx-auto h-9 w-9 text-brand-300" />
        <h2 className="mt-4 text-3xl font-bold text-white">Community Powered Progress</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">Thousands of learners are building their prep rhythm together. Join and stay consistent for the long run.</p>
      </section>
    </MarketingShell>
  )
}
