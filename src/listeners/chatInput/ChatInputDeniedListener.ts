import { type ChatInputCommandDeniedPayload, Listener, type UserError } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { ImperiaEvents } from "#typings/ImperiaEvents";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";
import { bold, ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<Listener.Options>({
    name: "chatInputCommandDenied",
    once: false,
    event: ImperiaEvents.ChatInputCommandDenied,
})
export class ChatInputDeniedListener extends Listener {
    public run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
        if (error.message.includes("Unknown interaction")) {
            this.container.logger.debug("Unknown interaction detected", error.message);
        }
        if (error.identifier === ImperiaIdentifiers.PreconditionRegisteredUserOnly) {
            return this.buildInteractionReply(interaction, error);
        }

        return interaction.reply({
            content: error.message,
            ephemeral: true,
        });
    }

    private buildInteractionReply(interaction: ChatInputCommandInteraction, error: UserError) {
        if (interaction.deferred || interaction.replied) {
            return interaction.editReply({
                content: `${bold(error.identifier)}: ${error.message}`,
            });
        }

        return interaction.reply({
            content: `${bold(error.identifier)}: ${error.message}`,
        });
    }
}
