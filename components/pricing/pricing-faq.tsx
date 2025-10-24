import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "What makes your free plan valuable?",
    answer:
      "Get started immediately with basic access and see how our platform can streamline your development workflow. Perfect for evaluating the core functionality before upgrading.",
  },
  {
    id: "item-2",
    question: "Why choose Pro over free?",
    answer:
      "For $12/month, unlock enhanced features and priority support. Ideal for individual developers who need more robust tools and faster response times for their projects.",
  },
  {
    id: "item-3",
    question: "What's the Pro plan advantage?",
    answer:
      "Pro gives you full access to our complete codebase at $12/month. Dive deep into the source code, customize it to your needs, and build exactly what you want without AI limitations.",
  },
  {
    id: "item-4",
    question: "How much can I save with annual plans?",
    answer:
      "Save big with annual billing—get 2 months free! Pro Annual: $240/year (vs $300). Lock in the best rates for long-term development.",
  },
  {
    id: "item-5",
    question: "What about Business plans?",
    answer:
      "Business plans deliver the entire codebase preconfigured with AI functionality—ready to deploy out of the box. Complete solution for teams that need production-ready AI features immediately.",
  },
  {
    id: "item-6",
    question: "Need something custom?",
    answer:
      "We build custom solutions for enterprise clients. Get personalized implementations, dedicated support, and features tailored to your specific business requirements.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Get answers about our pricing and discover how our codebase access can accelerate your development. From basic tools to full AI integration, find your perfect development solution."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
