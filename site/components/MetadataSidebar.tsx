import type { JSX } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { TagList } from "@/components/TagList";

type MetadataSidebarProps = {
  features: string[];
  careerPaths: string[];
  companies: string[];
  roles: string[];
  industries: string[];
  reusableHelpers: string[];
};

export function MetadataSidebar({
  features,
  careerPaths,
  companies,
  roles,
  industries,
  reusableHelpers
}: MetadataSidebarProps): JSX.Element {
  return (
    <aside className="section-card">
      <SectionHeader title="Metadata" description="How this problem maps to engineering work." />
      <p className="field-label">Features</p>
      <TagList items={features} />
      <p className="field-label">Career Paths</p>
      <TagList items={careerPaths} />
      <p className="field-label">Companies / Roles</p>
      <TagList items={[...companies, ...roles]} />
      <p className="field-label">Industries</p>
      <TagList items={industries} />
      <p className="field-label">Reusable Helpers</p>
      <TagList items={reusableHelpers} />
    </aside>
  );
}
