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
    question: "What is the cost of the free plan?",
    answer:
      "Our free Starter plan provides access to documentation, community support, and basic UI components. Upgrade to Pro or Business to get the complete source code and AI features.",
  },
  {
    id: "item-2",
    question: "What does the Pro plan include?",
    answer:
      "The Pro plan ($15/month) includes the complete production-ready SaaS codebase with Next.js 14, authentication (Clerk), payments (Stripe), database (Prisma), email system, and UI components. Everything you need to launch your SaaS quickly.",
  },
  {
    id: "item-3",
    question: "What additional features does the Business plan offer?",
    answer:
      "The Business plan ($30/month) includes everything in Pro plus preconfigured AI features: GPT-4o chat interface, Hume AI text-to-speech, AI content generation, web search integration, and advanced analytics. Perfect for AI-powered SaaS applications.",
  },
  {
    id: "item-4",
    question: "Do you offer any annual subscription plans?",
    answer:
      "Yes! Save 20% with annual billing. The Pro Annual plan is $144/year (vs $180 monthly), and the Business Annual plan is $300/year (vs $360 monthly). Get the same complete codebase and features with significant savings.",
  },
  {
    id: "item-5",
    question: "Is there a trial period for the paid plans?",
    answer:
      "We offer a 7-day money-back guarantee on all paid plans. If the boilerplate doesn't meet your needs, contact us within 7 days for a full refund. This gives you time to explore the codebase and ensure it fits your project requirements.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us for personalized help."
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
