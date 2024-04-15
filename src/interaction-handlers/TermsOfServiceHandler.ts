import { InteractionHandler, InteractionHandlerTypes } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import dayjs from "dayjs";
import { ButtonInteraction } from "discord.js";
import { Constants } from "#utils/Constants";
import { EmbedBuilder } from "#utils/EmbedBuilder";

export enum TermsOfServiceStatus {
    ACCEPTED = "accepted",
    DECLINED = "declined",
}

interface ParsedData {
    userId: string;
    status: TermsOfServiceStatus;
}

@ApplyOptions<InteractionHandler.Options>({
    name: "TermsOfServiceHandler",
    enabled: true,
    interactionHandlerType: InteractionHandlerTypes.Button,
})
export class TermsOfServiceHandler extends InteractionHandler {
    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId.startsWith(Constants.BUTTON_IDENTIFIER.TERMS_OF_SERVICE)) {
            const [_, userId, status] = interaction.customId.split("-");
            const currentStatus = status as TermsOfServiceStatus;

            if (currentStatus === TermsOfServiceStatus.ACCEPTED) {
                return this.some<ParsedData>({
                    userId,
                    status: TermsOfServiceStatus.ACCEPTED,
                });
            } else if (status === TermsOfServiceStatus.DECLINED) {
                return this.some<ParsedData>({
                    userId,
                    status: TermsOfServiceStatus.DECLINED,
                });
            }
        }

        return this.none();
    }

    public override async run(interaction: ButtonInteraction, parsedData?: ParsedData) {
        await interaction.update({
            components: [],
        });

        if (parsedData.status === TermsOfServiceStatus.DECLINED) {
            return interaction.editReply({
                embeds: [new EmbedBuilder().setDescription("You have declined the terms of service.")],
            });
        }

        const createUser = await this.container.repo.user.createUser({
            data: {
                discordId: parsedData.userId,
                RewardsClaim: {
                    create: {
                        hour: dayjs().subtract(1, "hour").toDate(),
                        daily: dayjs().subtract(1, "day").toDate(),
                        weekly: dayjs().subtract(1, "week").toDate(),
                    },
                },
                Progression: {
                    create: {
                        level: 1,
                        experience: 0,
                    },
                },
                Balance: {
                    create: {
                        fate: 0,
                        crystal: 0,
                    },
                },
            },
        });

        if (createUser.isErr()) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder().isErrorEmbed().setDescription("An error occurred while creating your account."),
                ],
            });
        }

        return interaction.editReply({
            embeds: [new EmbedBuilder().setDescription("You have successfully registered your account.")],
        });
    }
}
