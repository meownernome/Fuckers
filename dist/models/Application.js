"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const applicationSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true },
    type: { type: String, required: true },
    channelId: { type: String, required: false },
    enabled: { type: Boolean, default: true },
    applications: [{
            userId: { type: String, required: true },
            username: { type: String, required: true },
            status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
            submittedAt: { type: Date, default: Date.now },
            reviewedBy: { type: String, required: false },
            reviewedAt: { type: Date, required: false },
            reviewNotes: { type: String, required: false }
        }]
});
exports.Application = mongoose_1.default.model('Application', applicationSchema);
//# sourceMappingURL=Application.js.map