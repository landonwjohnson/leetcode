"use client";

import type { JSX } from "react";
import type { ProblemRecord } from "@/types/content";
import { SnippetTabs } from "@/components/SnippetTabs";

type Props = {
  problem: ProblemRecord;
};

export function SolutionTabs({ problem }: Props): JSX.Element {
  return <SnippetTabs problem={problem} />;
}
