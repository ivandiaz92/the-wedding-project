'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValueEvent,
} from 'framer-motion'

// ─── Scene data ───────────────────────────────────────────────────────────────
const SCENES = [
  {
    image: '/images/perfect-formula1.jpg',
    text: 'Combinamos todos los elementos clave para crear experiencias inolvidables.',
    className: 'absolute bottom-[10%] left-[6%] sm:left-[8%] max-w-[22rem] sm:max-w-xl lg:max-w-3xl',
    align: 'left' as const,
    ruleAlign: '',
  },
  {
    image: '/images/perfect-formula2.jpg',
    text: 'Expertos en comunicación personal y transmitir emociones a través de cada sentido.',
    className: 'absolute top-[10%] right-[6%] sm:right-[8%] max-w-[22rem] sm:max-w-xl lg:max-w-3xl text-right',
    align: 'right' as const,
    ruleAlign: 'ml-auto',
  },
  {
    image: '/images/perfect-formula3.jpg',
    text: 'Comprometidos con un nivel de personalización minuciosa y atención de excelencia.',
    className: 'absolute bottom-[10%] left-1/2 -translate-x-1/2 w-full max-w-[22rem] sm:max-w-2xl lg:max-w-5xl text-center px-6',
    align: 'center' as const,
    ruleAlign: 'mx-auto',
  },
]

// ease-out-expo — decisive start, long graceful deceleration
const EXPO_OUT = [0.16, 1, 0.3, 1]  as const
// ease-in-quart — slow drift that builds into acceleration (for exits)
const QUART_IN = [0.5,  0, 0.75, 0] as const

// ─── CTA variants ─────────────────────────────────────────────────────────────
const ctaLetters     = 'CONTÁCTANOS'.split('')
const ctaWrapperV    = { rest: { transition: { staggerChildren: 0.04, staggerDirection: -1 as const } }, hover: { transition: { staggerChildren: 0.045, delayChildren: 0.02 } } }
const ctaLetterContV = { rest: { transition: { staggerChildren: 0.045, staggerDirection: -1 as const } }, hover: { transition: { staggerChildren: 0.045 } } }
const ctaLetterV     = { rest: { y: 0 }, hover: { y: -4 } }
const ctaArrowV      = { rest: { x: 0 }, hover: { x: 6 } }
const ctaFrameTB     = { rest: { scaleX: 0, opacity: 0.95 }, hover: { scaleX: 1, opacity: 1 } }
const ctaFrameLR     = { rest: { scaleY: 0, opacity: 0.95 }, hover: { scaleY: 1, opacity: 1 } }
const ease           = [0.25, 0.46, 0.45, 0.94] as const

// ─── Main component ───────────────────────────────────────────────────────────
export default function Formula() {
  const sectionRef = useRef<HTMLElement>(null)
  const [titleEntered, setTitleEntered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0 && !titleEntered) setTitleEntered(true)
  })

  // ── Title: scroll-driven morph, large+centered → small+top-left ──────────
  // titleProgress maps the first 10% of scroll (≈20vh) to 0→1
  const titleProgress = useTransform(scrollYProgress, [0, 0.10], [0, 1])
  // top/left: 50% (center) → 3% (corner)
  const titleTop  = useTransform(titleProgress, v => `${(50 - v * 47).toFixed(2)}%`)
  const titleLeft = useTransform(titleProgress, v => `${(50 - v * 47).toFixed(2)}%`)
  // x/y: remove centering offset as element reaches corner
  const titleX    = useTransform(titleProgress, v => `${(-50 + v * 50).toFixed(2)}%`)
  const titleY    = useTransform(titleProgress, v => `${(-50 + v * 50).toFixed(2)}%`)
  // font-size: clamp(6.8vw, 5.5rem) → clamp(1.9vw, 1.8rem)
  const titleFS   = useTransform(titleProgress, v =>
    `clamp(1.1rem, ${(6.8 - v * 4.9).toFixed(2)}vw, ${(5.5 - v * 3.7).toFixed(2)}rem)`
  )
  // letter-spacing: wide → tight
  const titleLS   = useTransform(titleProgress, v => `${(0.44 - v * 0.16).toFixed(3)}em`)
  // dims slightly once settled so it doesn't compete with scene texts
  const titleOp   = useTransform(scrollYProgress, [0.10, 0.16], [1, 0.55])

  // ── Background crossfades (200vh total) ───────────────────────────────────
  // bg1: fade-in 0→0.03 | peak 0.03→0.30 | crossfade-out 0.30→0.44
  // bg2: crossfade-in 0.30→0.44 | peak 0.44→0.62 | crossfade-out 0.62→0.76
  // bg3: crossfade-in 0.62→0.76 | peak 0.76→0.93 | lingers to end
  const bg1Opacity = useTransform(scrollYProgress, [0,    0.03, 0.30, 0.44], [0, 1, 1, 0])
  const bg2Opacity = useTransform(scrollYProgress, [0.30, 0.44, 0.62, 0.76], [0, 1, 1, 0])
  const bg3Opacity = useTransform(scrollYProgress, [0.62, 0.76, 0.93, 1.0],  [0, 1, 1, 1])

  const bg1Scale = useTransform(scrollYProgress, [0,    0.44], [1.015, 1.0])
  const bg2Scale = useTransform(scrollYProgress, [0.30, 0.76], [1.015, 1.0])
  const bg3Scale = useTransform(scrollYProgress, [0.62, 1.0],  [1.015, 1.0])

  return (
    <>
      {/* 500 vh total — each scene gets ~150vh of reading time */}
      <section ref={sectionRef} className="relative" style={{ height: '500vh' }}>

        {/* bg-black prevents white flash before first image fades in */}
        <div className="sticky top-0 h-screen overflow-hidden bg-black">

          {/* ── Background image layers ─────────────────────────────────── */}
          {[bg1Opacity, bg2Opacity, bg3Opacity].map((opacity, i) => {
            const scale = [bg1Scale, bg2Scale, bg3Scale][i]
            return (
              <motion.div
                key={i}
                className="absolute inset-0 will-change-[opacity,transform]"
                style={{ opacity, scale }}
              >
                <Image
                  src={SCENES[i].image}
                  alt=""
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="100vw"
                />
                <div className={`absolute inset-0 ${i === 2 ? 'bg-black/50' : 'bg-black/36'}`} />
              </motion.div>
            )
          })}

          {/* ── Title ──────────────────────────────────────────────────────
               Outer: fades in the moment the section pins (titleEntered).
               Inner: scroll-driven — position, size & spacing all derived
               from titleProgress so the whole morph is one continuous motion. */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={titleEntered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, ease: EXPO_OUT }}
          >
            <motion.div
              className="absolute"
              style={{ top: titleTop, left: titleLeft, x: titleX, y: titleY, opacity: titleOp }}
            >
              <motion.p
                className="font-romans uppercase text-white whitespace-nowrap"
                style={{
                  fontSize: titleFS,
                  letterSpacing: titleLS,
                  textShadow: '0 2px 32px rgba(0,0,0,0.6)',
                }}
              >
                The Perfect Formula
              </motion.p>
            </motion.div>
          </motion.div>

          {/* ── Scene texts — each exits BEFORE its background crossfades ── */}

          {/* Scene 1 — lower-left  | bg peak 0.03–0.30 | text in at 0.04, out at 0.28 */}
          <SceneText
            scene={SCENES[0]}
            scrollYProgress={scrollYProgress}
            inStart={0.04}
            outStart={0.28}
          />

          {/* Scene 2 — upper-right | bg peak 0.44–0.62 | text in at 0.45, out at 0.60 */}
          <SceneText
            scene={SCENES[1]}
            scrollYProgress={scrollYProgress}
            inStart={0.45}
            outStart={0.60}
          />

          {/* Scene 3 — center     | bg peak 0.76–0.93 | text in at 0.77, out at end */}
          <SceneText
            scene={SCENES[2]}
            scrollYProgress={scrollYProgress}
            inStart={0.77}
            outStart={0.999}
          />

        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <div className="bg-white flex justify-center py-14 sm:py-20">
        <Link href="/contacto" className="formula-cta-link inline-flex items-center group/cta">
          <motion.span
            className="inline-flex items-center font-geologica uppercase text-base sm:text-lg tracking-[0.25em] text-[#2d2520]"
            variants={ctaWrapperV}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <motion.span
              className="relative inline-flex py-3 px-6 border-b border-[#2d2520]/50 group-hover/cta:border-primary/70 transition-colors duration-300"
              variants={ctaLetterContV}
            >
              <motion.span className="absolute top-0 left-0 right-0 h-px bg-[#2d2520]/50 group-hover/cta:bg-primary" variants={ctaFrameTB} transition={{ duration: 0.28, ease }} style={{ transformOrigin: 'left' }} />
              <motion.span className="absolute top-0 right-0 bottom-0 w-px bg-[#2d2520]/50 group-hover/cta:bg-primary" variants={ctaFrameLR} transition={{ duration: 0.28, ease }} style={{ transformOrigin: 'top' }} />
              <motion.span className="absolute bottom-0 left-0 right-0 h-px bg-[#2d2520]/50 group-hover/cta:bg-primary" variants={ctaFrameTB} transition={{ duration: 0.28, ease }} style={{ transformOrigin: 'right' }} />
              <motion.span className="absolute top-0 left-0 bottom-0 w-px bg-[#2d2520]/50 group-hover/cta:bg-primary" variants={ctaFrameLR} transition={{ duration: 0.28, ease }} style={{ transformOrigin: 'bottom' }} />
              <span className="relative z-10">
                {ctaLetters.map((char, i) => (
                  <motion.span key={i} className="inline-block" variants={ctaLetterV} transition={{ duration: 0.3, ease }}>
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </motion.span>
            <motion.span className="ml-4 sm:ml-6 text-[#2d2520] group-hover/cta:text-primary transition-colors" variants={ctaArrowV} transition={{ duration: 0.3, ease }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.span>
          </motion.span>
        </Link>
      </div>
    </>
  )
}

// ─── Phase type ───────────────────────────────────────────────────────────────
type Phase = 'hidden' | 'in' | 'out'

// ─── SceneText ────────────────────────────────────────────────────────────────
function SceneText({
  scene,
  scrollYProgress,
  inStart,
  outStart,
}: {
  scene: typeof SCENES[0]
  scrollYProgress: MotionValue<number>
  inStart: number
  outStart: number
}) {
  const words = scene.text.split(' ')
  const [phase, setPhase] = useState<Phase>('hidden')

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= outStart)     setPhase('out')
    else if (v >= inStart) setPhase('in')
    else                   setPhase('hidden')
  })

  const STAGGER   = 0.055 // breath between words
  const DUR_IN    = 0.55  // each word's descent — cinematic but not sluggish
  const DUR_OUT   = 1.1   // graceful ascent back into the light
  const ruleDelay = words.length * STAGGER + 0.25

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wordVariants: any = {
    hidden: {
      opacity: 0,
      y: -140,
      scale: 1.14,
      filter: 'blur(28px)',
    },
    in: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        opacity: { duration: 0.7,   ease: 'easeOut',             delay: i * STAGGER },
        y:       { duration: DUR_IN, ease: [0.22, 1.2, 0.36, 1], delay: i * STAGGER },
        scale:   { duration: DUR_IN, ease: [0.22, 1.2, 0.36, 1], delay: i * STAGGER },
        filter:  { duration: 1.1,   ease: 'easeOut',             delay: i * STAGGER },
      },
    }),
    out: {
      opacity: 0,
      y: -100,
      scale: 0.90,
      filter: 'blur(22px)',
      transition: {
        opacity: { duration: DUR_OUT,        ease: QUART_IN },
        y:       { duration: DUR_OUT + 0.2,  ease: QUART_IN },
        scale:   { duration: DUR_OUT + 0.2,  ease: QUART_IN },
        filter:  { duration: DUR_OUT - 0.3,  ease: 'easeIn'  },
      },
    },
  }

  const ruleTransition =
    phase === 'in'
      ? { duration: 1.1, ease: EXPO_OUT, delay: ruleDelay }
      : { duration: 0.7, ease: QUART_IN }

  return (
    <div className={scene.className}>

      {scene.align === 'right' && (
        <motion.div
          className={`h-px bg-primary/75 ${scene.ruleAlign} mb-5 origin-right`}
          animate={{ scaleX: phase === 'in' ? 1 : 0, opacity: phase === 'out' ? 0 : 1 }}
          transition={ruleTransition}
          style={{ width: '4rem' }}
        />
      )}

      {scene.align === 'center' && (
        <motion.div
          className="absolute pointer-events-none -z-10"
          animate={{ opacity: phase === 'in' ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{
            inset: '-4rem -6rem',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.35) 48%, transparent 75%)',
          }}
        />
      )}

      <p
        className="font-romans text-white leading-[1.4] tracking-[0.02em]"
        style={{
          fontSize: 'clamp(1.75rem, 3.6vw, 4rem)',
          textShadow: '0 4px 60px rgba(0,0,0,0.7), 0 0 120px rgba(0,0,0,0.4)',
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            animate={phase}
            initial="hidden"
            variants={wordVariants}
            className="inline-block mr-[0.28em]"
          >
            {word}
          </motion.span>
        ))}
      </p>

      {scene.align !== 'right' && (
        <motion.div
          className={`h-px bg-primary/75 ${scene.ruleAlign} mt-5 ${
            scene.align === 'center' ? 'origin-center' : 'origin-left'
          }`}
          animate={{ scaleX: phase === 'in' ? 1 : 0, opacity: phase === 'out' ? 0 : 1 }}
          transition={ruleTransition}
          style={{ width: '4rem' }}
        />
      )}

    </div>
  )
}
