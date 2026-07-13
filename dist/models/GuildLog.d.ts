import mongoose from 'mongoose';
export declare const GuildLog: mongoose.Model<{
    type: string;
    guildId: string;
    memberCount: number;
    timestamp: Date;
    guildName: string;
    description: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: string;
    guildId: string;
    memberCount: number;
    timestamp: Date;
    guildName: string;
    description: string;
}> & {
    type: string;
    guildId: string;
    memberCount: number;
    timestamp: Date;
    guildName: string;
    description: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    guildId: string;
    memberCount: number;
    timestamp: Date;
    guildName: string;
    description: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: string;
    guildId: string;
    memberCount: number;
    timestamp: Date;
    guildName: string;
    description: string;
}>> & mongoose.FlatRecord<{
    type: string;
    guildId: string;
    memberCount: number;
    timestamp: Date;
    guildName: string;
    description: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=GuildLog.d.ts.map