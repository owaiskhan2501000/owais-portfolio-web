import { certifications, publications, timeline } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Section, Sidenote } from "@/components/ui/section";

export function Experience() {
  return (
    <Section
      id="experience"
      num="4"
      title="Experience"
      aside={
        <Sidenote n={6}>
          Relevant coursework includes Artificial Intelligence, Digital Image Processing, Linear Algebra, Probability &amp; Statistics and Fundamentals of Data
          Mining.
        </Sidenote>
      }
    >
      {/* Timeline as a dated register */}
      <ol className="border-t border-rule-strong">
        {timeline.map((t) => (
          <Reveal key={t.title}>
            <li className="grid gap-x-8 gap-y-2 border-b border-rule py-6 md:grid-cols-[11rem_minmax(0,1fr)]">
              <p className="font-mono text-xs leading-6 text-ink-2">{t.period}</p>
              <div>
                <h3 className="font-serif text-xl leading-snug">{t.title}</h3>
                <p className="mt-1 text-sm italic text-ink-2">{t.org}</p>
                <p className="mt-2 max-w-[36rem] text-[0.95rem] leading-relaxed text-ink-2">{t.description}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        {/* References-style manuscript list */}
        <Reveal>
          <h3 className="label">Manuscripts</h3>
          {publications.map((p) => (
            <div key={p.title} className="mt-4 grid grid-cols-[2rem_1fr] border-t border-rule pt-4 text-[0.95rem] leading-relaxed">
              <span className="font-mono text-xs text-red">[1]</span>
              <div>
                <p className="text-ink-2">
                  <span className="text-ink">{p.authors}</span> ({p.year}). {p.title}. <em>{p.venue}</em>.
                </p>
                <p className="mt-2 font-mono text-[11px] text-ink-3">{p.status}</p>
                <p className="mt-2 space-x-4 text-sm">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="underline decoration-rule hover:decoration-red">
                      {l.label} ↗
                    </a>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.06}>
          <h3 className="label">Certifications</h3>
          <ul className="mt-4 border-t border-rule">
            {certifications.map((c) => (
              <li key={c.name} className="grid grid-cols-[3rem_1fr] border-b border-rule py-3 text-[0.95rem]">
                <span className="font-mono text-xs leading-6 text-ink-3">{c.year}</span>
                <span>
                  {c.name}
                  <span className="block text-xs text-ink-3">{c.issuer}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
