import { about, profile } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { Section, Sidenote } from "@/components/ui/section";

export function Abstract() {
  return (
    <Section
      id="abstract"
      num="1"
      title="Abstract"
      aside={
        <>
          <Sidenote n={1}>
            Co-author: Muhammad Owais, Faculty of Systems Design, Tokyo Metropolitan University, Japan.
          </Sidenote>
          <Sidenote n={2}>
            Every number on this page comes from the manuscript and its public Zenodo archive.
          </Sidenote>
        </>
      }
    >
      <div className="max-w-[38rem] space-y-5 text-[1.0625rem] leading-[1.75] text-ink-2">
        <Reveal>
          <p className="dropcap text-ink">{about.paragraphs[0]}</p>
        </Reveal>
        <Reveal>
          <p>
            {about.paragraphs[1].split("Tokyo Metropolitan University")[0]}Tokyo Metropolitan University<sup className="font-mono text-[0.65rem] text-red">1</sup>
            {about.paragraphs[1].split("Tokyo Metropolitan University")[1]}
          </p>
        </Reveal>
        <Reveal>
          <p>
            {about.paragraphs[2]}
            <sup className="font-mono text-[0.65rem] text-red">2</sup>
          </p>
        </Reveal>
      </div>

      <Reveal>
        <p className="label mt-12">Keywords</p>
        <p className="mt-2 max-w-[38rem] font-serif text-lg italic leading-relaxed">
          {about.interests.join(" · ")}
        </p>
      </Reveal>

      {/* Figures at a glance */}
      <Reveal>
        <dl className="mt-12 grid grid-cols-2 border-t border-rule-strong md:grid-cols-4">
          {about.stats.map((s, i) => (
            <div key={s.label} className={`border-b border-rule py-5 pr-4 ${i % 2 === 0 ? "" : "pl-4 md:pl-0"} md:border-b-0 md:pl-4 md:first:pl-0 md:[&:not(:last-child)]:border-r md:border-rule`}>
              <dt className="label">{s.label}</dt>
              <dd className="mt-2 font-serif text-4xl tracking-tight tabular-nums">
                <Counter to={s.value} decimals={"decimals" in s ? s.decimals : 0} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <p className="sr-only">Contact: {profile.email}</p>
    </Section>
  );
}
