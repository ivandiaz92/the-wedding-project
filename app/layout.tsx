import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Geologica } from 'next/font/google'
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

const honya = localFont({
  src: '../public/fonts/honya.ttf',
  variable: '--font-honya',
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
  return (
    <html lang="en">
      <body className={`${geologica.variable} ${romans.variable} ${honya.variable} font-sans antialiased min-h-screen w-full overflow-x-hidden bg-white text-secondary`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
