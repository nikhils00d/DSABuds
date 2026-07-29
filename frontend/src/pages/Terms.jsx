import { Link } from 'react-router-dom'
import MarketingShell from '../components/marketing/MarketingShell'

const items = [
  {
    title: 'Account usage',
    body: 'Use DSABuds to support your own or your organization’s interview preparation program. Keep your account details accurate and secure.',
  },
  {
    title: 'Community standards',
    body: 'Respect teammates, avoid abuse, and keep accountability interactions focused on useful progress and constructive feedback.',
  },
  {
    title: 'Service expectations',
    body: 'We aim to provide reliable access and clear support channels, while reserving the right to maintain and improve the platform over time.',
  },
]

export default function Terms() {
  return (
    <MarketingShell
      eyebrow="Terms of Service"
      title="Clear expectations for a focused accountability platform."
      description="These terms explain how DSABuds should be used so the product stays safe, fair, and useful for learners and teams."
      actions={[
        <Link key="support" to="/support" className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
          Need help?
        </Link>,
        <Link key="contact" to="/contact" className="rounded-xl border border-white/[0.14] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/[0.1]">
          Contact us
        </Link>,
      ]}
    >
      <section className="grid gap-5 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
            <h2 className="text-xl font-bold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-8">
        <h2 className="text-2xl font-bold text-white">Usage summary</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b1528] p-5">
            <p className="text-sm font-semibold text-brand-300">Acceptable behavior</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Keep messages relevant, avoid spam, and use group tools for accountability rather than harassment or abuse.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b1528] p-5">
            <p className="text-sm font-semibold text-brand-300">Platform updates</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              We may adjust features, pricing, and availability as the product grows, with changes reflected in the app and footer links.
            </p>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}
