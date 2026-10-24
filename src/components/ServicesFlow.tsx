'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface Service {
  title: string
  body: string
  items: string[]
}

/**
 * "What I do?" — services as connected pills (reference 4), animated with the
 * motion-effects "Flowing paths" recipe: a pulse travels the snake A→B→D→C→E→F and each
 * pill answers with a ring as it arrives. Pills are buttons; the panel below explains
 * the selected service, so it works by tap, click or keyboard.
 */
export default function ServicesFlow({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0)
  // Snake order through a 2-column grid: row 1 L→R, row 2 R→L, row 3 L→R
  const snake = [0, 1, 3, 2, 4, 5]
  const filled = new Set([0, 3, 4])

  return (
    <div>
      <ul className="relative mx-auto grid max-w-3xl gap-y-6 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
        {services.map((s, i) => {
          const step = snake.indexOf(i)
          return (
            // On phones the single column follows the snake order, so the joints connect in sequence
            <li key={s.title} className="relative max-md:order-(--o)" style={{ '--o': step } as React.CSSProperties}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={active === i}
                style={{ animationDelay: `${step}s` }}
                className={`relative z-10 flex min-h-16 w-full animate-node items-center justify-center rounded-full border-2 px-6 text-center text-base font-semibold transition-colors md:text-lg ${
                  filled.has(i) ? 'border-white bg-white text-navy' : 'border-white/80 bg-navy-2 text-white'
                } ${active === i ? '!border-accent !bg-accent !text-white' : ''}`}
              >
                {s.title}
              </button>
              <Bridge index={i} step={step} />
            </li>
          )
        })}
      </ul>

      <div className="mx-auto mt-12 max-w-2xl text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lede text-fg-2">{services[active].body}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {services[active].items.map((item) => (
                <li key={item} className="rounded-full border border-line-strong px-3 py-1.5 text-sm text-fg-2">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/** The blob joint linking one pill to the next in the snake, with a light pulse riding it. */
function Bridge({ index, step }: { index: number; step: number }) {
  if (step === 5) return null
  // Desktop: horizontal joints in rows, vertical joints at the turns; mobile: always vertical
  const desktopHorizontal = index === 0 || index === 3 || index === 4
  const turnRight = index === 1
  return (
    <>
      <span
        aria-hidden
        className="absolute left-1/2 top-full block h-6 w-5 -translate-x-1/2 overflow-hidden bg-white/85 md:hidden"
      >
        <span className="absolute inset-x-0 h-2 animate-[flow-v_6s_linear_infinite] bg-accent" style={{ animationDelay: `${step + 0.5}s` }} />
      </span>
      {desktopHorizontal && (
        <span
          aria-hidden
          className={`absolute top-1/2 hidden h-5 w-12 -translate-y-1/2 overflow-hidden bg-white/85 md:block ${index === 3 ? 'right-full' : 'left-full'}`}
        >
          <span
            className={`absolute inset-y-0 w-3 bg-accent ${index === 3 ? 'animate-[flow-l_6s_linear_infinite]' : 'animate-[flow-r_6s_linear_infinite]'}`}
            style={{ animationDelay: `${step + 0.5}s` }}
          />
        </span>
      )}
      {!desktopHorizontal && (
        <span
          aria-hidden
          className={`absolute top-full hidden h-10 w-5 overflow-hidden bg-white/85 md:block ${turnRight ? 'right-10' : 'left-10'}`}
        >
          <span className="absolute inset-x-0 h-3 animate-[flow-v_6s_linear_infinite] bg-accent" style={{ animationDelay: `${step + 0.5}s` }} />
        </span>
      )}
    </>
  )
}
