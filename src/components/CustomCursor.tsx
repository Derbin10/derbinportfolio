'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'

/**
 * A designer's cursor: the vector selection arrow from Figma / Illustrator, sitting exactly
 * on the pointer, with a multiplayer-style name tag that follows on a spring and says what a
 * click will do ("View project", "Drag", "Open report"…). Elements can set their own tag with
 * data-cursor-label. Only on precise pointers with motion allowed; text fields keep the
 * system I-beam; touch and reduced-motion users keep the system cursor.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)
  const [pressed, setPressed] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const tx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const ty = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !calm.matches)
    update()
    fine.addEventListener('change', update)
    calm.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      calm.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target instanceof Element ? e.target : null
      if (el?.closest('input, textarea, select')) {
        setHidden(true)
        return
      }
      setHidden(false)
      const own = el?.closest('[data-cursor-label]')?.getAttribute('data-cursor-label')
      const mode = el?.closest('[data-cursor]')?.getAttribute('data-cursor')
      if (own) setLabel(own)
      else if (mode === 'view') setLabel('View project')
      else if (mode === 'drag') setLabel('Drag to browse')
      else if (el?.closest('a, button, label, [role="button"]')) setLabel('Click')
      else setLabel(null)
    }
    const onLeave = () => setHidden(true)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]" style={{ opacity: hidden ? 0 : 1 }}>
      {/* Selection arrow — tip sits exactly on the pointer */}
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        className="absolute left-0 top-0 drop-shadow-[0_2px_3px_rgb(5_10_31/0.35)]"
        style={{ x, y, scale: pressed ? 0.85 : 1 }}
      >
        <path d="M2 1.5 19 9.3l-7.3 2.3-3.4 7.1L2 1.5Z" fill="#2f54ff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </motion.svg>

      {/* Multiplayer-style name tag */}
      <motion.div className="absolute left-0 top-0" style={{ x: tx, y: ty }}>
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6, x: 14, y: 22 }}
              animate={{ opacity: 1, scale: 1, x: 18, y: 24 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="block origin-top-left whitespace-nowrap rounded-full rounded-tl-sm bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
