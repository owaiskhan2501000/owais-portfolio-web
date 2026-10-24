"use client";

import { useState } from "react";
import { profile, references } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { GithubIcon, LinkedinIcon, OrcidIcon } from "@/components/ui/brand-icons";

type Status = "idle" | "sending" | "sent" | "error";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    data.append("access_key", ACCESS_KEY);
    data.append("subject", `New portfolio message from ${data.get("name")}`);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full border-0 border-b border-rule-strong bg-transparent px-0 py-2.5 text-base outline-none transition placeholder:text-ink-3 focus:border-red focus:ring-0";

  return (
    <Section
      id="contact"
      num="6"
      title="Correspondence"
      aside={
        <Reveal>
          <p className="label">References</p>
          <ul className="mt-3 space-y-4 border-t border-rule pt-4 text-sm">
            {references.map((r) => (
              <li key={r.email}>
                <p className="font-serif text-base">{r.name}</p>
                <p className="text-xs leading-snug text-ink-3">{r.role}</p>
                <a href={`mailto:${r.email}`} className="mt-1 inline-block font-mono text-[11px] underline decoration-rule hover:text-red">
                  {r.email}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      }
    >
      <Reveal>
        <p className="max-w-[40rem] font-serif text-2xl leading-snug sm:text-[2rem]">
          I&apos;m looking for a <span className="marker">fully-funded MS or research position</span> in medical image analysis, starting 2027.
          Supervisors, labs and collaborators are very welcome to write.
        </p>
      </Reveal>

      <Reveal>
        <div className="mt-10 border-y border-rule-strong py-5">
          <p className="label">Corresponding author</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <a href={`mailto:${profile.email}`} className="break-all font-serif text-2xl italic hover:text-red sm:text-3xl">
              {profile.email}
            </a>
            <button type="button" onClick={copyEmail} className="label border border-rule px-2 py-1 hover:border-rule-strong hover:text-ink">
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
            {[
              { href: profile.socials.github, label: "GitHub", Icon: GithubIcon },
              { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
              { href: profile.socials.orcid, label: "ORCID", Icon: OrcidIcon },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-red">
                <Icon size={15} /> {label}
              </a>
            ))}
            <span className="text-ink-3">{profile.phone}</span>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <form onSubmit={onSubmit} className="mt-10 max-w-[40rem] space-y-6">
          <p className="label">Or leave a note</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Name</span>
              <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
            </label>
            <label className="block">
              <span className="sr-only">Email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="you@university.edu" className={field} />
            </label>
          </div>
          <label className="block">
            <span className="sr-only">Message</span>
            <textarea name="message" required rows={4} placeholder="About your lab, project or opportunity…" className={`${field} resize-none`} />
          </label>
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-ink px-6 py-3 text-sm text-paper transition hover:bg-red disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : status === "sent" ? "Sent — thank you ✓" : "Send note →"}
            </button>
            <p aria-live="polite" className="text-xs text-ink-3">
              {status === "error" ? <span className="text-red">Couldn&apos;t send. Please email me directly.</span> : "I usually reply within 48 hours."}
            </p>
          </div>
        </form>
      </Reveal>
    </Section>
  );
}
