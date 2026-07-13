"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSetupCleanup = exports.ServerSetupManager = void 0;
const ServerSetup_1 = require("./ServerSetup");
class ServerSetupManager {
    static instance;
    serverSetup = null;
    static getInstance() {
        if (!ServerSetupManager.instance) {
            ServerSetupManager.instance = new ServerSetupManager();
        }
        return ServerSetupManager.instance;
    }
    initialize(client, guild) {
        this.serverSetup = new ServerSetup_1.ServerSetup(client, guild);
    }
    getServerSetup() {
        if (!this.serverSetup) {
            throw new Error('ServerSetup not initialized');
        }
        return this.serverSetup;
    }
}
exports.ServerSetupManager = ServerSetupManager;
class ServerSetupCleanup {
    async cleanup(guild) {
        console.log(`Cleaning up server: ${guild.name} (${guild.id})`);
    }
}
exports.ServerSetupCleanup = ServerSetupCleanup;
//# sourceMappingURL=ServerSetupManager.js.map