import { CinematicImage } from "./cinematic-image"
import { CountUp } from "./count-up"
import { TextReveal } from "./text-reveal"

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-32 md:py-44">
      <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <div className="sticky top-24">
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-8 bg-primary" />
              01 / The Artist
            </div>

            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
              <CinematicImage
                src="/dj-portrait.jpg"
                alt="DJ ERO portrait"
                parallax={0.2}
                particles
                className="absolute inset-0 h-full w-full"
                imgClassName="grayscale-[15%]"
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 z-[2] flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.3em]">
                <span>Aymane Erraoui</span>
                <span className="text-primary">Rabat · MA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:pt-16">
          <h2 className="font-display text-6xl leading-[0.9] tracking-tight text-balance md:text-8xl">
            <TextReveal text="A Moroccan " as="span" stagger={22} />
            <span className="italic text-primary text-glow-yellow">
              <TextReveal text="visionary" as="span" delay={250} stagger={28} />
            </span>{" "}
            <TextReveal
              text="shaping the future of nightlife."
              as="span"
              delay={500}
              stagger={18}
            />
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              DJ ERO is a Moroccan DJ and resident performer blending techno, Afro House,
              hip-hop, EDM, house, commercial music, trap, and cinematic nightlife energy
              into immersive live experiences worldwide.
            </p>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              From underground basements in Rabat to luxury rooftops across Dubai, his sets
              are engineered for the moment a room transforms — sculpted in dynamics,
              tension, and release.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border/50 bg-border/50 md:grid-cols-4">
            {[
              { end: 5, suffix: "+", v: "Years" },
              { end: 7, suffix: "", v: "Countries" },
              { end: 200, suffix: "+", v: "Sets" },
              { static: "∞", v: "Energy" },
            ].map((s, i) => (
              <div key={s.v} className="bg-background p-6 transition hover:bg-card">
                <div className="font-display text-5xl text-primary text-glow-yellow">
                  {"static" in s ? (
                    s.static
                  ) : (
                    <CountUp end={s.end!} suffix={s.suffix} duration={1800 + i * 150} />
                  )}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 space-y-4">
            {[
              { label: "Resident", value: "Yokka Beach Club · Bodega 30" },
              { label: "Genres", value: "Techno · Afro House · EDM · Hip-Hop" },
              { label: "Languages", value: "English · French · Arabic" },
              { label: "Based In", value: "Rabat, Morocco — Worldwide" },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-4 border-b border-border/40 pb-4 font-mono text-xs uppercase tracking-[0.2em]"
              >
                <span className="text-muted-foreground">{row.label}</span>
                <span className="col-span-2 text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
