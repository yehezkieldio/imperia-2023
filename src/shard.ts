import "dotenv/config";
import { ShardingManager } from "discord.js";
import { resolve } from "path";
import { shardingConfiguration } from "./configuration";

void new ShardingManager(resolve(__dirname, "index.js"), {
    ...shardingConfiguration,
    token: process.env.DISCORD_BOT_TOKEN,
}).spawn();
