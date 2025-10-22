import { FeatureLdg, InfoLdg, TestimonialType } from "types";

export const infos: InfoLdg[] = [
  {
    title: "AI-Powered Business Growth",
    description: "Accelerate your business success with intelligent AI tools designed for entrepreneurs. From predictive analytics to automated insights, unlock the power of AI to make smarter decisions and scale faster.",
    image: "/getcracked.png",
    list: []
  },
  {
    title: "AI Customer Engagement",
    description:
      "Transform how you connect with customers using intelligent AI solutions. From personalized marketing to automated support, create meaningful interactions that drive loyalty and boost conversions for your business.",
    image: "/_static/illustrations/work-from-home.jpg",
    list: [
      {
        title: "Personalized Marketing",
        description: "Create targeted campaigns that resonate with your audience using AI that understands customer preferences.",
        icon: "user",
      },
      {
        title: "24/7 Customer Support",
        description: "Provide instant, accurate responses to customer inquiries with AI chatbots that never sleep.",
        icon: "messages",
      },
      {
        title: "Content Intelligence",
        description: "Generate high-quality content that engages your audience and strengthens your brand presence.",
        icon: "page",
      },
    ],
  },
];

export const features: FeatureLdg[] = [
  {
    title: "AI-Powered Analytics",
    description:
      "Transform your business data into actionable insights with analytics that predict trends and optimize performance for maximum growth.",
    link: "/dashboard",
    icon: "lineChart",
  },
  {
    title: "Smart Customer Support",
    description:
      "Automate customer inquiries with AI chatbots that provide instant, accurate responses 24/7, reducing support costs improving satisfaction.",
    link: "/support",
    icon: "messages",
  },
  {
    title: "Content Generation",
    description:
      "Create high-quality marketing copy, blog posts, and social media content instantly with AI that understands your brand voice and your audience.",
    link: "/content",
    icon: "page",
  },
  {
    title: "Automated Workflows",
    description:
      "Streamline repetitive tasks with intelligent automation that learns from your patterns and adapts to efficiently optimize your daily operations.",
    link: "/automation",
    icon: "settings",
  },
  {
    title: "Market Intelligence",
    description:
      "Stay ahead of competitors with AI-driven real-time market research that identifies opportunities, tracks trends, and guides strategic decisions.",
    link: "/intelligence",
    icon: "search",
  },
  {
    title: "Personalized Marketing",
    description:
      "Deliver targeted campaigns with AI that analyzes customer behavior to create personalized experiences that boost convert and retain users.",
    link: "/marketing",
    icon: "user",
  },
];

export const testimonials: TestimonialType[] = [
  {
    name: "Sarah Chen",
    job: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    review:
      "Get Cracked's AI-powered analytics transformed how I understand my customers. The predictive insights helped me increase sales by 40% in just 3 months. As a solo entrepreneur, I finally have enterprise-level tools that actually save me time instead of creating more work.",
  },
  {
    name: "Marcus Rodriguez",
    job: "E-commerce Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    review:
      "The automated customer support chatbots handle 80% of inquiries instantly. My response time went from hours to seconds, and customer satisfaction skyrocketed. This is exactly what small businesses need to compete with the big players.",
  },
  {
    name: "Amanda Foster",
    job: "Content Creator & Consultant",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    review:
      "Creating content used to take me days. Now with AI content generation, I produce blog posts and social media content in minutes while maintaining my unique voice. My content output increased 5x without sacrificing quality.",
  },
  {
    name: "David Kim",
    job: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    review:
      "The market intelligence features gave me insights I never would have discovered manually. I identified a new market opportunity that became my most profitable product line. This AI actually makes me smarter at running my business.",
  },
  {
    name: "Lisa Thompson",
    job: "Digital Marketing Agency Owner",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    review:
      "Personalized marketing campaigns powered by AI increased my client conversion rates by 60%. What's even better is that it learns from each campaign, so every new one performs better than the last. Game-changing for small agencies.",
  },
  {
    name: "Ryan Patel",
    job: "Solo SaaS Developer",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    review:
      "As a solo founder, I don't have time for manual processes. The automated workflows handle everything from customer onboarding to follow-ups. I've gained 20 hours per week to focus on product development instead of admin tasks.",
  },
];
