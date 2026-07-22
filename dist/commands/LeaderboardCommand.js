"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardCommand = void 0;
const discord_js_1 = require("discord.js");
const pointsSystem_1 = require("../utils/pointsSystem");
class LeaderboardCommand {
    async execute(interaction) {
        const lb = (0, pointsSystem_1.getLeaderboard)().slice(0, 20);
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('Leaderboard')
            .setColor(0xFFD700);
        if (lb.length === 0) {
            embed.setDescription('No players ranked yet. Start tier testing to earn points!');
        }
        else {
            let desc = '';
            for (let i = 0; i < lb.length; i++) {
                const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
                desc += `${medal} ${lb[i].ign || lb[i].userId} — ${lb[i].points} pts\n`;
            }
            embed.setDescription(desc);
        }
        await interaction.reply({ embeds: [embed], flags: discord_js_1.MessageFlags.Ephemeral });
    }
    get command() {
        return new discord_js_1.SlashCommandBuilder()
            .setName('leaderboard')
            .setDescription('View the tier points leaderboard')
            .setDMPermission(false);
    }
}
exports.LeaderboardCommand = LeaderboardCommand;
