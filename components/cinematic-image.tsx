"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface CinematicImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  parallax?: number // 0..1 strength
  delay?: number
  tilt?: boolean
  particles?: boolean
  priority?: boolean
}

export function CinematicImage({
  src,
  alt,
  className,
  imgClassName,
  parallax = 0.15,
  delay = 0,
  tilt = true,
  particles = false,
  priority = false,
}: CinematicImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({})
  const [parY, setParY] = useState(0)
  const rafRef = useRef<number | null>(null)

  // Reveal on viewport intersection
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setRevealed(true), delay)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  // Parallax on scroll
  useEffect(() => {
    if (parallax <= 0) return
    const el = wrapRef.current
    if (!el) return
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        // -1 (above) .. 1 (below)
        const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
        setParY(progress * parallax * 60)
        rafRef.current = null
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [parallax])

  // Hover tilt
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`,
    })
  }
  const handleLeave = () => setTiltStyle({ transform: "perspective(1000px) rotateX(0) rotateY(0)" })

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group relative overflow-hidden bg-card transition-[transform,box-shadow] duration-700 ease-out [transform-style:preserve-3d] hover:shadow-[0_30px_80px_-20px_rgba(255,212,0,0.35)]",
        className
      )}
      style={tiltStyle}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${parY}px, 0) scale(${revealed ? (loaded ? 1 : 1.12) : 1.18})`,
          transition:
            "transform 1600ms cubic-bezier(0.22,1,0.36,1), filter 1400ms cubic-bezier(0.22,1,0.36,1), opacity 1200ms ease-out",
          filter: revealed && loaded ? "blur(0px)" : "blur(14px)",
          opacity: revealed ? 1 : 0,
        }}
      >
        <img
          ref={imgRef}
          src={src || "/placeholder.svg"}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]",
            imgClassName
          )}
          style={{
            imageRendering: "auto",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      </div>

      {/* Ambient yellow glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,212,0,0.25),transparent_60%)] mix-blend-screen" />
        <div className="absolute inset-0 ring-1 ring-inset ring-primary/40" />
      </div>

      {/* Cinematic vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />

      {/* Floating particles */}
      {particles && <Particles />}

      {/* Scan reveal line */}
      <div
        className="pointer-events-none absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0"
        style={{
          opacity: revealed && !loaded ? 0.9 : 0,
          transition: "opacity 400ms ease",
          animation: revealed ? "scan 1.4s ease-out 1" : undefined,
          mixBlendMode: "screen",
        }}
      />
    </div>
  )
}

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-primary/70 blur-[1px]"
          style={{
            left: `${(i * 73) % 100}%`,
            top: `${(i * 41) % 100}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            animation: `float ${5 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
            opacity: 0.4 + ((i % 5) * 0.1),
          }}
        />
      ))}
    </div>
  )
}
