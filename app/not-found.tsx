import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="label">Erratum · 404</p>
        <h1 className="mt-4 font-serif text-5xl italic tracking-tight">This page was never published.</h1>
        <p className="mt-4 text-ink-2">Not even SwinIR could reconstruct it.</p>
        <Link href="/" className="mt-8 inline-block bg-ink px-6 py-3 text-sm text-paper hover:bg-red">
          Back to the title page
        </Link>
      </div>
    </main>
  );
}
