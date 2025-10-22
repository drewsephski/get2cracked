"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypewriterTextProps {
  words: string[]
  className?: string
  cursorClassName?: string
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
  loop?: boolean | number
}

export function TypewriterText({
  words = ["Hello", "World", "Typewriter", "Effect"],
  className,
  cursorClassName = "inline-block ml-1 h-6 w-1.5 bg-foreground",
  typingSpeed = 150,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
  loop = true,
}: TypewriterTextProps) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingDelay, setTypingDelay] = useState(typingSpeed)
  const [loopCount, setLoopCount] = useState(0)

  useEffect(() => {
    if (!words.length) return

    const currentWord = words[currentIndex % words.length]
    
    if (isDeleting) {
      // Deleting text
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, typingDelay)
        return () => clearTimeout(timeout)
      } else {
        // Move to next word when deletion is complete
        setIsDeleting(false)
        setCurrentIndex((currentIndex + 1) % words.length)
        setTypingDelay(typingSpeed)
      }
    } else {
      // Typing text
      if (currentText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        }, typingDelay)
        return () => clearTimeout(timeout)
      } else {
        // Start deleting after a delay
        if (loop || (typeof loop === 'number' && loopCount < loop)) {
          const timeout = setTimeout(() => {
            setIsDeleting(true)
            setTypingDelay(deletingSpeed)
            if (typeof loop === 'number') {
              setLoopCount(loopCount + 1)
            }
          }, delayBetweenWords)
          return () => clearTimeout(timeout)
        }
      }
    }
  }, [
    currentText,
    currentIndex,
    isDeleting,
    typingDelay,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
    loop,
    loopCount,
  ])

  return (
    <div className={cn("inline-flex items-center", className)}>
      <span>{currentText}</span>
      <span
        className={cn(
          "animate-pulse",
          cursorClassName,
          !currentText && "opacity-0"
        )}
        aria-hidden="true"
      />
    </div>
  )
}
