import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import { clients, hero, services, site, stats } from '@/content/site'
import Reveal from '@/components/Reveal'
import MaskedHero from '@/components/MaskedHero'
import ProjectCard from '@/components/ProjectCard'
import SectionHead from '@/components/SectionHead'
import CurvedGallery, { type GalleryItem } from '@/components/CurvedGallery'
import { ArrowDown, ArrowRight, ArrowUpRight } from '@/components/icons'
import { BookOpenText, Building2, FileDown, LayoutGrid, Megaphone, PenTool } from 'lucide-react'
import DesignBackdrop from '@/components/DesignBackdrop'
import SelectionWord from '@/components/SelectionWord'

const serviceIcons = [PenTool, BookOpenText, LayoutGrid, Megaphone]

export const revalidate = 300

/*
 * Home answers three questions in order, for a recruiter or creative director:
 * who is this (hero), can they do the work (selected work), what would they do for us
 * (services), then one place to browse more and one way to get in touch.
 */
export default async function HomePage() {
  const projects = await getProjects()
  const selected = projects.filter((p) => p.featured).slice(0, 6)

  // The carousel shows pieces that aren't in the grid above: inner pages and secondary projects
  const gallery: GalleryItem[] = projects.flatMap((p) => {
    const imgs = p.flipbook
      ? p.flipbook.pages.slice(1, 4).map((src, i) => ({ src, alt: `${p.title}, page ${i + 2}` }))
      : [p.cover, ...(p.gallery ?? []).slice(0, 2)]
    return imgs.map((img) => ({ src: img.src, alt: img.alt, href: `/work/${p.slug}`, label: p.client || p.category }))
  })

  return (
    <>
      {/* ── 1. Who: hero ─────────────────────────────── */}
      <section className="pt-3 md:pt-4">
        <div className="panel dark glow">
          <DesignBackdrop variant="dark" />
          <div className="container-x relative pb-10 pt-28 md:pb-14 md:pt-36">
            <Reveal y={8}>
              <p className="text-base font-semibold text-accent-text md:text-lg">{hero.eyebrow}</p>
            </Reveal>

            <h1 className="mt-3">
              <span className="sr-only">{site.name}. </span>
              <MaskedHero word="DERBIN" art="/images/hero-art.jpg" />
              <Reveal as="span" delay={0.9} className="mt-8 block max-w-[24ch] text-h2 font-semibold md:mt-12">
                I design <span className="whitespace-nowrap"><SelectionWord tag="Brand systems · layer 01">brand systems</SelectionWord>,</span> reports and campaigns for B2B companies.
              </Reveal>
            </h1>

            <Reveal delay={1.05} className="mt-6 grid gap-8 md:grid-cols-12 md:items-end">
              <p className="max-w-[60ch] text-lede text-fg-2 md:col-span-7">{hero.sub}</p>
              <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
                <a href="#work" className="btn btn-light">
                  View selected work
                  <span className="btn-badge bg-accent text-on-accent">
                    <ArrowDown className="size-4" />
                  </span>
                </a>
                <a href={site.resume} target="_blank" rel="noreferrer" className="btn btn-ghost !pr-6" data-cursor-label="Download résumé">
                  <FileDown className="size-4" /> Download résumé (PDF)
                </a>
              </div>
            </Reveal>

            <Reveal delay={1.15} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-fg-2">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#3ddc84]" aria-hidden />
                {site.status}
              </span>
              <span>{site.location}</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Proof: companies ─────────────────────────── */}
      <section aria-labelledby="clients-label" className="container-x py-10 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
          <p id="clients-label" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-muted md:w-44"><Building2 className="size-4" aria-hidden />
            Projects delivered for
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {clients.map((c) => (
              <li key={c} className="font-display text-lg font-semibold tracking-tight text-fg-2">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 2. Can they do the work: selected work ───── */}
      <section id="work" className="container-x scroll-mt-28 py-12 md:py-20">
        <SectionHead
          label="Selected work"
          title="Reports, brand systems and campaigns"
          aside={<p>Reports open as flip books. Every other project has a short case study: the brief, what I did and the result.</p>}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
              <ProjectCard project={p} priority={i < 3} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link href="/work" className="btn btn-primary">
            See all {projects.length} projects
            <span className="btn-badge bg-white/15">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* ── 3. What would they do for us: services ───── */}
      <section className="relative">
        <DesignBackdrop variant="light" />
        <div className="container-x relative py-12 md:py-20">
        <SectionHead label="What I do" title="What I can design for your team" />
        <ul className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 2) * 0.06} className="group flex flex-col rounded-card border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/50 md:p-8">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-white transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-110">
                {(() => { const Icon = serviceIcons[i] ?? PenTool; return <Icon className="size-[22px]" aria-hidden /> })()}
              </span>
              <h3 className="mt-6 text-h3 font-semibold">{s.title}</h3>
              <p className="mt-2 text-fg-2">{s.body}</p>
              <p className="mt-4 rounded-2xl bg-surface-2 px-4 py-3 text-sm text-fg-2">
                <span className="font-semibold text-fg">Proof: </span>
                {s.proof}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li key={item} className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-fg-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
        </div>
      </section>

      {/* ── Browse more: curved carousel ─────────────── */}
      <section className="py-12 md:py-20">
        <div className="container-x">
          <SectionHead center label="More work" title="Curious what else I’ve created?" aside={<p>Drag or swipe to browse inside pages and spreads. Tap any piece to open it.</p>} />
        </div>
        <CurvedGallery items={gallery} />
      </section>

      {/* ── About in brief ───────────────────────────── */}
      <section className="container-x py-12 md:py-20">
        <div className="grid items-center gap-10 rounded-card border border-line bg-surface p-5 md:grid-cols-12 md:gap-12 md:p-8">
          <Reveal className="md:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
              <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover object-[50%_18%]" />
            </div>
          </Reveal>
          <div className="md:col-span-8">
            <p className="eyebrow text-accent-text">About me</p>
            <h2 className="mt-3 text-h2 font-semibold">Hi, I’m Derbin.</h2>
            <p className="mt-4 max-w-[60ch] text-lede text-fg-2">
              I’m a brand and marketing designer in Chennai with a computer science degree. I take work from the first
              concept to the print-ready file, and I use Claude, n8n and Google Flow to automate the repetitive parts so
              more of my time goes into the design.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-surface-2 p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-accent-text">{s.value}</dd>
                  <dd className="mt-1 text-sm leading-snug text-fg-2" aria-hidden>
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-primary">
                Experience &amp; skills
                <span className="btn-badge bg-white/15">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost !pr-6">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
