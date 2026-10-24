import type { ReactNode } from 'react'
import MaskedLine from './MaskedLine'
import Reveal from './Reveal'
import { ArrowDownLeft } from './icons'

/** Pill label like "Our Services ↙" from the reference posts. */
export function PillLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-sm font-medium text-accent-text">
      {children}
      <ArrowDownLeft className="size-3.5" />
    </span>
  )
}

interface SectionHeadProps {
  label: string
  title: ReactNode
  aside?: ReactNode
  center?: boolean
}

/** Section opener: pill label + headline on the left, a short supporting line on the right. */
export default function SectionHead({ label, title, aside, center }: SectionHeadProps) {
  if (center) {
    return (
      <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16">
        <PillLabel>{label}</PillLabel>
        <h2 className="mt-5 text-h2 font-semibold">
          <MaskedLine>{title}</MaskedLine>
        </h2>
        {aside && <Reveal className="mt-5 max-w-[52ch] text-fg-2">{aside}</Reveal>}
      </div>
    )
  }
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <PillLabel>{label}</PillLabel>
        <h2 className="mt-5 text-h2 font-semibold">
          <MaskedLine>{title}</MaskedLine>
        </h2>
      </div>
      {aside && <Reveal className="text-fg-2 md:col-span-4 md:col-start-9">{aside}</Reveal>}
    </div>
  )
}
