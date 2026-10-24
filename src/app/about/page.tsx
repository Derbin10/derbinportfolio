import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, BookOpenText, Building2, GraduationCap, LayoutGrid, Megaphone, PenTool, Wrench } from 'lucide-react'
import { clients, education, experience, services, site, stats, tools } from '@/content/site'
import Reveal from '@/components/Reveal'
import MaskedLine from '@/components/MaskedLine'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import BrandIcon from '@/components/BrandIcon'
import DesignBackdrop from '@/components/DesignBackdrop'
import { PillLabel } from '@/components/SectionHead'
import { ArrowUpRight } from '@/components/icons'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Derbin Davidraj — Chennai-based brand & marketing designer with a computer-science background and 4+ years designing brand systems, reports and campaigns for B2B companies.',
  alternates: { canonical: '/about' },
}

const serviceIcons = [PenTool, BookOpenText, LayoutGrid, Megaphone]

export default function AboutPage() {
  return (
    <>
      {/* Hero: copy on the left, the full portrait on the right (face always visible) */}
      <section className="pt-3 md:pt-4">
        <div className="panel dark glow">
          <DesignBackdrop variant="dark" />
          <div className="container-x relative grid items-end gap-10 pb-10 pt-28 md:grid-cols-12 md:pb-14 md:pt-36">
            <div className="md:col-span-7">
              <p className="text-lg font-semibold text-accent-text">Brand &amp; Marketing Designer · {site.location}</p>
              <h1 className="mt-3 text-mega font-semibold">
                <MaskedLine onLoad>About</MaskedLine>
              </h1>
              <Reveal delay={0.3}>
                <p className="mt-6 max-w-[48ch] text-lede text-fg-2">
                  4+ years in brand, report and campaign design. Open to relocate.
                </p>
              </Reveal>
              <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-3">
                <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-light" data-cursor-label="Download résumé">
                  Download résumé (PDF)
                  <span className="btn-badge bg-accent text-on-accent">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost !pr-6">
                  <BrandIcon name="LinkedIn" size={22} /> LinkedIn
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="md:col-span-4 md:col-start-9">
              <div className="relative mx-auto aspect-[521/700] w-full max-w-[340px] overflow-hidden rounded-card border border-line-strong bg-surface">
                <Image
                  src={site.portrait}
                  alt={`Portrait of ${site.name}`}
                  fill
                  priority
                  sizes="340px"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <p className="eyebrow text-accent-text">Who I am</p>
          <h2 className="mt-4 text-h2 font-semibold">
            <MaskedLine>A brand designer</MaskedLine>
            <MaskedLine delay={0.06}>who finishes the job.</MaskedLine>
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-semibold text-accent-text">{s.value}</dd>
                <dd className="mt-1 text-sm leading-snug text-fg-2" aria-hidden>
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-5 text-lede text-fg-2 md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="font-semibold text-fg">
              I’m the sole designer at Fedrus Global, where I built the company’s brand from scratch: logo redesign,
              colour, typography, guidelines and the PowerPoint templates every team presents on.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Through Fedrus I also design for its clients: TCPL Packaging’s annual report, Diageo India’s climate and ESG
              reports, and expo posters and a brochure for Tube Products of India. Before that, at Vibrant Education, I
              made VIBY International School look like one brand across its books, interiors, banners and marketing,
              working around the school’s existing logo.
            </p>
          </Reveal>
          <Reveal>
            <p>
              I studied computer science, and it shows in how I work: templates and systems people keep using after I
              hand them over. I use Claude, n8n and Google Flow to automate repetitive tasks, so more of my time goes into
              the design itself.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <PillLabel>Experience · 4+ years</PillLabel>
          <h2 className="mb-10 mt-5 text-h2 font-semibold">
            <MaskedLine>Where I’ve worked</MaskedLine>
          </h2>
          <ExperienceTimeline roles={experience} />
        </div>

        <aside className="space-y-4 md:col-span-4 md:col-start-9">
          <Reveal className="rounded-card border border-line bg-surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-semibold">
              <PenTool className="size-5 text-accent-text" aria-hidden /> Capabilities
            </h2>
            <ul className="space-y-3">
              {services.map((s, i) => {
                const Icon = serviceIcons[i] ?? PenTool
                return (
                  <li key={s.title} className="flex items-center gap-3 font-medium">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent-text">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    {s.title}
                  </li>
                )
              })}
            </ul>
          </Reveal>
          <Reveal className="rounded-card border border-line bg-surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-semibold">
              <Wrench className="size-5 text-accent-text" aria-hidden /> Toolkit
            </h2>
            <div className="space-y-5">
              {Object.entries(tools).map(([group, items]) => (
                <div key={group}>
                  <p className="mb-2 text-sm text-muted">{group}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {items.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2.5 rounded-xl border border-line p-2 text-sm font-medium transition-colors hover:border-accent/50"
                      >
                        <BrandIcon name={t} size={28} />
                        <span className="leading-tight">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-card border border-line bg-surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-semibold">
              <GraduationCap className="size-5 text-accent-text" aria-hidden /> Education &amp; certification
            </h2>
            <ul className="space-y-4">
              {education.map((e, i) => (
                <li key={e.title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-accent-text">
                    {i === 0 ? <GraduationCap className="size-[18px]" aria-hidden /> : <Award className="size-[18px]" aria-hidden />}
                  </span>
                  <span>
                    <span className="block font-semibold">{e.title}</span>
                    <span className="text-sm text-muted">
                      {e.school} · {e.period}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="dark glow rounded-card p-6">
            <h2 className="mb-4 flex items-center gap-2 font-semibold">
              <Building2 className="size-5 text-accent-text" aria-hidden /> Projects delivered for
            </h2>
            <p className="text-fg-2">{clients.join(' · ')}</p>
          </Reveal>
        </aside>
      </section>
    </>
  )
}
