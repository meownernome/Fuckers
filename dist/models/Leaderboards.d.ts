import mongoose from 'mongoose';
export declare const Leaderboards: mongoose.Model<{
    guildId: string;
    enabled: boolean;
    lastUpdated: Date;
    statistics?: {
        mostActivePlayers: string[];
        mostTestsCompleted: string[];
        highestRatedTesters: string[];
        highestRankedPlayers: string[];
        mostRequestedPvPModes: string[];
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    guildId: string;
    enabled: boolean;
    lastUpdated: Date;
    statistics?: {
        mostActivePlayers: string[];
        mostTestsCompleted: string[];
        highestRatedTesters: string[];
        highestRankedPlayers: string[];
        mostRequestedPvPModes: string[];
    };
}> & {
    guildId: string;
    enabled: boolean;
    lastUpdated: Date;
    statistics?: {
        mostActivePlayers: string[];
        mostTestsCompleted: string[];
        highestRatedTesters: string[];
        highestRankedPlayers: string[];
        mostRequestedPvPModes: string[];
    };
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    guildId: string;
    enabled: boolean;
    lastUpdated: Date;
    statistics?: {
        mostActivePlayers: string[];
        mostTestsCompleted: string[];
        highestRatedTesters: string[];
        highestRankedPlayers: string[];
        mostRequestedPvPModes: string[];
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    guildId: string;
    enabled: boolean;
    lastUpdated: Date;
    statistics?: {
        mostActivePlayers: string[];
        mostTestsCompleted: string[];
        highestRatedTesters: string[];
        highestRankedPlayers: string[];
        mostRequestedPvPModes: string[];
    };
}>> & mongoose.FlatRecord<{
    guildId: string;
    enabled: boolean;
    lastUpdated: Date;
    statistics?: {
        mostActivePlayers: string[];
        mostTestsCompleted: string[];
        highestRatedTesters: string[];
        highestRankedPlayers: string[];
        mostRequestedPvPModes: string[];
    };
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=Leaderboards.d.ts.map