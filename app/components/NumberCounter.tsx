'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'

interface NumberCounterProps {
  end: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function NumberCounter({ 
  end, 
  prefix = '', 
  suffix = '', 
  duration = 1.5,
  className = ''
}: NumberCounterProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => {
    if (isInView) {
      let startTime: number | null = null
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      
      animationFrame = requestAnimationFrame(animate)
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [isInView, end, duration])

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {prefix}{count}{suffix}
    </motion.p>
  )
} 