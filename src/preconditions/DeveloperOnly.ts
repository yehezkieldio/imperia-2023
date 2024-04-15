import { Precondition, PreconditionOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { CommandInteraction, Message } from "discord.js";
import { Constants } from "#utils/Constants";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";

@ApplyOptions<PreconditionOptions>({
    name: "DeveloperOnly",
})
export class DeveloperOnlyPrecondition extends Precondition {
    public override async messageRun(message: Message) {
        return this.checkOwner(message.author.id);
    }

    public override async chatInputRun(interaction: CommandInteraction) {
        return this.checkOwner(interaction.user.id);
    }

    private async checkOwner(id: string) {
        return Constants.DEVELOPERS.includes(id)
            ? this.ok()
            : this.error({
                  message: "You are not a developer!",
                  identifier: ImperiaIdentifiers.PreconditionDeveloperOnly,
              });
    }
}
