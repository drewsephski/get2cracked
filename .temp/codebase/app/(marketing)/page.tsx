import { infos } from "@/config/landing";
import BentoGrid from "@/components/sections/bentogrid";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";
import { Comparison } from "@/components/sections/comparison";
import { ROICalculator } from "@/components/sections/roi-calculator";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { logos } from "@/components/ui/demo"; // Assuming demo.tsx exports logos array

export default function IndexPage() {
  return (
    <>
      <HeroLanding />
      <div className="container mx-auto py-16">
        <LogoCloud logos={logos} />
      </div>
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[1]} />
      <Features />
      <Comparison />
      <ROICalculator />
      <Testimonials />
      <InfoLanding data={infos[0]} reverse={true} />

    </>
  );
}
