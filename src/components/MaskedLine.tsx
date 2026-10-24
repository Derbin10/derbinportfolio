'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface MaskedLineProps {
  children: ReactNode
  delay?: number
  /** Animate on mount instead of when scrolled into view */
  onLoad?: boolean
  className?: string
}

/**
 * One line of display type that rises from behind a clean cut line (revealed by a mask, never faded).
 * The in-view check sits on the unclipped wrapper: the hidden inner line is fully clipped, so
 * observing it directly would never report it as visible.
 */
export default function MaskedLine({ children, delay = 0, onLoad, className = '' }: MaskedLineProps) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.1em] -mb-[0.1em] ${className}`}
      initial={reduce ? 'show' : 'hidden'}
      {...(onLoad ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -8% 0px' } })}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
        transition={{ duration: 1.1, delay, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}
