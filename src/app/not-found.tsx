import Link from 'next/link'
import MaskedLine from '@/components/MaskedLine'

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="eyebrow mb-6 text-accent-text">404</p>
      <h1 className="max-w-[14ch] font-display text-h1 font-bold">
        <MaskedLine onLoad>This page went</MaskedLine>
        <MaskedLine onLoad delay={0.08}>
          <span className="text-muted">off-brand</span>
          <span className="text-accent">.</span>
        </MaskedLine>
      </h1>
      <Link href="/" className="btn btn-primary mt-10 w-fit">
        Back home
      </Link>
    </div>
  )
}
