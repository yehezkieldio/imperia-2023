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
    name: "deck",
    description: "View your card deck information.",
    preconditions: ["RegisteredUserOnly"],
    subcommands: [
        {
            name: "list",
            chatInputRun: "chatInputDeckList",
        },
        {
            name: "set",
            chatInputRun: "chatInputDeckSet",
        },
    ],
})
export class DeckCommand extends ImperiaCommand {
    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command: SlashCommandSubcommandsOnlyBuilder = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                command.setName("list").setDescription("View your card deck information.")
            )
            .addSubcommand((command: SlashCommandSubcommandBuilder) =>
                command
                    .setName("set")
                    .setDescription("Set your card deck.")
                    .addStringOption((option) =>
                        option.setName("card").setDescription("The card to set.").setRequired(true)
                    )
            );

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputDeckList(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<Message> {
        await this.replyWithLoading(interaction, false);

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id);
        const getCardDeck = await this.container.repo.card.getDefaultCardDeckByUserId(getUser.unwrap().id, [
            "UserCard",
        ]);

        const cardIds = getCardDeck.unwrap().UserCard.map((userCard) => userCard.cardId);

        return interaction.editReply({
            embeds: [new EmbedBuilder().setDescription(cardIds.join("\n "))],
        });
    }

    public async chatInputDeckSet(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<Message> {
        await this.replyWithLoading(interaction, false);

        const cardId = interaction.options.getString("card", true);
        const getCard = await this.container.repo.card.getUserCard(cardId);
        this.container.logger.debug("card", getCard.unwrap());
        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id);

        if (getCard.isErr())
            return interaction.editReply({
                embeds: [new EmbedBuilder().isErrorEmbed().setDescription("Card not found")],
            });

        const card = getCard.unwrap();
        const user = getUser.unwrap();
        await this.container.repo.card.createCardDeck({
            data: {
                name: "default",
                User: {
                    connect: {
                        id: user.id,
                    },
                },
                UserCard: {
                    connect: {
                        id: card.id,
                    },
                },
            },
        });

        return interaction.editReply({
            embeds: [new EmbedBuilder().setDescription("Card deck set")],
        });
    }
}
