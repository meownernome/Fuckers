"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSetupManager = void 0;
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
//# sourceMappingURL=SetupManager.js.map