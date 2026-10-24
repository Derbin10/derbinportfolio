/** Personal wordmark: name in the display face with the electric-blue square full stop. */
export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-display text-xl font-bold tracking-[-0.04em] text-fg ${className}`}>
      derbin
      <span className="ml-[0.08em] inline-block size-[0.3em] rounded-[2px] bg-accent" aria-hidden />
    </span>
  )
}
