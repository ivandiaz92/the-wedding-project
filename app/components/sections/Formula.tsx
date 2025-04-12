'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, CameraControls } from '@react-three/drei'
import * as THREE from 'three'

// Add Geologica font
const geologicaFont = {
  src: 'https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&display=swap',
  display: 'swap',
}

interface GlassContainerProps {
  position: [number, number, number]
  scale?: number
  isActive: boolean
  isFilled: boolean
  color?: THREE.Color
  nextIsActive?: boolean
}

function GlassContainer({ 
  position, 
  scale = 1, 
  isActive, 
  isFilled, 
  color = new THREE.Color('#E4B56B'), 
  nextIsActive 
}: GlassContainerProps) {
  const groupRef = React.useRef<THREE.Group>(null)
  const liquidRef = React.useRef<THREE.Mesh>(null)
  const tubeLiquidRef = React.useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshPhysicalMaterial>>(null)
  const glowRef = React.useRef<THREE.PointLight>(null)
  
  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.01
    }
    
    if (liquidRef.current && isActive) {
      const targetY = isFilled ? 0 : -1.5
      liquidRef.current.position.y = THREE.MathUtils.lerp(
        liquidRef.current.position.y,
        targetY,
        0.02
      )
    }

    if (tubeLiquidRef.current && isActive && isFilled) {
      const time = state.clock.elapsedTime
      const baseProgress = (Math.sin(time * 0.5) + 1) / 2
      const waveOffset = Math.sin(time * 0.8 + position[0]) * 0.1
      const glowIntensity = baseProgress + waveOffset
      
      const transitionBoost = nextIsActive ? 0.3 : 0
      const material = tubeLiquidRef.current.material
      material.emissiveIntensity = 0.4 + glowIntensity * 0.6 + transitionBoost
      material.opacity = 0.6 + glowIntensity * 0.2 + transitionBoost

      if (glowRef.current) {
        glowRef.current.intensity = 1 + glowIntensity * 1.5 + transitionBoost
      }
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Glass vessel */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <MeshTransmissionMaterial
          backside={true}
          samples={6}
          resolution={256}
          transmission={0.96}
          roughness={0.05}
          thickness={0.3}
          ior={1.2}
          chromaticAberration={0.02}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          clearcoat={0.1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          opacity={0.2}
          transparent={true}
        />
      </mesh>

      {/* Liquid */}
      <mesh 
        ref={liquidRef} 
        position={[0, isActive ? (isFilled ? 0 : -1.5) : -1.5, 0]} 
        scale={0.95}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.1}
          roughness={0.1}
          transmission={0.8}
          thickness={0.8}
          emissive={color}
          emissiveIntensity={isActive ? 0.8 : 0.1}
          transparent={true}
          opacity={0.85}
        />
      </mesh>

      {/* Glow */}
      <pointLight
        ref={glowRef}
        color={color}
        intensity={isActive ? 1 : 0}
        distance={2}
        decay={2}
        position={[0, 0, 0]}
      />

      {/* Connecting tube */}
      {position[0] < 4 && (
        <group position={[4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 7, 16, 1, true]} />
            <MeshTransmissionMaterial
              backside={true}
              samples={4}
              resolution={256}
              transmission={0.95}
              roughness={0.05}
              thickness={0.2}
              ior={1.2}
              chromaticAberration={0.02}
              distortion={0.1}
              opacity={0.2}
              transparent={true}
            />
          </mesh>
          
          <mesh ref={tubeLiquidRef} scale={0.9}>
            <cylinderGeometry args={[0.08, 0.08, 7, 16]} />
            <meshPhysicalMaterial
              color={color}
              metalness={0.1}
              roughness={0.1}
              transmission={0.8}
              thickness={0.6}
              emissive={color}
              emissiveIntensity={0.4}
              transparent={true}
              opacity={0.6}
            />
          </mesh>

          <group position={[-3.5, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <MeshTransmissionMaterial
                transmission={0.95}
                thickness={0.2}
                roughness={0.05}
                opacity={0.2}
                transparent={true}
              />
            </mesh>
          </group>
          <group position={[3.5, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <MeshTransmissionMaterial
                transmission={0.95}
                thickness={0.2}
                roughness={0.05}
                opacity={0.2}
                transparent={true}
              />
            </mesh>
          </group>
        </group>
      )}
    </group>
  )
}

interface SceneProps {
  currentCard: number
}

function Scene({ currentCard }: SceneProps) {
  return (
    <Canvas shadows camera={{ position: [0, 0, 12], fov: 20 }}>
      <ambientLight intensity={0.15} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.2}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.1} />
      
      <Environment preset="warehouse" />

      {[0, 1, 2].map((index) => (
        <Float
          key={index}
          speed={0.3}
          rotationIntensity={0.01}
          floatIntensity={0.01}
          floatingRange={[-0.03, 0.03]}
        >
          <GlassContainer
            position={[-8 + index * 8, 0, 0]}
            scale={1}
            isActive={currentCard === index}
            isFilled={currentCard >= index}
            nextIsActive={currentCard === index + 1}
          />
        </Float>
      ))}

      <CameraControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 4}
        minAzimuthAngle={-Math.PI / 4}
        maxDistance={14}
        minDistance={10}
      />
    </Canvas>
  )
}

export default function Formula() {
  const targetRef = React.useRef<HTMLDivElement>(null)
  const [currentCard, setCurrentCard] = React.useState(0)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest <= 0.33) setCurrentCard(0)
      else if (latest <= 0.66) setCurrentCard(1)
      else setCurrentCard(2)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  
  const cards = [
    "Somos una combinación de elementos clave para la creación de experiencias inolvidables.",
    "Expertos en comunicación personal y la transmisión de emociones a través de los sentidos.",
    "Capaces de llegar a un nivel de personalización minuciosa y atención de excelencia."
  ]
  
  const buttonText = "Contáctanos".split('').map((char, i) => (
    <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>{char === ' ' ? '\u00A0' : char}</span>
  ))

  return (
    <div ref={targetRef} className="h-[300vh] relative">
      <motion.section 
        className="h-screen sticky top-0 overflow-hidden relative"
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-[#E4B56B]/30" />
          <Image
            src="/images/formula-bg.png"
            alt="Formula background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 h-full">
          <div className="grid lg:grid-cols-2 h-full">
            {/* Left Content */}
            <div className="flex flex-col h-full px-4 sm:px-8 lg:px-12 xl:pl-32 py-8 lg:py-16">
              <div className="flex flex-col h-full">
                {/* Title Group */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] leading-[1]">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="flex items-baseline flex-wrap gap-2 lg:gap-0"
                    >
                      <span className="font-romans text-secondary">THE</span>
                      <span className="font-honya italic text-primary lg:ml-6">PERFECT</span>
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="font-romans text-secondary block"
                    >
                      FoRMULA
                    </motion.span>
                  </h2>
                </motion.div>

                {/* Progress Indicator */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="my-8"
                >
                  <div className="relative">
                    {/* Progress Bar Group */}
                    <div className="relative flex items-center">
                      {/* Progress Line */}
                      <div className="absolute left-3 right-3 h-[3px]">
                        {/* Background line */}
                        <div className="absolute inset-0 bg-secondary/20" />
                        
                        {/* First segment */}
                        <motion.div 
                          className="absolute inset-y-0 left-0 w-1/2 bg-primary origin-left transform-gpu"
                          style={{ 
                            scaleX: useTransform(
                              scrollYProgress,
                              [0, 0.33],
                              [0, 1]
                            )
                          }}
                        />
                        
                        {/* Second segment */}
                        <motion.div 
                          className="absolute inset-y-0 left-1/2 w-1/2 bg-primary origin-left transform-gpu"
                          style={{ 
                            scaleX: useTransform(
                              scrollYProgress,
                              [0.33, 0.66],
                              [0, 1]
                            )
                          }}
                        />
                      </div>

                      {/* Step Indicators */}
                      <div className="relative flex justify-between w-full">
                        {[0, 1, 2].map((step) => (
                          <div key={step} className="relative z-10">
                            <div 
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-white
                                ${currentCard >= step ? 'border-primary' : 'border-secondary/20'}`}
                            >
                              <div 
                                className={`w-3 h-3 rounded-full transform transition-all duration-500
                                  ${currentCard >= step ? 'bg-primary scale-100' : 'bg-secondary/20 scale-75'}`}
                              />
                            </div>
                            {/* Glow Effect */}
                            {currentCard === step && (
                              <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                  boxShadow: [
                                    '0 0 0 0px rgba(var(--primary-rgb), 0)',
                                    '0 0 0 4px rgba(var(--primary-rgb), 0.2)',
                                    '0 0 0 0px rgba(var(--primary-rgb), 0)'
                                  ]
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card Content */}
                <div className="relative flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentCard}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex items-center h-full w-full"
                    >
                      <div className="w-full">
                        <div className="relative">
                          <div className="relative py-8 sm:py-10 lg:py-12">
                            {/* Decorative Curly Brace */}
                            <div className="absolute left-0 top-0 bottom-0 w-24">
                              <svg
                                className="absolute left-0 top-0 bottom-0 h-full"
                                width="48"
                                viewBox="0 0 48 100"
                                fill="none"
                                preserveAspectRatio="none"
                              >
                                {/* Main curly brace path - single continuous curve */}
                                <path
                                  d="M0 0h8
                                     C20 0 24 8 24 16
                                     S28 32 36 42
                                     C42 46 46 48 46 50
                                     C46 52 42 54 36 58
                                     S24 68 24 84
                                     S20 100 8 100
                                     H0"
                                  stroke="var(--primary)"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="path-draw"
                                />
                              </svg>
                            </div>
                            <div className="pl-28">
                              <p className="font-[Geologica] text-2xl sm:text-3xl lg:text-4xl text-secondary/90 font-[300] tracking-wide leading-[1.4] sm:leading-[1.4] lg:leading-[1.4]">
                                {cards[currentCard]}
                              </p>
                            </div>

                            <style jsx>{`
                              .path-draw {
                                stroke-dasharray: 600;
                                stroke-dashoffset: 0;
                                animation: draw 1.2s ease-out;
                              }
                              @keyframes draw {
                                from {
                                  stroke-dashoffset: 600;
                                }
                                to {
                                  stroke-dashoffset: 0;
                                }
                              }
                            `}</style>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Contact Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link 
                    href="#contact"
                    className="wave-button-wrapper inline-flex items-center group"
                  >
                    <span className="relative flex items-center font-geologica uppercase text-xs sm:text-sm tracking-[0.25em] text-secondary">
                      <span className="wave-text-inner relative">
                        {buttonText}
                        <span className="absolute -bottom-2 left-0 w-full h-px bg-secondary group-hover:bg-primary transition-colors"></span>
                      </span>
                      <span className="wave-arrow-wrapper ml-2 sm:ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 transform translate-y-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[50vh] lg:h-full order-first lg:order-last"
            >
              <Image
                src="/images/cecy-fredo.png"
                alt="Cecy and Fredo"
                fill
                priority
                className="object-cover object-[center_20%] lg:object-right"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
} 