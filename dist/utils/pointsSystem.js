"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIER_POINTS = exports.POINT_MODES = void 0;
exports.setPlayerIGN = setPlayerIGN;
exports.getPlayerPoints = getPlayerPoints;
exports.addTierPoints = addTierPoints;
exports.getLeaderboard = getLeaderboard;
exports.getAllPlayerData = getAllPlayerData;
exports.syncGuildMembers = syncGuildMembers;
const database_1 = require("./database");
const Logger_1 = require("./Logger");
exports.POINT_MODES = ['Sword', 'Crystal', 'Axe', 'Netherite Pot', 'Mace', 'SMP Pot', 'UHC'];
exports.TIER_POINTS = {
    'LT5': 10, 'HT5': 20,
    'LT4': 30, 'HT4': 40,
    'LT3': 50, 'HT3': 60,
    'LT2': 70, 'HT2': 80,
    'LT1': 90, 'HT1': 100,
};
function pointsToTier(points) {
    if (points >= 100)
        return 'HT1';
    if (points >= 90)
        return 'LT1';
    if (points >= 80)
        return 'HT2';
    if (points >= 70)
        return 'LT2';
    if (points >= 60)
        return 'HT3';
    if (points >= 50)
        return 'LT3';
    if (points >= 40)
        return 'HT4';
    if (points >= 30)
        return 'LT4';
    if (points >= 20)
        return 'HT5';
    if (points >= 10)
        return 'LT5';
    return 'Unranked';
}
async function setPlayerIGN(userId, ign) {
    await (0, database_1.connectDB)();
    try {
        await database_1.PlayerModel.findOneAndUpdate({ discordId: userId }, { $set: { username: ign, displayName: ign, lastActive: new Date() }, $setOnInsert: { joinDate: new Date() } }, { upsert: true });
    }
    catch (e) {
        Logger_1.logger.error(`setPlayerIGN error: ${e.message}`);
    }
}
async function getPlayerPoints(userId) {
    await (0, database_1.connectDB)();
    try {
        const p = await database_1.PlayerModel.findOne({ discordId: userId }).lean();
        return p?.points || 0;
    }
    catch {
        return 0;
    }
}
async function addTierPoints(userId, mode, tier, ign) {
    await (0, database_1.connectDB)();
    const pts = exports.TIER_POINTS[tier] || 0;
    try {
        await database_1.PlayerModel.findOneAndUpdate({ discordId: userId }, {
            $inc: { points: pts },
            $set: {
                [`stats.${mode}`]: { points: pts, tier, rank: 0 },
                lastActive: new Date(),
                ...(ign ? { username: ign, displayName: ign } : {}),
            },
            $setOnInsert: { joinDate: new Date(), roles: [], status: 'Offline' },
        }, { upsert: true });
        const player = await database_1.PlayerModel.findOne({ discordId: userId }).lean();
        if (player) {
            await database_1.PlayerModel.updateOne({ discordId: userId }, { $set: { tier: pointsToTier(player.points + pts) } });
        }
    }
    catch (e) {
        Logger_1.logger.error(`addTierPoints error: ${e.message}`);
    }
}
async function getLeaderboard() {
    await (0, database_1.connectDB)();
    try {
        return (await database_1.PlayerModel.find({}).sort({ points: -1 }).limit(100).lean()).map(p => ({
            userId: p.discordId,
            ign: p.displayName || p.username || p.discordId,
            points: p.points || 0,
        }));
    }
    catch {
        return [];
    }
}
async function getAllPlayerData() {
    await (0, database_1.connectDB)();
    try {
        const players = await database_1.PlayerModel.find({}).lean();
        const map = {};
        for (const p of players) {
            map[p.discordId] = { points: p.points || 0, modes: Object.fromEntries(p.stats || new Map()), ign: p.displayName || p.username };
        }
        return map;
    }
    catch {
        return {};
    }
}
async function getOrCreatePlayer(discordId, username) {
    await (0, database_1.connectDB)();
    try {
        return await database_1.PlayerModel.findOneAndUpdate({ discordId }, { $set: { username, lastActive: new Date() }, $setOnInsert: { displayName: username, points: 0, tier: 'Unranked', roles: [], status: 'Offline', joinDate: new Date(), stats: new Map() } }, { upsert: true, new: true }).lean();
    }
    catch {
        return null;
    }
}
async function syncGuildMembers(guild) {
    await (0, database_1.connectDB)();
    try {
        await guild.members.fetch();
        let count = 0;
        for (const [, m] of guild.members.cache) {
            if (m.user.bot)
                continue;
            const tierRoles = [];
            const statsMap = {};
            for (const role of m.roles.cache.values()) {
                const match = role.name.match(/◆ (.+?) • (LT[1-5]|HT[1-5])/);
                if (match) {
                    tierRoles.push(role.name);
                    statsMap[match[1].trim()] = { tier: match[2], points: exports.TIER_POINTS[match[2]] || 0, rank: 0 };
                }
            }
            const totalPoints = Object.values(statsMap).reduce((sum, s) => sum + s.points, 0);
            await database_1.PlayerModel.findOneAndUpdate({ discordId: m.id }, {
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
            }, { upsert: true });
            count++;
        }
        Logger_1.logger.info(`📦 Synced ${count} members to MongoDB`);
    }
    catch (e) {
        Logger_1.logger.error(`syncGuildMembers error: ${e.message}`);
    }
}
