import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()
  const isContactPage = pathname === '/contacto'
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/servicios', label: 'Servicios' },
    { href: '/portafolio', label: 'Portafolio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="w-full max-w-[100vw] container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 sm:h-20 md:h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 w-32 sm:w-40 md:w-[200px] min-w-0">
          <Image
            src="/twp-logo.png"
            alt="The Wedding Project"
            width={160}
            height={80}
            className={`w-auto h-auto max-h-10 sm:max-h-14 md:max-h-[80px] ${isContactPage ? 'invert' : ''}`}
            style={{ height: 'auto' }}
            priority
          />
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="flex-1 hidden md:flex items-center justify-center">
          <div className="flex items-center gap-16">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`${isContactPage ? 'text-secondary' : 'text-white'} hover:text-primary transition-colors font-geologica uppercase text-[13px] tracking-[0.25em]`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Burger Menu - Mobile */}
        <div className="md:hidden flex-1 flex justify-end">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 ${isContactPage ? 'text-secondary' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 w-full ${isContactPage ? 'bg-secondary' : 'bg-white'} transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full ${isContactPage ? 'bg-secondary' : 'bg-white'} transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full ${isContactPage ? 'bg-secondary' : 'bg-white'} transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Right spacer for desktop */}
        <div className="w-[200px] hidden md:block"></div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 sm:top-20 left-0 right-0 w-full max-w-[100vw] bg-white shadow-lg md:hidden"
          >
            <div className="py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-8 text-secondary hover:text-primary transition-colors font-geologica uppercase text-sm tracking-[0.25em]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Line underneath */}
      <div className={`w-full h-[1px] ${isContactPage ? 'bg-secondary/20' : 'bg-white/30'}`}></div>
    </nav>
  )
} 