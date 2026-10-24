/** Endless ticker of brand names. Rendered twice so the -50% loop is seamless; hover pauses it. */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 whitespace-nowrap px-6 md:px-9">
          <span className="size-3 rounded-[3px] bg-accent/80" aria-hidden />
          <span className="font-display text-lg font-semibold tracking-tight text-fg-2 md:text-xl">{item}</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="overflow-hidden">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
