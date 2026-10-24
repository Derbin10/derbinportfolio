import 'server-only'
import { cache } from 'react'
import { localProjects } from '@/content/projects'
import { getSupabase } from './supabase'
import type { Project, ProjectImage, ProcessStep } from './types'

/** Row shape of the `projects` table (v1 columns + v2 additions, all optional). */
interface ProjectRow {
  slug: string
  title: string
  category: string | null
  description: string | null
  thumbnail_url: string | null
  pdf_url?: string | null
  video_url?: string | null
  is_featured: boolean | null
  order_index: number | null
  created_at?: string | null
  case_study?: {
    problem?: string
    process?: string[]
    solution?: string
    results?: string[]
    images?: string[]
  } | null
  // v2 (002_portfolio_v2.sql)
  client?: string | null
  year?: string | null
  summary?: string | null
  overview?: string | null
  role?: string[] | null
  deliverables?: string[] | null
  tags?: string[] | null
  accent_color?: string | null
  challenge?: string[] | null
  goals?: string[] | null
  process_steps?: ProcessStep[] | null
  outcome?: string[] | null
  takeaway?: string | null
  gallery?: ProjectImage[] | null
  published?: boolean | null
}

const nonEmpty = <T,>(v: T[] | null | undefined) => (v && v.length ? v : undefined)

function fromRow(row: ProjectRow): Partial<Project> & { slug: string } {
  const cs = row.case_study ?? undefined
  const legacyGallery = cs?.images?.map((src) => ({ src, alt: row.title, layout: 'full' as const }))
  const p: Partial<Project> & { slug: string } = {
    slug: row.slug,
    title: row.title,
    category: row.category ?? undefined,
    summary: row.summary ?? row.description ?? undefined,
    overview: row.overview ?? cs?.solution ?? row.description ?? undefined,
    client: row.client ?? undefined,
    year: row.year ?? row.created_at?.slice(0, 4) ?? undefined,
    role: nonEmpty(row.role),
    deliverables: nonEmpty(row.deliverables),
    tags: nonEmpty(row.tags),
    accent: row.accent_color ?? undefined,
    challenge: nonEmpty(row.challenge) ?? (cs?.problem ? [cs.problem] : undefined),
    goals: nonEmpty(row.goals),
    process:
      nonEmpty(row.process_steps) ??
      nonEmpty(cs?.process)?.map((body, i) => ({ title: `Step ${i + 1}`, body })),
    outcome: nonEmpty(row.outcome) ?? nonEmpty(cs?.results),
    takeaway: row.takeaway ?? undefined,
    gallery: nonEmpty(row.gallery) ?? nonEmpty(legacyGallery),
    cover: row.thumbnail_url ? { src: row.thumbnail_url, alt: row.title } : undefined,
    pdfUrl: row.pdf_url ?? undefined,
    videoUrl: row.video_url ?? undefined,
    featured: row.is_featured ?? undefined,
    order: row.order_index ?? undefined,
  }
  // Drop undefined keys so they never overwrite local values in the merge
  return Object.fromEntries(Object.entries(p).filter(([, v]) => v !== undefined)) as typeof p
}

const defaults: Omit<Project, 'slug' | 'title' | 'cover'> = {
  client: '',
  year: '',
  category: 'Design',
  summary: '',
  role: [],
  deliverables: [],
  tags: [],
  gallery: [],
  featured: false,
  order: 99,
}

async function fetchRemote(): Promise<ProjectRow[]> {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase.from('projects').select('*').order('order_index', { ascending: true })
  if (error) {
    console.error('[projects] Supabase error:', error.message)
    return []
  }
  return (data as ProjectRow[]).filter((r) => r.published !== false)
}

/**
 * All published projects. Curated local case studies win field by field; Supabase
 * fills any gaps and adds projects that only exist in the database.
 */
export const getProjects = cache(async (): Promise<Project[]> => {
  const bySlug = new Map<string, Project>(localProjects.map((p) => [p.slug, p]))
  for (const row of await fetchRemote()) {
    const remote = fromRow(row)
    const base = bySlug.get(remote.slug)
    if (!base && !remote.cover) continue // a project needs a cover image to be shown
    bySlug.set(remote.slug, { ...defaults, ...remote, ...base } as Project)
  }
  return [...bySlug.values()].sort((a, b) => a.order - b.order)
})

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug) ?? null
}
