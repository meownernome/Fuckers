import mongoose from 'mongoose';
export declare const ServerSetup: mongoose.Model<{
    guildId: string;
    timestamp: Date;
    setupCompleted: boolean;
    setupDetails?: {
        categoriesCreated: number;
        channelsCreated: number;
        rolesCreated: number;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    guildId: string;
    timestamp: Date;
    setupCompleted: boolean;
    setupDetails?: {
        categoriesCreated: number;
        channelsCreated: number;
        rolesCreated: number;
    };
}> & {
    guildId: string;
    timestamp: Date;
    setupCompleted: boolean;
    setupDetails?: {
        categoriesCreated: number;
        channelsCreated: number;
        rolesCreated: number;
    };
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    guildId: string;
    timestamp: Date;
    setupCompleted: boolean;
    setupDetails?: {
        categoriesCreated: number;
        channelsCreated: number;
        rolesCreated: number;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    guildId: string;
    timestamp: Date;
    setupCompleted: boolean;
    setupDetails?: {
        categoriesCreated: number;
        channelsCreated: number;
        rolesCreated: number;
    };
}>> & mongoose.FlatRecord<{
    guildId: string;
    timestamp: Date;
    setupCompleted: boolean;
    setupDetails?: {
        categoriesCreated: number;
        channelsCreated: number;
        rolesCreated: number;
    };
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=ServerSetup.d.ts.map