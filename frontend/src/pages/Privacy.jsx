import { Link } from 'react-router-dom'
import MarketingShell from '../components/marketing/MarketingShell'

const sections = [
  {
    title: 'What we collect',
    body: 'We collect only the information needed to run accounts, sync LeetCode data, maintain streaks, and keep group accountability working properly.',
  },
  {
    title: 'How we use it',
    body: 'We use your data to power dashboards, analytics, notifications, and support workflows. We do not sell personal data.',
  },
  {
    title: 'Your controls',
    body: 'You can update profile details, manage visibility, and disconnect integrations from settings at any time.',
  },
]

export default function Privacy() {
  return (
    <MarketingShell
      eyebrow="Privacy Policy"
      title="Your prep data stays focused on helping you improve."
      description="DSABuds is built to respect learner privacy while keeping accountability features useful and transparent."
      actions={[
        <Link key="support" to="/support" className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
          Contact support
        </Link>,
        <Link key="terms" to="/terms" className="rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.1]">
          View terms
        </Link>,
      ]}
    >
      <section className="grid gap-5 lg:grid-cols-3">
        {sections.map((section) => (
          <article key={section.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
            <h2 className="text-xl font-bold text-white">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/[0.1] bg-gradient-to-r from-brand-500/10 to-transparent p-8">
        <h2 className="text-2xl font-bold text-white">Security and retention</h2>
        <p className="mt-3 max-w-4xl text-slate-300">
          We keep access controls, transport encryption, and retention practices aligned with the goal of protecting learner data while still allowing useful progress tracking.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Encryption</p>
            <p className="mt-2 text-sm text-slate-200">Transport secured with modern TLS everywhere.</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Access</p>
            <p className="mt-2 text-sm text-slate-200">Role-based access for personal and group data.
</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Deletion</p>
            <p className="mt-2 text-sm text-slate-200">Account deletion requests are handled through support.
</p>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}
