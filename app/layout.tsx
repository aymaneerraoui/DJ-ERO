import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jet',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DJ ERO — Control The Night | Global Sound. Worldwide Energy.',
  description:
    'DJ ERO — Moroccan resident DJ and internationally experienced electronic music artist. Techno, Afro House, EDM, and immersive nightlife experiences across Morocco, Dubai, Turkey, Russia, China, Egypt, and the Philippines.',
  generator: 'v0.app',
  keywords: [
    'DJ ERO',
    'Moroccan DJ',
    'Techno',
    'Afro House',
    'Rabat',
    'Dubai DJ',
    'International DJ',
  ],
}

export const viewport: Viewport = {
  themeColor: '#050505',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} ${jetbrains.variable} bg-background`}
    >
      <body className="font-sans antialiased grain selection:bg-primary selection:text-primary-foreground">

        {/* ===== Monetag Ads ===== */}
        <Script
          id="monetag-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(function() {
                var s = document.createElement('script');
                s.src = 'https://quge5.com/88/tag.min.js';
                s.setAttribute('data-zone', '242125');
                s.setAttribute('data-cfasync', 'false');
                s.async = true;
                document.body.appendChild(s);
              }, 5000);
            `,
          }}
        />

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
