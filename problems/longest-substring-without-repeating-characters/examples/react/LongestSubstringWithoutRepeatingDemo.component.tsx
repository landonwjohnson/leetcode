import { useMemo, useState } from "react";
import type { JSX } from "react";

/**
 * Returns the longest substring of `input` that has no repeated characters.
 */
function getLongestSubstringWithoutRepeating(input: string): string {
  const lastSeen = new Map<string, number>();
  let left = 0;
  let maxStart = 0;
  let maxLength = 0;

  for (let right = 0; right < input.length; right++) {
    const char = input[right];

    if (lastSeen.has(char) && lastSeen.get(char)! >= left) {
      left = lastSeen.get(char)! + 1;
    }

    lastSeen.set(char, right);

    const currentLength = right - left + 1;

    if (currentLength > maxLength) {
      maxLength = currentLength;
      maxStart = left;
    }
  }

  return input.slice(maxStart, maxStart + maxLength);
}

export default function LongestSubstringWithoutRepeatingDemo(): JSX.Element {
  const [value, setValue] = useState<string>("");

  const longestSubstring = useMemo((): string => {
    return getLongestSubstringWithoutRepeating(value);
  }, [value]);

  return (
    <div style={{ padding: "1rem", maxWidth: "500px" }}>
      <h2>Longest Substring Without Repeating Characters</h2>

      <label htmlFor="longest-substring-demo-input">Type something:</label>
      <input
        id="longest-substring-demo-input"
        type="text"
        value={value}
        onChange={(event): void => {
          setValue(event.target.value);
        }}
        placeholder="Try typing pwwkew or abcabcbb"
        style={{
          display: "block",
          width: "100%",
          marginTop: "0.5rem",
          padding: "0.5rem",
        }}
      />

      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Input:</strong> {value || "(empty)"}
        </p>
        <p>
          <strong>Longest substring:</strong>{" "}
          {longestSubstring || "(none yet)"}
        </p>
        <p>
          <strong>Length:</strong> {longestSubstring.length}
        </p>
      </div>
    </div>
  );
}
