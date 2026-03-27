"use client";

import { useMemo, useState, type JSX } from "react";

function parseNumberList(raw: string): number[] {
  return raw
    .split(",")
    .map((part: string): number => Number(part.trim()))
    .filter((n: number): boolean => Number.isFinite(n));
}

export function ConcatenationVisualizer(): JSX.Element {
  const [input, setInput] = useState<string>("1,2,1");
  const numbers = useMemo((): number[] => parseNumberList(input), [input]);
  const totalSteps = numbers.length * 2;
  const [step, setStep] = useState<number>(0);

  const result = useMemo((): number[] => {
    const out: number[] = [];
    for (let i = 0; i < step; i += 1) {
      const sourceIndex = i % Math.max(numbers.length, 1);
      if (numbers.length > 0) {
        out.push(numbers[sourceIndex]);
      }
    }
    return out;
  }, [numbers, step]);

  const activeSourceIndex = step < totalSteps && numbers.length > 0 ? step % numbers.length : -1;
  const progress = totalSteps > 0 ? Math.min((step / totalSteps) * 100, 100) : 0;

  return (
    <section className="section-card demo-card">
      <div className="demo-head">
        <h2>Visual Demo</h2>
        <span className="pill">Concatenation Flow</span>
      </div>
      <p>Step through how each value is copied into the output array.</p>
      <div className="demo-input-row">
        <label htmlFor="concat-visual-input" className="field-label">
          Input numbers
        </label>
        <input
          id="concat-visual-input"
          className="text-input"
          value={input}
          onChange={(event): void => {
            setInput(event.target.value);
            setStep(0);
          }}
        />
      </div>
      <div className="demo-actions">
        <button className="tab-button" onClick={(): void => setStep((prev: number) => Math.max(prev - 1, 0))}>
          &larr; Back
        </button>
        <button className="tab-button" onClick={(): void => setStep((prev: number) => Math.min(prev + 1, totalSteps))}>
          Step &rarr;
        </button>
        <button className="tab-button" onClick={(): void => setStep(totalSteps)}>
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
        Step {step} of {totalSteps} {activeSourceIndex >= 0 ? `(copying input[${activeSourceIndex}])` : "(done)"}
      </p>
      <div className="demo-row">
        <div>
          <h3>Input</h3>
          <div className="chip-wrap">
            {numbers.map((n: number, index: number): JSX.Element => (
              <span key={`${n}-${index}`} className={`num-chip ${index === activeSourceIndex ? "num-chip-active" : ""}`}>
                {n}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3>Result</h3>
          <div className="chip-wrap">
            {result.map((n: number, index: number): JSX.Element => (
              <span key={`${n}-${index}`} className="num-chip num-chip-result">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
