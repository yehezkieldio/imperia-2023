import { ApplyOptions } from "@sapphire/decorators";
import { RegisterBehavior } from "@sapphire/framework";
import {
    Message,
    PermissionFlagsBits,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { ImperiaCommand } from "#libraries/extensions/ImperiaCommand";
import { EmbedBuilder } from "#utils/EmbedBuilder";

@ApplyOptions<ImperiaCommand.Options>({
    name: "account",
    description: "View your account information.",
    preconditions: ["RegisteredUserOnly"],
    subcommands: [
        {
            name: "profile",
            chatInputRun: "chatInputProfile",
        },
        {
            name: "cards",
            chatInputRun: "chatInputCards",
        },
    ],
})
export class AccountCommand extends ImperiaCommand {
    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command: SlashCommandSubcommandsOnlyBuilder = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                command.setName("profile").setDescription("View your account information.")
            )
            .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                command.setName("cards").setDescription("View your account cards.")
            );

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputProfile(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<Message> {
        await this.replyWithLoading(interaction, false);

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id, [
            "Progression",
            "Balance",
        ]);
        const user = getUser.isOk() ? getUser.unwrap() : null;
        this.container.logger.debug(user);

        const expressionToNextLevel = await this.container.svc.progression.getUserExperienceToNextLevel(user.discordId);

        const embed = new EmbedBuilder()
            .setTitle("Account Profile")
            .setDescription(
                `Level: ${user.Progression.level}\n Experience: (${user.Progression.experience} / ${expressionToNextLevel})\n\nCrystal Balance: ${user.Balance.crystal}\nFate Balance: ${user.Balance.fate}`
            );

        return interaction.editReply({
            embeds: [embed],
        });
    }

    public async chatInputCards(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<Message> {
        await this.replyWithLoading(interaction, false);

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id);
        const user = getUser.isOk() ? getUser.unwrap() : null;

        const getUserCards = await this.container.repo.card.getUserCardsByUserId(user.id, ["Card", "RarityUserCard"]);
        const userCards = getUserCards.isOk() ? getUserCards.unwrap() : null;

        const rarityNames = userCards.map(async (userCard) => {
            const rarityUserCard = userCard.RarityUserCard[0];
            const rarityName = await this.container.repo.rarity.getRarityById(rarityUserCard.rarityId);

            return `${userCard.Card.name} - ${rarityName.unwrap().name} (${userCard.id})`;
        });

        const cards = await Promise.all(rarityNames);

        const embed = new EmbedBuilder().setTitle("Account Cards").setDescription(`${cards.join("\n")}`);

        return interaction.editReply({
            embeds: [embed],
        });
    }
}
