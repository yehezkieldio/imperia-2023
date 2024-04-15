import { ChatInputCommandSuccessPayload, Listener } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { ImperiaEvents } from "#typings/ImperiaEvents";
import { ImperiaClientOptions } from "#libraries/extensions/ImperiaClient";

@ApplyOptions<Listener.Options>({
    name: "chatInputCommandSuccess",
    once: false,
    event: ImperiaEvents.ChatInputCommandSuccess,
})
export class ChatInputSuccessListener extends Listener {
    public async run(payload: ChatInputCommandSuccessPayload) {
        const options: ImperiaClientOptions = this.container.client.options as ImperiaClientOptions;

        if (!options.analyticsEnabled) return;

        const command = await this.container.analytics.createCommandAnalytics({
            data: {
                command: payload.command.name,
                time: new Date(),
            },
        });

        if (command.isErr()) this.container.logger.error(command.unwrapErr());
        this.container.logger.debug(`Command ${payload.command.name} was executed by ${payload.interaction.user.tag}`);
    }
}
