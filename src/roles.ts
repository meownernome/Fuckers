import { formatTierRole, formatStaffRoleName } from './utils/textStyles';

export const MODES = [
  'Sword', 'Crystal', 'SMP', 'Netherite Pot', 'Diamond Pot',
  'BuildUHC', 'UHC', 'NoDebuff', 'Gapple', 'Combo',
  'Boxing', 'Bridge', 'Anchor', 'Mace', 'Axe',
  'Cart PvP', 'Vanilla', 'Bedwars', 'Skywars', 'Custom',
];

export const TIERS: { name: string; color: number }[] = [
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

interface StaffRoleDef { emoji: string; name: string }

const STAFF_DEFS: StaffRoleDef[] = [
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

export const ALL_ROLES: { name: string; color: number }[] = [
  ...MODES.flatMap(mode =>
    TIERS.map(tier => ({
      name: formatTierRole(mode, tier.name),
      color: tier.color,
    }))
  ),
  ...STAFF_DEFS.map(sd => ({
    name: formatStaffRoleName(sd.emoji, sd.name),
    color: 0 as number,
  })),
];

export const STAFF_EMOJI_PREFIX = /^(👑|⚡|🌐|🛡️|🔰|⚔️|💎|🔨|🎬)/;

export const HARVAL_ROLE_PREFIX = /^◆ /;

export function getTierRoleName(mode: string, tier: string): string {
  return formatTierRole(mode, tier);
}
