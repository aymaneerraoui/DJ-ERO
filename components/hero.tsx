"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { TextReveal } from "./text-reveal"

const ROTATING = [
  "DJ ERO",
  "FUTURE OF NIGHTLIFE",
  "FEEL THE BASS",
  "GLOBAL SOUND EXPERIENCE",
  "ENERGY WITHOUT LIMITS",
]

export function Hero() {
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          transform: `translate3d(${mouse.x * -20}px, ${mouse.y * -20}px, 0) scale(1.1)`,
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <img
          src="/dj-hero.jpg"
          alt="DJ ERO performing live"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{ backfaceVisibility: "hidden" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
      </div>

      {/* Yellow ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[140px] animate-pulse-glow"
        style={{
          transform: `translate(calc(-50% + ${mouse.x * 30}px), calc(-50% + ${mouse.y * 30}px))`,
        }}
      />

      {/* Vertical scan line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
      </div>

      {/* Top nav */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2 font-display text-xl tracking-[0.3em] text-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,212,0,0.8)]" />
          DJ ERO
        </div>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground md:flex">
          <a href="#about" className="transition hover:text-foreground">About</a>
          <a href="#experience" className="transition hover:text-foreground">Live</a>
          <a href="#global" className="transition hover:text-foreground">Global</a>
          <a href="#music" className="transition hover:text-foreground">Music</a>
          <a href="#book" className="transition hover:text-foreground">Book</a>
        </nav>
        <a
          href="#book"
          className="hidden rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md transition hover:bg-foreground/10 md:inline-block"
        >
          Contact
        </a>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-[calc(100vh-96px)] flex-col justify-between px-6 pb-12 md:px-12">
        <div className="mt-12 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-muted-foreground md:mt-20">
          <span className="h-px w-10 bg-primary" />
          Resident DJ · Rabat, Morocco
        </div>

        <div className="my-auto pt-12 md:pt-0">
          <h1 className="font-display text-[18vw] leading-[0.85] tracking-[-0.02em] text-foreground md:text-[12rem]">
            <span className="block">
              <TextReveal text="CONTROL" as="span" trigger="mount" stagger={50} />
            </span>
            <span className="block">
              <TextReveal text="THE " as="span" trigger="mount" delay={420} stagger={50} />
              <span className="italic text-primary text-glow-yellow">
                <TextReveal text="NIGHT" as="span" trigger="mount" delay={620} stagger={60} />
              </span>
            </span>
          </h1>

          <div className="mt-8 flex items-end justify-between gap-6 md:mt-12">
            <div className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Moroccan resident DJ and internationally experienced electronic music artist.
              Techno · Afro House · EDM · House · Hip-Hop. Five years delivering immersive
              nightlife across seven countries.
            </div>

            <div className="hidden h-12 overflow-hidden font-mono text-xs uppercase tracking-[0.3em] text-foreground/80 md:block">
              <div
                className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateY(-${index * 48}px)` }}
              >
                {ROTATING.map((t) => (
                  <div key={t} className="flex h-12 items-center justify-end">
                    <span className="mr-2 inline-block h-1 w-1 rounded-full bg-primary" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 grid grid-cols-1 items-end gap-6 md:grid-cols-3 md:gap-12">
          <a
            href="#book"
            className="group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full bg-primary px-7 py-4 font-mono text-xs uppercase tracking-[0.3em] text-primary-foreground glow-yellow transition hover:scale-[1.02]"
          >
            <span className="relative z-10">Book DJ ERO</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-500 group-hover:translate-x-0" />
            <span className="absolute inset-0 -translate-x-full font-mono text-xs uppercase tracking-[0.3em] text-background flex items-center gap-3 px-7 transition-transform duration-500 group-hover:translate-x-0 z-10">
              Book DJ ERO <ArrowRight className="h-4 w-4" />
            </span>
          </a>

          <SoundwaveVisualizer />

          <div className="flex items-center justify-end gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            Live Set Loaded · 128 BPM
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60">
        ↓ Scroll
      </div>
    </section>
  )
}

function SoundwaveVisualizer() {
  const bars = 32
  return (
    <div className="flex h-12 items-center justify-center gap-1">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="block w-[2px] rounded-full bg-foreground/70"
          style={{
            height: `${30 + Math.sin(i * 0.7) * 20 + Math.random() * 30}%`,
            animation: `wave ${0.6 + (i % 5) * 0.15}s ease-in-out ${i * 0.04}s infinite alternate`,
            backgroundColor: i % 6 === 0 ? "#FFD400" : undefined,
          }}
        />
      ))}
    </div>
  )
}
