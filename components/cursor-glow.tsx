"use client"

import { useEffect, useRef, useState } from "react"

// Smooth, lerped yellow ambient glow that follows the cursor.
// Hidden on touch devices and when reduced motion is preferred.
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const isTouch = matchMedia("(pointer: coarse)").matches
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isTouch || reduced) return
    setEnabled(true)

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { x: target.x, y: target.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x - 250}px, ${pos.y - 250}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[500px] w-[500px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(255,212,0,0.10), rgba(255,212,0,0.04) 30%, transparent 60%)",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  )
}
