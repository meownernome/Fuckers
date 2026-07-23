"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionCommand = void 0;
const discord_js_1 = require("discord.js");
const Logger_1 = require("../utils/Logger");
const ServerSetup_1 = require("../ServerSetup");
const CATEGORY_PERMS = {
    information: { view: true, send: false, note: 'Everyone can view, read-only' },
    verification: { view: true, send: false, note: 'Everyone can view, read-only' },
    community: { view: true, send: true, note: 'Everyone can view & chat' },
    roles: { view: true, send: false, note: 'Everyone can view, read-only' },
    'tier-testing': { view: true, send: false, note: 'Everyone can view, read-only' },
    support: { view: true, send: false, note: 'Everyone can view, read-only' },
    staff: { view: false, send: false, note: 'Staff only' },
    logs: { view: false, send: false, note: 'Staff only' },
    tickets: { view: false, send: false, note: 'Staff + ticket participants' },
    voice: { view: true, send: true, note: 'Everyone can view & join' },
};
class PermissionCommand {
    async execute(interaction) {
        await interaction.deferReply({ flags: discord_js_1.MessageFlags.Ephemeral });
        const guild = interaction.guild;
        let updated = 0;
        let failed = 0;
        for (const channel of guild.channels.cache.values()) {
            if (channel.type === discord_js_1.ChannelType.GuildCategory || channel.type === discord_js_1.ChannelType.PublicThread || channel.type === discord_js_1.ChannelType.PrivateThread || channel.type === discord_js_1.ChannelType.AnnouncementThread)
                continue;
            const parent = channel.parent;
            if (!parent)
                continue;
            const catEntry = ServerSetup_1.CATEGORIES.find(c => parent.name === c.name);
            const catKey = catEntry?.key;
            if (!catKey)
                continue;
            const perms = CATEGORY_PERMS[catKey];
            if (!perms)
                continue;
            try {
                const everyone = guild.roles.everyone;
                if (perms.view && perms.send) {
                    await channel.permissionOverwrites.delete(everyone).catch(() => { });
                }
                else if (perms.view && !perms.send) {
                    await channel.permissionOverwrites.edit(everyone, {
                        ViewChannel: true,
                        SendMessages: false,
                        CreatePublicThreads: false,
                        CreatePrivateThreads: false,
                        AddReactions: true,
                    }, { reason: 'Permission sync - read-only' });
                }
                else {
                    await channel.permissionOverwrites.edit(everyone, {
                        ViewChannel: false,
                    }, { reason: 'Permission sync - staff only' });
                }
                updated++;
            }
            catch (e) {
                failed++;
                Logger_1.logger.error(`Perm fail #${channel.name}: ${e.message}`);
            }
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(failed > 0 ? 0xF1C40F : 0x2ECC71)
            .setDescription(Object.entries(CATEGORY_PERMS)
            .map(([k, v]) => `• **${k}**: ${v.note}`)
            .join('\n') +
            `\n\n**Updated:** ${updated} channels\n**Failed:** ${failed}`)
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    }
    get command() {
        return new discord_js_1.SlashCommandBuilder()
            .setName('permission')
            .setDescription('Set view & send permissions for all channels by category')
            .setDMPermission(false);
    }
}
exports.PermissionCommand = PermissionCommand;
