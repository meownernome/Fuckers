"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSetup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const serverSetupSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true, unique: true },
    timestamp: { type: Date, default: Date.now },
    setupCompleted: { type: Boolean, default: false },
    setupDetails: {
        categoriesCreated: { type: Number, default: 0 },
        channelsCreated: { type: Number, default: 0 },
        rolesCreated: { type: Number, default: 0 }
    }
});
exports.ServerSetup = mongoose_1.default.model('ServerSetup', serverSetupSchema);
//# sourceMappingURL=ServerSetup.js.map