"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { audioBus } from "@/lib/audio-bus"

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

const VIDEO_ID = "LTFCuhofnN8"

// Hidden YouTube iframe player. Autoplays muted (allowed by browsers),
// the user toggles real sound with the floating button.
export function SoundController() {
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [on, setOn] = useState(false)
  const [hint, setHint] = useState(true)

  // Load YouTube IFrame API once
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.YT && window.YT.Player) {
      initPlayer()
      return
    }
    const existing = document.getElementById("yt-iframe-api")
    if (!existing) {
      const tag = document.createElement("script")
      tag.id = "yt-iframe-api"
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
    }
    window.onYouTubeIframeAPIReady = () => initPlayer()

    function initPlayer() {
      if (!containerRef.current) return
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          playsinline: 1,
          mute: 1,
          fs: 0,
          iv_load_policy: 3,
          rel: 0,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.mute()
              e.target.playVideo()
              setReady(true)
            } catch {}
          },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              try {
                e.target.playVideo()
              } catch {}
            }
          },
        },
      })
    }
  }, [])

  // Smooth fade by ramping volume over 300ms
  const ramp = useCallback((from: number, to: number, ms = 300) => {
    if (!playerRef.current?.setVolume) return
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / ms, 1)
      const v = from + (to - from) * t
      try {
        playerRef.current.setVolume(Math.round(v))
      } catch {}
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [])

  const toggle = useCallback(() => {
    if (!playerRef.current) return
    setHint(false)
    if (!on) {
      try {
        playerRef.current.unMute()
        playerRef.current.setVolume(0)
        playerRef.current.playVideo()
      } catch {}
      ramp(0, 70)
      setOn(true)
    } else {
      ramp(70, 0)
      setTimeout(() => {
        try {
          playerRef.current.mute()
        } catch {}
      }, 320)
      setOn(false)
    }
  }, [on, ramp])

  // Auto-hide hint after some time
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 9000)
    return () => clearTimeout(t)
  }, [])

  // Coordinate with the playlist: pause ambient when a track plays,
  // resume (at user-chosen state) when the track stops.
  const wasOnRef = useRef(false)
  useEffect(() => {
    const off = audioBus.on((e) => {
      if (e.type === "playlist:start") {
        wasOnRef.current = on
        if (on && playerRef.current) {
          ramp(70, 0, 250)
          setTimeout(() => {
            try {
              playerRef.current.mute()
              playerRef.current.pauseVideo()
            } catch {}
          }, 260)
          setOn(false)
        }
      }
      if (e.type === "playlist:stop") {
        if (wasOnRef.current && playerRef.current) {
          try {
            playerRef.current.unMute()
            playerRef.current.setVolume(0)
            playerRef.current.playVideo()
          } catch {}
          ramp(0, 70, 400)
          setOn(true)
        }
      }
    })
    return () => {
      off()
    }
  }, [on, ramp])

  return (
    <>
      {/* Hidden YouTube container */}
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-px -right-px h-px w-px overflow-hidden opacity-0"
        style={{ zIndex: -1 }}
      >
        <div ref={containerRef} />
      </div>

      {/* Floating sound button */}
      <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 md:bottom-8 md:right-8">
        {hint && (
          <div
            className="glass hidden items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80 md:flex"
            style={{ animation: "fadeIn 600ms ease both" }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Tap to enable sound
          </div>
        )}

        <button
          onClick={toggle}
          aria-label={on ? "Mute background music" : "Play background music"}
          aria-pressed={on}
          disabled={!ready}
          className={`group relative grid h-14 w-14 place-items-center rounded-full border backdrop-blur-xl transition-all duration-300 ${
            on
              ? "border-primary bg-primary/20 text-primary glow-yellow"
              : "border-foreground/20 bg-background/60 text-foreground hover:border-primary hover:text-primary"
          } ${!ready ? "opacity-50" : "opacity-100"}`}
        >
          {/* Beat-pulse ring when active */}
          {on && (
            <>
              <span className="absolute inset-0 rounded-full border border-primary/60 animate-ping-slow" />
              <span
                className="absolute inset-0 rounded-full border border-primary/30"
                style={{ animation: "ping-slow 2.5s 1.2s cubic-bezier(0,0,0.2,1) infinite" }}
              />
            </>
          )}

          {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}

          {/* Mini equalizer when active */}
          {on && (
            <div className="absolute -top-1 left-1/2 flex -translate-x-1/2 -translate-y-full items-end gap-[2px]">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="block w-[2px] rounded-full bg-primary"
                  style={{
                    height: "10px",
                    animation: `wave ${0.5 + i * 0.12}s ease-in-out ${i * 0.08}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
