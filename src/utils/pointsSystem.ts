import { Player } from '../database/models';

export const POINT_MODES = ['Sword', 'Crystal', 'Axe', 'Netherite Pot', 'Mace', 'SMP Pot', 'UHC',
  'Vanilla', 'Boxing', 'Combo', 'Gapple', 'NoDebuff', 'BuildUHC', 'Bridge', 'Anchor', 'Bedwars', 'Skywars',
  'Cart PvP', 'Custom', 'SMP', 'Diamond Pot'];

export const TIER_POINTS: Record<string, number> = {
  'HT5': 50, 'HT4': 45, 'HT3': 40, 'HT2': 35, 'HT1': 30,
  'LT1': 25, 'LT2': 20, 'LT3': 15, 'LT4': 10, 'LT5': 5,
};

export const TIER_COLORS: Record<string, number> = {
  'HT5': 0x95A5A6, 'HT4': 0x2ECC71, 'HT3': 0x3498DB, 'HT2': 0x9B59B6, 'HT1': 0xC0392B,
  'LT1': 0xE74C3C, 'LT2': 0x8E44AD, 'LT3': 0x2980B9, 'LT4': 0x27AE60, 'LT5': 0x7F8C8D,
};

export const ALL_TIERS = ['HT5', 'HT4', 'HT3', 'HT2', 'HT1', 'LT1', 'LT2', 'LT3', 'LT4', 'LT5'];

const TIER_ORDER = ['HT5', 'HT4', 'HT3', 'HT2', 'HT1', 'LT1', 'LT2', 'LT3', 'LT4', 'LT5'];

export function compareTier(a: string, b: string): number {
  return TIER_ORDER.indexOf(a) - TIER_ORDER.indexOf(b);
}

export function getHighestTier(tiers: string[]): string {
  const filtered = tiers.filter(t => TIER_ORDER.includes(t));
  if (filtered.length === 0) return 'Unranked';
  return filtered.sort((a, b) => compareTier(a, b))[0];
}

export function calculatePoints(tiers: string[]): number {
  let total = 0;
  for (const t of tiers) {
    total += TIER_POINTS[t] || 0;
  }
  return total;
}

export async function upsertPlayer(discordId: string, data: Partial<{
  username: string; ign: string; verified: boolean; tierRoles: { mode: string; tier: string }[]
}>) {
  try {
    const tierList = (data.tierRoles || []).map(t => t.tier);
    const points = calculatePoints(tierList);
    await Player.findOneAndUpdate(
      { discordId },
      {
        $set: {
          username: data.username || '',
          ign: data.ign || '',
          verified: data.verified ?? false,
          points,
          tierRoles: data.tierRoles || [],
          lastUpdated: new Date(),
        },
      },
      { upsert: true, new: true }
    ).lean();
    return { points, tier: getHighestTier(tierList) };
  } catch {
    return { points: 0, tier: 'Unranked' };
  }
}

export async function updatePlayerRole(discordId: string, mode: string, tier: string, ign?: string) {
  const player = await Player.findOne({ discordId });
  const existing = player?.tierRoles?.find(t => t.mode === mode);
  const pts = TIER_POINTS[tier] || 0;

  const update: any = { $set: { lastUpdated: new Date() } };
  if (ign) update.$set.ign = ign;

  if (existing) {
    const oldPts = TIER_POINTS[existing.tier] || 0;
    update.$inc = { points: pts - oldPts };
    update.$set['tierRoles.$[elem].tier'] = tier;
    await Player.findOneAndUpdate(
      { discordId },
      update,
      { arrayFilters: [{ 'elem.mode': mode }], new: true }
    ).lean();
  } else {
    await Player.findOneAndUpdate(
      { discordId },
      {
        ...update,
        $inc: { points: pts },
        $push: { tierRoles: { mode, tier } },
      },
      { upsert: true, new: true }
    ).lean();
  }
  return { points: pts, tier };
}

export async function removePlayerRole(discordId: string, mode: string) {
  const player = await Player.findOne({ discordId });
  const existing = player?.tierRoles?.find(t => t.mode === mode);
  if (existing) {
    const pts = TIER_POINTS[existing.tier] || 0;
    await Player.findOneAndUpdate(
      { discordId },
      {
        $inc: { points: -pts },
        $pull: { tierRoles: { mode } },
        $set: { lastUpdated: new Date() },
      }
    ).lean();
  }
}

export async function addTierPoints(discordId: string, mode: string, tier: string, ign?: string) {
  await updatePlayerRole(discordId, mode, tier, ign);
}

export async function getPlayerByDiscordId(discordId: string) {
  try {
    return await Player.findOne({ discordId }).lean();
  } catch { return null; }
}

export async function getPlayerByMcName(name: string) {
  try {
    return await Player.findOne({ ign: { $regex: new RegExp(`^${name}$`, 'i') } }).lean();
  } catch { return null; }
}

export async function getAllPlayers() {
  try {
    return await Player.find({}).sort({ points: -1 }).lean();
  } catch { return []; }
}

export async function getPlayerCount() {
  try {
    return await Player.countDocuments({ points: { $gt: 0 } });
  } catch { return 0; }
}

export async function getLeaderboard() {
  try {
    return await Player.find({ points: { $gt: 0 } })
      .sort({ points: -1 })
      .limit(100)
      .lean();
  } catch { return []; }
}

export async function getAllPlayerData() {
  try {
    const all = await Player.find({}).lean();
    const map: Record<string, any> = {};
    for (const p of all) {
      map[p.discordId] = { points: p.points, ign: p.ign || p.username, modes: {} };
      for (const tr of p.tierRoles || []) {
        map[p.discordId].modes[tr.mode] = tr.tier;
      }
    }
    return map;
  } catch { return {}; }
}

export async function setPlayerIGN(discordId: string, ign: string) {
  try {
    await Player.findOneAndUpdate(
      { discordId },
      { $set: { ign, lastUpdated: new Date() } },
      { upsert: true }
    ).lean();
  } catch {}
}

export async function syncMember(discordId: string, username: string, tierRoles: { mode: string; tier: string }[]) {
  const tierList = tierRoles.map(t => t.tier);
  const points = calculatePoints(tierList);
  try {
    await Player.findOneAndUpdate(
      { discordId },
      {
        $set: {
          username,
          points,
          tierRoles,
          lastUpdated: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    ).lean();
  } catch {}
}
