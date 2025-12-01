// app/api/chat/route.ts
import { NextRequest } from 'next/server';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { getCurrentUser } from '@/lib/session';
import { checkAndDeductCredits } from '@/lib/credits';

// Allow streaming responses up to 30 seconds (Vercel recommended pattern)
export const maxDuration = 30;

// Factory for OpenRouter provider using server-side env
function getOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENROUTER_API_KEY environment variable.');
  }

  // You can pass optional headers to attribute your app per OpenRouter docs.
  // The @openrouter/ai-sdk-provider handles API base and auth automatically.
  const openrouter = createOpenRouter({
    apiKey,
    // Optional: you can pass baseURL or headers if you want to set attribution
    // baseURL: 'https://openrouter.ai/api', // default
    headers: {
      'HTTP-Referer': process.env.OPENROUTER_SITE_URL ?? '',
      'X-Title': process.env.OPENROUTER_APP_NAME ?? 'Next OpenRouter Chat',
    },
  });

  return openrouter;
}

export async function POST(req: NextRequest) {
  // Get current user
  const user = await getCurrentUser();

  if (!user?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check and deduct credits for free users
  const creditCheck = await checkAndDeductCredits(user.id, 1);

  if (!creditCheck.success) {
    return new Response(JSON.stringify({
      error: creditCheck.message || 'Insufficient credits to use AI chat'
    }), {
      status: 402, // Payment Required
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const openrouter = getOpenRouter();

  // Client may pass ?model=... in the URL to override default
  const { searchParams } = new URL(req.url);
  const modelOverride = searchParams.get('model') ?? undefined;
  const modelName =
    modelOverride || process.env.OPENROUTER_MODEL || 'x-ai/grok-4-fast:free';

  // Parse UI messages payload
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Convert UI messages to model messages
  const modelMessages = convertToModelMessages(messages);

  // System prompt keeps responses focused and safe
  const systemPrompt =
    'You are a helpful, concise assistant for a Next.js app. Respond with clear, short answers.';

  // Stream text back out using the selected model
  const result = streamText({
    model: openrouter.chat(modelName),
    messages: [
      { role: 'system', content: systemPrompt },
      ...modelMessages,
    ],
    // You can tune temperature, maxTokens, etc.
    // temperature: 0.2,
  });

  return result.toUIMessageStreamResponse();
}
