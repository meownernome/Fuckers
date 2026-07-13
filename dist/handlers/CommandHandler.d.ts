import { Client } from 'discord.js';
import { Command } from '../commands';
export declare class CommandHandler {
    private readonly client;
    readonly commands: Map<string, Command>;
    constructor(client: Client);
    loadCommands(): void;
    registerCommands(): Promise<void>;
}
//# sourceMappingURL=CommandHandler.d.ts.map