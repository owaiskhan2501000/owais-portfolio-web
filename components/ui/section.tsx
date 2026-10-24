import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/**
 * A manuscript section: § number + title in the left margin,
 * body in the main column, optional sidenotes in the right margin.
 */
export function Section({
  id,
  num,
  title,
  aside,
  children,
}: {
  id: string;
  num: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="page">
      <div className="ms-grid gap-y-8 border-t border-rule-strong py-16 md:py-24">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="label">§ {num}</p>
          <h2 className="mt-2 font-serif text-[2rem] leading-none tracking-tight italic md:text-4xl lg:text-[1.65rem]">{title}</h2>
        </Reveal>
        <div className="min-w-0">{children}</div>
        <aside className="min-w-0 space-y-6 lg:pt-1">{aside}</aside>
      </div>
    </section>
  );
}

export function Sidenote({ n, children }: { n?: string | number; children: ReactNode }) {
  return (
    <Reveal>
      <p className="border-l border-red pl-3 text-[0.8125rem] leading-relaxed text-ink-2">
        {n !== undefined && <sup className="mr-1 font-mono text-[0.65rem] text-red">{n}</sup>}
        {children}
      </p>
    </Reveal>
  );
}
