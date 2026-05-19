"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Play, Pause, ExternalLink, SkipBack, SkipForward } from "lucide-react"
import { TextReveal } from "./text-reveal"
import { audioBus } from "@/lib/audio-bus"

declare global {
  interface Window {
    SC: any
  }
}

const TRACKS = [
  {
    genre: "House",
    title: "Adam Port — Move (Extended)",
    artist: "Adam Port, Stryv",
    duration: "07:42",
    url: "https://soundcloud.com/adam-port/adam-port-stryv-move-extended",
  },
  {
    genre: "EDM",
    title: "Kamili (Extended)",
    artist: "Francis Mercier",
    duration: "06:15",
    url: "https://soundcloud.com/francis-mercier/kamili-extended-1",
  },
  {
    genre: "Afro House",
    title: "Afro House Selection",
    artist: "Lauro Sanchez",
    duration: "Mix",
    url: "https://soundcloud.com/laurosanchezzz/sets/afro-house",
  },
  {
    genre: "Electro",
    title: "Top 100 Techno House",
    artist: "Lauro Sanchez",
    duration: "Mix",
    url: "https://soundcloud.com/laurosanchezzz/sets/top-100-techno-house-songs-of",
  },
  {
    genre: "Hip-Hop",
    title: "Hip-Hop 2025 Bangers Mix",
    artist: "DJ Magic Kenny",
    duration: "Mix",
    url: "https://soundcloud.com/djmagickenny/best-hiphop-2025-mix-hiphop-bangers-2025-mix-best-hiphop-workout-mix-2025-hiphop-2025-hits",
  },
]

function formatTime(ms: number) {
  if (!isFinite(ms) || ms <= 0) return "00:00"
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function MusicSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const widgetRef = useRef<any>(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [intensity, setIntensity] = useState(0.5)
  const intensityRef = useRef(0.5)

  const current = TRACKS[active]

  // Load the SoundCloud Widget API once on mount, then create the widget.
  useEffect(() => {
    const ensureScript = () =>
      new Promise<void>((resolve) => {
        if (window.SC && window.SC.Widget) return resolve()
        const existing = document.getElementById("sc-widget-api")
        if (existing) {
          existing.addEventListener("load", () => resolve(), { once: true })
          return
        }
        const tag = document.createElement("script")
        tag.id = "sc-widget-api"
        tag.src = "https://w.soundcloud.com/player/api.js"
        tag.async = true
        tag.onload = () => resolve()
        document.body.appendChild(tag)
      })

    let cancelled = false
    ensureScript().then(() => {
      if (cancelled || !iframeRef.current || !window.SC) return
      const widget = window.SC.Widget(iframeRef.current)
      widgetRef.current = widget

      widget.bind(window.SC.Widget.Events.READY, () => {
        setReady(true)
        widget.setVolume(85)
        widget.getDuration((d: number) => setDuration(d))
      })
      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setPlaying(true)
        audioBus.emit({ type: "playlist:start" })
      })
      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        setPlaying(false)
        audioBus.emit({ type: "playlist:stop" })
      })
      widget.bind(window.SC.Widget.Events.FINISH, () => {
        setPlaying(false)
        audioBus.emit({ type: "playlist:stop" })
      })
      widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (data: any) => {
        setPosition(data.currentPosition || 0)
      })
    })

    return () => {
      cancelled = true
      try {
        widgetRef.current?.pause?.()
      } catch {}
    }
  }, [])

  // Drive a soft random "intensity" value while playing for the waveform.
  useEffect(() => {
    if (!playing) {
      intensityRef.current = 0.4
      setIntensity(0.4)
      return
    }
    let raf = 0
    const tick = () => {
      const target = 0.55 + Math.random() * 0.45
      intensityRef.current = intensityRef.current + (target - intensityRef.current) * 0.18
      setIntensity(intensityRef.current)
      raf = window.setTimeout(tick, 90) as unknown as number
    }
    tick()
    return () => window.clearTimeout(raf)
  }, [playing])

  const loadAndPlay = useCallback((index: number, autoplay = true) => {
    const track = TRACKS[index]
    const widget = widgetRef.current
    if (!widget) return
    setActive(index)
    setPosition(0)
    setDuration(0)
    widget.load(track.url, {
      auto_play: autoplay,
      hide_related: true,
      show_comments: false,
      show_user: false,
      show_reposts: false,
      visual: false,
      callback: () => {
        widget.getDuration((d: number) => setDuration(d))
        if (autoplay) {
          widget.setVolume(85)
          widget.play()
        }
      },
    })
  }, [])

  const togglePlay = useCallback(() => {
    const widget = widgetRef.current
    if (!widget) return
    if (playing) {
      widget.pause()
    } else {
      // First interaction: if widget hasn't actually loaded a track yet,
      // it still plays the iframe's initial src which is the first track.
      widget.setVolume(85)
      widget.play()
    }
  }, [playing])

  const handleSelect = useCallback(
    (i: number) => {
      if (i === active) {
        togglePlay()
        return
      }
      loadAndPlay(i, true)
    },
    [active, loadAndPlay, togglePlay]
  )

  const next = useCallback(() => loadAndPlay((active + 1) % TRACKS.length, true), [active, loadAndPlay])
  const prev = useCallback(
    () => loadAndPlay((active - 1 + TRACKS.length) % TRACKS.length, true),
    [active, loadAndPlay]
  )

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const widget = widgetRef.current
      if (!widget || duration <= 0) return
      const rect = e.currentTarget.getBoundingClientRect()
      const pct = (e.clientX - rect.left) / rect.width
      widget.seekTo(Math.max(0, Math.min(1, pct)) * duration)
    },
    [duration]
  )

  const progress = duration > 0 ? position / duration : 0
  const initialUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    TRACKS[0].url
  )}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`

  return (
    <section id="music" className="relative overflow-hidden bg-background py-32 md:py-44">
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/10 blur-[150px]" />

      {/* Hidden SoundCloud widget iframe drives all audio playback */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <iframe
          ref={iframeRef}
          title="SoundCloud Player"
          width="1"
          height="1"
          allow="autoplay"
          src={initialUrl}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-8 bg-primary" />
          04 / Music & Mixes
        </div>

        <h2 className="font-display text-6xl leading-[0.9] tracking-tight md:text-9xl">
          <TextReveal text="SOUND" as="span" stagger={32} />
          <span className="italic text-primary text-glow-yellow">
            {" "}
            <TextReveal text="ARCHIVE" as="span" delay={300} stagger={36} />
          </span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Player deck */}
          <div className="lg:col-span-7">
            <div className="glass relative overflow-hidden rounded-sm p-6 md:p-10">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,212,0,0.18),transparent_60%)] transition-opacity duration-700"
                style={{ opacity: playing ? 1 : 0.4 }}
              />

              <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="flex items-center gap-2 text-primary">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                    style={{ animation: playing ? "pulse-glow 1s ease-in-out infinite" : "none" }}
                  />
                  {playing ? "NOW PLAYING" : "READY"}
                </span>
                <span>
                  {formatTime(position)} / {duration > 0 ? formatTime(duration) : current.duration}
                </span>
              </div>

              <div className="relative mt-8 flex items-end gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    disabled={!ready}
                    aria-label="Previous track"
                    className="grid h-10 w-10 place-items-center rounded-full border border-foreground/20 text-foreground/80 transition hover:border-primary hover:text-primary disabled:opacity-40"
                  >
                    <SkipBack className="h-4 w-4 fill-current" />
                  </button>
                  <button
                    onClick={togglePlay}
                    disabled={!ready}
                    aria-label={playing ? "Pause" : "Play"}
                    className="group/play relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-105 glow-yellow disabled:opacity-50 md:h-20 md:w-20"
                  >
                    {playing && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-primary/60"
                        style={{ animation: "ping-slow 2s cubic-bezier(0,0,0.2,1) infinite" }}
                      />
                    )}
                    {playing ? (
                      <Pause className="h-6 w-6 fill-current md:h-7 md:w-7" />
                    ) : (
                      <Play className="h-6 w-6 translate-x-0.5 fill-current md:h-7 md:w-7" />
                    )}
                  </button>
                  <button
                    onClick={next}
                    disabled={!ready}
                    aria-label="Next track"
                    className="grid h-10 w-10 place-items-center rounded-full border border-foreground/20 text-foreground/80 transition hover:border-primary hover:text-primary disabled:opacity-40"
                  >
                    <SkipForward className="h-4 w-4 fill-current" />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    {current.genre}
                  </div>
                  <h3 className="mt-1 truncate font-display text-2xl leading-tight md:text-4xl">
                    {current.title}
                  </h3>
                  <div className="mt-1 truncate text-xs text-muted-foreground md:text-sm">
                    {current.artist}
                  </div>
                </div>
              </div>

              {/* Reactive waveform */}
              <div className="relative mt-8 flex h-20 items-center gap-[2px] md:h-24">
                {Array.from({ length: 96 }).map((_, i) => {
                  const base = 18 + Math.abs(Math.sin(i * 0.4 + active) * 50) + (i % 7) * 4
                  const dynamic = playing
                    ? base * (0.55 + intensity * 0.85) +
                      Math.abs(Math.sin(i * 1.7 + position * 0.002)) * 18
                    : base * 0.5
                  const passed = i / 96 < progress
                  return (
                    <span
                      key={i}
                      className={`flex-1 rounded-full transition-[height,background-color] duration-150 ease-out ${
                        passed ? "bg-primary" : "bg-foreground/20"
                      }`}
                      style={{
                        height: `${Math.min(dynamic, 100)}%`,
                        boxShadow: passed ? "0 0 6px rgba(255,212,0,0.6)" : undefined,
                      }}
                    />
                  )
                })}
              </div>

              {/* Seek bar */}
              <div
                onClick={handleSeek}
                role="slider"
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(position)}
                tabIndex={0}
                className="relative mt-4 h-1 w-full cursor-pointer overflow-hidden rounded-full bg-foreground/15"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-primary"
                  style={{
                    width: `${Math.min(progress * 100, 100)}%`,
                    boxShadow: "0 0 12px rgba(255,212,0,0.6)",
                    transition: "width 120ms linear",
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>{formatTime(position)}</span>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground transition hover:text-primary"
                >
                  Open in SoundCloud <ExternalLink className="h-3 w-3" />
                </a>
                <span>{duration > 0 ? formatTime(duration) : current.duration}</span>
              </div>
            </div>
          </div>

          {/* Tracklist */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-sm border border-border/50">
              {TRACKS.map((t, i) => {
                const isActive = i === active
                const isPlaying = isActive && playing
                return (
                  <button
                    key={t.title}
                    onClick={() => handleSelect(i)}
                    disabled={!ready}
                    className={`group flex w-full items-center gap-4 border-b border-border/50 p-5 text-left transition last:border-b-0 disabled:opacity-60 ${
                      isActive ? "bg-primary/10" : "hover:bg-card"
                    }`}
                    style={
                      isActive
                        ? { boxShadow: "inset 3px 0 0 0 rgb(255 212 0), 0 0 0 0 rgba(0,0,0,0)" }
                        : undefined
                    }
                  >
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground glow-yellow"
                          : "border-border text-muted-foreground group-hover:border-foreground/40 group-hover:text-foreground"
                      }`}
                    >
                      {isPlaying ? (
                        <MiniEqualizer />
                      ) : isActive ? (
                        <Play className="h-3.5 w-3.5 translate-x-px fill-current" />
                      ) : (
                        <Play className="h-3.5 w-3.5 translate-x-px fill-current" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        <span className={isActive ? "text-primary" : ""}>0{i + 1}</span>
                        <span className="text-foreground/60">·</span>
                        <span>{t.genre}</span>
                      </div>
                      <div
                        className={`mt-1 truncate text-sm transition ${
                          isActive ? "text-primary text-glow-yellow" : "text-foreground"
                        }`}
                      >
                        {t.title}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {t.duration}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniEqualizer() {
  return (
    <span className="flex h-3 items-end gap-[2px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="block w-[2px] rounded-full bg-current"
          style={{
            height: "100%",
            animation: `wave ${0.45 + i * 0.12}s ease-in-out ${i * 0.07}s infinite alternate`,
          }}
        />
      ))}
    </span>
  )
}
