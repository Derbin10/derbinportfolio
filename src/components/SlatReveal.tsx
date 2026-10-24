'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

const SLATS = 7

/**
 * Motion-effects recipe 12 "Image reveal": dark shutter slats narrow to their own
 * centre line, left to right, each a beat after the last. Each slat has a faint
 * light edge so it reads as a physical object.
 */
export default function SlatReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="closed"
      whileInView="open"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
    >
      {children}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-0 flex">
          {Array.from({ length: SLATS }, (_, i) => (
            <motion.span
              key={i}
              className="h-full flex-1 border-x border-white/10 bg-bg"
              variants={{ closed: { scaleX: 1 }, open: { scaleX: 0 } }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.65, 0, 0.35, 1] }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
