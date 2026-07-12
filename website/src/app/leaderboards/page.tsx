import { SiteShell } from "@/components/site-shell";
import { leaderboardRows } from "@/lib/content";

export default function LeaderboardsPage() {
  return (
    <SiteShell title="Competitive leaderboards and seasonal rankings" eyebrow="Progression">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/10 text-zinc-300">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardRows.map((row) => (
              <tr key={row.player} className="border-t border-white/10 text-zinc-200">
                <td className="px-4 py-3">{row.place}</td>
                <td className="px-4 py-3">{row.player}</td>
                <td className="px-4 py-3">{row.rating}</td>
                <td className="px-4 py-3">{row.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SiteShell>
  );
}
