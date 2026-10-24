import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Social share card in the site's dark studio style. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0b',
          color: '#f4f4f1',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, letterSpacing: 3, color: '#a1a1aa' }}>
          <span>{site.role.toUpperCase()}</span>
          <span>CHENNAI, IN</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', fontSize: 230, fontWeight: 800, lineHeight: 0.85, letterSpacing: -10 }}>
          DERBIN
          <div style={{ width: 44, height: 44, background: '#3d63ff', marginLeft: 12, marginBottom: 18 }} />
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: '#d4d4d8' }}>
          Brand systems · Pitch decks · Reports · Campaigns · AI motion
        </div>
      </div>
    ),
    size,
  )
}
