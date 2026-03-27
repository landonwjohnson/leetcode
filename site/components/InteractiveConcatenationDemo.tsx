"use client";

import { useState, type JSX } from "react";

export function InteractiveConcatenationDemo(): JSX.Element {
  const [value, setValue] = useState<string>("1,2,1");

  const numbers = value
    .split(",")
    .map((item: string): number => Number(item.trim()))
    .filter((item: number): boolean => Number.isFinite(item));

  const result = [...numbers, ...numbers];

  return (
    <section className="section-card">
      <h2>Interactive Example</h2>
      <p>Try an input array and see the concatenated result instantly.</p>
      <label htmlFor="concat-input" className="field-label">
        Input numbers (comma-separated)
      </label>
      <input
        id="concat-input"
        value={value}
        onChange={(event): void => setValue(event.target.value)}
        className="text-input"
      />
      <pre className="code-block">
        <code>{JSON.stringify(result)}</code>
      </pre>
    </section>
  );
}
