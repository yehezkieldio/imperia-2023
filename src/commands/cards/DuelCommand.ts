import { ApplyOptions } from "@sapphire/decorators";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";
import { ImperiaCommand } from "#libraries/extensions/ImperiaCommand";
import { EmbedBuilder } from "#utils/EmbedBuilder";
import { Constants } from "#utils/Constants";

@ApplyOptions<ImperiaCommand.Options>({
    name: "duel",
    description: "Duel another user.",
    preconditions: ["RegisteredUserOnly"],
})
export class DuelCommand extends ImperiaCommand {
    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addUserOption((option) => option.setName("user").setDescription("The user to duel.").setRequired(true));

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public override async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        await interaction.deferReply({ fetchReply: true, ephemeral: false });
        await interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(
                    `${Constants.EMOJI.LOADING} ・ Please wait while we process your request.`
                ),
            ],
        });

        try {
            const getAuthor = await this.container.repo.user.getUserByDiscordId(interaction.user.id);
            const getTarget = await this.container.repo.user.getUserByDiscordId(
                interaction.options.getUser("user", true).id
            );
            const author = getAuthor.isOk() ? getAuthor.unwrap() : null;
            const target = getTarget.isOk() ? getTarget.unwrap() : null;

            const getAuthorDeck = await this.container.repo.card.getCardDecksByUserId(author.id, ["UserCard"]);
            const getTargetDeck = await this.container.repo.card.getCardDecksByUserId(target.id, ["UserCard"]);
            const authorDeck = getAuthorDeck.isOk() ? getAuthorDeck.unwrap() : null;
            const targetDeck = getTargetDeck.isOk() ? getTargetDeck.unwrap() : null;

            this.container.logger.debug("attacker deck", authorDeck[0].UserCard);
            this.container.logger.debug("defender deck", targetDeck[0].UserCard);

            // await this.container.svc.duel.performBattle({
            //     attacker: {
            //         user: author,
            //         deck: authorDeck,
            //     },
            //     defender: {
            //         user: target,
            //         deck: targetDeck,
            //     },
            // });
        } catch (e) {
            this.container.logger.error(e);
        }

        return interaction.editReply({
            embeds: [new EmbedBuilder().setDescription(`duel command`)],
        });
    }
}
