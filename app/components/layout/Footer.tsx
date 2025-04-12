import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* Main Footer */}
      <div className="w-full py-12">
        <nav className="flex flex-col items-center">
          {/* Logo */}
          <div className="w-full px-8">
            <Link 
              href="/" 
              className="block w-full font-romans text-[7vw] tracking-[0.1em] text-secondary text-center"
            >
              THE WEDDING PROYECT
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 flex items-center gap-8 sm:gap-12 font-geologica text-sm tracking-[0.2em] uppercase text-secondary/80">
            <Link href="/servicios" className="hover:text-primary transition-colors">
              Servicios
            </Link>
            <Link href="/portafolio" className="hover:text-primary transition-colors">
              Portafolio
            </Link>
            <Link href="/nosotros" className="hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/contacto" className="hover:text-primary transition-colors">
              Contacto
            </Link>
          </div>
        </nav>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-secondary/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left Links */}
            <div className="flex items-center gap-6 text-xs text-secondary/60">
              <Link href="/privacidad" className="hover:text-primary transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-primary transition-colors">
                Términos y Condiciones
              </Link>
            </div>

            {/* Center Logo */}
            <Link 
              href="/" 
              className="order-first sm:order-none font-romans text-2xl tracking-wider text-secondary"
            >
              TWP
            </Link>

            {/* Right Links */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-secondary/60">¿Eres Proveedor?</span>
              <Link 
                href="/registro" 
                className="text-xs font-geologica tracking-[0.2em] uppercase text-secondary hover:text-primary transition-colors"
              >
                Registrate aquí
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-xs text-secondary/60">
            Todos los derechos reservados ©2025
          </div>
        </div>
      </div>
    </footer>
  )
} 