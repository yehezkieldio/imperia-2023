import { ApplyOptions } from "@sapphire/decorators";
import { RegisterBehavior } from "@sapphire/framework";
import { ActionRowBuilder, bold, ButtonBuilder, ButtonStyle, OAuth2Scopes, SlashCommandBuilder } from "discord.js";
import { Constants } from "#utils/Constants";
import { ImperiaCommand } from "#libraries/extensions/ImperiaCommand";
import { TermsOfServiceStatus } from "../../interaction-handlers/TermsOfServiceHandler";
import { EmbedBuilder } from "#utils/EmbedBuilder";

@ApplyOptions<ImperiaCommand.Options>({
    name: "register",
    description: "Register an account to use Imperia's features.",
    preconditions: [],
})
export class RegisterCommand extends ImperiaCommand {
    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public override async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        await this.replyWithLoading(interaction);

        const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId(
                    `${Constants.BUTTON_IDENTIFIER.TERMS_OF_SERVICE}-${interaction.user.id}-${TermsOfServiceStatus.ACCEPTED}`
                )
                .setLabel("Accept")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(
                    `${Constants.BUTTON_IDENTIFIER.TERMS_OF_SERVICE}-${interaction.user.id}-${TermsOfServiceStatus.DECLINED}`
                )
                .setLabel("Decline")
                .setStyle(ButtonStyle.Danger)
        );

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id);
        const user = getUser.isOk() ? getUser.unwrap() : null;

        if (user) {
            return interaction.editReply({
                embeds: [new EmbedBuilder().setDescription("You are already registered!")],
            });
        }

        return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Welcome to the Empyrean Realm!`)
                    .setDescription(
                        `${bold("Imperia")} is a experimental Discord trading card game bot. Before you can use ${bold(
                            "Imperia"
                        )}'s feature, you must agree to the following ${bold("terms and conditions")}:`
                    )
                    .addFields(
                        {
                            name: "1. Non-commercial Use",
                            value: `${bold(
                                "Imperia"
                            )} is a non-commercial project and is intended for entertainment and educational purposes only. You are not allowed to use Imperia for any commercial purpose.`,
                        },
                        {
                            name: "2. Discord ID Usage",
                            value: `${bold(
                                "Imperia"
                            )} uses your Discord ID for user identification purposes only. We will never share or sell your ${bold(
                                "personal information"
                            )} to third parties.`,
                        },
                        {
                            name: "3. Use at Your Own Risk",
                            value: `You acknowledge and agree that your use of ${bold(
                                "Imperia"
                            )} is at your own risk. ${bold("Imperia")} is provided ${bold(
                                '"as is"'
                            )} without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.`,
                        },
                        {
                            name: "4. Experimental Project",
                            value: `${bold(
                                "Imperia"
                            )} is an experimental project and we may make changes to the game at any time, ${bold(
                                "without notice"
                            )}. We reserve the right to ${bold(
                                "suspend or terminate"
                            )} your access to Imperia at any time, without notice.`,
                        },
                        {
                            name: "5. Compliance with Laws",
                            value: `By using ${bold(
                                "Imperia"
                            )}, you agree to comply with all applicable laws, rules and regulations. You also agree to indemnify and hold us harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of ${bold(
                                "Imperia"
                            )}.`,
                        }
                    )
                    .setFooter({
                        text: "Agree to the terms and conditions to use Imperia.",
                    }),
            ],
            components: [buttons],
        });
    }
}
