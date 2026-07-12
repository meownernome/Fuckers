import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ALL_ROLES } from '../roles';

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function createRole(token: string, guildId: string, name: string, color: number): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/roles`, {
      method: 'POST',
      headers: { 'Authorization': `Bot ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color, hoist: false, mentionable: false }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 100)}`);
    }
  } finally { clearTimeout(timeout); }
}

export class MakeRolesCommand {
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const guild = interaction.guild!;
    const token = process.env.DISCORD_BOT_TOKEN!;

    await interaction.editReply({ content: '🔍 Fetching existing roles...' });
    try { await guild.roles.fetch(); } catch {}

    const existingNames = new Set(guild.roles.cache.map(r => r.name));

    const total = ALL_ROLES.length;
    let created = 0;
    let skipped = 0;
    let failed = 0;
    let last = 0;
    const start = Date.now();

    await interaction.editReply({ content: `⚙️ Creating roles... 0/${total}` });

    for (let i = 0; i < total; i++) {
      const r = ALL_ROLES[i];
      if (existingNames.has(r.name)) { skipped++; continue; }
      try {
        await createRole(token, guild.id, r.name, r.color);
        created++;
      } catch (e: any) {
        failed++;
        // Retry once
        try {
          await sleep(3000);
          await createRole(token, guild.id, r.name, r.color);
          created++;
          failed--;
        } catch { /* give up */ }
      }

      if (created + skipped - last >= 25 || i === total - 1) {
        const pct = ((i + 1) / total * 100).toFixed(0);
        try {
          await interaction.editReply({
            content: `⚙️ Creating roles... ${i + 1}/${total} (${pct}%)  ✅ ${created}  ⏭️ ${skipped}  ❌ ${failed}`,
          });
        } catch {}
        last = created + skipped;
      }

      await sleep(3000);
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(0);
    const embed = new EmbedBuilder()
      .setTitle(failed > 10 ? '⚠️ Role Creation Partial' : '✅ Role Creation Complete')
      .setDescription(
        `\`\`\`\n` +
        `  Total    ━━  ${total}\n` +
        `  Created  ━━  ${created}\n` +
        `  Skipped  ━━  ${skipped}\n` +
        `  Failed   ━━  ${failed}\n` +
        `  Time     ━━  ${elapsed}s\n` +
        `\`\`\``
      )
      .setColor(failed > 0 ? 0xF1C40F : 0x2ECC71)
      .setTimestamp();

    await interaction.editReply({ content: null, embeds: [embed] as any });
  }

  get command() {
    return new SlashCommandBuilder()
      .setName('makeroles')
      .setDescription('Create all 281 roles via direct API (timeout-safe)')
      .setDMPermission(false);
  }
}
