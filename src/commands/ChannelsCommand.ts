import { MessageFlags, TextChannel, SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { ServerSetup, HARVAL_CHANNEL_NAMES, HARVAL_CATEGORY_NAMES } from '../ServerSetup';
import { logger } from '../utils/Logger';
import { BRAND } from '../utils/textStyles';

export class ChannelsCommand {
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const sub = interaction.options.getSubcommand();

    if (sub === 'add') {
      await this.handleAdd(interaction);
    } else {
      await this.handleList(interaction);
    }
  }

  private async handleList(interaction: ChatInputCommandInteraction): Promise<void> {
    const cache = interaction.guild?.channels.cache;
    if (!cache) { await interaction.reply({ content: 'No guild found.', flags: MessageFlags.Ephemeral }); return; }

    const SEP = BRAND.SEPARATOR;
    const channels = cache
      .filter(channel => channel.type !== ChannelType.GuildCategory)
      .sort((a, b) => {
        if (a.parentId === null && b.parentId !== null) return -1;
        if (a.parentId !== null && b.parentId === null) return 1;
        return (a as TextChannel).position - (b as TextChannel).position;
      });

    let channelsList = `│ \`◆\` = HARVAL channel\n\n`;
    let currentParent = '';
    for (const channel of channels.values()) {
      if (channel.parent?.name !== currentParent) {
        currentParent = channel.parent?.name || '(No category)';
        channelsList += `\n**${currentParent}**\n`;
      }
      const isHarval = HARVAL_CHANNEL_NAMES.has(channel.name);
      channelsList += `${isHarval ? '◆' : '▸'} ${channel.name}\n`;
    }

    const embed = new EmbedBuilder()
      .setColor(0x3498DB)
      .setDescription(`\`\`\`md\n${SEP}\n〔 ＣＨＡＮＮＥＬＳ 〕\n${SEP}\`\`\`\n\n${channelsList}\n${SEP}`)
      .setFooter({ text: `Total: ${channels.size} channels` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] as any, flags: MessageFlags.Ephemeral });
  }

  private async handleAdd(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageChannels)) {
      await interaction.reply({ content: '❌ You need the Manage Channels permission.', flags: MessageFlags.Ephemeral });
      return;
    }
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const guild = interaction.guild!;
    const setup = new ServerSetup(interaction.client, guild);
    const SEP = BRAND.SEPARATOR;

    let catsCreated = 0;
    let chsCreated = 0;

    try {
      catsCreated = await setup.setupCategories();
      chsCreated = await setup.setupChannels();
      logger.info(`📋 /channels add by ${interaction.user.tag}: ${catsCreated} cats, ${chsCreated} chs`);
    } catch (e: any) {
      await interaction.editReply({ content: `❌ Failed: ${e.message}` });
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(0x2ECC71)
      .setDescription(`\`\`\`md\n${SEP}\n〔 ＣＨＡＮＮＥＬＳ 〕\n${SEP}\`\`\`\n\n│ **Categories created:** ${catsCreated}\n│ **Channels created:** ${chsCreated}\n\n${SEP}`)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] as any });
  }

  public get command() {
    return new SlashCommandBuilder()
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
