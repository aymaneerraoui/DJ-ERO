import { ArrowRight, Instagram, Send, Facebook, Music2, Mail, Phone } from "lucide-react"
import { TextReveal } from "./text-reveal"

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/aymane.erraoui" },
  { icon: Send, label: "Telegram", href: "https://t.me/DJ_ERO_VXD" },
  { icon: Facebook, label: "Facebook", href: "https://web.facebook.com/ero.guzman.2025" },
  { icon: Music2, label: "SoundCloud", href: "https://soundcloud.com/mr-ero-868208414" },
]

export function BookingCta() {
  return (
    <section
      id="book"
      className="relative isolate overflow-hidden bg-background py-32 md:py-48"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/dj-laser.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      {/* Yellow glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[160px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-8 bg-primary" />
          08 / Final Call
        </div>

        <h2 className="font-display text-[14vw] leading-[0.85] tracking-tight text-balance md:text-[10rem]">
          <TextReveal text="READY TO" as="span" stagger={36} />
          <br />
          <span className="italic text-primary text-glow-yellow">
            <TextReveal text="CONTROL" as="span" delay={400} stagger={40} />
          </span>{" "}
          <TextReveal text="THE NIGHT?" as="span" delay={900} stagger={36} />
        </h2>

        <p className="mt-10 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Available for international bookings, festivals, clubs, luxury events, and
          exclusive nightlife experiences worldwide.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="mailto:erodiv2@gmail.com?subject=Booking%20DJ%20ERO"
            className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-5 font-mono text-xs uppercase tracking-[0.3em] text-primary-foreground glow-yellow transition hover:scale-[1.02]"
          >
            Book DJ ERO
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="https://wa.me/212777739015"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-foreground/20 bg-foreground/5 px-8 py-5 font-mono text-xs uppercase tracking-[0.3em] backdrop-blur-md transition hover:bg-foreground/10"
          >
            WhatsApp +212 777 739 015
          </a>
        </div>

        {/* Contact grid */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border/50 bg-border/50 md:grid-cols-3">
          <a
            href="mailto:erodiv2@gmail.com"
            className="group flex items-start gap-4 bg-background p-6 transition hover:bg-card"
          >
            <Mail className="mt-1 h-5 w-5 text-primary" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Email
              </div>
              <div className="mt-2 text-foreground transition group-hover:text-primary">
                erodiv2@gmail.com
              </div>
            </div>
          </a>
          <a
            href="tel:+212777739015"
            className="group flex items-start gap-4 bg-background p-6 transition hover:bg-card"
          >
            <Phone className="mt-1 h-5 w-5 text-primary" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Phone / WhatsApp
              </div>
              <div className="mt-2 text-foreground transition group-hover:text-primary">
                +212 777 739 015
              </div>
            </div>
          </a>
          <div className="flex items-start gap-4 bg-background p-6">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Based In
              </div>
              <div className="mt-2 text-foreground">Rabat, Morocco · Worldwide</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-border/50 pt-10 md:flex-row md:items-center">
          <div className="flex items-center gap-2 font-display text-lg tracking-[0.3em]">
            <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,212,0,0.8)]" />
            DJ ERO
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-muted-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            © 2026 DJ ERO · All rights reserved
          </div>
        </footer>
      </div>
    </section>
  )
}
