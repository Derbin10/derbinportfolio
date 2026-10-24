'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react'

export interface GalleryItem {
  src: string
  alt: string
  href: string
  label: string
}

/**
 * "Curious what else I've created?" — the Folioblox curved carousel. Cards sit on the
 * inside of a cylinder: edge cards turn in and come closer, the centre card sits back.
 * It drifts on its own, pauses on hover and can be dragged; it wraps forever.
 */
export default function CurvedGallery({ items }: { items: GalleryItem[] }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const offset = useMotionValue(0)
  const [width, setWidth] = useState(1200)
  const [card, setCard] = useState(220)
  const hovering = useRef(false)
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null)

  useEffect(() => {
    const measure = () => {
      const w = wrapRef.current?.clientWidth ?? 1200
      setWidth(w)
      setCard(w < 640 ? 150 : w < 1024 ? 190 : 230)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const gap = card < 180 ? 12 : 18
  const step = card + gap
  const total = step * items.length

  useAnimationFrame((_, delta) => {
    if (reduce || hovering.current || drag.current) return
    offset.set(offset.get() - delta * 0.035)
  })

  return (
    <div
      ref={wrapRef}
      data-cursor="drag"
      className="relative h-[300px] touch-pan-y select-none overflow-hidden [perspective:1100px] sm:h-[360px] lg:h-[420px]"
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => {
        hovering.current = false
        drag.current = null
      }}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, start: offset.get(), moved: false }
      }}
      onPointerMove={(e) => {
        if (!drag.current) return
        const dx = e.clientX - drag.current.x
        if (Math.abs(dx) > 4) drag.current.moved = true
        offset.set(drag.current.start + dx)
      }}
      onPointerUp={() => {
        setTimeout(() => (drag.current = null), 0)
      }}
      onClickCapture={(e) => {
        if (drag.current?.moved) e.preventDefault()
      }}
    >
      {items.map((item, i) => (
        <Card key={item.src + i} item={item} index={i} offset={offset} step={step} total={total} width={width} card={card} />
      ))}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
    </div>
  )
}

function Card({
  item,
  index,
  offset,
  step,
  total,
  width,
  card,
}: {
  item: GalleryItem
  index: number
  offset: MotionValue<number>
  step: number
  total: number
  width: number
  card: number
}) {
  // Position of this card's centre relative to the middle of the strip, wrapped into [-total/2, total/2)
  const pos = useTransform(offset, (o) => {
    const raw = index * step + o
    return ((((raw + total / 2) % total) + total) % total) - total / 2
  })
  const half = width / 2
  const t = useTransform(pos, (p) => Math.max(-1.2, Math.min(1.2, p / half)))
  const x = useTransform(pos, (p) => p - card / 2)
  const rotateY = useTransform(t, (v) => -v * 38)
  const z = useTransform(t, (v) => Math.abs(v) * 140 - 60)
  const opacity = useTransform(t, (v) => (Math.abs(v) > 1.15 ? 0 : 1))

  return (
    <motion.div
      style={{ x, rotateY, z, opacity, width: card, left: '50%' }}
      className="absolute top-1/2 -translate-y-1/2 [transform-style:preserve-3d]"
    >
      <Link href={item.href} draggable={false} className="group block" aria-label={`${item.label} — ${item.alt}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-surface-2 shadow-[0_24px_48px_-24px_rgb(5_10_31/0.45)]">
          <Image src={item.src} alt="" fill draggable={false} sizes="240px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <p className="mt-3 truncate text-center text-xs font-semibold text-muted">{item.label}</p>
      </Link>
    </motion.div>
  )
}
