"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionCommand = void 0;
const discord_js_1 = require("discord.js");
const Logger_1 = require("../utils/Logger");
const ServerSetup_1 = require("../ServerSetup");
const CATEGORY_PERMS = {
    information: { everyone: true },
    community: { everyone: true },
    support: { everyone: true },
    'tier-testing': { everyone: true },
    tickets: { everyone: false, staff: true },
    leaderboards: { everyone: true },
    staff: { everyone: false, staff: true },
    logs: { everyone: false, staff: true },
    voice: { everyone: true },
};
function findStaffRoles(guild) {
    const roles = guild.roles.cache;
    const high = [];
    const medium = [];
    const low = [];
    for (const r of roles.values()) {
        if (r.name.match(/^(👑|⚡|🌐|🛡️|💎)/)) {
            high.push(r);
            continue;
        }
        if (r.name.match(/^(🔰|⚔️|🔨|🎬)/)) {
            medium.push(r);
            continue;
        }
        const lower = ['✅ Verified', '👤 Member', '🔇 Muted', '🤖 Bot'];
        if (lower.includes(r.name))
            continue;
        if (r.name.startsWith('「 ✦'))
            continue;
        if (r.name !== '@everyone' && !r.managed)
            low.push(r);
    }
    return { high, medium, low };
}
class PermissionCommand {
    async execute(interaction) {
        await interaction.deferReply({ flags: discord_js_1.MessageFlags.Ephemeral });
        const guild = interaction.guild;
        await guild.roles.fetch();
        const staffRoles = findStaffRoles(guild);
        let updated = 0;
        let failed = 0;
        for (const channel of guild.channels.cache.values()) {
            if (channel.type === discord_js_1.ChannelType.GuildCategory || channel.type === discord_js_1.ChannelType.PublicThread ||
                channel.type === discord_js_1.ChannelType.PrivateThread || channel.type === discord_js_1.ChannelType.AnnouncementThread)
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
                const overwrites = [];
                if (perms.everyone) {
                    overwrites.push({ id: everyone.id, allow: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.ReadMessageHistory], deny: [] });
                }
                else {
                    overwrites.push({ id: everyone.id, allow: [], deny: [discord_js_1.PermissionFlagsBits.ViewChannel] });
                    if (perms.staff) {
                        for (const r of [...staffRoles.high, ...staffRoles.medium]) {
                            overwrites.push({ id: r.id, allow: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.ReadMessageHistory, discord_js_1.PermissionFlagsBits.SendMessages], deny: [] });
                        }
                    }
                    if (perms.admin) {
                        for (const r of staffRoles.high) {
                            overwrites.push({ id: r.id, allow: [discord_js_1.PermissionFlagsBits.ViewChannel, discord_js_1.PermissionFlagsBits.ReadMessageHistory, discord_js_1.PermissionFlagsBits.SendMessages, discord_js_1.PermissionFlagsBits.ManageChannels], deny: [] });
                        }
                    }
                }
                for (const ov of overwrites) {
                    await channel.permissionOverwrites.edit(ov.id, { ViewChannel: ov.deny.includes(discord_js_1.PermissionFlagsBits.ViewChannel) ? false : ov.allow.includes(discord_js_1.PermissionFlagsBits.ViewChannel) ? true : null }, { reason: 'Permission sync' });
                }
                updated++;
            }
            catch (e) {
                failed++;
                Logger_1.logger.error(`Perm fail #${channel.name}: ${e.message}`);
            }
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('Permission Sync')
            .setDescription(`**Updated:** ${updated} channels\n` +
            `**Failed:** ${failed} channels\n\n` +
            `**Rules Applied:**\n` +
            ServerSetup_1.CATEGORIES.filter(c => CATEGORY_PERMS[c.key]).map(c => `• ${c.key}: ${CATEGORY_PERMS[c.key].everyone ? 'Public' : CATEGORY_PERMS[c.key].staff ? 'Staff+' : CATEGORY_PERMS[c.key].admin ? 'Admin+' : 'Restricted'}`).join('\n'))
            .setColor(failed > 0 ? 0xF1C40F : 0x2ECC71)
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    }
    get command() {
        return new discord_js_1.SlashCommandBuilder()
            .setName('permission')
            .setDescription('Set channel view permissions for all roles')
            .setDMPermission(false);
    }
}
exports.PermissionCommand = PermissionCommand;
