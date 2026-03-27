"use client";

import { useMemo, useState, type JSX } from "react";
import { CopyCodeButton } from "@/components/CopyCodeButton";

type TwoSumStep = {
  index: number;
  value: number;
  needed: number;
  matchIndex: number | null;
  seen: Record<number, number>;
};

function parseNumberList(raw: string): number[] {
  return raw
    .split(",")
    .map((part: string): number => Number(part.trim()))
    .filter((n: number): boolean => Number.isFinite(n));
}

function buildTwoSumSteps(nums: number[], target: number): TwoSumStep[] {
  const seen = new Map<number, number>();
  const steps: TwoSumStep[] = [];

  nums.forEach((value: number, index: number): void => {
    const needed = target - value;
    const matchIndex = seen.has(needed) ? (seen.get(needed) ?? null) : null;

    steps.push({
      index,
      value,
      needed,
      matchIndex,
      seen: Object.fromEntries(seen.entries())
    });

    if (matchIndex === null) {
      seen.set(value, index);
    }
  });

  return steps;
}

export function TwoSumVisualizer(): JSX.Element {
  const [input, setInput] = useState<string>("2,7,11,15");
  const [targetRaw, setTargetRaw] = useState<string>("9");
  const nums = useMemo((): number[] => parseNumberList(input), [input]);
  const target = Number(targetRaw);
  const steps = useMemo((): TwoSumStep[] => buildTwoSumSteps(nums, Number.isFinite(target) ? target : 0), [nums, target]);
  const [step, setStep] = useState<number>(0);
  const current = steps[Math.min(step, Math.max(steps.length - 1, 0))];
  const isDone = step >= steps.length;
  const foundPair = steps.find((item: TwoSumStep): boolean => item.matchIndex !== null) ?? null;
  const progress = steps.length > 0 ? Math.min((step / steps.length) * 100, 100) : 0;
  const seenJson = useMemo(
    (): string => JSON.stringify(current?.seen ?? {}, null, 2),
    [current]
  );

  return (
    <section className="section-card demo-card">
      <div className="demo-head">
        <h2>Visual Demo</h2>
        <span className="pill">Hash Map Walkthrough</span>
      </div>
      <p>Watch the map populate until a matching complement appears.</p>
      <div className="demo-row">
        <div>
          <label htmlFor="twosum-visual-input" className="field-label">
            Input numbers
          </label>
          <input
            id="twosum-visual-input"
            className="text-input"
            value={input}
            onChange={(event): void => {
              setInput(event.target.value);
              setStep(0);
            }}
          />
        </div>
        <div>
          <label htmlFor="twosum-target-input" className="field-label">
            Target
          </label>
          <input
            id="twosum-target-input"
            className="text-input"
            value={targetRaw}
            onChange={(event): void => {
              setTargetRaw(event.target.value);
              setStep(0);
            }}
          />
        </div>
      </div>
      <div className="demo-actions">
        <button className="tab-button" onClick={(): void => setStep((prev: number) => Math.max(prev - 1, 0))}>
          &larr; Back
        </button>
        <button className="tab-button" onClick={(): void => setStep((prev: number) => Math.min(prev + 1, steps.length))}>
          Step &rarr;
        </button>
        <button className="tab-button" onClick={(): void => setStep(steps.length)}>
          Run All
        </button>
        <button className="tab-button" onClick={(): void => setStep(0)}>
          Reset
        </button>
      </div>
      <div className="progress-rail" aria-hidden>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="demo-note">
        {isDone
          ? foundPair
            ? `Done. Pair found at indices [${foundPair.matchIndex}, ${foundPair.index}].`
            : "Done. No pair found."
          : `Checking index ${current?.index ?? 0}: need ${current?.needed ?? 0}.`}
      </p>
      <div className="demo-row">
        <div>
          <h3>Numbers</h3>
          <div className="chip-wrap">
            {nums.map((n: number, index: number): JSX.Element => (
              <span
                key={`${n}-${index}`}
                className={`num-chip ${!isDone && index === current?.index ? "num-chip-active" : ""}`}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3>Seen Map (value -&gt; index)</h3>
          <div className="code-block-shell">
            <div className="code-block-toolbar">
              <span className="code-block-toolbar-lang">JSON</span>
              <CopyCodeButton code={seenJson} />
            </div>
            <pre className="code-block code-block--nested">
              <code>{seenJson}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
