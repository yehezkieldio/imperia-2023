import { ApplyOptions } from "@sapphire/decorators";
import { RegisterBehavior } from "@sapphire/framework";
import {
    ActionRowBuilder,
    bold,
    ButtonBuilder,
    ButtonStyle,
    italic,
    SlashCommandBuilder,
    OAuth2Scopes,
} from "discord.js";
import { Constants } from "#utils/Constants";
import { ImperiaCommand } from "#libraries/extensions/ImperiaCommand";
import { EmbedBuilder } from "#utils/EmbedBuilder";

@ApplyOptions<ImperiaCommand.Options>({
    name: "about",
    description: "View information about Imperia.",
    preconditions: [],
})
export class AboutCommand extends ImperiaCommand {
    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public override async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        const components = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(
                    this.container.client.generateInvite({
                        scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
                    })
                )
                .setLabel("Invite"),
            new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(Constants.GITHUB_REPOSITORY).setLabel("GitHub")
        );

        const description = `${bold(
            "Imperia"
        )} is a Discord bot that offers a variety of features, including card collecting, card battling, card trading, and many more. It is currently in ${italic(
            "pre-alpha"
        )}, and is not yet playable in its current state.\n\nThe ${bold(
            "Empyrean Realm"
        )} refers to the collective of users who are registered and play Imperia. You can join the realm to use Imperia's features by using the ${bold(
            "/register"
        )} command. 
        `;

        const fields = {
            developers: ["aeviterna#4253 (Liz)", "Zarr#2072 (Xyzer)"].join("\n"),
            version: Constants.VERSION,
        };

        const embed = new EmbedBuilder()
            .setAuthor({
                name: this.container.client.user.username,
                iconURL: this.container.client.user.displayAvatarURL(),
            })
            .setDescription(description)
            .addFields([
                {
                    name: "Version",
                    value: fields.version,
                    inline: true,
                },
                {
                    name: "Developers",
                    value: fields.developers,
                    inline: true,
                },
            ]);

        return interaction.reply({ embeds: [embed], components: [components] });
    }
}
