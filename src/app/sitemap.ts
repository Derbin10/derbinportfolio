import type { MetadataRoute } from 'next'
import { getProjects } from '@/lib/projects'
import { site } from '@/content/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects()
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/work`, priority: 0.9 },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.8 })),
    { url: `${site.url}/about`, priority: 0.7 },
    { url: `${site.url}/contact`, priority: 0.6 },
  ]
}
