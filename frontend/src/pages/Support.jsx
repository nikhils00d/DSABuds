import { Link } from 'react-router-dom'
import { Mail, MessageCircle, GitBranch, Globe, Clock3, LifeBuoy } from 'lucide-react'
import MarketingShell from '../components/marketing/MarketingShell'

const contacts = [
  { icon: Mail, label: 'support@dsabuds.com', href: 'mailto:support@dsabuds.com' },
  { icon: MessageCircle, label: 'Discord community', href: 'https://discord.com' },
  { icon: GitBranch, label: 'GitHub', href: 'https://github.com' },
  { icon: Globe, label: 'LinkedIn', href: 'https://linkedin.com' },
]

const faqs = [
  {
    q: 'How fast do you respond?',
    a: 'Most support requests are answered within one business day.',
  },
  {
    q: 'Can I ask about group onboarding?',
    a: 'Yes. We help with setup, invitations, and team workflows.',
  },
  {
    q: 'Do you support product feedback?',
    a: 'Absolutely. Feature requests are reviewed alongside support tickets.',
  },
]

export default function Support() {
  return (
    <MarketingShell
      eyebrow="Support"
      title="Get help with onboarding, billing, or product questions."
      description="Use the support channels below if you need account help, a team demo, or a quick answer about the platform."
      actions={[
        <a key="contact" href="mailto:support@dsabuds.com" className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
          Send a message
        </a>,
        <Link key="features" to="/features" className="rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.1]">
          Explore features
        </Link>,
      ]}
    >
      <section className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white"><LifeBuoy className="h-6 w-6 text-brand-300" /> Support channels</h2>
          <div className="mt-5 space-y-3">
            {contacts.map((contact) => {
              const Icon = contact.icon
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0b1528] px-4 py-3 text-sm text-slate-200 hover:border-brand-400/30 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-brand-300" />
                    {contact.label}
                  </span>
                  <span className="text-slate-500">Open</span>
                </a>
              )
            })}
          </div>
        </article>

        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="text-2xl font-bold text-white">Office hours and response times</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0b1528] p-5">
              <Clock3 className="h-5 w-5 text-brand-300" />
              <p className="mt-3 text-sm font-semibold text-white">Monday to Friday</p>
              <p className="mt-1 text-sm text-slate-300">9:00 AM to 7:00 PM IST</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0b1528] p-5">
              <MessageCircle className="h-5 w-5 text-brand-300" />
              <p className="mt-3 text-sm font-semibold text-white">Average first reply</p>
              <p className="mt-1 text-sm text-slate-300">Under 24 hours</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] p-5 text-sm text-slate-300">
            For billing or security questions, include your account email and a short description of the issue so the team can route it quickly.
          </div>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
          <div className="mt-5 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/[0.08] bg-[#0b1528] p-4">
                <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/[0.1] bg-gradient-to-r from-brand-500/10 to-transparent p-7">
          <h2 className="text-2xl font-bold text-white">Need a faster path?</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Email us directly for detailed requests, or open GitHub and LinkedIn...          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="mailto:support@dsabuds.com" className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
              Email Support
            </a>
            <Link to="/privacy" className="rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.1]">
              Privacy policy
            </Link>
          </div>
        </article>
      </section>
    </MarketingShell>
  )
}
