"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"

interface SparkleProps {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

export function SparkleText({
  children,
  className,
  colors = {
    first: "#60a5fa",
    second: "#a78bfa",
  },
  sparklesCount = 20,
  ...props
}: {
  children: ReactNode
  className?: string
  colors?: {
    first: string
    second: string
  }
  sparklesCount?: number
} & React.HTMLAttributes<HTMLDivElement>) {
  const [sparkles, setSparkles] = useState<SparkleProps[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const generateSparkle = useCallback((): SparkleProps => {
    const starX = `${Math.random() * 100}%`
    const starY = `${Math.random() * 100}%`
    const color = Math.random() > 0.5 ? colors.first : colors.second
    const delay = Math.random() * 2
    const scale = Math.random() * 0.5 + 0.5
    const lifespan = Math.random() * 10 + 5
    const id = `${starX}-${starY}-${Date.now()}`
    return { id, x: starX, y: starY, color, delay, scale, lifespan }
  }, [colors.first, colors.second])

  useEffect(() => {
    const newSparkles = Array.from({ length: sparklesCount }, generateSparkle)
    setSparkles(newSparkles)
  }, [generateSparkle, sparklesCount])

  useEffect(() => {
    const updateSparkles = () => {
      setSparkles((current) =>
        current.map((sparkle) => {
          if (sparkle.lifespan <= 0) {
            return generateSparkle()
          }
          return {
            ...sparkle,
            lifespan: sparkle.lifespan - 0.1,
          }
        })
      )
    }

    const interval = setInterval(updateSparkles, 100)
    return () => clearInterval(interval)
  }, [generateSparkle])

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="pointer-events-none absolute -z-0 h-1 w-1 rounded-full"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            backgroundColor: sparkle.color,
            scale: sparkle.scale,
            opacity: sparkle.lifespan > 1 ? 1 : sparkle.lifespan,
            boxShadow: `0 0 ${sparkle.scale * 8}px ${sparkle.color}`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: sparkle.delay,
          }}
        />
      ))}
    </div>
  )
}
