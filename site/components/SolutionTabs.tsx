"use client";

import { useState, type JSX } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ProblemLanguage } from "@/lib/content";

type Props = {
  languages: Partial<Record<ProblemLanguage, string>>;
};

const languageOrder: ProblemLanguage[] = ["swift", "python", "javascript", "c++"];
const syntaxLanguageMap: Record<ProblemLanguage, string> = {
  swift: "swift",
  python: "python",
  javascript: "javascript",
  "c++": "cpp"
};

export function SolutionTabs({ languages }: Props): JSX.Element {
  const available = languageOrder.filter(
    (language: ProblemLanguage): boolean => typeof languages[language] === "string" && languages[language]!.length > 0
  );
  const [activeLanguage, setActiveLanguage] = useState<ProblemLanguage>(available[0] ?? "swift");

  return (
    <section className="section-card">
      <h2>Solutions</h2>
      <div className="tabs">
        {available.map((language: ProblemLanguage): JSX.Element => (
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
      <div className="code-block">
        <SyntaxHighlighter
          language={syntaxLanguageMap[activeLanguage]}
          style={oneDark}
          customStyle={{ margin: 0, background: "transparent", padding: 0 }}
          showLineNumbers
          wrapLongLines
        >
          {languages[activeLanguage] ?? ""}
        </SyntaxHighlighter>
      </div>
    </section>
  );
}
