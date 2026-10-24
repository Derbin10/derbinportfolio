import type { Metadata } from 'next'
import { BadgeCheck, Building2, Clock4, Sparkles } from 'lucide-react'
import MaskedLine from '@/components/MaskedLine'
import ContactForm from '@/components/ContactForm'
import ContactCards from '@/components/ContactCards'
import Reveal from '@/components/Reveal'
import DesignBackdrop from '@/components/DesignBackdrop'
import { PillLabel } from '@/components/SectionHead'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Hire Derbin Davidraj, brand & marketing designer in Chennai, or start a brand, report or campaign project.',
  alternates: { canonical: '/contact' },
}

/** The 30-second version for a recruiter: why this hire, in four checkable lines. */
const pitch = [
  { icon: Building2, text: 'Built a company brand from scratch at Fedrus Global, still used company-wide.' },
  { icon: BadgeCheck, text: 'Designed reports for TCPL Packaging and Diageo India, start to print.' },
  { icon: Sparkles, text: 'Uses Claude, n8n and Google Flow to deliver faster.' },
  { icon: Clock4, text: 'Open to new roles now, in Chennai or relocating.' },
]

export default function ContactPage() {
  return (
    <div className="relative">
      <DesignBackdrop variant="light" />
      <div className="container-x relative pb-12 pt-32 md:pt-44">
        <PillLabel>Contact</PillLabel>
        <h1 className="mt-5 text-mega font-semibold">
          <MaskedLine onLoad>Let’s talk.</MaskedLine>
        </h1>
        <p className="mt-6 max-w-[52ch] text-lede text-fg-2">
          Hiring a brand or marketing designer, or need a brand system, report or campaign? Tap any card to reach me
          directly, or send a message below.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <ContactCards />
            <Reveal className="dark glow rounded-card p-6">
              <p className="text-sm font-semibold text-accent-text">Hiring? The 30-second version</p>
              <ul className="mt-4 space-y-3">
                {pitch.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 text-sm text-fg-2">
                    <Icon className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden />
                    {text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="rounded-card border border-line bg-surface p-6 md:p-8 lg:col-span-7">
            <h2 className="mb-8 text-h3 font-semibold">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
