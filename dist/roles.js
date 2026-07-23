"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HARVAL_ROLE_PREFIX = exports.STAFF_EMOJI_PREFIX = exports.ALL_ROLES = exports.TIERS = exports.MODES = void 0;
exports.getTierRoleName = getTierRoleName;
const textStyles_1 = require("./utils/textStyles");
exports.MODES = [
    'Sword', 'Crystal', 'SMP', 'Netherite Pot', 'Diamond Pot',
    'BuildUHC', 'UHC', 'NoDebuff', 'Gapple', 'Combo',
    'Boxing', 'Bridge', 'Anchor', 'Mace', 'Axe',
    'Cart PvP', 'Vanilla', 'Bedwars', 'Skywars', 'Custom',
];
exports.TIERS = [
    { name: 'LT5', color: 0x7F8C8D },
    { name: 'HT5', color: 0x95A5A6 },
    { name: 'LT4', color: 0x27AE60 },
    { name: 'HT4', color: 0x2ECC71 },
    { name: 'LT3', color: 0x2980B9 },
    { name: 'HT3', color: 0x3498DB },
    { name: 'LT2', color: 0x8E44AD },
    { name: 'HT2', color: 0x9B59B6 },
    { name: 'LT1', color: 0xE74C3C },
    { name: 'HT1', color: 0xC0392B },
];
const STAFF_DEFS = [
    { emoji: '👑', name: 'Founder' },
    { emoji: '👑', name: 'Co-Founder' },
    { emoji: '⚡', name: 'Lead Developer' },
    { emoji: '⚡', name: 'Developer' },
    { emoji: '🌐', name: 'Network Manager' },
    { emoji: '🛡️', name: 'Head Administrator' },
    { emoji: '🛡️', name: 'Administrator' },
    { emoji: '🔰', name: 'Senior Moderator' },
    { emoji: '🔰', name: 'Moderator' },
    { emoji: '🔰', name: 'Trial Moderator' },
    { emoji: '⚔️', name: 'Head Tier Tester' },
    { emoji: '⚔️', name: 'Senior Tier Tester' },
    { emoji: '⚔️', name: 'Tier Tester' },
    { emoji: '⚔️', name: 'Trial Tier Tester' },
    { emoji: '💎', name: 'Support Team' },
    { emoji: '🔨', name: 'Builder' },
    { emoji: '🎬', name: 'Media Team' },
    { emoji: '✅', name: 'Verified' },
    { emoji: '👤', name: 'Member' },
    { emoji: '🔇', name: 'Muted' },
    { emoji: '🤖', name: 'Bot' },
];
exports.ALL_ROLES = [
    ...exports.MODES.flatMap(mode => exports.TIERS.map(tier => ({
        name: (0, textStyles_1.formatTierRole)(mode, tier.name),
        color: tier.color,
    }))),
    ...STAFF_DEFS.map(sd => ({
        name: (0, textStyles_1.formatStaffRoleName)(sd.emoji, sd.name),
        color: 0,
    })),
];
exports.STAFF_EMOJI_PREFIX = /^(👑|⚡|🌐|🛡️|🔰|⚔️|💎|🔨|🎬)/;
exports.HARVAL_ROLE_PREFIX = /^◆ /;
function getTierRoleName(mode, tier) {
    return (0, textStyles_1.formatTierRole)(mode, tier);
}
