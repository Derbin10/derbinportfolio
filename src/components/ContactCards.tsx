'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, FileDown, Mail, Phone } from 'lucide-react'
import { site } from '@/content/site'
import BrandIcon from './BrandIcon'

const cards = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: <Mail className="size-5" />, tint: 'bg-accent text-white', cursor: 'Write an email' },
  { label: 'WhatsApp', value: site.phone, href: site.whatsapp, icon: <BrandIcon name="WhatsApp" size={44} />, tint: '', cursor: 'Chat on WhatsApp', external: true },
  { label: 'LinkedIn', value: 'in/derbin1234', href: site.linkedin, icon: <BrandIcon name="LinkedIn" size={44} />, tint: '', cursor: 'Open LinkedIn', external: true },
  { label: 'Phone', value: site.phone, href: `tel:${site.phone.replaceAll(' ', '')}`, icon: <Phone className="size-5" />, tint: 'bg-navy text-white', cursor: 'Call' },
  { label: 'Résumé', value: 'PDF · 1 page', href: site.resume, icon: <FileDown className="size-5" />, tint: 'bg-surface-2 text-accent-text', cursor: 'Download résumé', external: true },
]

/** Every contact is one big tap target; the whole card is the link. */
export default function ContactCards({ compact }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <div>
      <ul className={`grid gap-3 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-1'}`}>
        {cards.map((c, i) => (
          <motion.li
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <a
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noreferrer' : undefined}
              data-cursor-label={c.cursor}
              className="group flex min-h-[72px] items-center gap-4 rounded-2xl border border-line bg-surface p-3.5 pr-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_14px_30px_-18px_rgb(47_84_255/0.5)]"
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110 ${c.tint}`}
              >
                {c.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{c.label}</span>
                <span className="block truncate font-semibold">{c.value}</span>
              </span>
              <ArrowUpRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" />
            </a>
          </motion.li>
        ))}
      </ul>
      <button
        type="button"
        onClick={copy}
        className="mt-3 inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold transition-colors hover:border-fg"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'done' : 'copy'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            {copied ? <Check className="size-4 text-[#16a34a]" /> : <Copy className="size-4" />}
            {copied ? 'Email copied' : 'Copy email address'}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}
