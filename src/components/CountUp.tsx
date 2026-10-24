'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/** Counts a figure like "4+" up from zero when it scrolls into view; the suffix stays put. */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const match = value.match(/^(\d+)(.*)$/)
  const hasNumber = !!match
  const target = match ? Number(match[1]) : 0
  const suffix = match ? match[2] : value
  const [n, setN] = useState(reduce || !hasNumber ? target : 0)

  // Depend on primitives only: a fresh regex match each render would restart the count
  useEffect(() => {
    if (!inView || reduce || !hasNumber) return
    const c = animate(0, target, { duration: 1.4, ease: [0.19, 1, 0.22, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, reduce, target, hasNumber])

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>
        {match ? n : ''}
        {suffix}
      </span>
    </span>
  )
}
