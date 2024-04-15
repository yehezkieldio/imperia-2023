import { Listener } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { ActivityType } from "discord.js";
import { ImperiaEvents } from "#typings/ImperiaEvents";

@ApplyOptions<Listener.Options>({
    name: "shardReady",
    once: false,
    event: ImperiaEvents.ShardReady,
})
export class ShardReadyListener extends Listener {
    public run(id: number) {
        this.container.logger.debug(`Shard ${id} is ready.`);
    }
}
