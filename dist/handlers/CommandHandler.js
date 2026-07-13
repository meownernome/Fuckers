"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const commands_1 = require("../commands");
class CommandHandler {
    client;
    commands = new Map();
    constructor(client) {
        this.client = client;
    }
    loadCommands() {
        const commands = (0, commands_1.getAllCommands)();
        for (const cmd of commands) {
            if (cmd.command?.name && !this.commands.has(cmd.command.name)) {
                this.commands.set(cmd.command.name, cmd);
                console.log(`Loaded command: ${cmd.command.name}`);
            }
        }
        console.log(`Total commands loaded: ${this.commands.size}`);
    }
    async registerCommands() {
        if (!this.client.guilds || this.client.guilds.cache.size === 0) {
            console.warn('No guilds found, skipping command registration');
            return;
        }
        for (const guild of this.client.guilds.cache.values()) {
            const payloads = [];
            for (const cmd of this.commands.values()) {
                payloads.push(cmd.command.toJSON());
            }
            try {
                await this.client.application?.commands.set(payloads, guild.id);
                console.log(`Registered ${payloads.length} commands to guild: ${guild.name}`);
            }
            catch (error) {
                console.error(`Failed to register commands to guild ${guild.name}:`, error);
            }
        }
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map