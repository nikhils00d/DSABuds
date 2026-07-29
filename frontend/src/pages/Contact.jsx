import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock3, Disc3, GitBranch, Globe, Mail, MapPinned, MessageSquareText, Send } from 'lucide-react'
import MarketingShell from '../components/marketing/MarketingShell'

const faqs = [
  {
    q: 'How quickly does support reply?',
    a: 'Most support requests receive a response within 24 hours on business days.',
  },
  {
    q: 'Can we schedule a team demo?',
    a: 'Yes. Enterprise and cohort onboarding demos are available by appointment.',
  },
  {
    q: 'Where do I report product issues?',
    a: 'Use this contact form with subject Product Issue and include steps to reproduce.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2500)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <MarketingShell
      eyebrow="Contact"
      title="Talk To The DSABuds Team"
      description="Have a question about plans, onboarding, or feature ideas? Reach out and we will help you move faster."
    >
      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="text-2xl font-bold text-white">Send Us A Message</h2>
          <p className="mt-2 text-sm text-slate-300">We read every message and route it to the right person quickly.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-label="Contact form">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-200">Name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-white/[0.14] bg-[#0b1730] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none" placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">Email</label>
              <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded-xl border border-white/[0.14] bg-[#0b1730] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-200">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={handleChange} required className="w-full rounded-xl border border-white/[0.14] bg-[#0b1730] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none" placeholder="How can we help?" />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-200">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full rounded-xl border border-white/[0.14] bg-[#0b1730] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none" placeholder="Share details, context, and your goal." />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600">
              <Send className="h-4 w-4" />
              Send Message
            </button>
            {sent ? <p className="text-sm text-brand-300">Message sent successfully. Our team will reply shortly.</p> : null}
          </form>
        </article>

        <div className="space-y-5">
          <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6">
            <h3 className="text-xl font-bold text-white">Connect</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand-300"><GitBranch className="h-4 w-4" /> GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand-300"><Globe className="h-4 w-4" /> LinkedIn</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-brand-300"><Disc3 className="h-4 w-4" /> Discord</a></li>
              <li><a href="mailto:support@dsabuds.com" className="inline-flex items-center gap-2 hover:text-brand-300"><Mail className="h-4 w-4" /> support@dsabuds.com</a></li>
            </ul>
          </article>

          <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6">
            <h3 className="text-xl font-bold text-white">Support Hours</h3>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-300"><Clock3 className="h-4 w-4 text-brand-300" /> Monday to Friday, 9:00 AM to 7:00 PM IST</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-300"><MessageSquareText className="h-4 w-4 text-brand-300" /> Average first response: under 24 hours</p>
          </article>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="mt-5 space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/[0.08] bg-[#0c1528] p-4">
                <h3 className="text-sm font-semibold text-slate-100">{item.q}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
          <Link to="/pricing" className="mt-5 inline-flex text-sm font-semibold text-brand-300 hover:text-brand-200">See pricing details</Link>
        </article>

        <article className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-7">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-white"><MapPinned className="h-6 w-6 text-brand-300" /> Office Location</h2>
          <p className="mt-2 text-sm text-slate-300">Bengaluru, India</p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 h-[320px] rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#0e1f3b] to-[#102b20] p-6"
            role="img"
            aria-label="Map placeholder showing DSABuds office region"
          >
            <div className="flex h-full flex-col items-center justify-center text-center">
              <MapPinned className="h-10 w-10 text-brand-300" />
              <p className="mt-3 text-base font-semibold text-white">Interactive Map Available In Production</p>
              <p className="mt-2 max-w-sm text-sm text-slate-300">Embed your preferred maps provider here with office marker, transit details, and meeting directions.</p>
            </div>
          </motion.div>
        </article>
      </section>
    </MarketingShell>
  )
}
