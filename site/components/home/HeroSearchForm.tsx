import { ChevronDown, Search } from "lucide-react";
import type { JSX } from "react";
import { SearchBarInput } from "@/components/SearchBarInput";
import { withBasePath } from "@/lib/seo-config";

export function HeroSearchForm(): JSX.Element {
  return (
    <form action={withBasePath("/search")} method="get" className="search-form-hero">
      <span className="search-form-hero-icon" aria-hidden>
        <Search size={20} strokeWidth={2} />
      </span>
      <SearchBarInput name="q" className="search-input-hero" placeholder="Search…" animated />
      <span className="search-form-hero-chevron" aria-hidden title="Filters on search page">
        <ChevronDown size={18} strokeWidth={2} />
      </span>
      <button type="submit" className="search-button-hero">
        Search
      </button>
    </form>
  );
}
