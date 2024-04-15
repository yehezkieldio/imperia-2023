import { ApplyOptions } from "@sapphire/decorators";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "#utils/Constants";
import { ImperiaCommand } from "#libraries/extensions/ImperiaCommand";
import { EmbedBuilder } from "#utils/EmbedBuilder";

@ApplyOptions<ImperiaCommand.Options>({
    name: "wish",
    description: "Wish for a card.",
    preconditions: ["RegisteredUserOnly"],
})
export class WishCommand extends ImperiaCommand {
    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public override async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        await this.replyWithLoading(interaction, false);

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id, ["Balance"]);
        const user = getUser.isOk() ? getUser.unwrap() : null;

        if (user.Balance.fate < 1) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .isErrorEmbed()
                        .setDescription(
                            `${Constants.EMOJI.RED_CROSS} ・ You do not have enough fate to wish for a card.`
                        ),
                ],
            });
        }

        const getWish = await this.container.repo.wish.getWishByName("Genshin Impact", ["WishHistory"]);
        const wish = getWish.isOk() ? getWish.unwrap() : null;

        const performWish = await this.container.svc.wish.performWish(wish, user);
        this.container.logger.debug(performWish);

        return interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(
                    `You have wished for a card and received a ${performWish.rarity.rolledRarity} ${performWish.card.name}!`
                ),
            ],
        });
    }
}
