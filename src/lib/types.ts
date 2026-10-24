export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  /** full = edge-to-edge row, half = two-up row */
  layout?: 'full' | 'half'
  width?: number
  height?: number
}

export interface ProcessStep {
  title: string
  body: string
}

/** A report shown as a page-turning book; pages[0] is the cover */
export interface Flipbook {
  pages: string[]
  width: number
  height: number
}

export interface Project {
  slug: string
  title: string
  client: string
  year: string
  category: string
  /** One-line hook shown on cards and the case-study hero */
  summary: string
  role: string[]
  deliverables: string[]
  tags: string[]
  cover: ProjectImage
  /** Brand colour used for subtle accents on the case study */
  accent?: string
  overview?: string
  challenge?: string[]
  goals?: string[]
  process?: ProcessStep[]
  outcome?: string[]
  takeaway?: string
  gallery: ProjectImage[]
  flipbook?: Flipbook
  pdfUrl?: string
  videoUrl?: string
  featured: boolean
  order: number
}
