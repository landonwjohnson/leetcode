import type { JSX } from "react";

type Props = {
  points: string[];
};

export function UseCaseExample({ points }: Props): JSX.Element {
  return (
    <section className="section-card">
      <h2>Practical Use Cases</h2>
      <ul>
        {points.map((point: string): JSX.Element => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
