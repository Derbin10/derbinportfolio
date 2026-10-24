'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import type { Flipbook } from '@/lib/types'
import { ArrowLeft, ArrowRight } from './icons'

interface FlipBookProps {
  title: string
  book: Flipbook
  /** Cover rendering: a large book on case pages, a compact card elsewhere */
  variant?: 'hero' | 'card'
}

/**
 * Report viewer. Only the cover is shown until someone asks for it; then a full-screen
 * dialog opens with a page-turning flip book. Arrow keys / buttons / swipe turn pages,
 * Esc or the close button exits, and focus returns to the cover.
 */
export default function FlipBook({ title, book, variant = 'hero' }: FlipBookProps) {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    trigger.current?.focus()
  }, [])

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="view"
        className="group relative block w-full text-left"
        aria-label={`Open ${title} as a flip book`}
      >
        <span
          className={`relative mx-auto block overflow-hidden rounded-r-xl rounded-l-sm bg-surface-2 shadow-[0_30px_60px_-25px_rgb(5_10_31/0.55)] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1.5 ${
            variant === 'hero' ? 'w-full max-w-md' : 'w-full'
          }`}
          style={{ aspectRatio: `${book.width} / ${book.height}` }}
        >
          <Image src={book.pages[0]} alt={`${title} — cover`} fill sizes={variant === 'hero' ? '448px' : '(min-width: 768px) 33vw, 100vw'} className="object-cover" />
          {/* spine shading so the cover reads as a printed book */}
          <span aria-hidden className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/25 to-transparent" />
        </span>
        <span className="btn btn-primary mx-auto mt-6 flex w-fit">
          Open flip book · {book.pages.length} pages
          <span className="btn-badge bg-white/15">
            <ArrowRight className="size-4" />
          </span>
        </span>
      </button>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>{open && <Viewer title={title} book={book} onClose={close} />}</AnimatePresence>,
          document.body,
        )}
    </>
  )
}

function Viewer({ title, book, onClose }: { title: string; book: Flipbook; onClose: () => void }) {
  const host = useRef<HTMLDivElement>(null)
  const flip = useRef<import('page-flip/dist/js/page-flip.module.js').PageFlip | null>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    closeBtn.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    let cancelled = false
    // page-flip removes its own root on destroy, so give it a child React doesn't manage.
    // HTML pages (not canvas) keep the area beside a closed cover transparent.
    const root = document.createElement('div')
    host.current?.appendChild(root)
    const pageEls = book.pages.map((src, i) => {
      const el = document.createElement('div')
      el.className = 'flip-page'
      if (i === 0 || i === book.pages.length - 1) el.dataset.density = 'hard'
      const img = document.createElement('img')
      img.src = src
      img.alt = `${title}, page ${i + 1}`
      img.loading = i < 4 ? 'eager' : 'lazy'
      img.draggable = false
      el.appendChild(img)
      root.appendChild(el)
      return el
    })
    import('page-flip/dist/js/page-flip.module.js').then(({ PageFlip }) => {
      if (cancelled) return
      const pf = new PageFlip(root, {
        width: book.width,
        height: book.height,
        size: 'stretch',
        minWidth: 240,
        maxWidth: 900,
        minHeight: 300,
        maxHeight: 1300,
        showCover: true,
        usePortrait: true,
        mobileScrollSupport: false,
        maxShadowOpacity: 0.35,
        flippingTime: 700,
      })
      pf.loadFromHTML(pageEls)
      pf.on('flip', (e) => setPage(Number(e.data)))
      flip.current = pf
    })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') flip.current?.flipNext()
      if (e.key === 'ArrowLeft') flip.current?.flipPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelled = true
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      flip.current?.destroy()
      flip.current = null
      // If the library never initialised (effect re-run before import resolved), drop the raw pages too
      root.remove()
    }
  }, [book, onClose, title])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} flip book`}
      className="dark fixed inset-0 z-[80] flex flex-col !bg-navy/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5">
        <p className="truncate font-semibold">{title}</p>
        <button ref={closeBtn} type="button" onClick={onClose} className="btn btn-ghost !pr-5 text-sm" aria-label="Close flip book">
          Close
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-2 md:px-16">
        {/* Width capped by the available height so a two-page spread never runs under the controls */}
        <div
          ref={host}
          className="w-full"
          style={{ maxWidth: `min(1500px, calc((100svh - 190px) * ${(book.width / book.height) * 2}))` }}
        />
      </div>

      <div className="flex items-center justify-center gap-4 px-4 pb-6 pt-3">
        <button type="button" onClick={() => flip.current?.flipPrev()} className="flex size-12 items-center justify-center rounded-full border border-line-strong hover:border-fg" aria-label="Previous page">
          <ArrowLeft className="size-5" />
        </button>
        <p className="min-w-28 text-center text-sm text-fg-2" aria-live="polite">
          Page {page + 1} of {book.pages.length}
        </p>
        <button type="button" onClick={() => flip.current?.flipNext()} className="flex size-12 items-center justify-center rounded-full bg-accent text-white" aria-label="Next page">
          <ArrowRight className="size-5" />
        </button>
      </div>
    </motion.div>
  )
}
