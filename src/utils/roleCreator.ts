import { Guild } from 'discord.js';

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function createRole(guild: Guild, name: string, color: number): Promise<void> {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      await guild.roles.create({ name, color, hoist: false, mentionable: false });
      return;
    } catch (error: any) {
      const message = error?.message || String(error || 'Unknown role creation error');
      console.error(`[role-create] ${name}: ${message}`);

      if (message.includes('Missing Permissions') || message.includes('permission')) {
        throw new Error('The bot is missing Manage Roles permission or its role is too low in the hierarchy.');
      }

      if (message.includes('limit') || message.includes('Maximum number of roles')) {
        throw new Error('The server has reached its role limit and can no longer create more roles.');
      }

      if (attempt === 3) {
        throw new Error(message);
      }

      await sleep(3000 * (attempt + 1));
    }
  }
}
