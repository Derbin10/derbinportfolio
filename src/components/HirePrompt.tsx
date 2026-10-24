'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, CheckCircle2, FileDown, Mail, X } from 'lucide-react'
import { site } from '@/content/site'
import BrandIcon from './BrandIcon'

type Mode = 'pitch' | 'downloaded'

const SEEN_KEY = 'derbin:hire-prompt-seen'

/**
 * Hire prompt, built with the popups skill's rules: a non-blocking slide-in (never a modal over
 * the work), shown automatically once per visitor after 10 seconds of real attention (tab
 * visible, page scrolled), never on the contact page, and remembered once dismissed.
 * A pill keeps it one click away afterwards. Downloading the résumé is never gated — instead
 * the card switches to a "while it downloads" follow-up with direct contact options.
 */
export default function HirePrompt() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('pitch')
  const [pill, setPill] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Pill appears once the visitor has moved past the first screen
  useEffect(() => {
    const onScroll = () => setPill(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-open once: 10 s of visible time on a page the visitor has started to scroll
  useEffect(() => {
    if (pathname.startsWith('/contact')) return
    let seen = false
    try {
      seen = localStorage.getItem(SEEN_KEY) === '1'
    } catch {}
    if (seen) return
    let visibleMs = 0
    let scrolled = window.scrollY > 120
    const onScroll = () => (scrolled = scrolled || window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') visibleMs += 500
      if (visibleMs >= 10_000 && scrolled) {
        setMode('pitch')
        setOpen(true)
        try {
          localStorage.setItem(SEEN_KEY, '1')
        } catch {}
        clearInterval(id)
      }
    }, 500)
    return () => {
      clearInterval(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [pathname])

  // Résumé downloads anywhere on the site: let the file go, then offer the next step
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]')
      if (a?.getAttribute('href') === site.resume) {
        setTimeout(() => {
          setMode('downloaded')
          setOpen(true)
        }, 600)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-3 z-[70] flex flex-col items-start gap-3 sm:inset-x-auto sm:bottom-5 sm:left-5">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-modal="false"
            aria-labelledby="hire-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="dark glow pointer-events-auto w-full overflow-hidden rounded-[24px] border border-line-strong shadow-[0_30px_70px_-20px_rgb(5_10_31/0.6)] sm:w-[380px]"
          >
            <div className="relative p-5">
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full text-fg-2 hover:bg-surface-2 hover:text-fg"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-3 pr-10">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent">
                  <Image src={site.portrait} alt="" fill sizes="48px" className="object-cover object-[50%_20%]" />
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#3ddc84]/15 px-2.5 py-1 text-xs font-semibold text-[#3ddc84]">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3ddc84] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#3ddc84]" />
                  </span>
                  Open to new roles now
                </span>
              </div>

              {mode === 'pitch' ? (
                <>
                  <h2 id="hire-title" className="mt-4 text-xl font-semibold leading-snug">
                    Hiring a brand designer?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">
                    Good designers get hired fast. I built Fedrus Global’s brand from scratch and designed reports for
                    TCPL and Diageo India. Let’s talk before someone else does.
                  </p>
                </>
              ) : (
                <>
                  <h2 id="hire-title" className="mt-4 flex items-center gap-2 text-xl font-semibold leading-snug">
                    <CheckCircle2 className="size-5 text-[#3ddc84]" aria-hidden />
                    Your résumé is on its way
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">
                    While it downloads, the quickest way to set up a conversation is a WhatsApp message or an email.
                  </p>
                </>
              )}

              <div className="mt-5 grid gap-2">
                {mode === 'pitch' && (
                  <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-primary justify-between" data-cursor-label="Download résumé">
                    <span className="inline-flex items-center gap-2">
                      <FileDown className="size-4" /> Download résumé
                    </span>
                    <span className="btn-badge bg-white/15">
                      <ArrowDown className="size-4" />
                    </span>
                  </a>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <a href={site.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost justify-center !px-4 text-sm" data-cursor-label="Chat on WhatsApp">
                    <BrandIcon name="WhatsApp" size={20} /> WhatsApp
                  </a>
                  <a href={`mailto:${site.email}?subject=Brand%20designer%20role`} className="btn btn-ghost justify-center !px-4 text-sm" data-cursor-label="Write an email">
                    <Mail className="size-4" /> Email
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pill && !open && (
          <motion.button
            type="button"
            onClick={() => {
              setMode('pitch')
              setOpen(true)
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="pointer-events-auto flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-navy px-4 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgb(5_10_31/0.6)]"
            data-cursor-label="Hire Derbin"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#3ddc84] opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[#3ddc84]" />
            </span>
            Available · Hire me
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
