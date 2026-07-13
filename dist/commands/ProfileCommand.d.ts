import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
export declare class ProfileCommand {
    execute(interaction: ChatInputCommandInteraction): Promise<void>;
    private getMinecraftUsernameFromUser;
    private getCurrentTiers;
    private getTierHistory;
    get command(): SlashCommandBuilder;
}
//# sourceMappingURL=ProfileCommand.d.ts.map