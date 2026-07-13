import mongoose from 'mongoose';
export declare const ChannelLog: mongoose.Model<{
    type: string;
    guildId: string;
    timestamp: Date;
    guildName: string;
    description: string;
    channelName: string;
    channelType: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: string;
    guildId: string;
    timestamp: Date;
    guildName: string;
    description: string;
    channelName: string;
    channelType: string;
}> & {
    type: string;
    guildId: string;
    timestamp: Date;
    guildName: string;
    description: string;
    channelName: string;
    channelType: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    guildId: string;
    timestamp: Date;
    guildName: string;
    description: string;
    channelName: string;
    channelType: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: string;
    guildId: string;
    timestamp: Date;
    guildName: string;
    description: string;
    channelName: string;
    channelType: string;
}>> & mongoose.FlatRecord<{
    type: string;
    guildId: string;
    timestamp: Date;
    guildName: string;
    description: string;
    channelName: string;
    channelType: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=ChannelLog.d.ts.map