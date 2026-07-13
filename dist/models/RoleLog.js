"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roleLogSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    guildName: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    roleName: { type: String, required: true },
    action: { type: String, required: true },
    description: { type: String, required: true }
});
exports.RoleLog = mongoose_1.default.model('RoleLog', roleLogSchema);
//# sourceMappingURL=RoleLog.js.map