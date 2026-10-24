"use client";

import { useState } from "react";
import { research } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Section, Sidenote } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/* ── Fig. 1: perception–distortion plane (PSNR vs LPIPS) ───────────── */
const W = 560;
const H = 340;
const PAD = { l: 62, r: 20, t: 20, b: 44 };
const X = { min: 23, max: 33 }; // PSNR dB
const Y = { min: 0.11, max: 0.26 }; // LPIPS (lower is better → top)
const sx = (v: number) => PAD.l + ((v - X.min) / (X.max - X.min)) * (W - PAD.l - PAD.r);
const sy = (v: number) => PAD.t + ((v - Y.min) / (Y.max - Y.min)) * (H - PAD.t - PAD.b);

const labelPos: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  Bicubic: { dx: 10, dy: 4, anchor: "start" },
  EDSR: { dx: 6, dy: 22, anchor: "start" },
  Waifu2x: { dx: -12, dy: 8, anchor: "end" },
  "Real-ESRGAN": { dx: 10, dy: 4, anchor: "start" },
  SwinIR: { dx: 2, dy: -14, anchor: "middle" },
};

function Figure1({ hover, setHover }: { hover: string | null; setHover: (m: string | null) => void }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="fig1-title">
      <title id="fig1-title">Head-mask PSNR versus LPIPS for five super-resolution methods</title>
      {/* ideal-corner shading */}
      <rect x={sx(30)} y={sy(0.11)} width={sx(33) - sx(30)} height={sy(0.16) - sy(0.11)} fill="var(--mark)" opacity="0.45" />
      <text x={sx(30) + 6} y={sy(0.16) - 6} textAnchor="start" className="fill-ink-2 font-mono text-[9px] uppercase tracking-wider">
        better ↗
      </text>
      {/* grid + ticks */}
      {[24, 26, 28, 30, 32].map((t) => (
        <g key={`x${t}`}>
          <line x1={sx(t)} x2={sx(t)} y1={PAD.t} y2={H - PAD.b} stroke="var(--rule)" />
          <text x={sx(t)} y={H - PAD.b + 16} textAnchor="middle" className="fill-ink-3 font-mono text-[10px]">
            {t}
          </text>
        </g>
      ))}
      {[0.14, 0.18, 0.22, 0.26].map((t) => (
        <g key={`y${t}`}>
          <line x1={PAD.l} x2={W - PAD.r} y1={sy(t)} y2={sy(t)} stroke="var(--rule)" />
          <text x={PAD.l - 8} y={sy(t) + 3} textAnchor="end" className="fill-ink-3 font-mono text-[10px]">
            {t.toFixed(2)}
          </text>
        </g>
      ))}
      <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} stroke="var(--rule-strong)" />
      <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} stroke="var(--rule-strong)" />
      <text x={(W + PAD.l) / 2} y={H - 8} textAnchor="middle" className="fill-ink-2 font-mono text-[10px]">
        Head-mask PSNR (dB) →
      </text>
      <text transform={`translate(13 ${(H - PAD.b + PAD.t) / 2}) rotate(-90)`} textAnchor="middle" className="fill-ink-2 font-mono text-[10px]">
        ← LPIPS (lower is better)
      </text>

      {/* arrow: bicubic → real-esrgan (loses fidelity) */}
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--red)" />
        </marker>
      </defs>
      <path
        d={`M ${sx(28.35) - 6} ${sy(0.24) - 2} Q ${sx(26)} ${sy(0.235)} ${sx(24.05) + 7} ${sy(0.207) + 4}`}
        fill="none"
        stroke="var(--red)"
        strokeDasharray="3 3"
        markerEnd="url(#arr)"
      />
      <text x={sx(26.1)} y={sy(0.247)} textAnchor="middle" className="fill-red font-mono text-[9px]">
        −4.30 dB
      </text>

      {research.results.map((r) => {
        const active = hover === r.method;
        const dim = hover && !active;
        const lp = labelPos[r.method];
        const isGan = r.type === "GAN";
        return (
          <g
            key={r.method}
            onMouseEnter={() => setHover(r.method)}
            onMouseLeave={() => setHover(null)}
            className="cursor-default transition-opacity"
            opacity={dim ? 0.3 : 1}
          >
            {r.type === "Interpolation" ? (
              <rect x={sx(r.psnr) - 5} y={sy(r.lpips) - 5} width="10" height="10" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            ) : (
              <circle
                cx={sx(r.psnr)}
                cy={sy(r.lpips)}
                r={active ? 8 : 6}
                fill={isGan ? "var(--red)" : r.type === "Transformer" ? "var(--ink)" : "var(--paper)"}
                stroke={isGan ? "var(--red)" : "var(--ink)"}
                strokeWidth="1.5"
              />
            )}
            <text
              x={sx(r.psnr) + lp.dx}
              y={sy(r.lpips) + lp.dy}
              textAnchor={lp.anchor}
              className={cn("font-serif text-[13px] italic", isGan ? "fill-red" : "fill-ink")}
            >
              {r.method}
            </text>
            <circle cx={sx(r.psnr)} cy={sy(r.lpips)} r="18" fill="transparent" />
          </g>
        );
      })}
    </svg>
  );
}

export function Research() {
  const [hover, setHover] = useState<string | null>(null);
  const best = {
    psnr: Math.max(...research.results.map((r) => r.psnr)),
    ssim: Math.max(...research.results.map((r) => r.ssim)),
    lpips: Math.min(...research.results.map((r) => r.lpips)),
    acc: Math.max(...research.results.map((r) => r.acc)),
  };

  return (
    <Section
      id="research"
      num="2"
      title="Research"
      aside={
        <>
          <Sidenote n={3}>
            <strong className="font-medium text-ink">Status.</strong> Under review at <em>{research.venue}</em>. Submission ID {research.submissionId}.
          </Sidenote>
          <Sidenote n={4}>
            Low-resolution inputs were generated once by antialiased bicubic downsampling, and every network ran with its released weights. Results describe
            transfer under an idealised degradation, not clinical performance.
          </Sidenote>
          <Reveal>
            <ul className="space-y-2 border-t border-rule pt-4 text-sm">
              {[
                ["Code · GitHub", research.links.code],
                ["Archive · Zenodo DOI", research.links.zenodo],
                ["Dataset · Kaggle", research.links.dataset],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} target="_blank" rel="noopener noreferrer" className="flex justify-between gap-2 border-b border-rule pb-2 hover:text-red">
                    {l} <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </>
      }
    >
      <Reveal>
        <p className="label">
          {research.role} · {research.period}
        </p>
        <h3 className="mt-3 max-w-3xl font-serif text-[1.65rem] leading-[1.15] tracking-tight sm:text-[2.1rem]">{research.title}</h3>
        <p className="mt-4 text-sm text-ink-2">
          <span className="text-ink underline decoration-red decoration-2 underline-offset-4">Mohammad Owais</span>
          <sup>*</sup> and Muhammad Owais — <span className="italic">AUST, Pakistan; Tokyo Metropolitan University, Japan</span>
        </p>
        <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-[1.75] text-ink-2">{research.summary}</p>
      </Reveal>

      {/* Table 1 */}
      <Reveal>
        <figure className="mt-12">
          <figcaption className="mb-3 text-sm text-ink-2">
            <span className="font-mono text-xs text-red">Table 1. </span>
            Overall results for five 4× super-resolution methods on 2,000 brain MRI slices (mean). <span className="font-semibold text-ink">Bold</span> marks
            the best in each column.
          </figcaption>
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="w-full min-w-[34rem] border-collapse text-sm tabular-nums">
              <thead>
                <tr className="border-y-[1.5px] border-rule-strong">
                  {["Method", "Type", "PSNR ↑", "SSIM ↑", "LPIPS ↓", "Acc. ↑", "Δ vs bicubic"].map((h, i) => (
                    <th key={h} className={cn("py-2.5 font-mono text-[11px] font-normal tracking-wide text-ink-2 uppercase", i < 2 ? "text-left" : "text-right")}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {research.results.map((r) => (
                  <tr
                    key={r.method}
                    onMouseEnter={() => setHover(r.method)}
                    onMouseLeave={() => setHover(null)}
                    className={cn("border-b border-rule transition-colors", hover === r.method && "bg-mark/40")}
                  >
                    <td className={cn("py-2.5 font-serif text-base", r.type === "GAN" && "text-red")}>{r.method}</td>
                    <td className="py-2.5 text-ink-3">{r.type}</td>
                    <td className={cn("py-2.5 text-right", r.psnr === best.psnr && "font-semibold")}>{r.psnr.toFixed(2)}</td>
                    <td className={cn("py-2.5 text-right", r.ssim === best.ssim && "font-semibold")}>{r.ssim.toFixed(3)}</td>
                    <td className={cn("py-2.5 text-right", r.lpips === best.lpips && "font-semibold")}>{r.lpips.toFixed(3)}</td>
                    <td className={cn("py-2.5 text-right", r.acc === best.acc && "font-semibold")}>{r.acc.toFixed(1)}%</td>
                    <td className={cn("py-2.5 text-right font-mono text-xs", (r.delta ?? 0) < 0 ? "text-red" : "text-ink-2")}>
                      {r.delta === undefined ? "—" : `${r.delta > 0 ? "+" : "−"}${Math.abs(r.delta).toFixed(2)} dB`}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-[1.5px] border-rule-strong">
                  <td colSpan={7} className="pt-2 text-xs text-ink-3">
                    PSNR/SSIM inside head mask; LPIPS full-frame (AlexNet). Accuracy: ResNet-18, 5 random splits; original HR slices {research.hrAccuracy}%. All
                    paired Wilcoxon p &lt; 0.001 (Bonferroni, 15 tests).
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </figure>
      </Reveal>

      {/* Figure 1 */}
      <Reveal>
        <figure className="mt-14 border-t border-rule pt-8">
          <Figure1 hover={hover} setHover={setHover} />
          <figcaption className="mt-3 max-w-[40rem] text-sm leading-relaxed text-ink-2">
            <span className="font-mono text-xs text-red">Fig. 1. </span>
            The perception–distortion plane. Pixel-loss models (○ CNN, ● Transformer) move up and right of bicubic (□). Real-ESRGAN (
            <span className="text-red">●</span>) gets a better LPIPS but drops <span className="text-red">4.30 dB</span> of fidelity, the signature of
            fabricated texture. Hover the table or the points to compare them.
          </figcaption>
        </figure>
      </Reveal>

      {/* Findings */}
      <Reveal>
        <div className="mt-14">
          <p className="label">Principal findings</p>
          <ol className="mt-4 max-w-[40rem] space-y-4">
            {research.highlights.map((h, i) => (
              <li key={h} className="grid grid-cols-[2rem_1fr] border-t border-rule pt-4 text-[0.98rem] leading-relaxed text-ink-2">
                <span className="font-serif text-xl italic text-red">{["i", "ii", "iii", "iv"][i]}.</span>
                <span>{h}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Section>
  );
}
