"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface OrbitingCircleProps {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  delay?: number
  speed?: number
  radius?: number
}

export function OrbitingCircle({
  className,
  children,
  reverse = false,
  delay = 0,
  speed = 1,
  radius = 50,
}: OrbitingCircleProps) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = () => {
      setProgress((prev) => (prev + 0.002 * speed) % (Math.PI * 2))
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [speed])

  const x = Math.cos(progress) * radius * (reverse ? -1 : 1)
  const y = Math.sin(progress) * radius

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute flex items-center justify-center rounded-full",
        className
      )}
      style={{
        x,
        y,
        transition: "all 0.05s linear",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

interface OrbitingCirclesProps {
  className?: string
  children?: React.ReactNode
  radius?: number
  duration?: number
  delay?: number
}

export function OrbitingCircles({
  className,
  children,
  radius = 50,
  duration = 20,
  delay = 0,
}: OrbitingCirclesProps) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <AnimatePresence>
        {children}
        <OrbitingCircle
          radius={radius}
          speed={0.2}
          delay={delay}
          className="h-4 w-4 bg-blue-500/20"
        />
        <OrbitingCircle
          radius={radius * 1.5}
          speed={0.25}
          delay={delay + 0.2}
          reverse
          className="h-3 w-3 bg-purple-500/20"
        />
        <OrbitingCircle
          radius={radius * 0.8}
          speed={0.3}
          delay={delay + 0.4}
          className="h-2 w-2 bg-pink-500/20"
        />
      </AnimatePresence>
    </div>
  )
}
