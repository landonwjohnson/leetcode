import type { JSX } from "react";
import { ConcatenationVisualizer } from "@/components/visualizers/ConcatenationVisualizer";
import { TwoSumVisualizer } from "@/components/visualizers/TwoSumVisualizer";

export type VisualizerComponent = () => JSX.Element;

export const visualizerRegistry: Record<string, VisualizerComponent> = {
  "concatenation-of-array": ConcatenationVisualizer,
  "two-sum": TwoSumVisualizer
};
