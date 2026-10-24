import Link from 'next/link'
import { FileDown, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '@/content/site'
import Reveal from './Reveal'
import MaskedLine from './MaskedLine'
import BrandIcon from './BrandIcon'
import DesignBackdrop from './DesignBackdrop'
import { ArrowUpRight } from './icons'

const links = [
  { label: 'Email', href: `mailto:${site.email}`, icon: <Mail className="size-4" /> },
  { label: 'WhatsApp', href: site.whatsapp, icon: <BrandIcon name="WhatsApp" size={18} />, external: true },
  { label: 'LinkedIn', href: site.linkedin, icon: <BrandIcon name="LinkedIn" size={18} />, external: true },
  { label: 'Résumé (PDF)', href: site.resume, icon: <FileDown className="size-4" />, external: true },
]

export default function SiteFooter() {
  return (
    <footer className="pb-3 pt-16 md:pb-4 md:pt-24">
      <div className="panel dark glow">
        <DesignBackdrop variant="dark" />
        <div className="container-x relative pb-10 pt-20 md:pt-32">
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-fg-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3ddc84] opacity-80" />
              <span className="relative inline-flex size-2 rounded-full bg-[#3ddc84]" />
            </span>
            {site.status}
          </p>
          <h2 className="max-w-[13ch] text-mega font-semibold">
            <MaskedLine>Let’s build</MaskedLine>
            <MaskedLine delay={0.08}>
              your <span className="text-accent-text">brand</span>.
            </MaskedLine>
          </h2>

          <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-light text-base" data-cursor-label="Write an email">
              <Mail className="size-4" />
              {site.email}
              <span className="btn-badge bg-accent text-on-accent">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost !pr-6 text-base" data-cursor-label="Chat on WhatsApp">
              <BrandIcon name="WhatsApp" size={22} />
              WhatsApp
            </a>
          </Reveal>

          <div className="mt-24 grid gap-10 border-t border-line pt-10 text-sm sm:grid-cols-2 md:mt-32 md:grid-cols-4">
            <div>
              <p className="eyebrow mb-4 text-accent-text">Contact</p>
              <ul className="space-y-3 text-fg-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target={l.external ? '_blank' : undefined} rel={l.external ? 'noreferrer' : undefined} className="group inline-flex items-center gap-2.5 hover:text-fg">
                      <span className="transition-transform group-hover:scale-110">{l.icon}</span>
                      <span className="link-underline">{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-accent-text">Pages</p>
              <ul className="space-y-3 text-fg-2">
                <li><Link href="/work" className="link-underline hover:text-fg">Work</Link></li>
                <li><Link href="/about" className="link-underline hover:text-fg">About</Link></li>
                <li><Link href="/contact" className="link-underline hover:text-fg">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-accent-text">Based in</p>
              <p className="inline-flex items-center gap-2 text-fg-2">
                <MapPin className="size-4" /> {site.location}
              </p>
              <p className="mt-2 text-muted">Open to relocate</p>
            </div>
            <div>
              <p className="eyebrow mb-4 text-accent-text">Phone</p>
              <a href={`tel:${site.phone.replaceAll(' ', '')}`} className="inline-flex items-center gap-2 text-fg-2 hover:text-fg">
                <Phone className="size-4" /> <span className="link-underline">{site.phone}</span>
              </a>
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-2 text-xs text-muted sm:flex-row">
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <p>Designed &amp; built by Derbin with Claude Code.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
