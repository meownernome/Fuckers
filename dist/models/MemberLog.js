"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const memberLogSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    guildName: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    description: { type: String, required: true }
});
exports.MemberLog = mongoose_1.default.model('MemberLog', memberLogSchema);
//# sourceMappingURL=MemberLog.js.map