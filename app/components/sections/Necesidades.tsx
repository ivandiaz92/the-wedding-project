'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// ─── Data ──────────────────────────────────────────────────────────────────────
const items = [
  { label: 'Tiempo de planeación',    detail: 'Desde 3 meses hasta más de un año de anticipación',       icon: '/images/necesidad-svg/tiempo-de-planeacion.svg' },
  { label: 'Número de invitados',      detail: 'Desde íntimas reuniones hasta grandes celebraciones',     icon: '/images/necesidad-svg/numero-de-invitados.svg' },
  { label: 'Número de eventos',        detail: 'Ceremonia, recepción, pre-boda y mucho más',              icon: '/images/necesidad-svg/numero-de-eventos.svg' },
  { label: 'Producción del evento',    detail: 'Decoración, flores, iluminación y ambiente',              icon: '/images/necesidad-svg/produccion-de-evento.svg' },
  { label: 'Presupuesto disponible',   detail: 'Soluciones elegantes para cada inversión',                icon: '/images/necesidad-svg/presupuesto-disponible.svg' },
  { label: 'Ubicación del evento',     detail: 'Locales en toda la república y destinos internacionales', icon: '/images/necesidad-svg/ubicacion-de-evento.svg' },
  { label: 'Nivel de personalización', detail: 'Cada detalle diseñado para reflejar tu historia',         icon: '/images/necesidad-svg/nivel-de-personalizacion.svg' },
  { label: 'Logística y transporte',   detail: 'Coordinación total de proveedores y traslados',           icon: '/images/necesidad-svg/logistica-y-transporte.svg' },
]

const GAP     = 24   // px between cards
const DESKTOP = 768  // breakpoint

// ─── CTA variants (reused from hero) ─────────────────────────────────────────
const ctaLetters = 'HABLA CON NOSOTROS'.split('')
const ctaWrap  = { rest: { transition: { staggerChildren: 0.04,  staggerDirection: -1 as const } }, hover: { transition: { staggerChildren: 0.045, delayChildren: 0.02 } } }
const ctaCont  = { rest: { transition: { staggerChildren: 0.045, staggerDirection: -1 as const } }, hover: { transition: { staggerChildren: 0.045 } } }
const ctaLtr   = { rest: { y: 0 }, hover: { y: -4 } }
const ctaArrow = { rest: { x: 0 }, hover: { x: 6 } }
const ctaTB    = { rest: { scaleX: 0, opacity: 0.95 }, hover: { scaleX: 1, opacity: 1 } }
const ctaLR    = { rest: { scaleY: 0, opacity: 0.95 }, hover: { scaleY: 1, opacity: 1 } }
const ease     = [0.25, 0.46, 0.45, 0.94] as const

// ─── Component ────────────────────────────────────────────────────────────────
export default function Necesidades() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const [perView,    setPerView]    = useState(3)
  const [cardWidth,  setCardWidth]  = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const x = useMotionValue(0)

  const maxIndex = items.length - perView

  // Measure container and set per-view count on mount + resize
  useEffect(() => {
    const measure = () => {
      const pv = window.innerWidth >= DESKTOP ? 3 : 1
      setPerView(pv)
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth
        setCardWidth((w - GAP * (pv - 1)) / pv)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Animate track to a given index
  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, items.length - perView))
    setActiveIndex(clamped)
    animate(x, -(clamped * (cardWidth + GAP)), {
      type: 'spring', stiffness: 280, damping: 32,
    })
  }, [x, cardWidth, perView])

  // Snap on drag end
  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number } }) => {
    const threshold = cardWidth * 0.25
    if      (info.offset.x < -threshold) goTo(activeIndex + 1)
    else if (info.offset.x >  threshold) goTo(activeIndex - 1)
    else                                  goTo(activeIndex)
  }, [activeIndex, goTo, cardWidth])

  return (
    <section className="bg-white w-full overflow-hidden px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-28 sm:pt-32 lg:pt-40 xl:pt-44 pb-20 sm:pb-24 lg:pb-28">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mb-3"
      >
        <h2
          className="font-romans leading-[1.05] text-secondary"
          style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)' }}
        >
          NOS ADAPTAMOS <span style={{ opacity: 0.5 }}>A TU NECESIDAD</span>
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="font-geologica text-secondary/50 tracking-[0.22em] uppercase mb-6 sm:mb-8"
        style={{ fontSize: 'clamp(1.2rem, 1rem + 1.5vw, 1.5rem)' }}
      >
        Evaluamos tu evento de acuerdo a...
      </motion.p>

      {/* ── Arrows, slider, dots + CTA (aligned) ───────────────────────────── */}
      <div className="w-full max-w-full">
        <div className="flex justify-end items-center gap-2 sm:gap-3 mb-4">
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Anterior"
            className="flex items-center justify-center text-black hover:text-primary transition-colors duration-200 disabled:opacity-25 disabled:pointer-events-none p-2 -m-2"
          >
            <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12l6-6M5 12l6 6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === maxIndex}
            aria-label="Siguiente"
            className="flex items-center justify-center text-black hover:text-primary transition-colors duration-200 disabled:opacity-25 disabled:pointer-events-none p-2 -m-2"
          >
            <svg className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M19 12l-6-6M19 12l-6 6" />
            </svg>
          </button>
        </div>

        {/* Slider */}
        <div ref={containerRef} className="relative overflow-hidden w-full">
          <motion.div
            className="flex"
            style={{ x, gap: GAP, cursor: 'grab' }}
            drag="x"
            dragConstraints={{ left: -(maxIndex * (cardWidth + GAP)), right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: 'grabbing' }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="necesidad-card shrink-0 select-none"
                style={{ width: cardWidth || `calc((100% - ${GAP * (perView - 1)}px) / ${perView})` }}
              >
                <div className="necesidad-card-icon">
                  <Image src={item.icon} alt={item.label} width={80} height={80} className="w-full h-full object-contain" />
                </div>
                <span className="necesidad-card-label">{item.label}</span>
                <span className="necesidad-card-detail">{item.detail}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots + CTA */}
        <div className="flex items-center justify-between mt-8 sm:mt-10 w-full">

        {/* Dots */}
        <div className="flex items-center gap-2.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a slide ${i + 1}`}
              className="transition-all duration-400 rounded-full"
              style={{
                width:      activeIndex === i ? '1.8rem' : '0.45rem',
                height:     '0.45rem',
                background: activeIndex === i ? 'var(--primary)' : 'rgba(30,30,30,0.2)',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="hidden sm:block">
          <Link href="/contacto" className="hero-cta-link inline-flex items-center group/cta">
            <motion.span
              className="inline-flex items-center font-geologica uppercase text-sm tracking-[0.25em] text-secondary"
              variants={ctaWrap} initial="rest" animate="rest" whileHover="hover"
            >
              <motion.span
                className="relative inline-flex py-3 px-5 border-b border-secondary/30 group-hover/cta:border-primary/70 transition-colors duration-300"
                variants={ctaCont}
              >
                <motion.span className="absolute top-0 left-0 right-0 h-px bg-secondary/60 group-hover/cta:bg-primary" variants={ctaTB} transition={{ duration: 0.28, ease }} style={{ transformOrigin: 'left' }} />
                <motion.span className="absolute top-0 right-0 bottom-0 w-px bg-secondary/60 group-hover/cta:bg-primary" variants={ctaLR}  transition={{ duration: 0.28, ease }} style={{ transformOrigin: 'top' }} />
                <motion.span className="absolute bottom-0 left-0 right-0 h-px bg-secondary/60 group-hover/cta:bg-primary" variants={ctaTB} transition={{ duration: 0.28, ease }} style={{ transformOrigin: 'right' }} />
                <motion.span className="absolute top-0 left-0 bottom-0 w-px bg-secondary/60 group-hover/cta:bg-primary" variants={ctaLR}  transition={{ duration: 0.28, ease }} style={{ transformOrigin: 'bottom' }} />
                <span className="relative z-10">
                  {ctaLetters.map((char, i) => (
                    <motion.span key={i} className="inline-block" variants={ctaLtr} transition={{ duration: 0.3, ease }}>
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </span>
              </motion.span>
              <motion.span className="ml-5" variants={ctaArrow} transition={{ duration: 0.3, ease }}>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.span>
            </motion.span>
          </Link>
        </div>
      </div>
      </div>

      {/* CTA mobile */}
      <div className="sm:hidden mt-6">
        <Link href="/contacto" className="font-geologica uppercase text-xs tracking-[0.25em] text-secondary border-b border-secondary/30 pb-1">
          HABLA CON NOSOTROS
        </Link>
      </div>

    </section>
  )
}
