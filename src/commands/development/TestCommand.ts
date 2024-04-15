import { ApplyOptions } from "@sapphire/decorators";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";
import { Constants } from "#utils/Constants";
import { ImperiaCommand } from "#libraries/extensions/ImperiaCommand";

@ApplyOptions<ImperiaCommand.Options>({
    name: "test",
    description: "A development command for testing purposes.",
    preconditions: ["DeveloperOnly"],
})
export class TestCommand extends ImperiaCommand {
    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: Constants.TEST_SERVERS,
            idHints: [],
        });
    }

    public override async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        return interaction.reply("Test command");
    }
}
