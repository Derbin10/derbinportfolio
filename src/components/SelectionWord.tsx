'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

/** A word "selected" in a design tool: dashed bounding box, eight handles and a layer tag. */
export default function SelectionWord({ children, tag, delay = 1.6 }: { children: ReactNode; tag: string; delay?: number }) {
  const reduce = useReducedMotion()
  const handles = ['-left-1 -top-1', '-right-1 -top-1', '-left-1 -bottom-1', '-right-1 -bottom-1', 'left-1/2 -top-1 -ml-1', 'left-1/2 -bottom-1 -ml-1', 'top-1/2 -left-1 -mt-1', 'top-1/2 -right-1 -mt-1']
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="text-accent-text">{children}</span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-x-0.5 -inset-y-0.5 border sm:-inset-x-2 border-dashed border-accent-text/80"
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        {handles.map((p) => (
          <span key={p} className={`absolute size-2 border border-accent-text bg-navy ${p}`} />
        ))}
        <span className="absolute -top-6 left-0 hidden rounded-sm sm:block bg-accent px-1.5 py-0.5 font-sans text-[11px] font-semibold leading-none tracking-normal text-white">
          {tag}
        </span>
      </motion.span>
    </span>
  )
}
