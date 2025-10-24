// lib/hume.ts
import { HumeClient } from "hume";

if (!process.env.HUME_API_KEY) {
  throw new Error("HUME_API_KEY is not set");
}

export const hume = new HumeClient({
  apiKey: process.env.HUME_API_KEY!,
});
