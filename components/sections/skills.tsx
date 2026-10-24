import { languages, skills } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Section, Sidenote } from "@/components/ui/section";

export function Skills() {
  return (
    <Section
      id="skills"
      num="5"
      title="Methods & tools"
      aside={<Sidenote n={7}>All experiments were run on Google Colab (CUDA, T4), and every release is archived on Zenodo.</Sidenote>}
    >
      <Reveal>
        <dl className="border-t border-rule-strong">
          {skills.map((s) => (
            <div key={s.group} className="grid gap-x-8 gap-y-2 border-b border-rule py-5 md:grid-cols-[13rem_minmax(0,1fr)]">
              <dt className="font-serif text-lg italic">{s.group}</dt>
              <dd className="leading-relaxed text-ink-2">
                {s.items.map((it, i) => (
                  <span key={it}>
                    <span className="text-ink">{it}</span>
                    {i < s.items.length - 1 && <span className="px-2 text-ink-3">·</span>}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal>
        <h3 className="label mt-14">Languages</h3>
        <ul className="mt-4 grid gap-6 border-t border-rule pt-5 sm:grid-cols-3">
          {languages.map((l) => (
            <li key={l.name}>
              <p className="flex items-baseline justify-between">
                <span className="font-serif text-xl">{l.name}</span>
                <span className="font-mono text-[11px] text-ink-3 uppercase">{l.level}</span>
              </p>
              {/* tally-mark style proficiency */}
              <div className="mt-2 flex gap-[3px]" aria-hidden>
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className={`h-3 flex-1 ${i < Math.round(l.value / 10) ? "bg-ink" : "bg-rule"}`} />
                ))}
              </div>
              <p className="mt-2 text-xs leading-snug text-ink-3">{l.detail}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
