import "dotenv/config";
import { configuration } from "./configuration";
import { ImperiaClient } from "#libraries/extensions/ImperiaClient";

void new ImperiaClient(configuration).login(process.env.DISCORD_BOT_TOKEN);
