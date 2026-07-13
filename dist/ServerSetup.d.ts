import { Guild, TextChannel } from 'discord.js';
export declare class ServerSetup {
    private guild;
    constructor(client: any, guild: Guild);
    private sleep;
    private tc;
    private findCat;
    setupAll(): Promise<void>;
    cleanup(): Promise<{
        channels: number;
        roles: number;
    }>;
    setupContent(): Promise<void>;
    createTicket(mode: string, player: {
        id: string;
        username: string;
        displayName: string;
    }): Promise<TextChannel | null>;
}
//# sourceMappingURL=ServerSetup.d.ts.map