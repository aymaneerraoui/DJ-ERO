export function MarqueeBar() {
  const items = [
    "TECHNO",
    "AFRO HOUSE",
    "EDM",
    "HOUSE",
    "HIP-HOP",
    "TRAP",
    "ELECTRO",
    "COMMERCIAL",
    "CINEMATIC NIGHTLIFE",
  ]
  const list = [...items, ...items, ...items]
  return (
    <div className="relative w-full overflow-hidden border-y border-border/50 bg-background py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {list.map((t, i) => (
          <div key={i} className="flex items-center gap-8 px-6 font-display text-3xl tracking-[0.1em] md:text-5xl">
            <span className={i % 3 === 0 ? "text-primary text-glow-yellow" : "text-foreground"}>
              {t}
            </span>
            <span className="text-primary">✦</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}
