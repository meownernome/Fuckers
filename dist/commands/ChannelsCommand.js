"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsCommand = void 0;
const discord_js_1 = require("discord.js");
const ServerSetup_1 = require("../ServerSetup");
const Logger_1 = require("../utils/Logger");
const textStyles_1 = require("../utils/textStyles");
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
        const SEP = textStyles_1.BRAND.SEPARATOR;
        const channels = cache
            .filter(channel => channel.type !== discord_js_1.ChannelType.GuildCategory)
            .sort((a, b) => {
            if (a.parentId === null && b.parentId !== null)
                return -1;
            if (a.parentId !== null && b.parentId === null)
                return 1;
            return a.position - b.position;
        });
        let channelsList = `│ \`◆\` = HARVAL channel\n\n`;
        let currentParent = '';
        for (const channel of channels.values()) {
            if (channel.parent?.name !== currentParent) {
                currentParent = channel.parent?.name || '(No category)';
                channelsList += `\n**${currentParent}**\n`;
            }
            const isHarval = ServerSetup_1.HARVAL_CHANNEL_NAMES.has(channel.name);
            channelsList += `${isHarval ? '◆' : '▸'} ${channel.name}\n`;
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(0x3498DB)
            .setDescription(`\`\`\`md\n${SEP}\n〔 ＣＨＡＮＮＥＬＳ 〕\n${SEP}\`\`\`\n\n${channelsList}\n${SEP}`)
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
        const SEP = textStyles_1.BRAND.SEPARATOR;
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
            .setColor(0x2ECC71)
            .setDescription(`\`\`\`md\n${SEP}\n〔 ＣＨＡＮＮＥＬＳ 〕\n${SEP}\`\`\`\n\n│ **Categories created:** ${catsCreated}\n│ **Channels created:** ${chsCreated}\n\n${SEP}`)
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
            .setDescription('Create HARVAL categories and channels'))
            .setDMPermission(false);
    }
}
exports.ChannelsCommand = ChannelsCommand;
