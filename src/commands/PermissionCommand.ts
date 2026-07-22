import { MessageFlags, SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits, EmbedBuilder, Guild, Role } from 'discord.js';
import { logger } from '../utils/Logger';
import { CATEGORIES } from '../ServerSetup';

const CATEGORY_PERMS: Record<string, { everyone: boolean; staff?: boolean; admin?: boolean }> = {
  information: { everyone: true },
  community:   { everyone: true },
  support:     { everyone: true },
  'tier-testing': { everyone: true },
  tickets:     { everyone: false, staff: true },
  leaderboards: { everyone: true },
  staff:       { everyone: false, staff: true },
  logs:        { everyone: false, staff: true },
  voice:       { everyone: true },
};

function findStaffRoles(guild: Guild): { high: Role[]; medium: Role[]; low: Role[] } {
  const roles = guild.roles.cache;
  const high: Role[] = [];
  const medium: Role[] = [];
  const low: Role[] = [];
  for (const r of roles.values()) {
    if (r.name.match(/^(👑|⚡|🌐|🛡️|💎)/)) { high.push(r); continue; }
    if (r.name.match(/^(🔰|⚔️|🔨|🎬)/)) { medium.push(r); continue; }
    const lower = ['✅ Verified', '👤 Member', '🔇 Muted', '🤖 Bot'];
    if (lower.includes(r.name)) continue;
    if (r.name.startsWith('「 ✦')) continue;
    if (r.name !== '@everyone' && !r.managed) low.push(r);
  }
  return { high, medium, low };
}

export class PermissionCommand {
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const guild = interaction.guild!;
    await guild.roles.fetch();
    const staffRoles = findStaffRoles(guild);

    let updated = 0;
    let failed = 0;

    for (const channel of guild.channels.cache.values()) {
      if (channel.type === ChannelType.GuildCategory || channel.type === ChannelType.PublicThread ||
          channel.type === ChannelType.PrivateThread || channel.type === ChannelType.AnnouncementThread) continue;

      const parent = channel.parent;
      if (!parent) continue;

      const catEntry = CATEGORIES.find(c => parent.name === c.name);
      const catKey = catEntry?.key;
      if (!catKey) continue;

      const perms = CATEGORY_PERMS[catKey];
      if (!perms) continue;

      try {
        const everyone = guild.roles.everyone;
        const overwrites: { id: string; allow: bigint[]; deny: bigint[] }[] = [];

        if (perms.everyone) {
          overwrites.push({ id: everyone.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [] });
        } else {
          overwrites.push({ id: everyone.id, allow: [], deny: [PermissionFlagsBits.ViewChannel] });
          if (perms.staff) {
            for (const r of [...staffRoles.high, ...staffRoles.medium]) {
              overwrites.push({ id: r.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages], deny: [] });
            }
          }
          if (perms.admin) {
            for (const r of staffRoles.high) {
              overwrites.push({ id: r.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels], deny: [] });
            }
          }
        }

        for (const ov of overwrites) {
          await (channel as any).permissionOverwrites.edit(ov.id, { ViewChannel: ov.deny.includes(PermissionFlagsBits.ViewChannel) ? false : ov.allow.includes(PermissionFlagsBits.ViewChannel) ? true : null } as any, { reason: 'Permission sync' });
        }

        updated++;
      } catch (e: any) {
        failed++;
        logger.error(`Perm fail #${channel.name}: ${e.message}`);
      }
    }

    const embed = new EmbedBuilder()
      .setTitle('Permission Sync')
      .setDescription(
        `**Updated:** ${updated} channels\n` +
        `**Failed:** ${failed} channels\n\n` +
        `**Rules Applied:**\n` +
        CATEGORIES.filter(c => CATEGORY_PERMS[c.key]).map(c =>
          `• ${c.key}: ${CATEGORY_PERMS[c.key].everyone ? 'Public' : CATEGORY_PERMS[c.key].staff ? 'Staff+' : CATEGORY_PERMS[c.key].admin ? 'Admin+' : 'Restricted'}`
        ).join('\n')
      )
      .setColor(failed > 0 ? 0xF1C40F : 0x2ECC71)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }

  get command() {
    return new SlashCommandBuilder()
      .setName('permission')
      .setDescription('Set channel view permissions for all roles')
      .setDMPermission(false);
  }
}
