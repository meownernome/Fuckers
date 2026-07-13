import mongoose from 'mongoose';
export declare const TicketSystem: mongoose.Model<{
    guildId: string;
    enabled: boolean;
    roles?: {
        tester?: string;
        admin?: string;
    };
    channels?: {
        createTicket?: string;
        claimTest?: string;
        startTest?: string;
        finishTest?: string;
        cancelTest?: string;
        closeTicket?: string;
    };
    categoryId?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    guildId: string;
    enabled: boolean;
    roles?: {
        tester?: string;
        admin?: string;
    };
    channels?: {
        createTicket?: string;
        claimTest?: string;
        startTest?: string;
        finishTest?: string;
        cancelTest?: string;
        closeTicket?: string;
    };
    categoryId?: string;
}> & {
    guildId: string;
    enabled: boolean;
    roles?: {
        tester?: string;
        admin?: string;
    };
    channels?: {
        createTicket?: string;
        claimTest?: string;
        startTest?: string;
        finishTest?: string;
        cancelTest?: string;
        closeTicket?: string;
    };
    categoryId?: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    guildId: string;
    enabled: boolean;
    roles?: {
        tester?: string;
        admin?: string;
    };
    channels?: {
        createTicket?: string;
        claimTest?: string;
        startTest?: string;
        finishTest?: string;
        cancelTest?: string;
        closeTicket?: string;
    };
    categoryId?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    guildId: string;
    enabled: boolean;
    roles?: {
        tester?: string;
        admin?: string;
    };
    channels?: {
        createTicket?: string;
        claimTest?: string;
        startTest?: string;
        finishTest?: string;
        cancelTest?: string;
        closeTicket?: string;
    };
    categoryId?: string;
}>> & mongoose.FlatRecord<{
    guildId: string;
    enabled: boolean;
    roles?: {
        tester?: string;
        admin?: string;
    };
    channels?: {
        createTicket?: string;
        claimTest?: string;
        startTest?: string;
        finishTest?: string;
        cancelTest?: string;
        closeTicket?: string;
    };
    categoryId?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=TicketSystem.d.ts.map