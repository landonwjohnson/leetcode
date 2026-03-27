"use client";

import { useCallback, useState, type JSX } from "react";

type CopyCodeButtonProps = {
  code: string;
  disabled?: boolean;
};

export function CopyCodeButton({ code, disabled = false }: CopyCodeButtonProps): JSX.Element {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const onCopy = useCallback((): void => {
    if (!code || disabled) return;
    void navigator.clipboard.writeText(code).then(
      (): void => {
        setStatus("copied");
        window.setTimeout((): void => setStatus("idle"), 2000);
      },
      (): void => {
        setStatus("error");
        window.setTimeout((): void => setStatus("idle"), 2500);
      }
    );
  }, [code, disabled]);

  const inactive = !code.trim() || disabled;
  const label =
    status === "copied" ? "Copied!" : status === "error" ? "Copy failed" : "Copy";

  return (
    <button
      type="button"
      className="code-block-copy-btn"
      onClick={onCopy}
      disabled={inactive || status === "copied"}
      aria-label="Copy code to clipboard"
    >
      {label}
    </button>
  );
}
