import { ApplyOptions } from "@sapphire/decorators";
import { Args, ResultType } from "@sapphire/framework";
import { Message, User } from "discord.js";
import { ImperiaCommand } from "#libraries/extensions/ImperiaCommand";

@ApplyOptions<ImperiaCommand.Options>({
    name: "give",
    description: "A development command for testing purposes.",
    preconditions: ["DeveloperOnly"],
})
export class GiveCommand extends ImperiaCommand {
    public override async messageRun(message: Message, args: Args) {
        const user: ResultType<User> = await args.pickResult("user");
        if (!user.isErr) return message.reply("Invalid user");

        const type: ResultType<string> = await args.pickResult("enum", {
            enum: ["level", "experience", "crystal", "fate"],
        });
        if (!type.isErr) return message.reply("Invalid type");

        const amount: ResultType<number> = await args.pickResult("number");
        if (!amount.isErr) return message.reply("Invalid amount");

        switch (type.unwrap()) {
            case "level":
                await this.container.svc.progression.addUserLevel(user.unwrap().id, amount.unwrap());
                await message.reply(`Given ${amount.unwrap()} level(s) to ${user.unwrap().tag}`);
                break;
            case "experience":
                await this.container.svc.progression.addUserExperience(user.unwrap().id, amount.unwrap());
                await message.reply(`Given ${amount.unwrap()} experience to ${user.unwrap().tag}`);
                break;
            case "crystal":
                await this.container.svc.economy.addCrystal(user.unwrap().id, amount.unwrap());
                await message.reply(`Given ${amount.unwrap()} crystal(s) to ${user.unwrap().tag}`);
                break;
            case "fate":
                await this.container.svc.economy.addFate(user.unwrap().id, amount.unwrap());
                await message.reply(`Given ${amount.unwrap()} fate(s) to ${user.unwrap().tag}`);
                break;
        }
    }
}
