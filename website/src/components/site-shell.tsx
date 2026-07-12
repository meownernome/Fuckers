import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/players", label: "Players" },
  { href: "/leaderboards", label: "Leaderboards" },
  { href: "/staff", label: "Staff" },
  { href: "/news", label: "News" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteShell({
  children,
  title,
  eyebrow,
}: {
  children: ReactNode;
  title: string;
  eyebrow: string;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#030712_0%,_#0f172a_50%,_#111827_100%)] text-zinc-100">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/10 text-lg font-semibold text-cyan-300">
              H
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Harval MC
              </p>
              <p className="text-xs text-zinc-400">PvP • Community • Progression</p>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-300">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10 lg:px-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
        </section>

        {children}
      </main>

      <footer className="border-t border-white/10 bg-black/30 px-6 py-8 text-sm text-zinc-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>Harval MC • Built to connect your Discord, Minecraft, and community data.</p>
          <p>Live panels, rank systems, and staff tools in one place.</p>
        </div>
      </footer>
    </div>
  );
}
