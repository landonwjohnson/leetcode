import Link from "next/link";
import type { JSX } from "react";
import { HomeListItemRow } from "@/components/home/HomeListItemRow";
import type { HomepageViewModel } from "@/types/content";

type HomeListColumnsProps = {
  lists: HomepageViewModel["lists"];
};

export function HomeListColumns({ lists }: HomeListColumnsProps): JSX.Element {
  return (
    <section className="section-card">
      <div className="home-columns">
        <article className="home-list-panel">
          <div className="home-list-panel-head">
            <h3>
              <span className="home-list-dot home-list-dot--blue" aria-hidden />
              Useful Problems
            </h3>
            <Link href="/problems">See all</Link>
          </div>
          {lists.usefulProblems.map((item) => (
            <HomeListItemRow
              key={item.id}
              href={item.href}
              title={item.title}
              subtitle={item.subtitle}
              badges={item.badges}
              variant="useful"
            />
          ))}
        </article>
        <article className="home-list-panel">
          <div className="home-list-panel-head">
            <h3>
              <span className="home-list-dot home-list-dot--green" aria-hidden />
              Common Patterns
            </h3>
            <Link href="/problems">See all</Link>
          </div>
          {lists.commonPatterns.map((item) => (
            <HomeListItemRow
              key={item.id}
              href={item.href}
              title={item.title}
              subtitle={item.subtitle}
              trailing={`${item.count} uses`}
              variant="pattern"
            />
          ))}
        </article>
        <article className="home-list-panel">
          <div className="home-list-panel-head">
            <h3>
              <span className="home-list-dot home-list-dot--amber" aria-hidden />
              Recent Additions
            </h3>
            <Link href="/problems">See all</Link>
          </div>
          {lists.recentAdditions.map((item) => (
            <HomeListItemRow
              key={item.id}
              href={item.href}
              title={item.title}
              subtitle={item.subtitle}
              trailing={item.ageLabel}
              variant="recent"
            />
          ))}
        </article>
      </div>
    </section>
  );
}
