"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboards = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const leaderboardsSchema = new mongoose_1.default.Schema({
    guildId: { type: String, required: true, unique: true },
    enabled: { type: Boolean, default: true },
    statistics: {
        mostActivePlayers: [{ type: String }],
        mostTestsCompleted: [{ type: String }],
        highestRatedTesters: [{ type: String }],
        highestRankedPlayers: [{ type: String }],
        mostRequestedPvPModes: [{ type: String }]
    },
    lastUpdated: { type: Date, default: Date.now }
});
exports.Leaderboards = mongoose_1.default.model('Leaderboards', leaderboardsSchema);
//# sourceMappingURL=Leaderboards.js.map