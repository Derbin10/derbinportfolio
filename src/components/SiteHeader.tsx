'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { site } from '@/content/site'
import Wordmark from './Wordmark'
import { ArrowUpRight } from './icons'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const EASE = [0.19, 1, 0.22, 1] as const

/** Floating glass pill — always dark, so it reads over both light and dark sections. */
export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="fixed inset-x-0 top-3 z-50 md:top-5">
      <div className="container-x">
        <div className="dark relative z-10 flex h-14 items-center justify-between rounded-full border border-line !bg-navy/80 pl-5 pr-2 shadow-[0_10px_40px_-12px_rgb(5_10_31/0.5)] backdrop-blur-xl md:h-16 md:pl-7">
          <Link href="/" aria-label={`${site.name} — home`} className="flex h-11 items-center">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`flex h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors ${
                  isActive(item.href) ? 'bg-surface-2 text-fg' : 'text-fg-2 hover:text-fg'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={`mailto:${site.email}`} className="btn btn-light hidden !min-h-11 !py-1 !pl-5 !pr-1 text-sm sm:inline-flex">
              Get in touch
              <span className="btn-badge !size-9 bg-accent text-on-accent">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex size-11 items-center justify-center rounded-full bg-surface-2 md:hidden"
            >
              <span className="relative block h-2.5 w-5">
                <span className={`absolute left-0 h-0.5 w-full rounded bg-fg transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-0.5 w-full rounded bg-fg transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="dark glow fixed inset-0 -top-3 flex flex-col px-5 pb-8 pt-28 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0 round 0 0 40px 40px)' }}
            animate={{ clipPath: 'inset(0 0 0% 0 round 0 0 0px 0px)' }}
            exit={{ clipPath: 'inset(0 0 100% 0 round 0 0 40px 40px)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, i) => (
                <div key={item.href} className="overflow-hidden border-b border-line">
                  <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.12 + i * 0.06, duration: 0.7, ease: EASE }}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className="flex items-baseline justify-between py-4 font-display text-5xl font-semibold tracking-tight"
                    >
                      {item.label}
                      <span className="text-sm font-medium text-accent-text">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <div className="mt-auto space-y-3">
              <a href={`mailto:${site.email}`} className="btn btn-primary w-full justify-between">
                {site.email}
                <span className="btn-badge bg-white/15">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
              <p className="text-center text-sm text-muted">{site.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
