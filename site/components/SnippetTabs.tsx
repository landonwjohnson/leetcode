"use client";

import { useMemo, useState, type JSX } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import type { ProblemRecord, SnippetLanguage } from "@/types/content";

type SnippetTabsProps = {
  problem: ProblemRecord;
};

const languageOrder: SnippetLanguage[] = ["swift", "cpp", "typescript"];
const syntaxLanguageMap: Record<SnippetLanguage, string> = {
  swift: "swift",
  cpp: "cpp",
  typescript: "typescript"
};

const languageToolbarLabel: Record<SnippetLanguage, string> = {
  swift: "Swift",
  cpp: "C++",
  typescript: "TypeScript"
};

export function SnippetTabs({ problem }: SnippetTabsProps): JSX.Element {
  const available = useMemo(
    () => languageOrder.filter((language) => Boolean(problem.snippetByLanguage[language])),
    [problem.snippetByLanguage]
  );
  const [activeLanguage, setActiveLanguage] = useState<SnippetLanguage>(available[0] ?? "swift");
  const code = problem.snippetByLanguage[activeLanguage] ?? "";

  return (
    <section className="section-card">
      <h2>Code Snippets</h2>
      <div className="tabs">
        {available.map((language) => (
          <button
            key={language}
            type="button"
            onClick={(): void => setActiveLanguage(language)}
            className={`tab-button ${activeLanguage === language ? "tab-button-active" : ""}`}
          >
            {language}
          </button>
        ))}
      </div>
      <div className="code-block-shell">
        <div className="code-block-toolbar">
          <span className="code-block-toolbar-lang">{languageToolbarLabel[activeLanguage]}</span>
          <CopyCodeButton code={code} />
        </div>
        <div className="code-block code-block--nested">
          <SyntaxHighlighter
            language={syntaxLanguageMap[activeLanguage]}
            style={oneDark}
            customStyle={{
              margin: 0,
              background: "transparent",
              padding: 0,
              fontFamily: 'var(--font-mono), ui-monospace, "Liberation Mono", Menlo, Monaco, Consolas, monospace'
            }}
            showLineNumbers
            wrapLongLines
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>
  );
}
