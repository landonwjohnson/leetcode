"use client";

import { useEffect, useState, type JSX } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "algoref-theme";

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("theme-light");
  } else {
    root.classList.remove("theme-light");
  }
}

export function ThemeToggle(): JSX.Element {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect((): void => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const nextTheme: Theme = saved === "light" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function onToggle(): void {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  return (
    <button type="button" className="theme-toggle-button" onClick={onToggle} aria-label="Toggle dark and light theme">
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
