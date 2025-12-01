"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

type GradientTextProps = {
  text: string
  className?: string
  from?: string
  via?: string
  to?: string
  animate?: boolean
  duration?: number
  delay?: number
}

export function AnimatedGradientText({
  text,
  className,
  from = "from-blue-500",
  via = "via-purple-500",
  to = "to-pink-500",
  animate = true,
  duration = 5,
  delay = 0,
}: GradientTextProps) {
  const controls = useAnimation()

  useEffect(() => {
    if (animate) {
      controls.start({
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
          delay,
        },
      })
    }
  }, [animate, controls, duration, delay])

  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        from,
        via,
        to,
        "bg-[length:200%_auto]",
        className
      )}
      animate={controls}
    >
      {text}
    </motion.span>
  )
}
