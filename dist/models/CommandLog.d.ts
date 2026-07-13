import mongoose from 'mongoose';
export declare const CommandLog: mongoose.Model<{
    type: string;
    username: string;
    guildId: string;
    timestamp: Date;
    userId: string;
    guildName: string;
    description: string;
    commandName: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    type: string;
    username: string;
    guildId: string;
    timestamp: Date;
    userId: string;
    guildName: string;
    description: string;
    commandName: string;
}> & {
    type: string;
    username: string;
    guildId: string;
    timestamp: Date;
    userId: string;
    guildName: string;
    description: string;
    commandName: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    username: string;
    guildId: string;
    timestamp: Date;
    userId: string;
    guildName: string;
    description: string;
    commandName: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    type: string;
    username: string;
    guildId: string;
    timestamp: Date;
    userId: string;
    guildName: string;
    description: string;
    commandName: string;
}>> & mongoose.FlatRecord<{
    type: string;
    username: string;
    guildId: string;
    timestamp: Date;
    userId: string;
    guildName: string;
    description: string;
    commandName: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=CommandLog.d.ts.map