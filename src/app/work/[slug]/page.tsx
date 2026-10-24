import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, getProjects } from '@/lib/projects'
import type { ProjectImage } from '@/lib/types'
import Reveal from '@/components/Reveal'
import MaskedLine from '@/components/MaskedLine'
import FlipBook from '@/components/FlipBook'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/icons'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { images: [{ url: project.cover.src, alt: project.cover.alt }] },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const projects = await getProjects()
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) notFound()
  const project = projects[idx]
  const next = projects.length > 1 ? projects[(idx + 1) % projects.length] : null

  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role.join(', ') },
    { label: 'Deliverables', value: project.deliverables.join(', ') },
  ].filter((m) => m.value)

  return (
    <article>
      <header className="container-x pb-12 pt-28 md:pb-16 md:pt-40">
        <Reveal y={8} className="mb-10 flex items-center justify-between border-b border-line pb-4">
          <Link href="/work" className="eyebrow group -ml-2 inline-flex h-11 items-center gap-2 px-2 text-fg-2 hover:text-fg">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
          <p className="eyebrow text-accent-text">{project.category}</p>
        </Reveal>

        <h1 className="max-w-[20ch] text-h1 font-semibold">
          <MaskedLine onLoad>{project.title}</MaskedLine>
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-[58ch] text-lede text-fg-2">{project.summary}</p>
        </Reveal>

        {meta.length > 0 && (
          <Reveal delay={0.4}>
            <dl className="mt-14 grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((m, i) => (
                <div key={m.label} className={`p-5 ${i ? 'border-t border-line sm:border-t-0 sm:border-l' : ''}`}>
                  <dt className="eyebrow mb-2 text-muted">{m.label}</dt>
                  <dd className="text-[0.95rem] leading-snug">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </header>

      <div className="container-x">
        {project.flipbook ? (
          // Reports: only the cover until the visitor opens the flip book
          <div className="rounded-card border border-line bg-surface-2 px-5 py-12 md:py-16">
            <FlipBook title={project.title} book={project.flipbook} />
          </div>
        ) : (
          // Cover shown whole, never cropped
          <div className="overflow-hidden rounded-card border border-line bg-surface-2 p-3 md:p-5">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width ?? 1600}
              height={project.cover.height ?? 1200}
              priority
              quality={90}
              sizes="(min-width: 1440px) 1360px, 100vw"
              className="mx-auto h-auto max-h-[80svh] w-auto rounded-2xl"
            />
          </div>
        )}
      </div>

      <div className="container-x py-24 md:py-32">
        {project.overview && (
          <Block label="Overview">
            <p className="font-display text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold leading-[1.25] tracking-tight">
              {project.overview}
            </p>
          </Block>
        )}

        {(project.challenge?.length || project.goals?.length) && (
          <Block label="The brief">
            <div className="grid gap-4 sm:grid-cols-2">
              {project.challenge && <List title="Challenge" items={project.challenge} />}
              {project.goals && <List title="Goals" items={project.goals} accent />}
            </div>
          </Block>
        )}

        {project.process?.length ? (
          <Block label="Process">
            <ol className="border-t border-line">
              {project.process.map((step, i) => (
                <Reveal as="li" key={step.title} className="grid gap-3 border-b border-line py-7 sm:grid-cols-[5rem_1fr]">
                  <span className="font-display text-3xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-h3 font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-[62ch] text-fg-2">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Block>
        ) : null}
      </div>

      {project.gallery.length > 0 && (
        <section aria-label="Project images" className="container-x space-y-6 md:space-y-8">
          {groupGallery(project.gallery).map((row, r) => (
            <div key={r} className={`grid gap-6 md:gap-8 ${row.length === 2 ? 'md:grid-cols-2' : ''}`}>
              {row.map((img) => (
                <figure key={img.src}>
                  <Reveal className="overflow-hidden rounded-2xl border border-line bg-surface-2">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width ?? 1920}
                      height={img.height ?? 1080}
                      quality={90}
                      sizes={row.length === 2 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1520px) 1420px, 100vw'}
                      // Two-up images sit as framed artboards so mixed aspect ratios still line up
                      className={`h-auto w-full ${row.length === 2 ? 'aspect-square object-contain p-6 md:p-10' : ''}`}
                    />
                  </Reveal>
                  {img.caption && <figcaption className="eyebrow mt-3 text-muted">{img.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ))}
        </section>
      )}

      <div className="container-x py-24 md:py-32">
        {project.outcome?.length ? (
          <Block label="Outcome">
            <ul className="grid gap-4 sm:grid-cols-3">
              {project.outcome.map((o, i) => (
                <Reveal as="li" key={o} delay={i * 0.06} className="flex min-h-[180px] flex-col justify-between rounded-2xl border border-line bg-surface p-6">
                  <span className="size-3 bg-accent" />
                  <span className="text-h3 font-semibold">{o}</span>
                </Reveal>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.takeaway && (
          <blockquote className="mx-auto max-w-[22ch] py-16 text-center text-h2 font-semibold md:py-24">
            <MaskedLine>
              <span className="text-accent">“</span>
              {project.takeaway}
              <span className="text-accent">”</span>
            </MaskedLine>
          </blockquote>
        )}

        {(project.pdfUrl || project.videoUrl) && (
          <div className="flex flex-wrap justify-center gap-3">
            {project.pdfUrl && (
              <a href={project.pdfUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                View the full presentation (PDF)
                <ArrowUpRight className="size-4" />
              </a>
            )}
            {project.videoUrl && (
              <a href={project.videoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                Watch the video
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        )}
      </div>

      <nav aria-label="More work" className="border-t border-line">
        <Link
          href={next ? `/work/${next.slug}` : '/contact'}
          className="container-x group flex items-end justify-between gap-6 py-16 md:py-24"
        >
          <div>
            <p className="eyebrow mb-4 text-muted">{next ? 'Next project' : 'Like what you see?'}</p>
            <p className="max-w-[20ch] text-h1 font-semibold transition-colors group-hover:text-accent-text">
              {next ? next.title : 'Let’s work together'}
            </p>
          </div>
          <span className="mb-2 flex size-16 shrink-0 items-center justify-center rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:size-24">
            <ArrowRight className="size-6 md:size-9" />
          </span>
        </Link>
      </nav>
    </article>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-12 first:border-t-0 first:pt-0 md:grid-cols-12 md:py-16">
      <h2 className="eyebrow text-muted md:col-span-3">{label}</h2>
      <Reveal className="md:col-span-9">{children}</Reveal>
    </section>
  )
}

function List({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-6 ${accent ? 'border-accent/50 bg-accent/10' : 'border-line bg-surface'}`}>
      <h3 className="mb-4 text-h3 font-semibold">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-fg-2">
            <span className={`mt-2.5 size-1.5 shrink-0 ${accent ? 'bg-accent-text' : 'bg-muted'}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Pair consecutive "half" images into two-up rows; everything else gets its own row. */
function groupGallery(images: ProjectImage[]) {
  const rows: ProjectImage[][] = []
  for (const img of images) {
    const last = rows.at(-1)
    if (img.layout === 'half' && last?.length === 1 && last[0].layout === 'half') last.push(img)
    else rows.push([img])
  }
  return rows
}
