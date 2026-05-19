"use client"

import { useEffect, useRef, useState } from "react"
import { CountUp } from "./count-up"
import { TextReveal } from "./text-reveal"

const LOCATIONS = [
  { name: "Morocco", code: "MA", x: 47, y: 42, primary: true },
  { name: "Egypt", code: "EG", x: 56, y: 44 },
  { name: "Turkey", code: "TR", x: 58, y: 36 },
  { name: "Dubai", code: "AE", x: 65, y: 46 },
  { name: "Russia", code: "RU", x: 65, y: 25 },
  { name: "China", code: "CN", x: 80, y: 38 },
  { name: "Philippines", code: "PH", x: 85, y: 50 },
]

const STATS: Array<{ v: string; end?: number; suffix?: string; static?: string }> = [
  { end: 7, suffix: "+", v: "Countries" },
  { end: 5, v: "Years Experience" },
  { end: 100, suffix: "+", v: "Events Performed" },
  { end: 98, suffix: "%", v: "Crowd Satisfaction" },
]

export function GlobalSection() {
  const ref = useRef<SVGSVGElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % LOCATIONS.length), 2200)
    return () => clearInterval(id)
  }, [])

  const origin = LOCATIONS[0]

  return (
    <section
      id="global"
      className="relative overflow-hidden bg-background py-32 md:py-44"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-8 bg-primary" />
          03 / International Experience
        </div>

        <h2 className="font-display text-6xl leading-[0.85] tracking-tight md:text-9xl">
          <TextReveal text="GLOBAL SOUND." as="span" stagger={26} />
          <br />
          <span className="italic text-primary text-glow-yellow">
            <TextReveal text="WORLDWIDE" as="span" delay={300} stagger={32} />
          </span>{" "}
          <TextReveal text="ENERGY." as="span" delay={650} stagger={26} />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Map */}
          <div className="relative lg:col-span-8">
            <div className="glass relative aspect-[2/1] w-full overflow-hidden rounded-sm">
              {/* Grid background */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,212,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,212,0,0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <svg
                ref={ref}
                viewBox="0 0 100 50"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                {/* Continents abstract dots */}
                {Array.from({ length: 220 }).map((_, i) => {
                  const x = (i * 37) % 100
                  const y = (i * 53) % 50
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={0.18}
                      fill="rgba(255,255,255,0.15)"
                    />
                  )
                })}

                {/* Connection arcs */}
                {LOCATIONS.slice(1).map((loc, i) => {
                  const isActive = i + 1 === active
                  const mx = (origin.x + loc.x) / 2
                  const my = Math.min(origin.y, loc.y) - 12
                  return (
                    <path
                      key={loc.code}
                      d={`M ${origin.x} ${origin.y} Q ${mx} ${my} ${loc.x} ${loc.y}`}
                      fill="none"
                      stroke={isActive ? "#FFD400" : "rgba(255,212,0,0.25)"}
                      strokeWidth={isActive ? 0.4 : 0.15}
                      strokeDasharray="0.8 0.8"
                      style={{
                        filter: isActive ? "drop-shadow(0 0 2px #FFD400)" : undefined,
                        transition: "all 0.6s",
                      }}
                    />
                  )
                })}

                {/* Markers */}
                {LOCATIONS.map((loc, i) => {
                  const isActive = i === active
                  return (
                    <g key={loc.code}>
                      {isActive && (
                        <circle
                          cx={loc.x}
                          cy={loc.y}
                          r={2.2}
                          fill="rgba(255,212,0,0.3)"
                          className="animate-ping-slow"
                        />
                      )}
                      <circle
                        cx={loc.x}
                        cy={loc.y}
                        r={isActive ? 0.9 : 0.55}
                        fill={isActive ? "#FFD400" : "#FFFFFF"}
                        style={{
                          filter: isActive ? "drop-shadow(0 0 3px #FFD400)" : undefined,
                          transition: "all 0.4s",
                        }}
                      />
                    </g>
                  )
                })}
              </svg>

              {/* HUD overlays */}
              <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <div className="text-foreground">// LIVE ROUTING</div>
                <div className="mt-1 text-primary">RABAT → {LOCATIONS[active].name.toUpperCase()}</div>
              </div>
              <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                LAT 33.97 · LON -6.84
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
                <span className="text-muted-foreground">7 Active Regions</span>
                <span className="flex items-center gap-2 text-primary">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                  Booking Open
                </span>
              </div>
            </div>

            {/* Country chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {LOCATIONS.map((loc, i) => (
                <button
                  key={loc.code}
                  onClick={() => setActive(i)}
                  className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] transition ${
                    i === active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Stats + statement */}
          <div className="lg:col-span-4">
            <div className="space-y-px overflow-hidden rounded-sm border border-border/50 bg-border/50">
              {STATS.map((s, i) => (
                <div key={s.v} className="flex items-baseline justify-between bg-background p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {s.v}
                  </span>
                  <span className="font-display text-4xl text-primary text-glow-yellow">
                    {s.static ? (
                      s.static
                    ) : (
                      <CountUp end={s.end!} suffix={s.suffix ?? ""} duration={1800 + i * 200} />
                    )}
                  </span>
                </div>
              ))}
            </div>

            <blockquote className="mt-10 border-l-2 border-primary pl-6 text-pretty text-base leading-relaxed text-muted-foreground">
              From underground clubs in Morocco to nightlife destinations across Dubai,
              Turkey, Russia, China, Egypt, and the Philippines — DJ ERO delivers immersive
              high-energy experiences worldwide.
            </blockquote>

            <div className="mt-8 rounded-sm border border-primary/30 bg-primary/5 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                Booking Statement
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                Available for international bookings, festivals, clubs, luxury events, and
                exclusive nightlife experiences worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
