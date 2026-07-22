import { MessageFlags, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getLeaderboard, POINT_MODES } from '../utils/pointsSystem';

export class LeaderboardCommand {
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const lb = getLeaderboard().slice(0, 20);

    const embed = new EmbedBuilder()
      .setTitle('Leaderboard')
      .setColor(0xFFD700);

    if (lb.length === 0) {
      embed.setDescription('No players ranked yet. Start tier testing to earn points!');
    } else {
      let desc = '';
      for (let i = 0; i < lb.length; i++) {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
        desc += `${medal} ${lb[i].ign || lb[i].userId} — ${lb[i].points} pts\n`;
      }
      embed.setDescription(desc);
    }

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  public get command() {
    return new SlashCommandBuilder()
      .setName('leaderboard')
      .setDescription('View the tier points leaderboard')
      .setDMPermission(false);
  }
}
