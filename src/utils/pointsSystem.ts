import { connectDB, PlayerModel } from './database';
import { logger } from './Logger';

export const POINT_MODES = ['Sword', 'Crystal', 'Axe', 'Netherite Pot', 'Mace', 'SMP Pot', 'UHC'];

export const TIER_POINTS: Record<string, number> = {
  'LT5': 10, 'HT5': 20,
  'LT4': 30, 'HT4': 40,
  'LT3': 50, 'HT3': 60,
  'LT2': 70, 'HT2': 80,
  'LT1': 90, 'HT1': 100,
};

function pointsToTier(points: number): string {
  if (points >= 100) return 'HT1';
  if (points >= 90) return 'LT1';
  if (points >= 80) return 'HT2';
  if (points >= 70) return 'LT2';
  if (points >= 60) return 'HT3';
  if (points >= 50) return 'LT3';
  if (points >= 40) return 'HT4';
  if (points >= 30) return 'LT4';
  if (points >= 20) return 'HT5';
  if (points >= 10) return 'LT5';
  return 'Unranked';
}

export async function setPlayerIGN(userId: string, ign: string) {
  await connectDB();
  try {
    await PlayerModel.findOneAndUpdate(
      { discordId: userId },
      { $set: { username: ign, displayName: ign, lastActive: new Date() }, $setOnInsert: { joinDate: new Date() } },
      { upsert: true }
    );
  } catch (e: any) { logger.error(`setPlayerIGN error: ${e.message}`); }
}

export async function getPlayerPoints(userId: string): Promise<number> {
  await connectDB();
  try {
    const p = await PlayerModel.findOne({ discordId: userId }).lean();
    return p?.points || 0;
  } catch { return 0; }
}

export async function addTierPoints(userId: string, mode: string, tier: string, ign?: string) {
  await connectDB();
  const pts = TIER_POINTS[tier] || 0;
  try {
    await PlayerModel.findOneAndUpdate(
      { discordId: userId },
      {
        $inc: { points: pts },
        $set: {
          [`stats.${mode}`]: { points: pts, tier, rank: 0 },
          lastActive: new Date(),
          ...(ign ? { username: ign, displayName: ign } : {}),
        },
        $setOnInsert: { joinDate: new Date(), roles: [], status: 'Offline' },
      },
      { upsert: true }
    );
    const player = await PlayerModel.findOne({ discordId: userId }).lean();
    if (player) {
      await PlayerModel.updateOne({ discordId: userId }, { $set: { tier: pointsToTier(player.points + pts) } });
    }
  } catch (e: any) { logger.error(`addTierPoints error: ${e.message}`); }
}

export async function getLeaderboard(): Promise<{ userId: string; ign: string; points: number }[]> {
  await connectDB();
  try {
    return (await PlayerModel.find({}).sort({ points: -1 }).limit(100).lean()).map(p => ({
      userId: p.discordId,
      ign: p.displayName || p.username || p.discordId,
      points: p.points || 0,
    }));
  } catch { return []; }
}

export async function getAllPlayerData(): Promise<Record<string, any>> {
  await connectDB();
  try {
    const players = await PlayerModel.find({}).lean();
    const map: Record<string, any> = {};
    for (const p of players) {
      map[p.discordId] = { points: p.points || 0, modes: Object.fromEntries(p.stats || new Map()), ign: p.displayName || p.username };
    }
    return map;
  } catch { return {}; }
}

async function getOrCreatePlayer(discordId: string, username: string): Promise<any> {
  await connectDB();
  try {
    return await PlayerModel.findOneAndUpdate(
      { discordId },
      { $set: { username, lastActive: new Date() }, $setOnInsert: { displayName: username, points: 0, tier: 'Unranked', roles: [], status: 'Offline', joinDate: new Date(), stats: new Map() } },
      { upsert: true, new: true }
    ).lean();
  } catch { return null; }
}

export async function syncGuildMembers(guild: any) {
  await connectDB();
  try {
    await guild.members.fetch();
    let count = 0;
    for (const [, m] of guild.members.cache) {
      if (m.user.bot) continue;
      const tierRoles: string[] = [];
      const statsMap: Record<string, any> = {};
      for (const role of m.roles.cache.values()) {
        const match = role.name.match(/◆ (.+?) • (LT[1-5]|HT[1-5])/);
        if (match) {
          tierRoles.push(role.name);
          statsMap[match[1].trim()] = { tier: match[2], points: TIER_POINTS[match[2]] || 0, rank: 0 };
        }
      }
      const totalPoints = Object.values(statsMap).reduce((sum: number, s: any) => sum + s.points, 0);
      await PlayerModel.findOneAndUpdate(
        { discordId: m.id },
        {
          $set: {
            username: m.user.username,
            displayName: m.displayName || m.user.username,
            avatar: m.user.displayAvatarURL(),
            status: m.presence?.status || 'Offline',
            roles: tierRoles,
            stats: statsMap,
            points: totalPoints,
            tier: pointsToTier(totalPoints),
            lastActive: new Date(),
          },
          $setOnInsert: { joinDate: new Date() },
        },
        { upsert: true }
      );
      count++;
    }
    logger.info(`📦 Synced ${count} members to MongoDB`);
  } catch (e: any) { logger.error(`syncGuildMembers error: ${e.message}`); }
}
