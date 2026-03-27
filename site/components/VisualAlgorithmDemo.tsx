"use client";

import type { JSX } from "react";
import { visualizerRegistry } from "@/components/visualizers";

type Props = {
  slug: string;
};

export function VisualAlgorithmDemo({ slug }: Props): JSX.Element | null {
  const Demo = visualizerRegistry[slug];
  if (Demo) return <Demo />;

  return null;
}
