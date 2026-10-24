import type { Metadata, Viewport } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import { site } from '@/content/site'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import CustomCursor from '@/components/CustomCursor'
import HirePrompt from '@/components/HirePrompt'
import './globals.css'

// Closest open-licence match to Apple's SF Pro (SF itself may only be used on Apple platforms)
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { type: 'website', siteName: site.name, locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = { themeColor: '#f3f5ff' }

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { '@type': 'PostalAddress', addressLocality: site.locality, addressCountry: 'IN' },
  sameAs: [site.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${inter.variable}`}>
      <body className="min-h-svh bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-on-accent"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <HirePrompt />
        <CustomCursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  )
}
