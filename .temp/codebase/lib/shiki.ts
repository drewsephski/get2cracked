// lib/shiki.ts
// Server-only helper to load Shiki as ESM safely via dynamic import.
// Avoid importing this file from client components or edge runtime routes.

export type Highlighter = {
  codeToHtml: (code: string, options: { lang: string; theme: string }) => Promise<string>;
};

let highlighterPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const shiki = await import('shiki'); // ESM dynamic import
      // Use a popular theme; adjust as needed
      const highlighter = await shiki.getHighlighter({
        themes: ['github-dark', 'github-light', 'dracula', 'nord', 'monokai', 'solarized-dark'],
        langs: ['tsx', 'typescript', 'javascript', 'json', 'bash', 'css', 'html', 'python', 'markdown'],
      });
      return {
        codeToHtml: async (code, { lang, theme }) => highlighter.codeToHtml(code, { lang, theme }),
      };
    })();
  }
  return highlighterPromise as Promise<Highlighter>;
}