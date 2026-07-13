"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeRolesCommand = void 0;
const discord_js_1 = require("discord.js");
const roles_1 = require("../roles");
const roleCreator_1 = require("../utils/roleCreator");
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function progressBar(done, total) {
    const size = 20;
    const completed = Math.round((done / total) * size);
    const remaining = size - completed;
    return '█'.repeat(completed) + '░'.repeat(remaining);
}
class MakeRolesCommand {
    commandName;
    constructor(commandName = 'makeroles') {
        this.commandName = commandName;
    }
    async execute(interaction) {
        await interaction.deferReply();
        const guild = interaction.guild;
        const me = guild.members.me;
        if (!me?.permissions.has(discord_js_1.PermissionFlagsBits.ManageRoles)) {
            await interaction.editReply({ content: '❌ I need the Manage Roles permission to create roles.' });
            return;
        }
        await interaction.editReply({ content: '🔎 Fetching the current server roles…' });
        try {
            await guild.roles.fetch();
        }
        catch { }
        const existingNames = new Set(guild.roles.cache.map(r => r.name));
        const missingRoles = roles_1.ALL_ROLES.filter(r => !existingNames.has(r.name));
        const rolesToCreate = missingRoles;
        const skipped = roles_1.ALL_ROLES.length - rolesToCreate.length;
        if (rolesToCreate.length === 0) {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle('✅ Roles already present')
                .setDescription('All of the configured roles already exist in this server.')
                .setColor(0x2ECC71)
                .setTimestamp();
            await interaction.editReply({ content: null, embeds: [embed] });
            return;
        }
        let created = 0, failed = 0;
        const start = Date.now();
        const failedNames = [];
        const total = rolesToCreate.length;
        await interaction.editReply({ content: `⚙️ Creating roles…\n\n${progressBar(0, total)} 0/${total}` });
        for (let i = 0; i < rolesToCreate.length; i++) {
            const role = rolesToCreate[i];
            try {
                await (0, roleCreator_1.createRole)(guild, role.name, role.color);
                created++;
                existingNames.add(role.name);
            }
            catch (e) {
                failed++;
                failedNames.push(`${role.name}: ${e?.message || 'Unknown error'}`);
            }
            if ((i + 1) % 10 === 0 || i === rolesToCreate.length - 1) {
                const pct = ((i + 1) / total * 100).toFixed(0);
                const sec = ((Date.now() - start) / 1000).toFixed(0);
                await interaction.editReply({
                    content: `⚙️ Creating roles…\n\n${progressBar(i + 1, total)} ${i + 1}/${total} (${pct}%)\n\n✅ ${created} created • ❌ ${failed} failed • ⏭️ ${skipped} already existed • ⏱️ ${sec}s`,
                }).catch(() => { });
            }
            if (i < rolesToCreate.length - 1) {
                await sleep(1200);
            }
        }
        const sec = ((Date.now() - start) / 1000).toFixed(0);
        const summary = [
            `• Total queued: ${total}`,
            `• Created: ${created}`,
            `• Already existed: ${skipped}`,
            `• Failed: ${failed}`,
            `• Time: ${sec}s`,
        ].join('\n');
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(failed > 0 ? '⚠️ Partial role setup' : '✅ Role setup complete')
            .setDescription(`${summary}${failedNames.length > 0 ? `\n\n**Failed:**\n${failedNames.slice(0, 10).map(n => `• ${n}`).join('\n')}` : ''}`)
            .setColor(failed > 0 ? 0xF1C40F : 0x2ECC71)
            .setTimestamp();
        await interaction.editReply({ content: null, embeds: [embed] });
    }
    get command() {
        return new discord_js_1.SlashCommandBuilder()
            .setName(this.commandName)
            .setDescription('Create the server role set');
    }
}
exports.MakeRolesCommand = MakeRolesCommand;
