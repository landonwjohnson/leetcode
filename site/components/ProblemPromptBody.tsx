import type { ReactElement, ReactNode } from "react";

function paragraphWithInlineCode(text: string): ReactNode {
  const segments = text.split(/(`[^`]+`)/g);
  return segments.map((segment, index) => {
    if (segment.startsWith("`") && segment.endsWith("`") && segment.length >= 2) {
      return (
        <code key={index} className="problem-prompt-inline-code">
          {segment.slice(1, -1)}
        </code>
      );
    }
    return <span key={index}>{segment}</span>;
  });
}

function parsePrompt(raw: string): { title: string | null; paragraphs: string[] } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { title: null, paragraphs: [] };
  }
  const lines = trimmed.split(/\r?\n/);
  let title: string | null = null;
  let bodyStart = 0;
  const first = lines[0] ?? "";
  if (/^#\s+/.test(first)) {
    title = first.replace(/^#\s+/, "").trim();
    bodyStart = 1;
  }
  const body = lines.slice(bodyStart).join("\n").trim();
  const paragraphs =
    body.length > 0
      ? body
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean)
      : [];
  return { title, paragraphs };
}

export function ProblemPromptBody({ prompt, fallback }: { prompt: string; fallback: string }): ReactElement {
  const source = prompt.trim() ? prompt : fallback;
  const { title, paragraphs } = parsePrompt(source);

  if (!title && paragraphs.length === 0) {
    return (
      <p className="problem-prompt-empty" role="note">
        {source || fallback}
      </p>
    );
  }

  return (
    <div className="problem-prompt-panel" aria-label="Problem statement">
      {title ? <h3 className="problem-prompt-title">{title}</h3> : null}
      {paragraphs.map((p, i) => (
        <p key={i} className="problem-prompt-prose">
          {paragraphWithInlineCode(p.replace(/\s*\n\s*/g, " "))}
        </p>
      ))}
    </div>
  );
}
