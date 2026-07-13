import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { RoleCreator } from '../utils/roleCreator.js';
import { Logger } from '../utils/Logger.js';

export const CleanupCommand = {
  data: new SlashCommandBuilder()
    .setName('cleanup')
    .setDescription('⚠️ NUCLEAR: Delete ALL channels and roles (except @everyone)'),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) {
      await interaction.reply({ content: 'This command must be used in a server.', ephemeral: true });
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const member = await interaction.guild.members.fetch(interaction.user.id);
    if (!member.permissions.has('Administrator')) {
      await interaction.editReply({ content: 'You need Administrator permission.' });
      return;
    }

    const guild = interaction.guild;

    try {
      await interaction.editReply({ content: '💥 Deleting all channels...' });
      
      const channels = guild.channels.cache.filter(c => 'deletable' in c && c.deletable);
      let deletedChannels = 0;
      for (const channel of channels.values()) {
        try {
          await channel.delete('Nuclear cleanup via /cleanup');
          deletedChannels++;
        } catch (e) {
          // Ignore
        }
      }

      await interaction.editReply({ content: `💥 Deleted ${deletedChannels} channels. Deleting roles...` });

      const token = process.env.DISCORD_TOKEN || process.env.DISCORD_BOT_TOKEN;
      if (!token) {
        await interaction.editReply({ content: 'Bot token not configured.' });
        return;
      }

      const roleCreator = new RoleCreator(token, guild.id);
      const roles = guild.roles.cache.filter(r => r.id !== guild.id && r.editable);
      let deletedRoles = 0;
      for (const role of roles.values()) {
        if (await roleCreator.deleteRole(role.id)) {
          deletedRoles++;
        }
      }

      await interaction.editReply({ 
        content: `✅ **Nuclear Cleanup Complete**\n• Channels deleted: ${deletedChannels}\n• Roles deleted: ${deletedRoles}\n• Only @everyone remains`
      });
    } catch (error) {
      Logger.error('Error in /cleanup command', error);
      await interaction.editReply({ content: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}` });
    }
  },
};