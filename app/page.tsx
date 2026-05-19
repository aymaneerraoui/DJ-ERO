import { Hero } from "@/components/hero"
import { MarqueeBar } from "@/components/marquee-bar"
import { About } from "@/components/about"
import { LiveExperience } from "@/components/live-experience"
import { GlobalSection } from "@/components/global-section"
import { MusicSection } from "@/components/music-section"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { Brands } from "@/components/brands"
import { BookingCta } from "@/components/booking-cta"
import { SoundController } from "@/components/sound-controller"
import { CursorGlow } from "@/components/cursor-glow"

export default function Page() {
  return (
    <main className="relative bg-background text-foreground">
      <CursorGlow />
      <Hero />
      <MarqueeBar />
      <About />
      <LiveExperience />
      <GlobalSection />
      <MusicSection />
      <Gallery />
      <Testimonials />
      <Brands />
      <BookingCta />
      <SoundController />
    </main>
  )
}
