import { Precondition, PreconditionOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { CommandInteraction } from "discord.js";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";

@ApplyOptions<PreconditionOptions>({
    name: "RegisteredUserOnly",
})
export class RegisteredUserOnlyPrecondition extends Precondition {
    public override async chatInputRun(interaction: CommandInteraction) {
        const user = await this.container.repo.user.getUserByDiscordId(interaction.user.id);

        return user.isOk()
            ? this.ok()
            : this.error({
                  message: "You are not registered.",
                  identifier: ImperiaIdentifiers.PreconditionRegisteredUserOnly,
              });
    }
}
