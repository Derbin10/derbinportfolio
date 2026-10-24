'use client'

import { motion, useReducedMotion } from 'motion/react'

/**
 * Background layer of graphic-design tools — a pen-tool curve with its anchors and handles,
 * a selection box, CMYK swatches, a registration mark and ruler ticks — drifting slowly so the
 * page quietly says "a designer made this". Decorative only (aria-hidden, no pointer events);
 * static under reduced motion, and thinned out on small screens.
 */
export default function DesignBackdrop({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const reduce = useReducedMotion()
  const ink = variant === 'dark' ? 'rgb(157 177 255 / 0.55)' : 'rgb(47 84 255 / 0.4)'
  const soft = variant === 'dark' ? 'rgb(157 177 255 / 0.18)' : 'rgb(47 84 255 / 0.12)'

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drifting light */}
      <div className={`absolute -right-24 -top-24 size-[420px] rounded-full blur-3xl ${reduce ? '' : 'animate-[orb_22s_ease-in-out_infinite_alternate]'} ${variant === 'dark' ? 'bg-accent/25' : 'bg-accent/10'}`} />
      <div className={`absolute -bottom-32 -left-24 size-[360px] rounded-full blur-3xl ${reduce ? '' : 'animate-[orb_28s_ease-in-out_infinite_alternate-reverse]'} ${variant === 'dark' ? 'bg-[#7d2ae8]/15' : 'bg-[#00aeef]/10'}`} />

      {/* Ruler along the top edge */}
      <svg className="absolute inset-x-0 top-0 hidden h-3 w-full md:block" preserveAspectRatio="none">
        <defs>
          <pattern id={`ruler-${variant}`} width="40" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 0v12M10 0v4M20 0v7M30 0v4" stroke={soft} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="12" fill={`url(#ruler-${variant})`} />
      </svg>

      {/* Pen-tool curve with anchors and handles */}
      <svg viewBox="0 0 520 260" className="absolute right-[4%] top-[18%] hidden w-[38vw] max-w-[560px] md:block">
        <motion.path
          d="M20 200 C 120 40, 220 40, 260 130 S 420 230, 500 60"
          fill="none"
          stroke={ink}
          strokeWidth="1.6"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
        />
        {/* handles */}
        <g stroke={soft} strokeWidth="1">
          <line x1="260" y1="130" x2="200" y2="40" />
          <line x1="260" y1="130" x2="320" y2="220" />
        </g>
        <circle cx="200" cy="40" r="4" fill="none" stroke={ink} />
        <circle cx="320" cy="220" r="4" fill="none" stroke={ink} />
        {[
          [20, 200],
          [260, 130],
          [500, 60],
        ].map(([x, y]) => (
          <rect key={x} x={x - 4.5} y={y - 4.5} width="9" height="9" fill={variant === 'dark' ? '#050a1f' : '#fff'} stroke={ink} strokeWidth="1.4" />
        ))}
      </svg>

      {/* Selection box with resize handles around a shape */}
      {variant === 'light' && (<div className={`absolute right-[9%] top-[7%] hidden lg:block ${reduce ? '' : 'animate-[float_9s_ease-in-out_infinite]'}`}>
        <div className="relative size-24 border border-dashed" style={{ borderColor: ink }}>
          <div className="absolute inset-3 rounded-full" style={{ background: soft }} />
          {['-left-1 -top-1', '-right-1 -top-1', '-left-1 -bottom-1', '-right-1 -bottom-1', 'left-1/2 -top-1 -ml-1', 'left-1/2 -bottom-1 -ml-1', 'top-1/2 -left-1 -mt-1', 'top-1/2 -right-1 -mt-1'].map((p) => (
            <span key={p} className={`absolute size-2 border bg-white ${p}`} style={{ borderColor: ink }} />
          ))}
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-accent px-1.5 py-0.5 font-mono text-[10px] text-white">96 × 96</span>
        </div>
      </div>)}

      {/* CMYK swatches */}
      <div className={`absolute hidden gap-2 sm:flex ${variant === 'dark' ? 'left-[4%] top-[12%]' : 'right-[4%] top-[3%]'}`}>
        {['#00AEEF', '#EC008C', '#FFF200', '#231F20'].map((c, i) => (
          <span
            key={c}
            className={`size-3.5 rounded-full ring-2 ring-white/70 ${reduce ? '' : 'animate-[float_6s_ease-in-out_infinite]'}`}
            style={{ background: c, animationDelay: `${i * 0.35}s`, opacity: variant === 'dark' ? 0.9 : 0.7 }}
          />
        ))}
      </div>

      {/* Registration mark */}
      <svg viewBox="0 0 40 40" className={`absolute bottom-[8%] left-[6%] size-10 ${reduce ? '' : 'animate-[turn_40s_linear_infinite]'}`}>
        <circle cx="20" cy="20" r="9" fill="none" stroke={ink} strokeWidth="1.2" />
        <circle cx="20" cy="20" r="4" fill={ink} />
        <path d="M20 2v36M2 20h36" stroke={ink} strokeWidth="1.2" />
      </svg>
    </div>
  )
}
