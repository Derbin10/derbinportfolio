import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/types'
import { ArrowUpRight } from './icons'

interface ProjectCardProps {
  project: Project
  priority?: boolean
}

/**
 * Boxed work card. The thumbnail is shown whole (object-contain on a soft well) so
 * posters, book covers and slides are never cropped. One clear action per card.
 */
export default function ProjectCard({ project, priority }: ProjectCardProps) {
  const isBook = !!project.flipbook
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      className="group flex h-full flex-col rounded-card border border-line bg-surface p-3 transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-[0_20px_50px_-25px_rgb(47_84_255/0.35)] md:p-4"
      aria-label={`${project.title} — ${isBook ? 'open the report' : 'view case study'}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-2">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority={priority}
          quality={85}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={`object-contain transition-transform duration-500 ease-out-expo group-hover:scale-[1.03] ${isBook ? 'p-5 drop-shadow-[0_14px_20px_rgb(5_10_31/0.25)]' : 'p-3'}`}
        />
        {isBook && (
          <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
            Flip book · {project.flipbook!.pages.length} pages
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <p className="text-sm font-semibold text-accent-text">{project.category}</p>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-[0.95rem] text-muted">{project.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold">
          {isBook ? 'Open the report' : 'View case study'}
          <span className="flex size-8 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </span>
      </div>
    </Link>
  )
}
