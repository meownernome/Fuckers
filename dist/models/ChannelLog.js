"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const channelLogSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    guildName: { type: String, required: true },
    channelName: { type: String, required: true },
    channelType: { type: String, required: true },
    description: { type: String, required: true }
});
exports.ChannelLog = mongoose_1.default.model('ChannelLog', channelLogSchema);
//# sourceMappingURL=ChannelLog.js.map