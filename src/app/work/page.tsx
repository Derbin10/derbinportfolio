import type { Metadata } from 'next'
import { getProjects } from '@/lib/projects'
import MaskedLine from '@/components/MaskedLine'
import Reveal from '@/components/Reveal'
import WorkGrid from '@/components/WorkGrid'
import { PillLabel } from '@/components/SectionHead'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Work',
  description: 'Brand systems, mascots, print, campaigns and thumbnails — selected case studies by Derbin Davidraj.',
  alternates: { canonical: '/work' },
}

export default async function WorkPage() {
  const projects = await getProjects()
  return (
    <div className="container-x pb-8 pt-32 md:pt-44">
      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <PillLabel>{`${projects.length} case studies`}</PillLabel>
          <h1 className="mt-5 text-mega font-semibold">
            <MaskedLine onLoad>Selected work</MaskedLine>
          </h1>
        </div>
        <Reveal delay={0.2} className="text-fg-2 md:col-span-4">
          <p>Identities, print, campaigns and the thinking behind them. Switch to list view to scan everything at once.</p>
        </Reveal>
      </div>
      <WorkGrid projects={projects} />
    </div>
  )
}
