import { Client } from 'discord.js';
export declare class EventHandler {
    private readonly client;
    constructor(client: Client);
    private setupEventListeners;
    private handleClientReady;
    private handleGuildCreate;
    private handleGuildDelete;
    private handleMemberAdd;
    private handleInteractionCreate;
    private handleCommand;
    private handleMessageCreate;
    loadEvents(): Promise<void>;
}
//# sourceMappingURL=EventHandler.d.ts.map