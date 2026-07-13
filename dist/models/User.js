"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    discordId: { type: String, required: true, unique: true },
    minecraftUsername: { type: String, required: false },
    verified: { type: Boolean, default: false },
    currentTiers: {
        Sword: { type: String, default: null },
        Crystal: { type: String, default: null },
        SMP: { type: String, default: null },
        "Netherite Pot": { type: String, default: null },
        "Diamond Pot": { type: String, default: null },
        UHC: { type: String, default: null },
        BuildUHC: { type: String, default: null },
        NoDebuff: { type: String, default: null },
        Combo: { type: String, default: null },
        Gapple: { type: String, default: null },
        "OP Duel": { type: String, default: null },
        Boxing: { type: String, default: null },
        Axe: { type: String, default: null },
        Mace: { type: String, default: null },
        Anchor: { type: String, default: null },
        "Cart PvP": { type: String, default: null },
        Bedwars: { type: String, default: null },
        Skywars: { type: String, default: null },
        Bridge: { type: String, default: null },
        Nodebuff: { type: String, default: null },
        Vanilla: { type: String, default: null },
        Crossbow: { type: String, default: null },
        Trident: { type: String, default: null },
        Shield: { type: String, default: null },
        "Elytra Combat": { type: String, default: null },
        "Custom Duel": { type: String, default: null }
    },
    tierHistory: [{
            pvpMode: { type: String, required: true },
            tier: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }],
    testsCompleted: { type: Number, default: 0 },
    dateJoined: { type: Date, default: Date.now }
});
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map