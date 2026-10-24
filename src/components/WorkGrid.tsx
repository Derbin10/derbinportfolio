'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { Project } from '@/lib/types'
import ProjectCard from './ProjectCard'
import { ArrowUpRight } from './icons'

type View = 'grid' | 'list'

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects])
  const [active, setActive] = useState('All')
  const [view, setView] = useState<View>('grid')
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 md:mb-14">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`h-11 rounded-full border px-5 text-sm font-semibold transition-colors ${
                active === c ? 'border-accent bg-accent text-on-accent' : 'border-line-strong bg-surface text-fg-2 hover:border-fg hover:text-fg'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Layout" className="flex rounded-full border border-line-strong bg-surface p-1">
          {(['grid', 'list'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`h-9 rounded-full px-4 text-sm font-semibold capitalize transition-colors ${view === v ? 'bg-navy text-white' : 'text-fg-2'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === 'grid' ? (
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
              >
                <ProjectCard project={p} priority={i < 3} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <WorkList projects={visible} />
      )}
    </>
  )
}

/** Folioblox "Latest projects" rows; on desktop a preview of the work follows the cursor. */
function WorkList({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<Project | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 26 })
  const y = useSpring(my, { stiffness: 220, damping: 26 })

  return (
    <div
      // Not overflow-hidden: the cursor preview may float past the list's edges
      className="relative rounded-card border border-line bg-surface [&>ul>li:first-child>a]:rounded-t-card [&>ul>li:last-child>a]:rounded-b-card"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(e.clientX - r.left)
        my.set(e.clientY - r.top)
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul>
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-line last:border-b-0">
            <Link
              href={`/work/${p.slug}`}
              data-cursor="view"
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(p)}
              className="group grid grid-cols-[72px_1fr] items-center gap-4 p-4 transition-colors hover:bg-surface-2/60 md:grid-cols-[1fr_auto] md:px-8 md:py-7"
            >
              <span className="relative aspect-square overflow-hidden rounded-2xl bg-surface-2 md:hidden">
                <Image src={p.cover.src} alt="" fill sizes="72px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-accent-text">{p.category}</span>
                <span className="mt-1 block text-lg font-semibold tracking-tight md:text-2xl">{p.title}</span>
                <span className="mt-1 hidden max-w-[70ch] truncate text-sm text-muted md:block">{p.summary}</span>
              </span>
              <span className="col-span-2 flex items-center gap-3 md:col-span-1">
                {p.year && <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-fg-2">{p.year}</span>}
                <span className="hidden size-11 items-center justify-center rounded-full border border-line-strong transition-all group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white md:flex">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {!reduce && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="preview"
              aria-hidden
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="pointer-events-none absolute left-0 top-0 z-10 -ml-[150px] -mt-[200px] hidden w-[300px] md:block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgb(5_10_31/0.5)]">
                <Image src={hovered.cover.src} alt="" fill sizes="300px" className="object-cover" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
