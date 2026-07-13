import mongoose from 'mongoose';
export declare const Application: mongoose.Model<{
    applications: mongoose.Types.DocumentArray<{
        username: string;
        userId: string;
        status: "pending" | "accepted" | "rejected";
        submittedAt: Date;
        reviewedBy?: string;
        reviewedAt?: Date;
        reviewNotes?: string;
    }>;
    type: string;
    guildId: string;
    enabled: boolean;
    channelId?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    applications: mongoose.Types.DocumentArray<{
        username: string;
        userId: string;
        status: "pending" | "accepted" | "rejected";
        submittedAt: Date;
        reviewedBy?: string;
        reviewedAt?: Date;
        reviewNotes?: string;
    }>;
    type: string;
    guildId: string;
    enabled: boolean;
    channelId?: string;
}> & {
    applications: mongoose.Types.DocumentArray<{
        username: string;
        userId: string;
        status: "pending" | "accepted" | "rejected";
        submittedAt: Date;
        reviewedBy?: string;
        reviewedAt?: Date;
        reviewNotes?: string;
    }>;
    type: string;
    guildId: string;
    enabled: boolean;
    channelId?: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    applications: mongoose.Types.DocumentArray<{
        username: string;
        userId: string;
        status: "pending" | "accepted" | "rejected";
        submittedAt: Date;
        reviewedBy?: string;
        reviewedAt?: Date;
        reviewNotes?: string;
    }>;
    type: string;
    guildId: string;
    enabled: boolean;
    channelId?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    applications: mongoose.Types.DocumentArray<{
        username: string;
        userId: string;
        status: "pending" | "accepted" | "rejected";
        submittedAt: Date;
        reviewedBy?: string;
        reviewedAt?: Date;
        reviewNotes?: string;
    }>;
    type: string;
    guildId: string;
    enabled: boolean;
    channelId?: string;
}>> & mongoose.FlatRecord<{
    applications: mongoose.Types.DocumentArray<{
        username: string;
        userId: string;
        status: "pending" | "accepted" | "rejected";
        submittedAt: Date;
        reviewedBy?: string;
        reviewedAt?: Date;
        reviewNotes?: string;
    }>;
    type: string;
    guildId: string;
    enabled: boolean;
    channelId?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=Application.d.ts.map