import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { ALL_ROLES } from '../roles';
import { createRole } from '../utils/roleCreator';

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export class MakeRolesCommand {
  constructor(private readonly commandName = 'makeroles') {}

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const guild = interaction.guild!;
    const me = guild.members.me;
    if (!me?.permissions.has(PermissionFlagsBits.ManageRoles)) {
      await interaction.editReply({ content: '❌ I need the Manage Roles permission to create roles.' });
      return;
    }

    await interaction.editReply({ content: '🔍 Fetching existing roles...' });
    try { await guild.roles.fetch(); } catch {}
    const existingNames = new Set(guild.roles.cache.map(r => r.name));

    const total = ALL_ROLES.length;
    let created = 0, skipped = 0, failed = 0;
    const start = Date.now();
    const failedNames: string[] = [];

    await interaction.editReply({ content: `⚙️ 0/${total}` });

    for (let i = 0; i < total; i++) {
      const r = ALL_ROLES[i];
      if (existingNames.has(r.name)) { skipped++; continue; }

      try {
        await createRole(guild, r.name, r.color);
        created++;
      } catch (e: any) {
        failed++;
        failedNames.push(r.name);
      }

      if ((i + 1) % 50 === 0 || i === total - 1) {
        const pct = ((i + 1) / total * 100).toFixed(0);
        const sec = ((Date.now() - start) / 1000).toFixed(0);
        await interaction.editReply({
          content: `⚙️ ${i + 1}/${total} (${pct}%) — ✅ ${created} | ⏭️ ${skipped} | ❌ ${failed} — ${sec}s`,
        }).catch(() => {});
      }

      const pauseMs = created > 0 && created % 10 === 0 ? 15000 : 4000;
      await sleep(pauseMs);
    }

    const sec = ((Date.now() - start) / 1000).toFixed(0);
    let desc = `\`\`\`\n  Total    ━━  ${total}\n  Created  ━━  ${created}\n  Skipped  ━━  ${skipped}\n  Failed   ━━  ${failed}\n  Time     ━━  ${sec}s\n\`\`\``;
    if (failedNames.length > 0) {
      desc += `\n**Failed:** ${failedNames.slice(0, 10).map(n => `• ${n}`).join('\n')}`;
    }

    const embed = new EmbedBuilder()
      .setTitle(failed > 0 ? '⚠️ Partial' : '✅ Done!')
      .setDescription(desc)
      .setColor(failed > 0 ? 0xF1C40F : 0x2ECC71)
      .setTimestamp();

    await interaction.editReply({ content: null, embeds: [embed] as any });
  }

  get command() {
    return new SlashCommandBuilder()
      .setName(this.commandName)
      .setDescription('Create all 281 roles') as any;
  }
}
