import { CinematicImage } from "./cinematic-image"
import { TextReveal } from "./text-reveal"

const EXPERIENCES = [
  {
    title: "Luxury Clubs",
    img: "/dj-booth.jpg",
    tag: "01",
    desc: "Premium club residencies engineered for elite nightlife.",
  },
  {
    title: "Festivals",
    img: "/dj-festival.jpg",
    tag: "02",
    desc: "Headline festival energy across continents.",
  },
  {
    title: "Rooftop & Beach",
    img: "/dj-rooftop.jpg",
    tag: "03",
    desc: "Sunset-to-sunrise sets in iconic open-air locations.",
  },
  {
    title: "Underground Raves",
    img: "/dj-laser.jpg",
    tag: "04",
    desc: "Pure techno, basement intensity, no compromise.",
  },
  {
    title: "Private & Fashion",
    img: "/dj-stage.jpg",
    tag: "05",
    desc: "Curated atmospheres for luxury brand activations.",
  },
  {
    title: "Crowd Atmosphere",
    img: "/dj-crowd.jpg",
    tag: "06",
    desc: "Sets calibrated to push energy past the ceiling.",
  },
]

export function LiveExperience() {
  return (
    <section id="experience" className="relative bg-background py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-8 bg-primary" />
              02 / Live Experience
            </div>
            <h2 className="font-display text-6xl leading-[0.9] tracking-tight md:text-8xl">
              <TextReveal text="The " as="span" stagger={26} />
              <span className="italic text-primary text-glow-yellow">
                <TextReveal text="stage" as="span" delay={180} stagger={32} />
              </span>
              <br />{" "}
              <TextReveal text="is everywhere." as="span" delay={400} stagger={22} />
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            From smoke-filled underground basements to luxury rooftops above the Gulf — every
            performance is engineered as a complete cinematic experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {EXPERIENCES.map((e, i) => (
            <article
              key={e.title}
              className={`group relative overflow-hidden rounded-sm bg-card ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              } ${i === 3 ? "md:col-span-2" : ""}`}
            >
              <div className={`relative ${i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}>
                <CinematicImage
                  src={e.img}
                  alt={e.title}
                  delay={i * 100}
                  parallax={i === 0 ? 0.25 : 0.15}
                  particles={i === 0}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 z-[1] bg-primary/0 mix-blend-overlay transition-colors duration-500 group-hover:bg-primary/20" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  <span>{e.tag}</span>
                  <span className="text-primary opacity-0 transition group-hover:opacity-100">
                    →
                  </span>
                </div>
                <h3 className={`font-display tracking-tight ${i === 0 ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"}`}>
                  {e.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {e.desc}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border/50 transition group-hover:ring-primary/40" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
