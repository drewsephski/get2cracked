import { AnimatedText } from "@/components/ui/animated-text"

export function AnimatedTextDemo() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="mb-4 text-4xl font-bold">Bricolage Grotesque</h2>
        <AnimatedText 
          text="Welcome to our amazing platform"
          className="text-5xl font-bricolage font-bold text-foreground"
          animation="slideUp"
          delay={0.2}
        />
      </div>
      
      <div className="mt-12">
        <h3 className="mb-4 text-2xl font-semibold">Creative Solutions</h3>
        <AnimatedText 
          text="Building the future with innovative technology"
          className="text-3xl font-bricolage text-muted-foreground"
          animation="fadeIn"
          delay={0.5}
        />
      </div>
    </div>
  )
}
