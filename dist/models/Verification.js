"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const verificationSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    channelId: { type: String, required: false },
    users: [{
            discordId: { type: String, required: true },
            minecraftUsername: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }]
});
exports.Verification = mongoose_1.default.model('Verification', verificationSchema);
//# sourceMappingURL=Verification.js.map