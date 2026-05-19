"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface TextRevealProps {
  text: string
  className?: string
  as?: "span" | "div"
  delay?: number
  stagger?: number
  trigger?: "view" | "mount"
  children?: ReactNode
}

// Splits text into letters and animates them with a cinematic blur+rise reveal
// when the element enters the viewport (or on mount).
export function TextReveal({
  text,
  className = "",
  as = "span",
  delay = 0,
  stagger = 28,
  trigger = "view",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(trigger === "mount")

  useEffect(() => {
    if (trigger === "mount") {
      setVisible(true)
      return
    }
    if (!ref.current) return
    const el = ref.current
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [trigger])

  const Wrapper = as as "div"

  // Preserve whitespace by rendering each char individually
  const chars = Array.from(text)

  return (
    <Wrapper ref={ref as React.RefObject<HTMLDivElement>} className={className} aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          style={{
            transform: visible ? "translateY(0)" : "translateY(0.6em)",
            filter: visible ? "blur(0px)" : "blur(10px)",
            opacity: visible ? 1 : 0,
            transition: `transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, filter 900ms cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, opacity 700ms ease ${delay + i * stagger}ms`,
            whiteSpace: c === " " ? "pre" : undefined,
          }}
        >
          {c}
        </span>
      ))}
    </Wrapper>
  )
}
