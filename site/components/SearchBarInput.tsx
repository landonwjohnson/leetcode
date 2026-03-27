"use client";

import { useEffect, useState, type ChangeEvent, type JSX } from "react";

const SUGGESTIONS: readonly string[] = [
  "Two sum hashing",
  "Binary search sorted array",
  "Sliding window maximum",
  "BFS shortest path grid",
  "LRU cache O(1) get and put",
];

const TYPE_MS = 52;
const DELETE_MS = 34;
const HOLD_MS = 1800;
const BETWEEN_MS = 450;
const START_DELAY_MS = 650;

type SearchBarInputProps = {
  name?: string;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  animated?: boolean;
};

export function SearchBarInput({
  name = "q",
  className,
  defaultValue = "",
  placeholder = "Search problems, patterns, features...",
  animated = false,
}: SearchBarInputProps): JSX.Element {
  const [engaged, setEngaged] = useState(false);
  const [typingPlaceholder, setTypingPlaceholder] = useState("");

  const showAnimation = Boolean(animated && defaultValue === "" && !engaged);
  const effectivePlaceholder = showAnimation ? typingPlaceholder : placeholder;

  useEffect(() => {
    if (!showAnimation) {
      setTypingPlaceholder("");
      return;
    }

    let cancelled = false;

    const sleep = (ms: number): Promise<void> =>
      new Promise((resolve) => {
        setTimeout(resolve, ms);
      });

    const run = async (): Promise<void> => {
      await sleep(START_DELAY_MS);
      while (!cancelled) {
        for (const phrase of SUGGESTIONS) {
          for (let i = 1; i <= phrase.length && !cancelled; i++) {
            setTypingPlaceholder(phrase.slice(0, i));
            await sleep(TYPE_MS);
          }
          if (cancelled) return;
          await sleep(HOLD_MS);
          for (let i = phrase.length - 1; i >= 0 && !cancelled; i--) {
            setTypingPlaceholder(phrase.slice(0, i));
            await sleep(DELETE_MS);
          }
          if (cancelled) return;
          await sleep(BETWEEN_MS);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [showAnimation]);

  const handleFocus = (): void => {
    setEngaged(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length > 0) {
      setEngaged(true);
    }
  };

  return (
    <input
      name={name}
      className={className}
      defaultValue={defaultValue}
      placeholder={effectivePlaceholder}
      onFocus={handleFocus}
      onChange={handleChange}
    />
  );
}
