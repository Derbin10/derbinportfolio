import { siClaude, siFreepik, siGmail, siGoogle, siGooglegemini, siN8n, siWhatsapp } from 'simple-icons'

type SimpleIcon = { path: string; hex: string; title: string }

/** Official marks where the icon set has them (CC0 via simple-icons). */
const marks: Record<string, SimpleIcon> = {
  'n8n': siN8n,
  Claude: siClaude,
  'Claude Code': siClaude,
  'Google Flow': siGoogle,
  Gemini: siGooglegemini,
  'Freepik AI': siFreepik,
  WhatsApp: siWhatsapp,
  Gmail: siGmail,
}

/**
 * Brands that asked for their logos to be removed from icon sets get an app-style tile in
 * their own colours instead, the way the apps appear in a dock.
 */
const tiles: Record<string, { label: string; fg: string; bg: string }> = {
  Illustrator: { label: 'Ai', fg: '#FF9A00', bg: '#330000' },
  'Adobe Illustrator': { label: 'Ai', fg: '#FF9A00', bg: '#330000' },
  Photoshop: { label: 'Ps', fg: '#31A8FF', bg: '#001E36' },
  'Adobe Photoshop': { label: 'Ps', fg: '#31A8FF', bg: '#001E36' },
  InDesign: { label: 'Id', fg: '#FF3366', bg: '#49021F' },
  PowerPoint: { label: 'P', fg: '#FFFFFF', bg: '#C43E1C' },
  Canva: { label: 'C', fg: '#FFFFFF', bg: 'linear-gradient(135deg,#00C4CC,#7D2AE8)' },
  CapCut: { label: 'Cc', fg: '#FFFFFF', bg: '#000000' },
  ChatGPT: { label: 'GPT', fg: '#FFFFFF', bg: '#10A37F' },
  'AI motion graphics': { label: 'Mo', fg: '#FFFFFF', bg: '#2F54FF' },
  LinkedIn: { label: 'in', fg: '#FFFFFF', bg: '#0A66C2' },
}

export default function BrandIcon({ name, size = 28, className = '' }: { name: string; size?: number; className?: string }) {
  const mark = marks[name]
  if (mark) {
    return (
      <span
        aria-hidden
        className={`inline-flex shrink-0 items-center justify-center rounded-[22%] bg-white ring-1 ring-black/5 ${className}`}
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill={`#${mark.hex}`}>
          <path d={mark.path} />
        </svg>
      </span>
    )
  }
  const tile = tiles[name] ?? { label: name.slice(0, 2), fg: '#FFFFFF', bg: '#0A0F2C' }
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-[22%] font-display font-bold leading-none ${className}`}
      style={{ width: size, height: size, background: tile.bg, color: tile.fg, fontSize: size * (tile.label.length > 2 ? 0.3 : 0.42) }}
    >
      {tile.label}
    </span>
  )
}
