import { Subcommand, SubcommandOptions } from "@sapphire/plugin-subcommands";
import { Args, ChatInputCommand, MessageCommand } from "@sapphire/framework";
import { EmbedBuilder } from "#utils/EmbedBuilder";
import { Constants } from "#utils/Constants";
import { Message } from "discord.js";

export abstract class ImperiaCommand extends Subcommand {
    protected constructor(context: Subcommand.Context, options: SubcommandOptions) {
        super(context, {
            ...options,
        });
    }

    public async replyWithLoading(interaction: ChatInputCommand.Interaction, ephemeral = true) {
        await interaction.deferReply({ fetchReply: true, ephemeral });
        await interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(
                    `${Constants.EMOJI.LOADING} ・ Please wait while we process your request.`
                ),
            ],
        });
    }

    // @ts-ignore: Promise<unknown> instead of Promise<void>
    public async chatInputRun(
        interaction: ChatInputCommand.Interaction,
        context: ChatInputCommand.RunContext
    ): Promise<unknown> {
        return super.chatInputRun(interaction, context);
    }

    // @ts-ignore: Promise<unknown> instead of Promise<void>
    public async messageRun(message: Message, args: Args, context: MessageCommand.RunContext): Promise<unknown> {
        return super.messageRun(message, args, context);
    }
}

export declare namespace ImperiaCommand {
    type Options = SubcommandOptions;
    type JSON = Subcommand.JSON;
    type Context = Subcommand.Context;
    type RunInTypes = Subcommand.RunInTypes;
    type ChatInputCommandInteraction = Subcommand.ChatInputCommandInteraction;
    type ContextMenuCommandInteraction = Subcommand.ContextMenuCommandInteraction;
    type AutocompleteInteraction = Subcommand.AutocompleteInteraction;
    type Registry = Subcommand.Registry;
}
