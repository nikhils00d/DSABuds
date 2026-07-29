import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Sparkles, ShieldCheck, Building2, HelpCircle, Quote } from 'lucide-react'
import MarketingShell from '../components/marketing/MarketingShell'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for solo candidates building consistency.',
    features: ['Unlimited tracking', 'Basic analytics', 'LeetCode sync', 'Public groups', 'GitHub login', 'Community support'],
    cta: 'Get Started',
    to: '/register',
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For serious candidates who want accountability at scale.',
    features: ['Everything in Free', 'Private groups', 'Advanced analytics', 'AI suggestions', 'Unlimited challenges', 'Priority support'],
    cta: 'Upgrade to Pro',
    to: '/register',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For institutions, bootcamps, and hiring programs.',
    features: ['Admin dashboard', 'Unlimited members', 'Priority onboarding', 'Dedicated support', 'SSO and audit logs', 'Custom reporting'],
    cta: 'Contact Sales',
    to: '/contact',
  },
]

const comparisonRows = [
  ['LeetCode sync', 'Yes', 'Yes', 'Yes'],
  ['Private accountability groups', 'No', 'Yes', 'Yes'],
  ['Advanced analytics and exports', 'No', 'Yes', 'Yes'],
  ['Priority support', 'No', 'Yes', 'Yes'],
  ['Admin controls and onboarding', 'No', 'No', 'Yes'],
]

const faqs = [
  {
    q: 'Can I upgrade or downgrade anytime?',
    a: 'Yes. Plan changes are instant, and your data is always preserved.',
  },
  {
    q: 'Do you offer student discounts?',
    a: 'Yes. Student teams and coding clubs can request discounted pricing via Contact.',
  },
  {
    q: 'Does Enterprise include migration support?',
    a: 'Yes. We provide onboarding playbooks and guided migration for larger groups.',
  },
]

const testimonials = [
  {
    quote: 'DSABuds made prep non-negotiable. I stayed on track for 14 weeks and cracked two interviews.',
    name: 'Riya Jain',
    role: 'SDE Intern, FinTech Startup',
  },
  {
    quote: 'Our campus coding club uses Pro for weekly challenge sprints. Participation doubled in one month.',
    name: 'Arnav Singh',
    role: 'Club Lead, NIT Bhopal',
  },
]

export default function Pricing() {
  return (
    <MarketingShell
      eyebrow="Transparent Pricing"
      title="Pricing Built For Builders, Teams, And Mentors"
      description="Start free, move fast, and only pay when your accountability system needs more power."
      actions={[
        <Link key="register" to="/register" className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">Start Free</Link>,
        <Link key="contact" to="/contact" className="rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.1]">Talk to Sales</Link>,
      ]}
    >
      <section className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <motion.article
            key={plan.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className={`rounded-3xl border p-7 ${
              plan.highlighted
                ? 'border-brand-400/50 bg-brand-500/10 shadow-[0_0_35px_rgba(74,222,128,0.18)]'
                : 'border-white/[0.1] bg-white/[0.03]'
            }`}
          >
            {plan.highlighted && (
              <span className="inline-flex rounded-full border border-brand-400/40 bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-300">
                Most Popular
              </span>
            )}
            <h3 className="mt-3 text-2xl font-bold text-white">{plan.name}</h3>
            <p className="mt-2 text-sm text-slate-300">{plan.description}</p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-white">{plan.price}</span>
              {plan.period ? <span className="pb-1 text-slate-400">{plan.period}</span> : null}
            </div>

            <ul className="mt-6 space-y-2.5 text-sm text-slate-200">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-brand-300" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to={plan.to}
              className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                plan.highlighted
                  ? 'bg-brand-500 text-white hover:bg-brand-600'
                  : 'border border-white/[0.16] bg-white/[0.04] text-slate-100 hover:bg-white/[0.1]'
              }`}
            >
              {plan.cta}
            </Link>
          </motion.article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
        <h2 className="text-2xl font-bold text-white">Plan Comparison</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.12] text-slate-300">
                <th className="px-3 py-3">Feature</th>
                <th className="px-3 py-3">Free</th>
                <th className="px-3 py-3">Pro</th>
                <th className="px-3 py-3">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row[0]} className="border-b border-white/[0.06] text-slate-200">
                  <td className="px-3 py-3">{row[0]}</td>
                  <td className="px-3 py-3">{row[1]}</td>
                  <td className="px-3 py-3">{row[2]}</td>
                  <td className="px-3 py-3">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white"><HelpCircle className="h-6 w-6 text-brand-300" /> FAQ</h2>
          <div className="mt-5 space-y-5">
            {faqs.map((item) => (
              <div key={item.q}>
                <h3 className="text-base font-semibold text-slate-100">{item.q}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white"><Quote className="h-6 w-6 text-brand-300" /> Testimonials</h2>
          <div className="mt-5 space-y-5">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/[0.08] bg-[#0b152b] p-4">
                <p className="text-sm leading-relaxed text-slate-200">"{item.quote}"</p>
                <p className="mt-3 text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-400">{item.role}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-white/[0.1] bg-gradient-to-r from-[#0f1f38] to-[#0b172d] p-8">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <Sparkles className="h-6 w-6 text-brand-300" />
            <p className="mt-2 text-sm text-slate-300">Simple onboarding and quick team setup in under 10 minutes.</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <ShieldCheck className="h-6 w-6 text-brand-300" />
            <p className="mt-2 text-sm text-slate-300">Secure authentication and controlled workspace permissions.</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <Building2 className="h-6 w-6 text-brand-300" />
            <p className="mt-2 text-sm text-slate-300">Enterprise onboarding support for institutions and cohorts.</p>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}
