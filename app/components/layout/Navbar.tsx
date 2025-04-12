import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isContactPage = pathname === '/contacto'

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-8 flex items-center h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center w-[200px]">
          <Image
            src="/twp-logo.png"
            alt="The Wedding Project"
            width={160}
            height={80}
            className={`h-auto ${isContactPage ? 'invert' : ''}`}
            priority
          />
        </Link>

        {/* Navigation Links - Centered */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="flex items-center gap-16">
            <Link href="/servicios" className={`${isContactPage ? 'text-secondary' : 'text-white'} hover:text-primary transition-colors font-geologica uppercase text-[13px] tracking-[0.25em]`}>
              Servicios
            </Link>
            <Link href="/portafolio" className={`${isContactPage ? 'text-secondary' : 'text-white'} hover:text-primary transition-colors font-geologica uppercase text-[13px] tracking-[0.25em]`}>
              Portafolio
            </Link>
            <Link href="/nosotros" className={`${isContactPage ? 'text-secondary' : 'text-white'} hover:text-primary transition-colors font-geologica uppercase text-[13px] tracking-[0.25em]`}>
              Nosotros
            </Link>
            <Link href="/faq" className={`${isContactPage ? 'text-secondary' : 'text-white'} hover:text-primary transition-colors font-geologica uppercase text-[13px] tracking-[0.25em]`}>
              FAQ
            </Link>
            <Link href="/contacto" className={`${isContactPage ? 'text-secondary' : 'text-white'} hover:text-primary transition-colors font-geologica uppercase text-[13px] tracking-[0.25em]`}>
              Contacto
            </Link>
          </div>
        </div>

        {/* Right spacer to help with centering */}
        <div className="w-[200px]"></div>
      </div>
      {/* Line underneath */}
      <div className={`w-full h-[1px] ${isContactPage ? 'bg-secondary/20' : 'bg-white/30'}`}></div>
    </nav>
  )
} 