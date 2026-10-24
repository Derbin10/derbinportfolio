'use client'

import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

export interface DockItem {
  name: string
  short: string
}

const BASE = 64
const PEAK = 104
const SIGMA = 90 // px — width of the bell-curve falloff

/**
 * Motion-effects recipe 08 "Magnetic dock": tiles swell with a smooth bell-curve
 * falloff around the cursor; the label always sits over the biggest tile.
 * Touch and reduced-motion users get a static, fully labelled grid.
 */
export default function MagneticDock({ items }: { items: DockItem[] }) {
  const mouseX = useMotionValue(Infinity)
  const reduce = useReducedMotion()

  return (
    <>
      <ul
        aria-label="Tools"
        onPointerMove={(e) => e.pointerType === 'mouse' && mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className="mx-auto hidden h-[136px] w-fit items-end gap-3 rounded-[28px] border border-line bg-surface/70 px-4 pb-4 backdrop-blur md:flex"
      >
        {items.map((item) => (
          <DockTile key={item.name} item={item} mouseX={mouseX} still={!!reduce} />
        ))}
      </ul>
      <ul aria-label="Tools" className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:hidden">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface p-4 text-center">
            <span className="font-display text-xl font-bold">{item.short}</span>
            <span className="text-xs text-muted">{item.name}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function DockTile({ item, mouseX, still }: { item: DockItem; mouseX: MotionValue<number>; still: boolean }) {
  const ref = useRef<HTMLLIElement>(null)
  const [hover, setHover] = useState(false)
  const target = useTransform(mouseX, (x) => {
    if (still || !Number.isFinite(x) || !ref.current) return BASE
    const b = ref.current.getBoundingClientRect()
    const d = x - (b.left + b.width / 2)
    return BASE + (PEAK - BASE) * Math.exp(-(d * d) / (2 * SIGMA * SIGMA))
  })
  const size = useSpring(target, { mass: 0.1, stiffness: 170, damping: 14 })
  const fontSize = useTransform(size, (s) => `${s * 0.3}px`)

  return (
    <motion.li
      ref={ref}
      style={{ width: size, height: size }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="relative flex shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-surface-2 transition-colors hover:border-accent hover:bg-accent"
    >
      <motion.span style={{ fontSize }} className="font-display font-bold leading-none" aria-hidden>
        {item.short}
      </motion.span>
      <span className="sr-only">{item.name}</span>
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-11 whitespace-nowrap rounded-full bg-fg px-3 py-1.5 text-xs font-semibold text-bg"
            aria-hidden
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
