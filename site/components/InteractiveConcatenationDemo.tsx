"use client";

import { useMemo, useState, type JSX } from "react";
import { CopyCodeButton } from "@/components/CopyCodeButton";

function firstThreeChunk(nums: number[]): [number, number, number] {
  if (nums.length === 0) {
    return [0, 0, 0];
  }
  const pick = (i: number): number => nums[Math.min(i, nums.length - 1)] ?? 0;
  return [pick(0), pick(1), pick(2)];
}

export function InteractiveConcatenationDemo(): JSX.Element {
  const [value, setValue] = useState<string>("1,2,1");
  const [index, setIndex] = useState<number>(0);
  const [secondHalfRevealed, setSecondHalfRevealed] = useState<boolean>(false);

  const numbers = useMemo(
    (): number[] =>
      value
        .split(",")
        .map((item: string): number => Number(item.trim()))
        .filter((item: number): boolean => Number.isFinite(item)),
    [value]
  );

  const chunk = useMemo((): [number, number, number] => firstThreeChunk(numbers), [numbers]);
  const track = useMemo((): number[] => (secondHalfRevealed ? [...chunk, ...chunk] : [...chunk]), [chunk, secondHalfRevealed]);
  const result = useMemo((): number[] => [...numbers, ...numbers], [numbers]);
  const resultJson = useMemo((): string => JSON.stringify(result), [result]);
  const visibleSlides = 3;
  const maxIndex = Math.max(0, track.length - visibleSlides);
  const safeIndex = Math.min(index, maxIndex);
  const transformPercent = -(safeIndex * (100 / visibleSlides));

  const goPrevious = (): void => setIndex((current: number): number => Math.max(0, current - 1));
  const goNext = (): void => setIndex((current: number): number => Math.min(maxIndex, current + 1));

  const revealSecondCopy = (): void => {
    setSecondHalfRevealed(true);
    setIndex(0);
  };

  return (
    <section className="section-card">
      <h2>Interactive Carousel Demo</h2>
      <p>
        You start with <strong>three slides</strong> from your list. Press <strong>Add next 3 (duplicate)</strong> to append
        the same three values again—the same idea as <code>nums + nums</code> for an infinite carousel track.
      </p>
      <label htmlFor="concat-input" className="field-label">
        Input numbers (comma-separated)
      </label>
      <input
        id="concat-input"
        value={value}
        onChange={(event): void => {
          setValue(event.target.value);
          setIndex(0);
          setSecondHalfRevealed(false);
        }}
        className="text-input"
      />
      <div className="demo-actions">
        <button type="button" className="tab-button" onClick={revealSecondCopy} disabled={secondHalfRevealed}>
          {secondHalfRevealed ? "Second copy added" : "Add next 3 (duplicate)"}
        </button>
        <button type="button" className="tab-button" onClick={goPrevious} disabled={safeIndex === 0}>
          Prev
        </button>
        <button type="button" className="tab-button" onClick={goNext} disabled={safeIndex === maxIndex}>
          Next
        </button>
      </div>
      <div
        style={{
          overflow: "hidden",
          border: "1px solid var(--border)",
          borderRadius: 10,
          background: "var(--bg-elevated)"
        }}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 220ms ease",
            transform: `translateX(${transformPercent}%)`
          }}
        >
          {track.map((slide: number, slideIndex: number): JSX.Element => {
            const pass = secondHalfRevealed && slideIndex >= 3 ? "duplicate run" : "original run";
            return (
              <div
                key={`${slide}-${slideIndex}-${pass}`}
                style={{
                  flex: "0 0 33.333%",
                  minWidth: "33.333%",
                  padding: "0.9rem",
                  borderRight: "1px solid var(--border)"
                }}
              >
                <span className="field-label">
                  Slide {slideIndex + 1} · {pass}
                </span>
                <div className="num-chip num-chip-result" style={{ marginTop: "0.35rem", display: "inline-block" }}>
                  {slide}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="code-block-shell" style={{ marginTop: "0.85rem" }}>
        <div className="code-block-toolbar">
          <span className="code-block-toolbar-lang">Result array</span>
          <CopyCodeButton code={resultJson} />
        </div>
        <pre className="code-block code-block--nested">
          <code>{resultJson}</code>
        </pre>
      </div>
    </section>
  );
}
