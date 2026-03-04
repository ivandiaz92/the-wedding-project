import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Geologica, Figtree } from 'next/font/google'
import localFont from 'next/font/local'
import Footer from './components/layout/Footer'

const geologica = Geologica({ 
  subsets: ['latin'],
  variable: '--font-geologica',
})

const romans = localFont({
  src: '../public/fonts/romans-story.otf',
  variable: '--font-romans',
})

const degular = localFont({
  src: '../public/fonts/Degular-Regular.otf',
  variable: '--font-degular',
  display: 'swap',
})

const figtree = Figtree({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: 'The Wedding Project',
  description: 'We Create & Design Memorable Weddings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || ''
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const formulaBgUrl = siteOrigin && basePath ? `${siteOrigin}${basePath}/images/formula-bg.png` : null
  return (
    <html lang="en" className={`${geologica.variable} ${romans.variable} ${degular.variable} font-sans antialiased min-h-screen w-full max-w-[100vw] bg-white text-secondary ${figtree.variable}`}>
      <body className={`${geologica.variable} ${romans.variable} ${degular.variable} ${figtree.variable} scroll-smooth w-full max-w-[100vw]`}>
        {formulaBgUrl && (
          <style dangerouslySetInnerHTML={{ __html: `:root{--formula-bg-url:url("${formulaBgUrl}")}` }} />
        )}
        <main className="w-full min-w-0 max-w-[100vw]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
