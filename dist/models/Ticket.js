"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ticketSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true },
    ticketId: { type: String, required: true, unique: true },
    channelId: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    minecraftUsername: { type: String, required: false },
    status: { type: String, enum: ['open', 'claimed', 'in_progress', 'completed', 'cancelled', 'closed'], default: 'open' },
    testerId: { type: String, required: false },
    testerUsername: { type: String, required: false },
    claimedAt: { type: Date, required: false },
    startedAt: { type: Date, required: false },
    completedAt: { type: Date, required: false },
    cancelledBy: { type: String, required: false },
    cancelledAt: { type: Date, required: false },
    closedBy: { type: String, required: false },
    closedAt: { type: Date, required: false },
    pvpMode: { type: String, required: false },
    tier: { type: String, required: false },
    reason: { type: String, required: false },
    notes: { type: String, required: false },
    duration: { type: Number, required: false },
    transcript: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});
exports.Ticket = mongoose_1.default.model('Ticket', ticketSchema);
//# sourceMappingURL=Ticket.js.map