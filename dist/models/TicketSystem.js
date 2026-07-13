"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSystem = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ticketSystemSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true, unique: true },
    enabled: { type: Boolean, default: true },
    categoryId: { type: String, required: false },
    channels: {
        createTicket: { type: String, required: false },
        claimTest: { type: String, required: false },
        startTest: { type: String, required: false },
        finishTest: { type: String, required: false },
        cancelTest: { type: String, required: false },
        closeTicket: { type: String, required: false }
    },
    roles: {
        tester: { type: String, required: false },
        admin: { type: String, required: false }
    }
});
exports.TicketSystem = mongoose_1.default.model('TicketSystem', ticketSystemSchema);
//# sourceMappingURL=TicketSystem.js.map