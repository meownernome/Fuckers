"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const discord_js_1 = require("discord.js");
const Logger_1 = require("../utils/Logger");
class EventHandler {
    client;
    constructor(client) {
        this.client = client;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.client.once(discord_js_1.Events.ClientReady, this.handleClientReady.bind(this));
        this.client.on(discord_js_1.Events.GuildCreate, this.handleGuildCreate.bind(this));
        this.client.on(discord_js_1.Events.GuildDelete, this.handleGuildDelete.bind(this));
        this.client.on(discord_js_1.Events.GuildMemberAdd, this.handleMemberAdd.bind(this));
        this.client.on(discord_js_1.Events.InteractionCreate, this.handleInteractionCreate.bind(this));
        this.client.on(discord_js_1.Events.MessageCreate, this.handleMessageCreate.bind(this));
    }
    async handleClientReady() {
        Logger_1.logger.info(`Client is ready! Logged in as ${this.client.user?.tag}`);
    }
    async handleGuildCreate(guild) {
        Logger_1.logger.info(`Joined guild: ${guild.name} (ID: ${guild.id})`);
    }
    async handleGuildDelete(guild) {
        Logger_1.logger.info(`Left guild: ${guild.name} (ID: ${guild.id})`);
    }
    async handleMemberAdd(member) {
        Logger_1.logger.info(`Member joined: ${member.user.tag} in guild: ${member.guild.name}`);
    }
    async handleInteractionCreate(interaction) {
        if (interaction.isCommand()) {
            await this.handleCommand(interaction);
        }
    }
    async handleCommand(interaction) {
        const commandName = interaction.commandName;
        Logger_1.logger.info(`Command executed: ${commandName} by ${interaction.user.tag}`);
        const command = this.client.commands.get(commandName);
        if (command) {
            try {
                await command.execute(interaction);
            }
            catch (error) {
                Logger_1.logger.error(`Error executing command ${commandName}:`, error);
                if (!interaction.replied) {
                    await interaction.reply({ content: '❌ An error occurred while executing this command.', ephemeral: true });
                }
            }
        }
        else {
            Logger_1.logger.warn(`Unknown command: ${commandName}`);
        }
    }
    async handleMessageCreate(message) {
        if (message.author.bot)
            return;
        Logger_1.logger.info(`Message: ${message.content} by ${message.author.tag}`);
    }
    async loadEvents() {
        console.log('Event handler initialized');
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=EventHandler.js.map