"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "day" : "night"} reading mode`}
      className="px-2 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-3 transition hover:text-ink"
    >
      {mounted ? (isDark ? "☀ Day" : "☾ Night") : "☾ Night"}
    </button>
  );
}
