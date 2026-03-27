import type { JSX } from "react";
import { SearchBarInput } from "@/components/SearchBarInput";
import { withBasePath } from "@/lib/seo-config";

type SearchBarProps = {
  defaultValue?: string;
  action?: string;
  placeholder?: string;
  /** Typewriter-style placeholder until the user focuses or types (hero only). */
  animatedPlaceholder?: boolean;
};

export function SearchBar({
  defaultValue = "",
  action = withBasePath("/search"),
  placeholder = "Search problems, patterns, features...",
  animatedPlaceholder = false,
}: SearchBarProps): JSX.Element {
  return (
    <form action={action} method="get" className="search-form">
      <SearchBarInput
        name="q"
        className="text-input search-input"
        defaultValue={defaultValue}
        placeholder={placeholder}
        animated={animatedPlaceholder}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
