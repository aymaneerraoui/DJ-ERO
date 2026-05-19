"use client"

import { useEffect, useRef, useState } from "react"

const BRANDS = [
  "Electroplanet",
  "Mawazine",
  "Yokka Beach Club",
  "Kalben Event",
  "Bodega 30",
  "Marriott",
]

export function Brands() {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-8 bg-primary" />
              07 / Trusted By
            </div>
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">
              Clubs · Festivals · Brands
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Selected partners across hospitality, fashion, and electronic music.
          </p>
        </div>

        <div
          ref={ref}
          className="relative overflow-hidden rounded-sm border border-border/50"
        >
          {/* Light sweep pass */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              transform: revealed ? "translateX(120%)" : "translateX(-120%)",
              transition: "transform 1800ms cubic-bezier(0.22,1,0.36,1) 400ms",
              background:
                "linear-gradient(115deg, transparent 35%, rgba(255,212,0,0.18) 48%, rgba(255,255,255,0.25) 50%, rgba(255,212,0,0.18) 52%, transparent 65%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Subtle dim overlay that lifts on reveal to focus the logos */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-background"
            style={{
              opacity: revealed ? 0 : 0.5,
              transition: "opacity 1200ms ease",
            }}
          />

          <div className="relative z-0 grid grid-cols-2 gap-px bg-border/50 md:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((b, i) => (
              <div
                key={b}
                className="group relative aspect-[3/2] overflow-hidden bg-background transition-all duration-700 hover:bg-card hover:-translate-y-1"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${i * 130}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${i * 130}ms`,
                }}
              >
                {/* Chrome reflection */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 70%, rgba(255,212,0,0.08) 100%)",
                  }}
                />

                <div className="absolute inset-0 grid place-items-center px-4 text-center font-display text-xl tracking-[0.05em] text-muted-foreground transition-all duration-500 group-hover:scale-105 group-hover:text-primary group-hover:[text-shadow:0_0_20px_rgba(255,212,0,0.6)] md:text-2xl">
                  {b}
                </div>

                {/* Yellow neon glow on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-x-6 inset-y-6 rounded-sm shadow-[0_0_60px_rgba(255,212,0,0.35)_inset]" />
                </div>

                <div className="pointer-events-none absolute inset-x-4 bottom-3 z-[1] flex justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/60">
                  <span>0{i + 1}</span>
                  <span className="opacity-0 transition group-hover:opacity-100 group-hover:text-primary">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
