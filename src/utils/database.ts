import mongoose, { Schema, Document, Model } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI_API || '';

let cached = (global as any).__mongoose;
if (!cached) cached = (global as any).__mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (!MONGODB_URI) return;
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }
  try { cached.conn = await cached.promise; } catch { cached.promise = null; }
  return cached.conn;
}

export interface IPlayer extends Document {
  discordId: string;
  username: string;
  displayName: string;
  points: number;
  tier: string;
  roles: string[];
  avatar: string;
  status: string;
  joinDate: Date;
  lastActive: Date;
  stats: Map<string, { points: number; rank: number; tier: string }>;
}

const PlayerSchema = new Schema<IPlayer>({
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
  stats: { type: Map, of: new Schema({ points: Number, rank: Number, tier: String }, { _id: false }), default: new Map() },
});

export interface INews extends Document {
  title: string;
  blurb: string;
  date: Date;
  category: string;
}

const NewsSchema = new Schema<INews>({
  title: { type: String, required: true },
  blurb: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  category: { type: String, default: 'Announcement' },
});

export const PlayerModel: Model<IPlayer> = mongoose.models.Player || mongoose.model<IPlayer>('Player', PlayerSchema);
export const NewsModel: Model<INews> = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
