'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getPublicPath } from '../../utils/paths'

// ─── Data ──────────────────────────────────────────────────────────────────────
const services = [
  {
    title: 'COORDINACIÓN',
    subtitle: 'DÍA DE LA BODA',
    tag: 'SOLO EL DÍA DEL EVENTO',
    description:
      'Tu gran día merece atención absoluta. Nuestro equipo estará presente desde las primeras horas hasta el último baile, asegurando que cada momento fluya perfectamente según el plan. Tú solo disfruta — nosotros nos encargamos del resto.',
    image: '/images/coordinacion-pic.png',
    cta: 'COTIZA TU BODA',
  },
  {
    title: 'PLANEACIÓN',
    subtitle: 'DE LA BODA',
    tag: 'MESES ANTES DE LA BODA',
    description:
      'Diseñamos contigo la boda de tus sueños desde el primer detalle hasta el último. Trabajamos meses antes de tu fecha para que cada decisión sea tomada con tiempo, creatividad y total tranquilidad. Cada elemento elegido con intención.',
    image: '/images/planeacion-pic.png',
    cta: 'COTIZA TU BODA',
  },
  {
    title: 'ASESORÍA',
    subtitle: 'PARA TU BODA',
    tag: 'SESIONES UNITARIAS DE APOYO',
    description:
      '¿Necesitas orientación en una etapa específica de tu planeación? Nuestras sesiones de asesoría están diseñadas para darte claridad, ideas y dirección exactamente donde más lo necesitas, respetando tu visión y tu presupuesto.',
    image: '/images/asesoria-pic.png',
    cta: 'RESERVA TU SESIÓN',
  },
  {
    title: 'CERTIFICACIÓN',
    subtitle: 'WEDDING PLANNER',
    tag: 'PRÓXIMAMENTE',
    description:
      'Forma parte de nuestra comunidad de wedding planners certificados. Un programa completo diseñado por profesionales con años de experiencia en la industria, para quienes desean transformar su pasión en una carrera de alto nivel.',
    image: '/images/coordinacion-pic.png',
    cta: 'ÚNETE A LA LISTA DE ESPERA',
  },
]

// Marquee content — doubled for seamless loop
const MARQUEE_SEGMENT = (
  <>
    {Array(6).fill(null).map((_, i) => (
      <React.Fragment key={i}>
        <span
          className="font-serif-italic italic text-primary/80 shrink-0 uppercase"
          style={{ fontSize: 'clamp(3.5rem, 9.5vw, 12rem)', letterSpacing: '0.06em' }}
        >
          Dream Weddings Only
        </span>
        <span
          className="text-secondary/25 shrink-0"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 4.5rem)', margin: '0 clamp(2rem, 4vw, 5rem)' }}
        >
          ✦
        </span>
      </React.Fragment>
    ))}
  </>
)

// ─── Component ────────────────────────────────────────────────────────────────
export default function Services() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Track which service block is in the viewport center
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((ref, i) => {
      if (!ref) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { rootMargin: '-38% 0px -38% 0px', threshold: 0 }
      )
      obs.observe(ref)
      observers.push(obs)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  return (
    <>
      {/* ── Marquee ───────────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-t border-secondary/12 bg-white" style={{ padding: 'clamp(2.5rem, 5vw, 4.5rem) 0' }}>
        <div
          className="flex whitespace-nowrap"
          style={{ animation: 'services-marquee 5s linear infinite' }}
        >
          {/* Two identical segments — second is aria-hidden for seamless loop */}
          <div className="flex items-center shrink-0">{MARQUEE_SEGMENT}</div>
          <div className="flex items-center shrink-0" aria-hidden="true">{MARQUEE_SEGMENT}</div>
        </div>
      </div>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section className="bg-white">

        {/* ── DESKTOP: sticky split ─────────────────────────────────────── */}
        <div className="hidden md:flex">

          {/* Left: scrollable content */}
          <div className="w-[52%] xl:w-[55%]">

            {/* Service items */}
            {services.map((service, i) => (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el }}
                className={`min-h-screen flex flex-col justify-center ${i > 0 ? 'border-t border-secondary/10' : ''}`}
                style={{ padding: 'clamp(4rem, 7vw, 7rem) clamp(3rem, 7vw, 6rem)' }}
              >
                <span
                  className="font-geologica text-primary/80 uppercase block"
                  style={{ fontSize: 'clamp(0.65rem, 0.85vw, 0.8rem)', letterSpacing: '0.35em', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}
                >
                  {service.tag}
                </span>

                <h3
                  className="font-romans leading-[1.05] text-secondary"
                  style={{ fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}
                >
                  {service.title}<br />
                  <span style={{ opacity: 0.5 }}>{service.subtitle}</span>
                </h3>

                <div className="bg-primary/40" style={{ width: '2.5rem', height: '1px', marginBottom: 'clamp(1.2rem, 2.5vw, 2rem)' }} />

                <p
                  className="font-geologica text-secondary/65 leading-[1.9]"
                  style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.15rem)', maxWidth: '32rem', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {service.description}
                </p>

                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-4 font-geologica uppercase text-secondary self-start group/cta"
                  style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', letterSpacing: '0.3em' }}
                >
                  <span className="border-b border-secondary/25 pb-1 group-hover/cta:border-primary group-hover/cta:text-primary transition-colors duration-300">
                    {service.cta}
                  </span>
                  <svg
                    className="text-primary group-hover/cta:translate-x-1.5 transition-transform duration-300"
                    style={{ width: 'clamp(1rem, 1.2vw, 1.2rem)', height: 'clamp(1rem, 1.2vw, 1.2rem)' }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Right: sticky image panel */}
          <div className="w-[48%] xl:w-[45%] sticky top-0 h-screen overflow-hidden">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ opacity: i === 0 ? 1 : 0 }}
                animate={{ opacity: activeIndex === i ? 1 : 0 }}
                transition={{ duration: 0.85, ease: 'easeInOut' }}
              >
                <Image
                  src={getPublicPath(service.image)}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority={i === 0}
                />
              </motion.div>
            ))}

            {/* Vertical progress dots */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
              {services.map((_, i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-full transition-all duration-500 bg-white"
                  style={{
                    height: activeIndex === i ? '2rem' : '0.4rem',
                    opacity: activeIndex === i ? 1 : 0.35,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE: stacked layout ────────────────────────────────────── */}
        <div className="md:hidden">

          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <div className="relative w-full" style={{ paddingBottom: '62%' }}>
                <Image
                  src={getPublicPath(service.image)}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Text */}
              <div className="px-7 py-12 border-b border-secondary/10">
                <span className="font-geologica text-[0.65rem] tracking-[0.35em] text-primary/80 uppercase mb-5 block">
                  {service.tag}
                </span>
                <h3 className="font-romans text-[2.6rem] leading-[1.05] text-secondary mb-5">
                  {service.title}<br />
                  <span className="text-secondary/50">{service.subtitle}</span>
                </h3>
                <div className="w-8 h-px bg-primary/40 mb-5" />
                <p className="font-geologica text-secondary/65 text-base leading-[1.85] mb-9">
                  {service.description}
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-3 font-geologica text-[0.7rem] tracking-[0.3em] uppercase text-secondary border-b border-secondary/25 pb-1"
                >
                  {service.cta}
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
