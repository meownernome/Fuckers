import { ServerSetup } from './ServerSetup';
export declare class ServerSetupManager {
    private static instance;
    private serverSetup;
    static getInstance(): ServerSetupManager;
    initialize(client: any, guild: any): void;
    getServerSetup(): ServerSetup;
}
export declare class ServerSetupCleanup {
    cleanup(guild: any): Promise<void>;
}
//# sourceMappingURL=ServerSetupManager.d.ts.map