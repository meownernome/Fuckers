import { SiteShell } from "@/components/site-shell";
import { playerProfiles } from "@/lib/content";

export default function PlayersPage() {
  return (
    <SiteShell title="Player profiles and showcase cards" eyebrow="Community hub">
      <section className="grid gap-4 md:grid-cols-3">
        {playerProfiles.map((player) => (
          <article key={player.name} className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{player.name}</h2>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm text-cyan-300">
                {player.status}
              </span>
            </div>
            <p className="mt-4 text-sm text-zinc-400">Rank: {player.rank}</p>
            <p className="mt-1 text-sm text-zinc-400">Tier: {player.tier}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
