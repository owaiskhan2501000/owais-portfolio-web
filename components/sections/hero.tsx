import Image from "next/image";
import { keywords, profile, research } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

/**
 * Title page — laid out like the first page of a journal article:
 * masthead strip, title, author block, plain portrait (Fig. 0), abstract-style lede.
 */
export function Hero() {
  return (
    <section id="top" className="pt-14">
      {/* Masthead strip */}
      <div className="page">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-rule-strong py-3">
          <span className="label">Vol. 2 · No. 1 · October 2026</span>
          <span className="label hidden md:inline">Medical Image Analysis · Computer Vision</span>
          <span className="label">
            ORCID{" "}
            <a href={profile.socials.orcid} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-rule hover:decoration-red">
              0009-0005-2319-3284
            </a>
          </span>
        </div>
      </div>

      <div className="page">
        <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <p className="label flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-red" />
                Research portfolio · Undergraduate researcher
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 font-serif text-[3.1rem] leading-[0.95] font-[420] tracking-[-0.025em] sm:text-7xl lg:text-[6.4rem]">
                Mohammad
                <br />
                <em className="font-[350]">Owais</em>
                <span className="text-red">.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl font-serif text-xl leading-snug text-ink-2 sm:text-2xl md:text-[1.7rem]">
                I study when super-resolution networks can be <span className="marker text-ink">trusted on medical scans</span> — and when they quietly
                start inventing anatomy.
              </p>
            </Reveal>

            {/* Author / affiliation block */}
            <Reveal delay={0.18}>
              <dl className="mt-10 grid max-w-2xl grid-cols-2 border-t border-rule text-sm sm:grid-cols-4">
                {[
                  ["Affiliation", "AUST, Pakistan"],
                  ["Programme", "BS CS · 8th sem."],
                  ["Graduating", "March 2027"],
                  ["Seeking", "Funded MS, 2027"],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-rule py-3 pr-3">
                    <dt className="label">{k}</dt>
                    <dd className="mt-1 text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <a href="#research" className="group inline-flex items-center gap-2 bg-ink px-5 py-3 text-paper transition hover:bg-red">
                  Read the research <span className="transition group-hover:translate-y-0.5">↓</span>
                </a>
                <a href={`mailto:${profile.email}`} className="underline decoration-rule decoration-1 hover:decoration-red">
                  {profile.email}
                </a>
                <span className="text-ink-3">{profile.location}</span>
              </div>
            </Reveal>
          </div>

          {/* Plain portrait as "Figure 0" */}
          <Reveal delay={0.1}>
            <figure className="w-full max-w-[15rem] sm:max-w-[19rem] lg:mx-auto lg:mt-14">
              <div className="relative aspect-[4/5] overflow-hidden border border-rule-strong bg-paper-2">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 304px"
                  className="object-cover object-top grayscale-[15%]"
                />
              </div>
              <figcaption className="mt-3 text-[0.8125rem] leading-snug text-ink-2">
                <span className="font-mono text-[0.7rem] text-red">Fig. 0 </span>
                The author. First manuscript currently {research.status.toLowerCase()} at a Springer Nature SCIE journal.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* Keyword ticker — CSS keyframes, runs on desktop and mobile */}
      <div className="ticker overflow-hidden border-y border-rule-strong bg-paper-2 py-3" aria-label="Research keywords">
        <div className="ticker-track flex w-max">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {keywords.map((w) => (
                <li key={`${k}-${w}`} className="flex items-center whitespace-nowrap">
                  <span className="px-5 font-serif text-lg italic text-ink">{w}</span>
                  <span className="font-mono text-xs text-red">✶</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
