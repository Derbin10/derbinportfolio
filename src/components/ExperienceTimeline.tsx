'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { BriefcaseBusiness, CalendarDays, MapPin, Sparkles } from 'lucide-react'
import type { Role } from '@/content/site'

/**
 * Résumé-style timeline. The rail draws itself as you scroll, each stop pops in with its icon
 * and a single ring pulse, and nested freelance engagements slide in from the rail.
 */
export default function ExperienceTimeline({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <ol ref={ref} className="relative">
      {/* rail: faint track + drawn progress */}
      <span aria-hidden className="absolute bottom-4 left-[19px] top-4 w-0.5 rounded bg-accent/15" />
      <motion.span
        aria-hidden
        className="absolute bottom-4 left-[19px] top-4 w-0.5 origin-top rounded bg-accent"
        style={{ scaleY: reduce ? 1 : draw }}
      />
      {roles.map((role, i) => {
        const Icon = role.title.startsWith('Freelance') ? Sparkles : BriefcaseBusiness
        return (
          <motion.li
            key={role.title + role.org}
            className="relative pb-12 pl-14 last:pb-0"
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <motion.span
              aria-hidden
              className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-accent text-white ring-4 ring-bg"
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
            >
              <Icon className="size-[18px]" />
              {!reduce && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-accent"
                  initial={{ scale: 1, opacity: 0.8 }}
                  whileInView={{ scale: 1.8, opacity: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              )}
            </motion.span>
            <RoleBody role={role} />
            {role.children && (
              <ol className="mt-6 space-y-4">
                {role.children.map((child, j) => (
                  <motion.li
                    key={child.title + child.org}
                    className="relative rounded-2xl border border-line bg-surface p-5"
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + j * 0.1 }}
                  >
                    <span aria-hidden className="absolute -left-[40px] top-7 h-0.5 w-[34px] bg-accent/40" />
                    <RoleBody role={child} small />
                  </motion.li>
                ))}
              </ol>
            )}
          </motion.li>
        )
      })}
    </ol>
  )
}

function RoleBody({ role, small }: { role: Role; small?: boolean }) {
  return (
    <div>
      <h3 className={`${small ? 'text-lg' : 'text-h3'} font-semibold`}>{role.title}</h3>
      <p className={`mt-1 font-semibold text-accent-text ${small ? 'text-[0.95rem]' : 'text-lg'}`}>
        {role.org}
        {role.duration && <span className="font-medium"> ({role.duration})</span>}
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-4" aria-hidden />
          {role.start} – {role.end}
        </span>
        {role.place && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-4" aria-hidden />
            {role.place}
          </span>
        )}
      </p>
      {role.note && <p className="mt-3 text-sm italic text-muted">{role.note}</p>}
      {role.points.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {role.points.map((p) => (
            <li key={p} className="border-l-2 border-accent pl-3 text-[0.95rem] leading-relaxed text-fg-2">
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
