import { Guild, GuildMember } from 'discord.js';
import { syncMember } from './pointsSystem';

const TIER_PATTERN = /◆ (.+?) • (LT[1-5]|HT[1-5])/;
const TIER_ORDER = ['HT5', 'HT4', 'HT3', 'HT2', 'HT1', 'LT1', 'LT2', 'LT3', 'LT4', 'LT5'];

function compareTier(a: string, b: string): number {
  return TIER_ORDER.indexOf(a) - TIER_ORDER.indexOf(b);
}

export function extractTierRolesFromMember(member: GuildMember): { mode: string; tier: string }[] {
  const tiers: Record<string, string> = {};
  for (const role of member.roles.cache.values()) {
    const m = role.name.match(TIER_PATTERN);
    if (m) {
      const mode = m[1].trim();
      const tier = m[2];
      if (!tiers[mode] || compareTier(tier, tiers[mode]) > 0) {
        tiers[mode] = tier;
      }
    }
  }
  return Object.entries(tiers).map(([mode, tier]) => ({ mode, tier }));
}

export async function syncAllMembers(guild: Guild): Promise<void> {
  try {
    await guild.members.fetch();
    const members = guild.members.cache.filter(m => !m.user.bot);
    let count = 0;
    for (const [, member] of members) {
      const tierRoles = extractTierRolesFromMember(member);
      await syncMember(member.id, member.user.username, tierRoles);
      count++;
    }
    console.log(`✅ Synced ${count} members from ${guild.name}`);
  } catch (e: any) {
    console.error(`❌ Sync failed for ${guild.name}: ${e.message}`);
  }
}
