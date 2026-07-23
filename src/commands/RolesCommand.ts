import { MessageFlags, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { BRAND } from '../utils/textStyles';
import { STAFF_EMOJI_PREFIX } from '../roles';

const TIER_ROLE_PATTERN = /◆ .+ • (LT[1-5]|HT[1-5])/;

export class RolesCommand {
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.memberPermissions?.has('ManageRoles')) {
      await interaction.reply({ content: '❌ You need the Manage Roles permission.', flags: MessageFlags.Ephemeral });
      return;
    }

    const roles = interaction.guild?.roles.cache
      .filter(r => r.name !== '@everyone' && !r.managed)
      .sort((a, b) => b.position - a.position);

    if (!roles || roles.size === 0) {
      await interaction.reply({
        content: '❌ No roles found in this server.\n\n> Use **`/all`** to create the full role structure.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const staffRoles = roles.filter(r => STAFF_EMOJI_PREFIX.test(r.name));
    const tierRoles = roles.filter(r => TIER_ROLE_PATTERN.test(r.name));
    const otherRoles = roles.filter(r => !STAFF_EMOJI_PREFIX.test(r.name) && !TIER_ROLE_PATTERN.test(r.name));

    const SEP = BRAND.SEPARATOR;
    const embed = new EmbedBuilder()
      .setColor(0x3498DB)
      .setDescription(`\`\`\`md\n${SEP}\n〔 ＳＥＲＶＥＲ ＲＯＬＥＳ 〕\n${SEP}\`\`\`\n\n▸ All ${roles.size} roles on HARVAL MC`)
      .setTimestamp();

    if (staffRoles.size > 0) {
      embed.addFields({
        name: 'Staff Roles',
        value: staffRoles.map(r => `> ${r.name} ━ ${r.members.size} members`).join('\n'),
        inline: false,
      });
    }
    if (tierRoles.size > 0) {
      embed.addFields({
        name: 'Tier Roles',
        value: tierRoles.map(r => `> ${r.name} ━ ${r.members.size} members`).join('\n'),
        inline: false,
      });
    }
    if (otherRoles.size > 0) {
      embed.addFields({
        name: 'Other Roles',
        value: otherRoles.map(r => `> ${r.name} ━ ${r.members.size} members`).join('\n'),
        inline: false,
      });
    }

    embed.setFooter({ text: `Total: ${roles.size} roles` });

    await interaction.reply({ embeds: [embed] as any, flags: MessageFlags.Ephemeral });
  }

  public get command() {
    return new SlashCommandBuilder()
      .setName('roles')
      .setDescription('View all server roles (Admin only)')
      .setDMPermission(false);
  }
}
