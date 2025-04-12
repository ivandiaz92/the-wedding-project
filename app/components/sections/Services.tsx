'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cormorant } from 'next/font/google'

const cormorant = Cormorant({ 
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const services = [
  {
    title: "COORDINACIÓN",
    subtitle: "DÍA DE LA BODA",
    description: "SOLO EL DÍA DEL EVENTO",
    image: "/images/coordinacion-pic.png"
  },
  {
    title: "PLANEACIÓN",
    subtitle: "DE LA BODA",
    description: "MESES ANTES DE LA BODA",
    image: "/images/planeacion-pic.png"
  },
  {
    title: "ASESORÍA",
    subtitle: "PARA TU BODA",
    description: "SESIONES UNITARIAS DE APOYO, CREATIVAS Y/O PLANEACIÓN",
    image: "/images/asesoria-pic.png"
  },
  {
    title: "CERTIFICACIÓN",
    subtitle: "WEDDING PLANNER",
    description: "PRÓXIMAMENTE",
    image: "/images/coordinacion-pic.png"
  }
];

export default function Services() {
  return (
    <section className="relative bg-[url('/images/formula-bg.png')] bg-cover h-screen">
      <div className="h-full pt-12 pb-12">
        <div className="mb-4 px-12 max-w-[90%] mx-auto">
          <p className="font-honya italic text-primary/80 text-[2.5rem] tracking-wider mb-1">
            DREAM WEDDINGS ONLY
          </p>
          <h2 className="font-romans text-[4.5rem] leading-none text-secondary">
            NUESTROS SERVICIOS
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 px-12 max-w-[90%] mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-[35vh]"
            >
              <div className="group relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className={`${cormorant.className} text-white text-4xl mb-1`}>
                      {service.title}
                      <br />
                      {service.subtitle}
                    </h3>
                    <p className="font-geologica text-white/80 text-sm tracking-[0.2em] mt-2 mb-4">
                      {service.description}
                    </p>
                    <div className="overflow-hidden h-0 group-hover:h-[44px] transition-all duration-500 ease-in-out">
                      <Link 
                        href="/contact"
                        className="wave-button-wrapper inline-flex items-center group/btn mt-2"
                      >
                        <span className="relative flex items-center font-geologica uppercase text-sm tracking-[0.25em] text-white">
                          <span className="wave-text-inner relative">
                            COTIZA TU BODA
                            <span className="absolute -bottom-2 left-0 w-full h-px bg-white group-hover/btn:bg-primary transition-colors"></span>
                          </span>
                          <span className="wave-arrow-wrapper ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform translate-y-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 