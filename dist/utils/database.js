"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModel = exports.PlayerModel = void 0;
exports.connectDB = connectDB;
const mongoose_1 = __importStar(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI_API || '';
let cached = global.__mongoose;
if (!cached)
    cached = global.__mongoose = { conn: null, promise: null };
async function connectDB() {
    if (!MONGODB_URI)
        return;
    if (cached.conn)
        return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose_1.default.connect(MONGODB_URI, { bufferCommands: false });
    }
    try {
        cached.conn = await cached.promise;
    }
    catch {
        cached.promise = null;
    }
    return cached.conn;
}
const PlayerSchema = new mongoose_1.Schema({
    discordId: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    displayName: { type: String, default: '' },
    points: { type: Number, default: 0 },
    tier: { type: String, default: 'Unranked' },
    roles: [{ type: String }],
    avatar: { type: String, default: '' },
    status: { type: String, default: 'Offline' },
    joinDate: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now },
    stats: { type: Map, of: new mongoose_1.Schema({ points: Number, rank: Number, tier: String }, { _id: false }), default: new Map() },
});
const NewsSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    blurb: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    category: { type: String, default: 'Announcement' },
});
exports.PlayerModel = mongoose_1.default.models.Player || mongoose_1.default.model('Player', PlayerSchema);
exports.NewsModel = mongoose_1.default.models.News || mongoose_1.default.model('News', NewsSchema);
