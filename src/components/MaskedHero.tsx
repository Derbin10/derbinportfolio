'use client'

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect } from 'react'

const VB_W = 1000
const VB_H = 196
const TOP = 22 // cap-top of the word inside the viewBox
const BASE = 182 // baseline

/**
 * Motion-effects recipe 09 "Masked type": the word starts as a thin outline,
 * then the artwork rises through the letterforms behind an accent edge marker.
 * Built in SVG so the word always spans the container exactly (textLength).
 */
export default function MaskedHero({ word, art }: { word: string; art: string }) {
  const reduce = useReducedMotion()
  const progress = useMotionValue(reduce ? 1 : 0)
  // Cover rect hides the art above the rising edge
  const coverH = useTransform(progress, (p) => TOP + (BASE - TOP) * (1 - p))
  const markerY = useTransform(coverH, (h) => h)
  const markerOpacity = useTransform(progress, [0, 0.05, 0.85, 1], [0, 1, 1, 0])

  useEffect(() => {
    if (reduce) return
    const controls = animate(progress, 1, { duration: 1.6, delay: 0.35, ease: [0.65, 0, 0.35, 1] })
    return () => controls.stop()
  }, [progress, reduce])

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="block h-auto w-full overflow-visible"
      role="img"
      aria-label={word}
    >
      <defs>
        <clipPath id="hero-word">
          <text
            x="0"
            y={BASE}
            textLength={VB_W}
            lengthAdjust="spacingAndGlyphs"
            className="font-display"
            fontSize="232"
            fontWeight="800"
          >
            {word}
          </text>
        </clipPath>
      </defs>

      <g clipPath="url(#hero-word)">
        <image
          href={art}
          x="0"
          y="-20"
          width={(VB_H + 40) * 10}
          height={VB_H + 40}
          preserveAspectRatio="xMinYMid slice"
          className={reduce ? undefined : 'animate-[hero-pan_60s_ease-in-out_infinite_alternate]'}
        />
        <motion.rect x="0" y="0" width={VB_W} style={{ height: coverH }} fill="#050a1f" />
      </g>

      {/* Outline stays on top so the letters read before and after the fill */}
      <text
        x="0"
        y={BASE}
        textLength={VB_W}
        lengthAdjust="spacingAndGlyphs"
        className="font-display"
        fontSize="232"
        fontWeight="800"
        fill="none"
        stroke="rgb(157 177 255 / 0.4)"
        strokeWidth="1"
        aria-hidden
      >
        {word}
      </text>

      {/* Edge marker: an accent line with a square handle that climbs with the fill */}
      <motion.g style={{ y: markerY, opacity: markerOpacity }} aria-hidden>
        <line x1="-6" x2={VB_W + 6} y1="0" y2="0" stroke="#2f54ff" strokeWidth="1.5" />
        <rect x="-10" y="-4" width="8" height="8" fill="#2f54ff" />
      </motion.g>
    </svg>
  )
}
