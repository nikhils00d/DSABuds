import { Link } from 'react-router-dom'
import { footerLinks, footerSocialLinks } from '../navbar/navConfig'
import BrandMark from './BrandMark'

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07101f]/85 px-4 py-10 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[1.1fr_1fr_0.8fr] md:items-start">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-white">
            <BrandMark />
          </Link>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">Practice daily. Stay accountable. Land the role with a product that keeps consistency visible.</p>
        </div>

        <nav className="flex flex-wrap items-center gap-5" aria-label="Footer links">
          {footerLinks.map((item) => (
            <Link key={item.to} to={item.to} className="text-sm font-medium text-slate-300 hover:text-brand-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-3 md:justify-end" aria-label="Social links">
          {footerSocialLinks.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/[0.08] hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
