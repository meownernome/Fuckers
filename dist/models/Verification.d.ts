import mongoose from 'mongoose';
export declare const Verification: mongoose.Model<{
    guildId: string;
    enabled: boolean;
    users: mongoose.Types.DocumentArray<{
        discordId: string;
        minecraftUsername: string;
        timestamp: Date;
    }>;
    channelId?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    guildId: string;
    enabled: boolean;
    users: mongoose.Types.DocumentArray<{
        discordId: string;
        minecraftUsername: string;
        timestamp: Date;
    }>;
    channelId?: string;
}> & {
    guildId: string;
    enabled: boolean;
    users: mongoose.Types.DocumentArray<{
        discordId: string;
        minecraftUsername: string;
        timestamp: Date;
    }>;
    channelId?: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    guildId: string;
    enabled: boolean;
    users: mongoose.Types.DocumentArray<{
        discordId: string;
        minecraftUsername: string;
        timestamp: Date;
    }>;
    channelId?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    guildId: string;
    enabled: boolean;
    users: mongoose.Types.DocumentArray<{
        discordId: string;
        minecraftUsername: string;
        timestamp: Date;
    }>;
    channelId?: string;
}>> & mongoose.FlatRecord<{
    guildId: string;
    enabled: boolean;
    users: mongoose.Types.DocumentArray<{
        discordId: string;
        minecraftUsername: string;
        timestamp: Date;
    }>;
    channelId?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=Verification.d.ts.map