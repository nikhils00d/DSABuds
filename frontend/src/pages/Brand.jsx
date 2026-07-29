import { motion } from 'framer-motion'
import { CheckCircle2, Code2, Layers3, Network, ShieldCheck, Sparkles, Target, Users } from 'lucide-react'
import BrandMark from '../components/common/BrandMark'
import MarketingShell from '../components/marketing/MarketingShell'

const swatches = [
  { label: 'Emerald', value: '#22C55E' },
  { label: 'Accent', value: '#10B981' },
  { label: 'Navy', value: '#0B1220' },
  { label: 'White', value: '#F8FAFC' },
]

const principles = [
  { icon: Code2, title: 'Coding-first', text: 'The mark uses angular structure and bracket cues so it feels native to software builders.' },
  { icon: Target, title: 'Consistency', text: 'A circular progress ring communicates streaks and momentum at a glance.' },
  { icon: Users, title: 'Community', text: 'Node accents suggest accountability groups and shared progress loops.' },
  { icon: Sparkles, title: 'Premium SaaS', text: 'The final shape stays minimal, modern, and scalable from favicon to hero lockup.' },
]

export default function Brand() {
  return (
    <MarketingShell
      eyebrow="Brand System"
      title="DSABuds identity guidelines"
      description="A minimal mark, a readable wordmark, and a compact icon family that scale across the app, favicon, and marketing surfaces."
    >
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="text-2xl font-bold text-white">Logo lockups</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-white/[0.08] bg-[#0b1220] p-6">
              <BrandMark tone="dark" className="justify-start" />
            </div>
            <div className="rounded-3xl border border-white/[0.08] bg-white p-6">
              <BrandMark tone="light" className="justify-start" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/[0.08] bg-[#0b1220] p-6 text-center">
                <BrandMark variant="stacked" tone="dark" className="flex-col justify-center" />
              </div>
              <div className="rounded-3xl border border-white/[0.08] bg-white p-6 text-center">
                <BrandMark variant="stacked" tone="light" className="flex-col justify-center" />
              </div>
            </div>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-brand-400/25 bg-brand-500/10 p-6 shadow-[0_0_30px_rgba(74,222,128,0.12)]">
            <h2 className="text-2xl font-bold text-white">Icon direction</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              A circular streak ring forms the foundation, with code-bracket cues and node accents to suggest growth, consistency, and community.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#08101e] p-4">
                <BrandMark variant="icon" tone="dark" className="h-14 w-14" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Favicon and app icon ready</p>
                <p className="mt-1 text-sm text-slate-300">The icon remains readable at 16px and still works as a rounded-square app tile.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
            <h3 className="text-xl font-bold text-white">Color system</h3>
            <div className="mt-4 space-y-3">
              {swatches.map((swatch) => (
                <div key={swatch.label} className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#0b1220] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{swatch.label}</p>
                    <p className="text-xs text-slate-500">{swatch.value}</p>
                  </div>
                  <span className="h-8 w-8 rounded-xl border border-white/[0.12]" style={{ background: swatch.value }} />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
        {principles.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6"
            >
              <Icon className="h-7 w-7 text-brand-300" />
              <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
            </motion.article>
          )
        })}
      </section>

      <section className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b1220] p-5">
            <ShieldCheck className="h-6 w-6 text-brand-300" />
            <p className="mt-3 text-sm text-slate-300">Use the icon on dark or light surfaces with the matching wordmark tone.</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b1220] p-5">
            <CheckCircle2 className="h-6 w-6 text-brand-300" />
            <p className="mt-3 text-sm text-slate-300">Keep the mark compact and avoid stretching, outlines, or extra decoration.</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0b1220] p-5">
            <Layers3 className="h-6 w-6 text-brand-300" />
            <p className="mt-3 text-sm text-slate-300">Use the icon alone for favicon and app icons; use the full lockup elsewhere.</p>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}