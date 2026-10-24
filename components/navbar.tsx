"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

/** Running header — like the header line printed on every page of a journal. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={cn("no-print fixed inset-x-0 top-0 z-50 bg-paper/90 backdrop-blur-sm transition-shadow", scrolled && "shadow-[0_1px_0_var(--rule)]")}>
      <nav className="page flex h-14 items-center justify-between gap-6" aria-label="Primary">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-serif text-lg italic leading-none">M. Owais</span>
          <span className="label hidden sm:inline">— Portfolio, 2026</span>
        </a>

        <ol className="hidden items-center lg:flex">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "group flex items-baseline gap-1.5 px-3 py-2 text-[13px] transition-colors",
                  active === item.id ? "text-ink" : "text-ink-3 hover:text-ink",
                )}
              >
                <span className={cn("font-mono text-[10px]", active === item.id ? "text-red" : "text-ink-3")}>{i + 1}</span>
                <span className={cn(active === item.id && "underline decoration-red decoration-2 underline-offset-[6px]")}>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden border border-rule-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition hover:bg-ink hover:text-paper sm:inline-block"
          >
            CV ↗
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="px-2 py-1.5 font-mono text-[11px] uppercase tracking-wider lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Index"}
          </button>
        </div>
      </nav>
      <motion.div style={{ scaleX: progress }} className="h-[2px] origin-left bg-red" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-3.5rem)] bg-paper lg:hidden"
          >
            <ol className="page pt-6">
              <li className="label pb-3">Contents</li>
              {navItems.map((item, i) => (
                <li key={item.id} className="border-t border-rule">
                  <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4">
                    <span className="font-serif text-3xl italic">{item.label}</span>
                    <span className="font-mono text-xs text-ink-3">§ {i + 1}</span>
                  </a>
                </li>
              ))}
              <li className="border-t border-rule pt-6">
                <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="inline-block border border-rule-strong px-4 py-2 font-mono text-xs uppercase tracking-wider">
                  Download CV ↗
                </a>
              </li>
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
