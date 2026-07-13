"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const guildLogSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    guildName: { type: String, required: true },
    memberCount: { type: Number, required: true },
    description: { type: String, required: true }
});
exports.GuildLog = mongoose_1.default.model('GuildLog', guildLogSchema);
//# sourceMappingURL=GuildLog.js.map