// Tiny global event bus so the SoundCloud player can ask the ambient
// background music to pause itself, and resume when the track stops.

type Source = "ambient" | "playlist"
type Event =
  | { type: "playlist:start" }
  | { type: "playlist:stop" }
  | { type: "ambient:pause" }
  | { type: "ambient:resume" }

type Listener = (e: Event) => void

const listeners = new Set<Listener>()

export const audioBus = {
  on(fn: Listener) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  emit(e: Event) {
    listeners.forEach((fn) => fn(e))
  },
}

export type { Event as AudioBusEvent, Source }
