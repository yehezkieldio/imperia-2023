import { Listener } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { ActivityType } from "discord.js";
import { ImperiaEvents } from "#typings/ImperiaEvents";
import { Constants } from "#utils/Constants";

@ApplyOptions<Listener.Options>({
    name: "ready",
    once: true,
    event: ImperiaEvents.ClientReady,
})
export class ClientReadyListener extends Listener {
    public run() {
        const userCount = this.container.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

        this.container.logger.debug(
            `Currently serving ${userCount} users within ${this.container.client.guilds.cache.size} guilds.`
        );
        this.container.logger.debug(`Currently loaded ${this.container.stores.get("commands").size} commands.`);
        this.container.logger.debug(`Currently loaded ${this.container.stores.get("listeners").size} listeners.`);

        this.container.client.user.setPresence({
            activities: [
                {
                    type: ActivityType.Competing,
                    name: `your grace ✨`,
                    url: Constants.GITHUB_REPOSITORY,
                },
            ],
            status: "dnd",
        });
    }
}
