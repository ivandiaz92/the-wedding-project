'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getPublicPath } from './utils/paths'
import Navbar from './components/layout/Navbar'
import Formula from './components/sections/Formula'
import Services from './components/sections/Services'
import Necesidades from './components/sections/Necesidades'
import NumberCounter from './components/NumberCounter'
import Team from './components/sections/Team'
import Link from 'next/link'

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroScale = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 1.2, 1])
  const heroOpacity = useTransform(scrollYProgress, [0.7, 0.95], [1, 0.4])

  // Title scroll-out: lift, fade, shrink, soft blur (visible but still elegant)
  const titleY = useTransform(scrollYProgress, [0, 0.3, 0.85], [0, 0, -56])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4, 0.88], [1, 1, 0])
  const titleScale = useTransform(scrollYProgress, [0, 0.4, 0.88], [1, 1, 0.92])
  const titleBlur = useTransform(scrollYProgress, [0.45, 0.85], [0, 4])
  const titleFilter = useTransform(titleBlur, (v) => `blur(${v}px)`)

  const heroEntrance = {
    initial: { opacity: 0, y: 32, scale: 0.96, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    transition: (delay: number) => ({
      duration: 1,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    }),
  }

  const ctaLetters = 'COTIZA TU BODA'.split('')
  const ctaWrapperVariants = {
    rest: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
    hover: { transition: { staggerChildren: 0.045, delayChildren: 0.02 } },
  }
  const ctaLetterContainerVariants = {
    rest: { transition: { staggerChildren: 0.045, staggerDirection: -1 } },
    hover: { transition: { staggerChildren: 0.045 } },
  }
  const ctaLetterVariants = {
    rest: { y: 0 },
    hover: { y: -4 },
  }
  const ctaArrowVariants = {
    rest: { x: 0 },
    hover: { x: 6 },
  }
  const ctaFrameTopBottom = {
    rest: { scaleX: 0, opacity: 0.95 },
    hover: { scaleX: 1, opacity: 1 },
  }
  const ctaFrameLeftRight = {
    rest: { scaleY: 0, opacity: 0.95 },
    hover: { scaleY: 1, opacity: 1 },
  }

  return (
    <main className="min-h-screen bg-white relative w-full min-w-0 max-w-[100vw]">
      <Navbar />
      
      {/* Hero Section — scroll zooms image in, then back out as you leave */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        {/* Background in its own layer so overflow-hidden only clips the zoom, not the title */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 origin-center"
            style={{ scale: heroScale, opacity: heroOpacity }}
          >
            <Image
              src={getPublicPath('/images/hero-image.png')}
              alt="Wedding venue"
              fill
              className="object-cover brightness-90"
              priority
              quality={100}
              sizes="100vw"
            />
          </motion.div>
        </div>

        <div className="w-full min-w-0 max-w-[100vw] container mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-center min-h-full overflow-visible">
          <motion.div
            className="text-center"
            style={{
              y: titleY,
              opacity: titleOpacity,
              scale: titleScale,
              filter: titleFilter,
            }}
          >
            <h1 className="mb-6">
              {/* First line: WE CREATE & DESIGN — only DESIGN in honya */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                <motion.span
                  {...heroEntrance}
                  transition={heroEntrance.transition(0)}
                  className="font-romans text-white text-4xl sm:text-[3.5rem] md:text-[4rem] lg:text-[6.25rem] leading-[1.1] block sm:inline-block"
                >
                  WE
                </motion.span>
                <span className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3">
                  <motion.span
                    {...heroEntrance}
                    transition={heroEntrance.transition(0.12)}
                    className="font-romans text-primary text-4xl sm:text-[3.5rem] md:text-[4rem] lg:text-[6.25rem] leading-[1.1] whitespace-nowrap"
                  >
                    CREATE
                  </motion.span>
                  <motion.span
                    {...heroEntrance}
                    transition={heroEntrance.transition(0.2)}
                    className="font-romans text-primary text-4xl sm:text-[3.5rem] md:text-[4rem] lg:text-[6.25rem] leading-[1.1]"
                  >
                    &amp;
                  </motion.span>
                  <motion.span
                    {...heroEntrance}
                    transition={heroEntrance.transition(0.28)}
                    className="font-serif-italic text-primary text-4xl sm:text-[3.5rem] md:text-[4rem] lg:text-[6.25rem] leading-[1.1] italic whitespace-nowrap"
                  >
                    DESIGN
                  </motion.span>
                </span>
              </div>

              {/* Second line: MEMORABLE WEDDINGS (romans) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <motion.span
                  {...heroEntrance}
                  transition={heroEntrance.transition(0.4)}
                  className="font-romans text-white text-4xl sm:text-[3.5rem] md:text-[4rem] lg:text-[6.25rem] leading-[1.1] whitespace-nowrap"
                >
                  MEMORABLE
                </motion.span>
                <motion.span
                  {...heroEntrance}
                  transition={heroEntrance.transition(0.52)}
                  className="font-romans text-primary text-4xl sm:text-[3.5rem] md:text-[4rem] lg:text-[6.25rem] leading-[1.1] whitespace-nowrap"
                >
                  WEDDINGS
                </motion.span>
              </div>
            </h1>

            {/* CTA Button — aristocratic letter lift on hover */}
            <motion.div
              {...heroEntrance}
              transition={heroEntrance.transition(0.72)}
              className="mt-8 sm:mt-12"
            >
              <Link href="/contacto" className="hero-cta-link inline-flex items-center group/cta">
                <motion.span
                  className="inline-flex items-center font-geologica uppercase text-base sm:text-lg tracking-[0.25em] text-white"
                  variants={ctaWrapperVariants}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                >
                  <motion.span
                    className="relative inline-flex py-3 px-5 border-b border-white/50 group-hover/cta:border-primary/70 transition-colors duration-300"
                    variants={ctaLetterContainerVariants}
                  >
                    {/* Frame lines — draw in on hover (top → right → bottom → left), reverse on unhover */}
                    <motion.span
                      className="absolute top-0 left-0 right-0 h-px bg-white group-hover/cta:bg-primary"
                      variants={ctaFrameTopBottom}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ transformOrigin: 'left' }}
                    />
                    <motion.span
                      className="absolute top-0 right-0 bottom-0 w-px bg-white group-hover/cta:bg-primary"
                      variants={ctaFrameLeftRight}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ transformOrigin: 'top' }}
                    />
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-px bg-white group-hover/cta:bg-primary"
                      variants={ctaFrameTopBottom}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ transformOrigin: 'right' }}
                    />
                    <motion.span
                      className="absolute top-0 left-0 bottom-0 w-px bg-white group-hover/cta:bg-primary"
                      variants={ctaFrameLeftRight}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ transformOrigin: 'bottom' }}
                    />
                    <span className="relative z-10">
                      {ctaLetters.map((char, i) => (
                        <motion.span
                          key={i}
                          className="inline-block"
                          variants={ctaLetterVariants}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                    </span>
                  </motion.span>
                  <motion.span
                    className="hidden sm:ml-6 sm:block"
                    variants={ctaArrowVariants}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.span>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Formula />

      {/* Numbers Section */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image
          src={getPublicPath('/images/numbers-banner.png')}
          alt="Wedding Numbers"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 w-full max-w-[100vw] container mx-auto px-4 sm:px-6 h-full min-h-[50vh] flex items-center py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-24 w-full max-w-full">
            <div className="text-center min-w-0 px-1 sm:px-2">
              <NumberCounter
                end={300}
                prefix="+"
                className="font-romans text-white text-4xl sm:text-5xl lg:text-8xl mb-2 sm:mb-4"
              />
              <p className="font-geologica text-white/80 text-[0.65rem] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase break-words">
                BODAS Y EVENTOS
              </p>
            </div>
            <div className="text-center min-w-0 px-1 sm:px-2">
              <NumberCounter
                end={7}
                prefix="+"
                className="font-romans text-white text-4xl sm:text-5xl lg:text-8xl mb-2 sm:mb-4"
              />
              <p className="font-geologica text-white/80 text-[0.65rem] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase break-words">
                AÑOS<br />DE EXPERIENCIA
              </p>
            </div>
            <div className="text-center min-w-0 px-1 sm:px-2 col-span-2 lg:col-span-1">
              <NumberCounter
                end={250}
                prefix="+"
                className="font-romans text-white text-4xl sm:text-5xl lg:text-8xl mb-2 sm:mb-4"
              />
              <p className="font-geologica text-white/80 text-[0.65rem] sm:text-xs lg:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase break-words">
                CERTIFICADOS A NIVEL<br className="hidden sm:block" /> NACIONAL E INTERNACIONAL
              </p>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Necesidades />
      <Team />
    </main>
  );
}
