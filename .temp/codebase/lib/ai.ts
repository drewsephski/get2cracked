// lib/ai.ts
import { OpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not set");
}

export const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
  // Optional: route metadata, etc.
});

export const defaultModel =
  process.env.OPENROUTER_MODEL || "x-ai/grok-4-fast:free";

// Helper to stream text with Vercel AI SDK via OpenRouter
export const streamCompletion = async (messages: { role: "user" | "system" | "assistant"; content: string }[]) => {
  return streamText({
    model: openrouter.chat(defaultModel),
    messages,
  });
};