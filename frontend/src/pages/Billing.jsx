import { motion } from 'framer-motion'
import { Check, CreditCard, ReceiptText, ShieldCheck } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    detail: 'Current usage-friendly plan for solo practice.',
    perks: ['Unlimited tracking', 'Basic analytics', 'Public groups'],
  },
  {
    name: 'Pro',
    price: '$9',
    detail: 'Advanced accountability and premium support.',
    perks: ['Private groups', 'Advanced analytics', 'Priority support'],
    recommended: true,
  },
]

export default function Billing() {
  return (
    <div className="min-h-screen bg-[#0b1120] px-4 pb-20 pt-[96px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <h1 className="text-3xl font-extrabold text-white">Billing</h1>
          <p className="mt-2 text-slate-300">Manage your plan, invoices, and payment preferences.</p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-3xl border p-6 ${
                plan.recommended
                  ? 'border-brand-400/40 bg-brand-500/10 shadow-[0_0_30px_rgba(74,222,128,0.16)]'
                  : 'border-white/[0.1] bg-white/[0.03]'
              }`}
            >
              {plan.recommended ? (
                <span className="rounded-full border border-brand-400/35 bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-300">
                  Recommended
                </span>
              ) : null}
              <h2 className="mt-3 text-2xl font-bold text-white">{plan.name}</h2>
              <p className="mt-1 text-3xl font-extrabold text-white">{plan.price}<span className="text-base text-slate-400">/month</span></p>
              <p className="mt-2 text-sm text-slate-300">{plan.detail}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-brand-300" />{perk}</li>
                ))}
              </ul>
              <button className="mt-6 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600">Choose {plan.name}</button>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white"><CreditCard className="h-5 w-5 text-brand-300" /> Payment Method</h3>
            <p className="mt-3 text-sm text-slate-300">No card added yet. Add a card to upgrade to Pro instantly.</p>
            <button className="mt-4 rounded-xl border border-white/[0.14] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/[0.1]">Add Payment Method</button>
          </article>

          <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white"><ReceiptText className="h-5 w-5 text-brand-300" /> Invoices</h3>
            <p className="mt-3 text-sm text-slate-300">Invoices and transaction history will appear here after your first payment.</p>
            <button className="mt-4 rounded-xl border border-white/[0.14] bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/[0.1]">Download History</button>
          </article>
        </section>

        <section className="rounded-3xl border border-white/[0.1] bg-gradient-to-r from-brand-500/10 to-transparent p-6">
          <h3 className="flex items-center gap-2 text-xl font-bold text-white"><ShieldCheck className="h-5 w-5 text-brand-300" /> Billing Security</h3>
          <p className="mt-2 text-sm text-slate-300">All payments are processed through PCI-compliant partners with encrypted transport and tokenized storage.</p>
        </section>
      </div>
    </div>
  )
}
