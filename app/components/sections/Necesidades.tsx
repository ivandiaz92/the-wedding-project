'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Necesidades() {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  }

  const container = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const breathe = {
    animate: {
      scale: [1, 1.4, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  }

  const items = [
    'Tiempo de planeación',
    'Número de invitados',
    'Número de eventos',
    'Producción del evento',
    'Presupuesto disponible',
    'Ubicación del evento',
    'Nivel de personalización',
    'Logística y transporte'
  ]

  return (
    <section className="h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative h-[40vh] lg:h-full">
        <Image
          src="/images/necesidad.png"
          alt="Wedding Planning"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="bg-[#1C1C1C] px-6 sm:px-12 lg:px-20 xl:px-24 2xl:px-32 py-12 lg:py-0 flex items-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={container}
          className="w-full max-w-xl mx-auto lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl lg:py-16 xl:py-20"
        >
          <motion.div variants={fadeInUp} className="mb-8 lg:mb-12 xl:mb-16">
            <h2 className="font-romans text-white text-[2.5rem] lg:text-[3.5rem] xl:text-[4rem] 2xl:text-[4.5rem] leading-[1.1] tracking-wide mb-2">
              NOS ADAPTAMOS
            </h2>
            <p className="font-honya italic text-primary text-[2.25rem] lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.25rem] leading-[1.1]">
              A TU NECESIDAD
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-8 lg:space-y-10 xl:space-y-12">
            <p className="font-geologica text-white/90 text-base lg:text-lg xl:text-xl tracking-wide">
              EVALUAMOS TU EVENTO DE ACUERDO A...
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-4 lg:gap-y-5 xl:gap-y-6 sm:gap-x-6 lg:gap-x-8 xl:gap-x-12">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center space-x-3 xl:space-x-4"
                >
                  <motion.div 
                    className="relative w-2.5 h-2.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 flex-shrink-0"
                    variants={breathe}
                  >
                    <span className="absolute inset-0 bg-primary/20 rotate-45"></span>
                    <span className="absolute inset-0 bg-primary/20 -rotate-45"></span>
                    <span className="absolute inset-[1.5px] lg:inset-[2px] xl:inset-[2.5px] bg-primary rotate-45"></span>
                    <span className="absolute inset-[1.5px] lg:inset-[2px] xl:inset-[2.5px] bg-primary -rotate-45"></span>
                  </motion.div>
                  <span className="font-geologica text-white/70 text-xs lg:text-sm xl:text-base 2xl:text-lg tracking-wider">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 lg:mt-10 xl:mt-12">
            <Link 
              href="#contact"
              className="wave-button-wrapper inline-flex items-center group/btn"
            >
              <span className="relative flex items-center font-geologica uppercase text-sm lg:text-base xl:text-lg tracking-[0.25em] text-white">
                <span className="wave-text-inner relative inline-flex overflow-hidden">
                  <span className="wave-text-front relative z-10 transform translate-y-0 group-hover/btn:-translate-y-full transition-transform duration-500">
                    HABLA CON NOSOTROS
                  </span>
                  <span className="wave-text-back absolute inset-0 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500">
                    HABLA CON NOSOTROS
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-white group-hover/btn:bg-primary transition-colors"></span>
                </span>
                <span className="wave-arrow-wrapper ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 transform translate-y-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 