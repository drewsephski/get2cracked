"use client"

import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
  once?: boolean
  animation?: "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight"
}

const defaultAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const animations: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  },
  slideUp: defaultAnimation,
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  },
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
  once = true,
  animation = "fadeIn",
}: AnimatedTextProps) {
  const letters = Array.from(text)
  const selectedAnimation = animations[animation] || defaultAnimation

  return (
    <div className={cn("flex flex-wrap", className)}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          custom={delay + index * stagger}
          initial="hidden"
          animate="visible"
          variants={selectedAnimation}
          viewport={{ once }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  )
}
