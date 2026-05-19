"use client"

import { useEffect, useRef, useState } from "react"
import { CinematicImage } from "./cinematic-image"
import { TextReveal } from "./text-reveal"

const IMAGES = [
  { src: "/dj-crowd.jpg", h: "tall", caption: "Mainstage · Mawazine" },
  { src: "/dj-laser.jpg", h: "short", caption: "Underground · Rabat" },
  { src: "/dj-stage.jpg", h: "tall", caption: "Resident · Yokka Beach" },
  { src: "/dj-rooftop.jpg", h: "short", caption: "Rooftop · Dubai" },
  { src: "/dj-booth.jpg", h: "short", caption: "Booth · CDJ-3000" },
  { src: "/dj-festival.jpg", h: "tall", caption: "Festival · Istanbul" },
]

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = activeIndex !== null ? "hidden" : ""
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [activeIndex])

  return (
    <section className="relative bg-background py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-8 bg-primary" />
              05 / Visual Archive
            </div>
            <h2 className="font-display text-6xl leading-[0.9] tracking-tight md:text-8xl">
              <TextReveal text="MOMENTS" as="span" stagger={32} />
              <br />
              <span className="italic text-primary text-glow-yellow">
                <TextReveal text="UNFILTERED" as="span" delay={300} stagger={36} />
              </span>
            </h2>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-primary">●</span> 2020 — 2026 · Selected Frames
          </div>
        </div>

        <div className="columns-1 gap-4 md:columns-3">
          {IMAGES.map((img, i) => (
            <figure
              key={i}
              className={`relative mb-4 break-inside-avoid ${
                img.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group block h-full w-full text-left"
                aria-label={`Open ${img.caption}`}
              >
                <CinematicImage
                  src={img.src}
                  alt={img.caption}
                  delay={i * 120}
                  parallax={0.18}
                  particles={i % 2 === 0}
                  className="h-full w-full rounded-sm"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <figcaption className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
                  <span className="text-foreground">{img.caption}</span>
                  <span className="text-primary opacity-0 transition group-hover:opacity-100">
                    0{i + 1} →
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <Lightbox
          image={IMAGES[activeIndex]}
          onClose={() => setActiveIndex(null)}
          onPrev={() =>
            setActiveIndex((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length))
          }
          onNext={() =>
            setActiveIndex((i) => (i === null ? null : (i + 1) % IMAGES.length))
          }
        />
      )}
    </section>
  )
}

function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
}: {
  image: { src: string; caption: string }
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 20)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-background/95 backdrop-blur-2xl transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0 }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,212,0,0.15), transparent 60%)",
        }}
      />

      <div
        className="relative z-10 max-h-[88vh] w-[92vw] max-w-5xl overflow-hidden rounded-sm"
        style={{
          transform: open ? "scale(1)" : "scale(0.94)",
          opacity: open ? 1 : 0,
          transition: "transform 700ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease",
          animation: open ? "float 8s ease-in-out infinite" : undefined,
        }}
      >
        <img
          src={image.src || "/placeholder.svg"}
          alt={image.caption}
          className="h-full w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/30" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground">
          {image.caption}
        </div>
      </div>

      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 z-10 -translate-y-1/2 rounded-full border border-foreground/20 bg-foreground/5 p-3 text-foreground backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground"
        aria-label="Previous"
      >
        ←
      </button>
      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 z-10 -translate-y-1/2 rounded-full border border-foreground/20 bg-foreground/5 p-3 text-foreground backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground"
        aria-label="Next"
      >
        →
      </button>
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground backdrop-blur-md transition hover:bg-primary hover:text-primary-foreground"
        aria-label="Close"
      >
        Close · Esc
      </button>
    </div>
  )
}
