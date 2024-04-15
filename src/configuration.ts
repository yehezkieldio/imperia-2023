import { GatewayIntentBits, Partials, ShardingManagerOptions } from "discord.js";
import { Time } from "@sapphire/time-utilities";
import { ImperiaClientOptions } from "#libraries/extensions/ImperiaClient";
import { LogLevel } from "@sapphire/framework";

export const configuration: ImperiaClientOptions = {
    analyticsEnabled: process.env.ANALYTICS_ENABLED === "true" ?? false,
    allowedMentions: {
        parse: ["users", "roles"],
    },
    bulkOverwriteApplicationCommandRegistries: true,
    defaultPrefix: process.env.DEFAULT_PREFIX ?? "imp!",
    defaultCooldown: {
        delay: Time.Second * 3,
    },
    enableLoaderTraceLoggings: true,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
    loadDefaultErrorListeners: true,
    loadMessageCommandListeners: true,
    logger: {
        level: process.env.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Error,
    },
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
    typing: true,
};

export const shardingConfiguration: ShardingManagerOptions = {
    mode: "worker",
    shardList: "auto",
};
