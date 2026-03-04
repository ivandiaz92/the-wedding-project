'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'center center'],
  })

  const titleFontSize = useTransform(scrollYProgress, (v) => {
    const size = 2.5 + v * 5.8
    return `${Math.min(size, 7.8)}vw`
  })
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45], [0.4, 0.7, 1])

  return (
    <footer ref={footerRef} className="w-full bg-white">
      <div className="w-full py-8 sm:py-12 flex flex-col items-center justify-center min-h-[55vh]">
        <nav className="flex flex-col items-center w-full">
          <div className="w-full flex justify-center pl-[10vw] pr-[10vw]">
            <motion.div
              className="origin-center text-center shrink-0"
              style={{ fontSize: titleFontSize, opacity: titleOpacity }}
            >
              <Link
                href="/"
                className="block font-romans tracking-[0.02em] text-secondary whitespace-nowrap"
              >
                THE WEDDING PROJECT
              </Link>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 font-geologica text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-secondary/80 px-4">
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
      <div className="border-t border-secondary/10 w-full max-w-[100vw] overflow-x-hidden">
        <div className="w-full min-w-0 container mx-auto px-4 sm:px-6 py-4 sm:py-6">
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