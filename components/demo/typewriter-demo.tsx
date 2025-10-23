import { TypewriterText } from "@/components/ui/typewriter-text"

export function TypewriterDemo() {
  const words = [
    "Web Development",
    "UI/UX Design",
    "Mobile Apps",
    "E-commerce",
    "SaaS Solutions"
  ]

  return (
    <div className="flex min-h-[200px] items-center justify-center p-8">
      <div className="text-center">
        <h1 className="mb-6 text-3xl font-medium text-foreground md:text-4xl lg:text-5xl">
          We create amazing{' '}
          <span className="font-bricolage font-bold text-primary">
            <TypewriterText 
              words={words} 
              typingSpeed={100}
              deletingSpeed={50}
              delayBetweenWords={1500}
              className="inline-block min-w-[200px] text-left"
              cursorClassName="ml-1 h-8 w-1.5 bg-primary"
            />
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Let&apos;s build something incredible together
        </p>
      </div>
    </div>
  )
}
