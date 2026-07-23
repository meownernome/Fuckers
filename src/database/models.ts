import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
  discordId: string;
  username: string;
  ign: string;
  verified: boolean;
  points: number;
  tierRoles: { mode: string; tier: string }[];
  tierHistory: { mode: string; tier: string; assignedAt: Date }[];
  lastUpdated: Date;
  createdAt: Date;
}

const PlayerSchema = new Schema<IPlayer>({
  discordId: { type: String, required: true, unique: true, index: true },
  username: { type: String, default: '' },
  ign: { type: String, default: '' },
  verified: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  tierRoles: [{ mode: String, tier: String }],
  tierHistory: [{ mode: String, tier: String, assignedAt: { type: Date, default: Date.now } }],
  lastUpdated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const Player = mongoose.model<IPlayer>('Player', PlayerSchema);

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('⚠ MONGODB_URI not set — falling back to JSON file storage');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (e: any) {
    console.error('❌ MongoDB connection failed:', e.message);
  }
}
