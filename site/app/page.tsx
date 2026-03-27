import type { Metadata } from "next";
import type { ReactElement } from "react";
import { BrowseStripSection } from "@/components/home/BrowseStripSection";
import { HeroSearchSection } from "@/components/home/HeroSearchSection";
import { HomeListColumns } from "@/components/home/HomeListColumns";
import { buildHomepageViewModel } from "@/lib/homepage";
import { withBasePath } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Interactive Algorithm Explanations",
  description:
    "Discover interactive algorithm walkthroughs, problem solutions, and practical engineering use cases across multiple languages.",
  alternates: {
    canonical: withBasePath("/")
  }
};

export default function HomePage(): ReactElement {
  const viewModel = buildHomepageViewModel();

  return (
    <>
      <HeroSearchSection hero={viewModel.hero} />
      {viewModel.browseSections.map((section) => (
        <BrowseStripSection key={section.id} section={section} />
      ))}
      <HomeListColumns lists={viewModel.lists} />
    </>
  );
}
