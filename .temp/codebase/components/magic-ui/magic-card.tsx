"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { MouseEvent, ReactNode } from "react"

export function MagicCard({
  children,
  className,
  containerClassName,
}: {
  children?: ReactNode
  className?: string
  containerClassName?: string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  return (
    <div
      className={cn(
        "group relative max-w-md rounded-xl border border-white/10 bg-gray-900 p-4 shadow-2xl",
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  )
}
