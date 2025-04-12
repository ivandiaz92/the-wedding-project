'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Formula from './components/sections/Formula'
import Services from './components/sections/Services'
import Necesidades from './components/sections/Necesidades'
import NumberCounter from './components/NumberCounter'

export default function Home() {
  const buttonText = "Cotiza tu boda".split('').map((char, i) => (
    <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char === ' ' ? '\u00A0' : char}</span>
  ));

  // Typing animation for words
  const createTypingText = "CREATE".split('').map((char, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay: 0.3 + (i * 0.1),
        type: "spring",
        stiffness: 200
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  ));

  const designTypingText = "DESIGN".split('').map((char, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay: 0.9 + (i * 0.1),
        type: "spring",
        stiffness: 200
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  ));

  const weddingsText = "WEDDINGS".split('').map((char, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay: 1.8 + (i * 0.1),
        type: "spring",
        stiffness: 200
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  ));

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero-image.png"
          alt="Wedding venue"
          fill
          className="object-cover brightness-90"
          priority
          quality={100}
          sizes="100vw"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="mb-6">
              <div className="flex items-center justify-center text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[6.25rem] leading-[1.02] mb-1">
                <motion.span 
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-romans text-white"
                >
                  WE
                </motion.span>
                <motion.span 
                  className="font-honya text-primary mx-2 sm:mx-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {createTypingText}
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ 
                    duration: 1.2,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="font-romans text-white"
                >
                  &
                </motion.span>
                <motion.span 
                  className="font-honya text-primary ml-2 sm:ml-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {designTypingText}
                </motion.span>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="text-[3rem] sm:text-[4rem] md:text-[4.5rem] lg:text-[6.25rem] leading-[1.02] font-romans text-white"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.7,
                    ease: "easeOut"
                  }}
                >
                  MEMORABLE{' '}
                </motion.span>
                <motion.span 
                  className="font-honya text-primary relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {weddingsText}
                </motion.span>
              </motion.div>
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="wave-button-wrapper mt-16 inline-flex items-center group"
            >
              <span className="relative flex items-center font-geologica uppercase text-lg sm:text-xl tracking-[0.25em] text-white">
                <span className="wave-text-inner">
                  {buttonText}
                </span>
                <span className="wave-arrow-wrapper ml-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 transform translate-y-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      <Formula />

      {/* Numbers Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/numbers-banner.png"
          alt="Wedding Numbers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 w-full">
            <div className="text-center">
              <NumberCounter
                end={300}
                prefix="+"
                className="font-romans text-white text-6xl lg:text-8xl mb-4"
              />
              <p className="font-geologica text-white/80 text-sm tracking-[0.2em] uppercase">
                BODAS Y EVENTOS
              </p>
            </div>
            <div className="text-center">
              <NumberCounter
                end={7}
                prefix="+"
                className="font-romans text-white text-6xl lg:text-8xl mb-4"
              />
              <p className="font-geologica text-white/80 text-sm tracking-[0.2em] uppercase">
                AÑOS<br />DE EXPERIENCIA
              </p>
            </div>
            <div className="text-center">
              <NumberCounter
                end={250}
                prefix="+"
                className="font-romans text-white text-6xl lg:text-8xl mb-4"
              />
              <p className="font-geologica text-white/80 text-sm tracking-[0.2em] uppercase">
                CERTIFICADOS A NIVEL<br />NACIONAL E INTERNACIONAL
              </p>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Necesidades />
    </main>
  )
}
