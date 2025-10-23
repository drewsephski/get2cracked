import { getHighlighter } from "@/lib/shiki";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/code-block";

type Props = {
  code: string;
  language: string;
};

export default async function ServerCodeBlock({ code, language }: Props) {
  const highlighter = await getHighlighter();
  const highlightedHtml = await highlighter.codeToHtml(code, { lang: language });

  return (
    <CodeBlock code={code} highlightedHtml={highlightedHtml}>
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}