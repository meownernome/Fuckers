export interface Command {
    execute(interaction: any): Promise<void>;
    command: {
        name: string;
        toJSON(): any;
    };
}
export declare function getAllCommands(): Command[];
export { AllCommand } from './AllCommand';
export { ChannelsCommand } from './ChannelsCommand';
export { CleanupCommand } from './CleanupCommand';
export { FAQCommand } from './FAQCommand';
export { IPCommand } from './IPCommand';
export { LeaderboardCommand } from './LeaderboardCommand';
export { PingCommand } from './PingCommand';
export { ProfileCommand } from './ProfileCommand';
export { RolesCommand } from './RolesCommand';
export { RulesCommand } from './RulesCommand';
export { SetupCommand } from './SetupCommand';
export { VerificationCommand } from './VerificationCommand';
//# sourceMappingURL=index.d.ts.map