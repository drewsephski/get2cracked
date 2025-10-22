import { AnimatedGradientText } from "./animated-gradient-text"
import { MagicCard } from "./magic-card"
import { OrbitingCircles } from "./orbiting-circles"
import { SparkleText } from "./sparkles-text"

export function MagicDemo() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="mb-16 text-center">
        <h2 className="font-bricolage text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <AnimatedGradientText 
            text="Experience the Magic" 
            from="from-blue-400"
            via="via-purple-500"
            to="to-pink-500"
            className="block"
          />
          <span className="mt-2 block">
            of Modern <SparkleText className="relative">UI</SparkleText>
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Interactive components that bring your interface to life with smooth animations and engaging effects.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <MagicCard className="p-6">
          <div className="relative h-full">
            <OrbitingCircles className="absolute inset-0 -z-10" radius={80} />
            <h3 className="mb-4 font-bricolage text-2xl font-semibold">
              Interactive Experience
            </h3>
            <p className="text-muted-foreground">
              Hover over this card to see the magic spotlight effect that follows your cursor, creating a dynamic and engaging user experience.
            </p>
          </div>
        </MagicCard>

        <MagicCard className="p-6">
          <div className="h-full">
            <h3 className="mb-4 font-bricolage text-2xl font-semibold">
              <AnimatedGradientText 
                text="Dynamic Animations" 
                from="from-green-400"
                via="via-blue-500"
                to="to-purple-500"
                className="block"
              />
            </h3>
            <p className="text-muted-foreground">
              Watch as elements come to life with smooth animations and transitions, making your content more engaging and memorable.
            </p>
          </div>
        </MagicCard>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg text-muted-foreground">
          <span className="font-medium text-foreground">
            <SparkleText>Ready to elevate your project?</SparkleText>
          </span>{" "}
          These are just a few examples of what's possible with modern web technologies.
        </p>
      </div>
    </div>
  )
}
