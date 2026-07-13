import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, MessageFlags } from 'discord.js';
import { ALL_ROLES } from '../roles';
import { createRole } from '../utils/roleCreator';

const gtgState = new Map<string, { guildId: string; index: number }>();

export class GtgCommand {
  async execute(interaction: ChatInputCommandInteraction) {
    const guild = interaction.guild!;
    await guild.roles.fetch();
    const existing = new Set(guild.roles.cache.map(r => r.name));
    const missing = ALL_ROLES.filter(r => !existing.has(r.name));

    if (missing.length === 0) {
      await interaction.reply({ content: '✅ All 281 roles already exist.', flags: MessageFlags.Ephemeral });
      return;
    }

    const next = missing[0];
    const stateKey = `gtg_${interaction.user.id}`;
    gtgState.set(stateKey, { guildId: guild.id, index: 0 });

    const embed = new EmbedBuilder()
      .setTitle('🎯 GTG — Create Roles One by One')
      .setDescription(`**Next role:** ${next.name}\n**Remaining:** ${missing.length}/281\n\nClick the button to create this role.`)
      .setColor(0x3498DB)
      .setFooter({ text: 'Click "Create Next" to proceed' })
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().setCustomId(`gtg_create_${stateKey}`).setLabel('Create Next Role').setStyle(ButtonStyle.Success).setEmoji('⚔️'),
    );

    await interaction.reply({ embeds: [embed] as any, components: [row as any], flags: MessageFlags.Ephemeral });
  }

  static async handleButton(interaction: any) {
    if (!interaction.customId.startsWith('gtg_create_')) return;

    const stateKey = interaction.customId.replace('gtg_create_', '');
    const state = gtgState.get(stateKey);
    if (!state) {
      await interaction.reply({ content: '❌ Session expired. Run /gtg again.', flags: MessageFlags.Ephemeral });
      return;
    }

    const guild = interaction.guild!;
    if (guild.id !== state.guildId) {
      await interaction.reply({ content: '❌ Wrong server.', flags: MessageFlags.Ephemeral });
      return;
    }

    await guild.roles.fetch();
    const existing = new Set(guild.roles.cache.map((r: any) => r.name));
    const missing = ALL_ROLES.filter((r: any) => !existing.has(r.name));

    if (state.index >= missing.length) {
      const embed = new EmbedBuilder()
        .setTitle('✅ All Done!')
        .setDescription('All 281 roles have been created.')
        .setColor(0x2ECC71);
      await interaction.update({ embeds: [embed] as any, components: [] });
      gtgState.delete(stateKey);
      return;
    }

    const role = missing[state.index];

    await interaction.deferUpdate();

    try {
      await createRole(guild, role.name, role.color);
      state.index++;
    } catch (e: any) {
      const embed = new EmbedBuilder()
        .setTitle('❌ Failed')
        .setDescription(`Failed to create **${role.name}**: ${e.message}\n\nTry again or skip.`)
        .setColor(0xE74C3C);
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder().setCustomId(`gtg_create_${stateKey}`).setLabel('Retry').setStyle(ButtonStyle.Danger).setEmoji('🔄'),
        new ButtonBuilder().setCustomId(`gtg_skip_${stateKey}`).setLabel('Skip').setStyle(ButtonStyle.Secondary).setEmoji('⏭️'),
      );
      await interaction.editReply({ embeds: [embed] as any, components: [row as any] });
      return;
    }

    await guild.roles.fetch();
    const newExisting = new Set(guild.roles.cache.map((r: any) => r.name));
    const newMissing = ALL_ROLES.filter((r: any) => !newExisting.has(r.name));

    if (state.index >= newMissing.length) {
      const embed = new EmbedBuilder()
        .setTitle('✅ All Done!')
        .setDescription(`Created **${role.name}**\n\nAll 281 roles are now created!`)
        .setColor(0x2ECC71);
      await interaction.editReply({ embeds: [embed] as any, components: [] });
      gtgState.delete(stateKey);
      return;
    }

    const next = newMissing[0];
    const embed = new EmbedBuilder()
      .setTitle('🎯 GTG — Create Roles One by One')
      .setDescription(`✅ Created **${role.name}**\n\n**Next role:** ${next.name}\n**Remaining:** ${newMissing.length}/281`)
      .setColor(0x3498DB)
      .setFooter({ text: 'Click "Create Next" to proceed' })
      .setTimestamp();

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().setCustomId(`gtg_create_${stateKey}`).setLabel('Create Next Role').setStyle(ButtonStyle.Success).setEmoji('⚔️'),
    );

    await interaction.editReply({ embeds: [embed] as any, components: [row as any] });
  }

  static async handleSkip(interaction: any) {
    if (!interaction.customId.startsWith('gtg_skip_')) return;

    const stateKey = interaction.customId.replace('gtg_skip_', '');
    const state = gtgState.get(stateKey);
    if (!state) {
      await interaction.reply({ content: '❌ Session expired.', flags: MessageFlags.Ephemeral });
      return;
    }

    state.index++;
    await this.handleButton(interaction);
  }

  get command() {
    return new SlashCommandBuilder()
      .setName('gtg')
      .setDescription('Create roles one by one with a button')
      .setDMPermission(false);
  }
}