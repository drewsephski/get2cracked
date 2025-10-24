import { AnimatedText } from "@/components/ui/animated-text"

export function AnimatedTextDemo() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="mb-4 text-4xl font-bold">Bricolage Grotesque</h2>
        <AnimatedText 
          text="Welcome to our amazing platform"
          className="font-bricolage text-5xl font-bold text-foreground"
          animation="slideUp"
          delay={0.2}
        />
      </div>
      
      <div className="mt-12">
        <h3 className="mb-4 text-2xl font-semibold">Creative Solutions</h3>
        <AnimatedText 
          text="Building the future with innovative technology"
          className="font-bricolage text-3xl text-muted-foreground"
          animation="fadeIn"
          delay={0.5}
        />
      </div>
    </div>
  )
}
