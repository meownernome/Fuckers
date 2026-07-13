"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsCommand = void 0;
const discord_js_1 = require("discord.js");
const ServerSetup_1 = require("../ServerSetup");
const Logger_1 = require("../utils/Logger");
class ChannelsCommand {
    async execute(interaction) {
        const sub = interaction.options.getSubcommand();
        if (sub === 'add') {
            await this.handleAdd(interaction);
        }
        else {
            await this.handleList(interaction);
        }
    }
    async handleList(interaction) {
        const cache = interaction.guild?.channels.cache;
        if (!cache) {
            await interaction.reply({ content: 'No guild found.', flags: discord_js_1.MessageFlags.Ephemeral });
            return;
        }
        const channels = cache
            .filter(channel => channel.type !== discord_js_1.ChannelType.GuildCategory)
            .sort((a, b) => {
            if (a.parentId === null && b.parentId !== null)
                return -1;
            if (a.parentId !== null && b.parentId === null)
                return 1;
            return a.position - b.position;
        });
        let channelsList = '## 📋 Server Channels\n';
        let currentParent = '';
        for (const channel of channels.values()) {
            if (channel.parent?.name !== currentParent) {
                currentParent = channel.parent?.name || '(No category)';
                channelsList += `\n**${currentParent}**\n`;
            }
            channelsList += `└ ${channel.name}\n`;
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('\u300C \u2726 ＣＨＡＮＮＥＬＳ \u2726 \u300D')
            .setDescription(channelsList)
            .setColor(0x3498DB)
            .setFooter({ text: `Total: ${channels.size} channels` })
            .setTimestamp();
        await interaction.reply({ embeds: [embed], flags: discord_js_1.MessageFlags.Ephemeral });
    }
    async handleAdd(interaction) {
        if (!interaction.memberPermissions?.has(discord_js_1.PermissionFlagsBits.ManageChannels)) {
            await interaction.reply({ content: '❌ You need the Manage Channels permission.', flags: discord_js_1.MessageFlags.Ephemeral });
            return;
        }
        await interaction.deferReply({ flags: discord_js_1.MessageFlags.Ephemeral });
        const guild = interaction.guild;
        const setup = new ServerSetup_1.ServerSetup(interaction.client, guild);
        let catsCreated = 0;
        let chsCreated = 0;
        try {
            catsCreated = await setup.setupCategories();
            chsCreated = await setup.setupChannels();
            Logger_1.logger.info(`📋 /channels add by ${interaction.user.tag}: ${catsCreated} cats, ${chsCreated} chs`);
        }
        catch (e) {
            await interaction.editReply({ content: `❌ Failed: ${e.message}` });
            return;
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('\u300C \u2726 ＣＨＡＮＮＥＬＳ \u2726 \u300D')
            .setDescription(`**Categories Created:** ${catsCreated}\n` +
            `**Channels Created:** ${chsCreated}\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `> All categories \`「 ✦ ＮＡＭＥ ✦ 」\`\n` +
            `> Channels with emoji prefixes are ready!`)
            .setColor(0x2ECC71)
            .setFooter({ text: '\u2726 Use /permission to sync \u2726' })
            .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
    }
    get command() {
        return new discord_js_1.SlashCommandBuilder()
            .setName('channels')
            .setDescription('Manage server channels')
            .addSubcommand(sub => sub
            .setName('list')
            .setDescription('List all server channels'))
            .addSubcommand(sub => sub
            .setName('add')
            .setDescription('Create all categories and channels with fancy styling'))
            .setDMPermission(false);
    }
}
exports.ChannelsCommand = ChannelsCommand;
