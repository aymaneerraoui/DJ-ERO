"use client"

import { useEffect, useRef, useState } from "react"
import { Quote } from "lucide-react"
import { CountUp } from "./count-up"
import { TextReveal } from "./text-reveal"

const QUOTES = [
  {
    quote:
      "Pure energy from the first drop. ERO read the room like a conductor — peak after peak.",
    name: "Yokka Beach Club",
    role: "Resident Booking",
    energy: 96,
  },
  {
    quote:
      "An undeniable presence behind the decks. The crowd in Dubai didn't stop moving once.",
    name: "Marriott Events",
    role: "Hospitality Partner",
    energy: 92,
  },
  {
    quote:
      "Cinematic. That's the only word. He brought a club moment to a festival mainstage.",
    name: "Mawazine Festival",
    role: "Programming",
    energy: 99,
  },
  {
    quote: "From Afro House warmth to peak techno — a full sonic journey, perfectly paced.",
    name: "Bodega 30",
    role: "Music Director",
    energy: 94,
  },
]

const COUNTERS: Array<{ end?: number; suffix?: string; static?: string; l: string }> = [
  { end: 120, suffix: "K+", l: "Crowd Reached" },
  { end: 98, suffix: "%", l: "Rebooking Rate" },
  { end: 200, suffix: "+", l: "Events Performed" },
  { static: "24/7", l: "On Tour" },
]

const REACTION_KEYWORDS = [
  "ENERGY",
  "UNREAL",
  "INSANE NIGHT",
  "NEXT LEVEL",
  "IMMERSIVE",
  "CINEMATIC",
  "PEAK MOMENT",
  "GOOSEBUMPS",
  "WORLD CLASS",
  "ELECTRIC",
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [shake, setShake] = useState(false)
  const [pulse, setPulse] = useState(0)

  // In-view trigger + camera shake on entry
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !inView) {
            setInView(true)
            setShake(true)
            setTimeout(() => setShake(false), 700)
          }
        })
      },
      { threshold: 0.18 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView])

  // Bass-pulse heartbeat for ambient particles + lighting
  useEffect(() => {
    let id: number
    let last = 0
    const loop = (t: number) => {
      if (t - last > 480) {
        setPulse((p) => p + 1)
        last = t
      }
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-32 md:py-44"
      style={{
        animation: shake ? "section-shake 700ms cubic-bezier(0.36,0.07,0.19,0.97)" : undefined,
      }}
    >
      {/* Crowd silhouette parallax layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "url('/dj-crowd.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) saturate(0.4) contrast(1.1)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        }}
      />

      {/* Reactive ambient lighting sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-1/2 top-0 h-full w-[200%] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,212,0,0.4), transparent 50%)",
            animation: "sweep 12s ease-in-out infinite",
          }}
        />
      </div>

      {/* Bass-reactive ambient particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-primary/60 blur-[1px]"
            style={{
              left: `${(i * 137) % 100}%`,
              top: `${(i * 79) % 100}%`,
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              opacity: pulse % 2 === 0 ? 0.7 : 0.3,
              transform: `scale(${pulse % 2 === 0 ? 1.4 : 1})`,
              transition: "opacity 240ms ease, transform 240ms ease",
              animation: `float ${5 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-8 bg-primary" />
          06 / Crowd & Reactions
          <span
            className="ml-3 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-primary"
            style={{
              boxShadow:
                pulse % 2 === 0
                  ? "0 0 20px rgba(255,212,0,0.4)"
                  : "0 0 4px rgba(255,212,0,0.1)",
              transition: "box-shadow 300ms ease",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              style={{
                transform: pulse % 2 === 0 ? "scale(1.6)" : "scale(1)",
                transition: "transform 240ms ease",
              }}
            />
            LIVE FROM THE FLOOR
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl leading-[0.9] tracking-tight md:text-7xl">
              <TextReveal text="VOICES FROM" as="span" stagger={26} />
              <br />
              <TextReveal text="THE " as="span" delay={300} stagger={26} />
              <span className="italic text-primary text-glow-yellow">
                <TextReveal text="FLOOR." as="span" delay={520} stagger={36} />
              </span>
            </h2>

            <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Real reactions from venues, festivals, and partners across seven countries —
              the energy doesn&apos;t fade when the lights come on.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/50 bg-border/50">
              {COUNTERS.map((c, i) => (
                <div key={c.l} className="relative bg-background p-6 transition hover:bg-card">
                  <div className="font-display text-4xl text-foreground">
                    {c.static ? (
                      c.static
                    ) : (
                      <CountUp end={c.end!} suffix={c.suffix ?? ""} duration={1800 + i * 200} />
                    )}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {c.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-7">
            {QUOTES.map((q, i) => (
              <FloatingQuote
                key={i}
                quote={q.quote}
                name={q.name}
                role={q.role}
                energy={q.energy}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Audience reaction marquee */}
      <div className="relative mt-20 border-y border-border/40 bg-background/40 py-6 backdrop-blur-sm">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...REACTION_KEYWORDS, ...REACTION_KEYWORDS, ...REACTION_KEYWORDS].map((w, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center gap-3 font-display text-3xl uppercase tracking-tight text-foreground/80 md:text-5xl"
            >
              {w}
              <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,212,0,0.8)]" />
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes sweep {
          0%, 100% { transform: translateX(-10%); opacity: 0.2; }
          50% { transform: translateX(10%); opacity: 0.45; }
        }
        @keyframes section-shake {
          0%, 100% { transform: translate3d(0, 0, 0); }
          20% { transform: translate3d(-3px, 1px, 0); }
          40% { transform: translate3d(2px, -2px, 0); }
          60% { transform: translate3d(-2px, 2px, 0); }
          80% { transform: translate3d(2px, -1px, 0); }
        }
      `}</style>
    </section>
  )
}

function FloatingQuote({
  quote,
  name,
  role,
  energy,
  index,
  inView,
}: {
  quote: string
  name: string
  role: string
  energy: number
  index: number
  inView: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setRevealed(true), index * 180)
      return () => clearTimeout(t)
    }
  }, [inView, index])

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    })
  }

  return (
    <figure
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setTilt({ x: 0, y: 0 })
      }}
      className={`glass relative overflow-hidden rounded-sm p-8 transition-all duration-700 [transform-style:preserve-3d] ${
        index % 3 === 0 ? "md:translate-y-8" : ""
      }`}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? `perspective(1000px) rotateX(${-tilt.y * 6}deg) rotateY(${tilt.x * 6}deg) translateY(0)`
          : "perspective(1000px) translateY(40px)",
        boxShadow: hover
          ? "0 30px 80px -20px rgba(255,212,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 10px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
        animation: revealed ? `float ${7 + index}s ease-in-out ${index * 0.4}s infinite` : undefined,
      }}
    >
      {/* Chrome reflection sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{ opacity: hover ? 1 : 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
            transform: hover ? "translateX(0%)" : "translateX(-100%)",
            transition: "transform 1100ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      {/* Yellow glow expansion */}
      <div
        className="pointer-events-none absolute -inset-px rounded-sm transition-opacity duration-700"
        style={{
          opacity: hover ? 1 : 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,212,0,0.18), transparent 60%)",
        }}
      />

      <Quote
        className="h-8 w-8 text-primary transition-all duration-700"
        style={{
          opacity: hover ? 1 : 0.7,
          transform: hover ? "scale(1.18) rotate(-4deg)" : "scale(1)",
          filter: hover
            ? "drop-shadow(0 0 18px rgba(255,212,0,0.85))"
            : "drop-shadow(0 0 6px rgba(255,212,0,0.25))",
        }}
        aria-hidden
      />

      <blockquote className="relative z-10 mt-4 text-pretty text-base leading-relaxed text-foreground">
        {quote}
      </blockquote>

      {/* Energy bar */}
      <div className="relative z-10 mt-6">
        <div className="mb-2 flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Crowd Energy</span>
          <span className="text-primary">{energy}%</span>
        </div>
        <div className="h-px w-full bg-border/60">
          <div
            className="h-full bg-primary shadow-[0_0_12px_rgba(255,212,0,0.7)]"
            style={{
              width: revealed ? `${energy}%` : "0%",
              transition: `width 1400ms cubic-bezier(0.22,1,0.36,1) ${300 + index * 180}ms`,
            }}
          />
        </div>
      </div>

      <figcaption className="relative z-10 mt-6 flex items-center justify-between border-t border-border/50 pt-4 font-mono text-[10px] uppercase tracking-[0.3em]">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{role}</span>
      </figcaption>
    </figure>
  )
}
