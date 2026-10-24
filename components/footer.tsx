import { profile } from "@/lib/data";

/** Colophon — the small print at the end of a journal. */
export function Footer() {
  return (
    <footer className="page border-t-[3px] border-double border-rule-strong py-10">
      <div className="grid gap-6 text-sm text-ink-2 md:grid-cols-3">
        <div>
          <p className="label">Colophon</p>
          <p className="mt-2 leading-relaxed">
            Set in Fraunces &amp; IBM Plex. Built with Next.js, Tailwind CSS and Motion.
          </p>
        </div>
        <div>
          <p className="label">Cite this page</p>
          <p className="mt-2 font-mono text-[11px] leading-relaxed">
            Owais, M. ({new Date().getFullYear()}). <em>Research portfolio</em>. owais-portfolio-web.vercel.app
          </p>
        </div>
        <div className="md:text-right">
          <p className="label">© {new Date().getFullYear()} {profile.name}</p>
          <a href="#top" className="mt-2 inline-block underline decoration-rule hover:text-red">
            Return to title page ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
