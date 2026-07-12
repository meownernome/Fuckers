import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from 'discord.js';
import { MANUAL_ROLES, getManualRoleByName } from '../manualRoles';
import { createRole } from '../utils/roleCreator';

export class GtgCommand {
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const subcommand = interaction.options.getSubcommand();
    const roleName = interaction.options.getString('role')?.trim();

    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageRoles)) {
      await interaction.editReply({ content: '❌ You need Manage Roles permission to use this command.' });
      return;
    }

    if (subcommand === 'list') {
      const names = MANUAL_ROLES.map(r => r.name).join('\n');
      await interaction.editReply({ content: `📋 Available roles:\n\n${names}` });
      return;
    }

    if (!roleName) {
      await interaction.editReply({ content: '❌ Provide a role name, for example: /gtg create Sword LT 1' });
      return;
    }

    const manualRole = getManualRoleByName(roleName);
    if (!manualRole) {
      await interaction.editReply({ content: `❌ Role not found in the manual list: ${roleName}` });
      return;
    }

    try {
      await createRole(interaction.guild!, manualRole.name, manualRole.color);
      await interaction.editReply({ content: `✅ Created role: ${manualRole.name}` });
    } catch (e: any) {
      await interaction.editReply({ content: `❌ Failed: ${e.message}` });
    }
  }

  get command() {
    return new SlashCommandBuilder()
      .setName('gtg')
      .setDescription('Create roles from the manual role list')
      .addSubcommand(sub => sub.setName('create').setDescription('Create one role').addStringOption(option => option.setName('role').setDescription('Role name').setRequired(true)))
      .addSubcommand(sub => sub.setName('list').setDescription('List all available roles'))
      .setDMPermission(false);
  }
}
