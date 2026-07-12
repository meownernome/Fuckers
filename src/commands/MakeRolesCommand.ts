import https from 'https';
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { ALL_ROLES } from '../roles';

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function createRole(token: string, guildId: string, name: string, color: number): Promise<void> {
  const maxAttempts = 5;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await new Promise<{ ok: boolean; retryAfter?: number; status?: number }>((resolve) => {
      const data = JSON.stringify({ name, color, hoist: false, mentionable: false });
      const req = https.request({
        hostname: 'discord.com', path: `/api/v10/guilds/${guildId}/roles`,
        method: 'POST', timeout: 8000,
        headers: { 'Authorization': `Bot ${token}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
      }, (res) => {
        let body = '';
        res.on('data', (c: any) => body += c);
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) resolve({ ok: true });
          else if (res.statusCode === 429) {
            try {
              const json = JSON.parse(body);
              resolve({ ok: false, retryAfter: json.retry_after || 5, status: 429 });
            } catch { resolve({ ok: false, retryAfter: 5, status: 429 }); }
          } else resolve({ ok: false, status: res.statusCode });
        });
      });
      req.on('error', (e) => resolve({ ok: false, retryAfter: 3 }));
      req.on('timeout', () => { req.destroy(); resolve({ ok: false, retryAfter: 3 }); });
      req.write(data);
      req.end();
    });

    if (result.ok) return;
    if (result.retryAfter) {
      const wait = Math.ceil(result.retryAfter * 1000) + 1000;
      await sleep(wait);
    }
  }
  throw new Error('Failed after 5 attempts');
}

export class MakeRolesCommand {
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const guild = interaction.guild!;
    const token = process.env.DISCORD_BOT_TOKEN || process.env.DISCORD_TOKEN;
    if (!token) { await interaction.editReply({ content: '❌ No bot token in environment.' }); return; }

    await interaction.editReply({ content: '🔍 Checking existing roles...' });
    try { await guild.roles.fetch(); } catch {}
    const existingNames = new Set(guild.roles.cache.map(r => r.name));

    const total = ALL_ROLES.length;
    let created = 0, skipped = 0, failed = 0;
    const start = Date.now();
    const failedNames: string[] = [];

    await interaction.editReply({ content: `⚙️ 0/${total} — starting...` });

    for (let i = 0; i < total; i++) {
      const r = ALL_ROLES[i];
      if (existingNames.has(r.name)) { skipped++; continue; }

      try {
        await createRole(token, guild.id, r.name, r.color);
        created++;
      } catch {
        failed++; failedNames.push(r.name);
      }

      if ((i + 1) % 50 === 0 || i === total - 1) {
        const pct = ((i + 1) / total * 100).toFixed(0);
        const sec = ((Date.now() - start) / 1000).toFixed(0);
        await interaction.editReply({
          content: `⚙️ ${i + 1}/${total} (${pct}%) — ✅ ${created} | ⏭️ ${skipped} | ❌ ${failed} — ${sec}s`,
        }).catch(() => {});
      }

      await sleep(1000);
    }

    const sec = ((Date.now() - start) / 1000).toFixed(0);
    let desc = `\`\`\`\n  Total    ━━  ${total}\n  Created  ━━  ${created}\n  Skipped  ━━  ${skipped}\n  Failed   ━━  ${failed}\n  Time     ━━  ${sec}s\n\`\`\``;
    if (failedNames.length > 0) {
      desc += `\n**Failed:** ${failedNames.slice(0, 10).join(', ')}${failedNames.length > 10 ? ` +${failedNames.length - 10} more` : ''}`;
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
      .setName('makeroles')
      .setDescription('Create all 281 roles (handles 429 rate limits)')
      .setDMPermission(false);
  }
}
