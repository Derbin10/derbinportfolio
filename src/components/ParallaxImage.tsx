'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { ProjectImage } from '@/lib/types'

interface ParallaxImageProps {
  image: ProjectImage
  className?: string
  sizes?: string
  priority?: boolean
  /** How far (in %) the image drifts while the frame crosses the viewport */
  strength?: number
}

/** Image that drifts inside its frame on scroll — one parallax layer of depth. */
export default function ParallaxImage({ image, className = '', sizes = '100vw', priority, strength = 8 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden bg-surface ${className}`}>
      <motion.div className="absolute inset-x-0" style={{ y: reduce ? 0 : y, top: `-${strength}%`, bottom: `-${strength}%` }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} quality={90} className="object-cover" />
      </motion.div>
    </div>
  )
}
