import { Client } from 'discord.js';
import { CommandHandler } from './handlers/CommandHandler';
import './database';
export declare class HARVAL {
    readonly client: Client;
    readonly commandHandler: CommandHandler;
    constructor();
    private initialize;
    private isStaff;
    private handleButton;
    private handleSelectMenu;
    private handleModal;
}
//# sourceMappingURL=index.d.ts.map