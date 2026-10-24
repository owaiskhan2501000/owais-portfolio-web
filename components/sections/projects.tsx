import { profile, projects } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Section, Sidenote } from "@/components/ui/section";

export function Projects() {
  return (
    <Section
      id="projects"
      num="3"
      title="Projects"
      aside={
        <>
          <Sidenote n={5}>
            The Final Year Project is supervised by Ms. Naveeda Bibi, Department of Computer Science, AUST.
          </Sidenote>
          <Reveal>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="label inline-block border-b border-rule pb-1 hover:text-red">
              All repositories on GitHub ↗
            </a>
          </Reveal>
        </>
      }
    >
      <ol className="border-t border-rule-strong">
        {projects.map((p, i) => {
          const href = "href" in p ? p.href : undefined;
          const Title = href ? "a" : "span";
          return (
            <Reveal key={p.title}>
              <li className="group grid gap-x-8 gap-y-4 border-b border-rule py-8 md:grid-cols-[3rem_minmax(0,1fr)_13rem]">
                <span className="font-mono text-sm text-ink-3 transition-colors group-hover:text-red">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="label">
                    {p.badge} · {p.period}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight tracking-tight sm:text-[1.85rem]">
                    <Title
                      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={href ? "decoration-red decoration-2 underline-offset-[6px] hover:underline" : undefined}
                    >
                      {p.title}
                      {href && <span className="ml-1 text-lg text-red">↗</span>}
                    </Title>
                  </h3>
                  <p className="mt-3 max-w-[38rem] leading-relaxed text-ink-2">{p.description}</p>
                  <p className="mt-4 font-mono text-[11px] text-ink-3">{p.tags.join("  /  ")}</p>
                </div>
                <ul className="space-y-1.5 text-sm text-ink-2 md:border-l md:border-rule md:pl-5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="text-red">–</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
