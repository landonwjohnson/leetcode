"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type JSX } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { repoGithubUrl, withBasePath } from "@/lib/seo-config";

type SiteHeaderRightProps = {
  searchPath: string;
};

export function SiteHeaderRight({ searchPath }: SiteHeaderRightProps): JSX.Element {
  const router = useRouter();
  const [kbdLabel, setKbdLabel] = useState("⌘K");

  useEffect((): void => {
    if (typeof navigator !== "undefined" && !navigator.platform.toLowerCase().includes("mac")) {
      setKbdLabel("Ctrl+K");
    }
  }, []);

  useEffect((): (() => void) => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        router.push(searchPath);
      }
    };
    document.addEventListener("keydown", onKey);
    return (): void => document.removeEventListener("keydown", onKey);
  }, [router, searchPath]);

  return (
    <div className="site-header-right">
      <Link href={searchPath} className="site-header-quick-search">
        <Search size={16} strokeWidth={2} aria-hidden />
        <span>Quick search</span>
        <kbd className="site-header-kbd">{kbdLabel}</kbd>
      </Link>
      <a href={repoGithubUrl} className="site-header-link-ghost" target="_blank" rel="noreferrer">
        GitHub
      </a>
      <Link href={withBasePath("/problems")} className="site-header-browse-all">
        Browse All
      </Link>
      <ThemeToggle />
    </div>
  );
}
