import { ApplyOptions } from "@sapphire/decorators";
import { RegisterBehavior } from "@sapphire/framework";
import { Message, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import dayjs, { ManipulateType, OpUnitType, QUnitType } from "dayjs";
import { ImperiaCommand } from "#libraries/extensions/ImperiaCommand";
import { EmbedBuilder } from "#utils/EmbedBuilder";
import { Constants } from "#utils/Constants";
import { Utils } from "#utils/Utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.tz.setDefault("Asia/Makassar");

@ApplyOptions<ImperiaCommand.Options>({
    name: "rewards",
    description: "See your available rewards and claim them.",
    preconditions: ["RegisteredUserOnly"],
    subcommands: [
        {
            name: "cooldown",
            chatInputRun: "chatInputCooldown",
        },
        {
            name: "hourly",
            chatInputRun: "chatInputHourly",
        },
        {
            name: "daily",
            chatInputRun: "chatInputDaily",
        },
        {
            name: "weekly",
            chatInputRun: "chatInputWeekly",
        },
    ],
})
export class RewardsCommand extends ImperiaCommand {
    public override registerApplicationCommands(registry: ImperiaCommand.Registry): void {
        const command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addSubcommand((command) => command.setName("cooldown").setDescription("View your reward cooldowns."))
            .addSubcommand((command) => command.setName("hourly").setDescription("Claim your hourly reward."))
            .addSubcommand((command) => command.setName("daily").setDescription("Claim your daily reward."))
            .addSubcommand((command) => command.setName("weekly").setDescription("Claim your weekly reward."));

        registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputCooldown(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<Message> {
        await this.replyWithLoading(interaction, false);

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id, ["RewardsClaim"]);
        const user = getUser.unwrap();

        const hourly = await this.getTimeDifference(user.RewardsClaim.hour, "hour");
        const daily = await this.getTimeDifference(user.RewardsClaim.daily, "day");
        const weekly = await this.getTimeDifference(user.RewardsClaim.weekly, "week");

        return interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`Reward Cooldowns for ${interaction.user.tag}`)
                    .setDescription(`> **Hourly:** ${hourly}\n> **Daily:** ${daily}\n> **Weekly:** ${weekly}.`),
            ],
        });
    }

    public async chatInputHourly(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<Message> {
        await this.replyWithLoading(interaction, false);

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id, ["RewardsClaim"]);
        const user = getUser.unwrap();

        const now = dayjs();
        const lastClaim = dayjs(user.RewardsClaim.hour);
        const hourly = now.diff(lastClaim, "hour");

        if (hourly < 1) {
            const remainingMiliseconds = dayjs(user.RewardsClaim.hour).add(1, "hour").diff(dayjs(), "millisecond");

            return interaction.editReply({
                embeds: [
                    new EmbedBuilder().setDescription(
                        `${
                            Constants.EMOJI.CHECKMARK
                        } ・ You have already claimed your hourly reward! Please try again in ${this.getTimeDuration(
                            remainingMiliseconds
                        )}.`
                    ),
                ],
            });
        }

        const rewards = new Utils().getRandomInt(100, 500);
        await this.container.svc.economy.addCrystal(interaction.user.id, rewards);
        const updateUserData = await this.container.repo.user.updateUser({
            where: {
                discordId: interaction.user.id,
            },
            data: {
                RewardsClaim: {
                    update: {
                        hour: now.toDate(),
                    },
                },
            },
        });
        if (updateUserData.isErr()) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder().setDescription(
                        `${Constants.EMOJI.RED_CROSS} ・ An error occured while updating your user data.`
                    ),
                ],
            });
        }

        return interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(
                    `${Constants.EMOJI.CHECKMARK} ・ You got ${rewards.toLocaleString("us")} Crystals!`
                ),
            ],
        });
    }

    public async chatInputDaily(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<Message> {
        await this.replyWithLoading(interaction, false);

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id, ["RewardsClaim"]);
        const user = getUser.unwrap();

        const now = dayjs();
        const lastClaim = dayjs(user.RewardsClaim.daily);
        const daily = now.diff(lastClaim, "day");

        if (daily < 1) {
            const remainingMiliseconds = dayjs(user.RewardsClaim.daily).add(1, "day").diff(dayjs(), "millisecond");

            return interaction.editReply({
                embeds: [
                    new EmbedBuilder().setDescription(
                        `${
                            Constants.EMOJI.CHECKMARK
                        } ・ You have already claimed your daily reward! Please try again in ${this.getTimeDuration(
                            remainingMiliseconds
                        )}.`
                    ),
                ],
            });
        }

        const rewards = new Utils().getRandomInt(500, 1000);
        await this.container.svc.economy.addCrystal(interaction.user.id, rewards);
        const updateUserData = await this.container.repo.user.updateUser({
            where: {
                discordId: interaction.user.id,
            },
            data: {
                RewardsClaim: {
                    update: {
                        daily: now.toDate(),
                    },
                },
            },
        });
        if (updateUserData.isErr()) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder().setDescription(
                        `${Constants.EMOJI.RED_CROSS} ・ An error occured while updating your user data.`
                    ),
                ],
            });
        }

        return interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(
                    `${Constants.EMOJI.CHECKMARK} ・ You got ${rewards.toLocaleString("us")} Crystals!`
                ),
            ],
        });
    }

    public async chatInputWeekly(interaction: ImperiaCommand.ChatInputCommandInteraction): Promise<Message> {
        await this.replyWithLoading(interaction, false);

        const getUser = await this.container.repo.user.getUserByDiscordId(interaction.user.id, ["RewardsClaim"]);
        const user = getUser.unwrap();

        const now = dayjs();
        const lastClaim = dayjs(user.RewardsClaim.weekly);
        const weekly = now.diff(lastClaim, "week");

        if (weekly < 1) {
            const remainingMiliseconds = dayjs(user.RewardsClaim.weekly).add(1, "week").diff(dayjs(), "millisecond");

            return interaction.editReply({
                embeds: [
                    new EmbedBuilder().setDescription(
                        `${
                            Constants.EMOJI.CHECKMARK
                        } ・ You have already claimed your weekly reward! Please try again in ${this.getTimeDuration(
                            remainingMiliseconds
                        )}`
                    ),
                ],
            });
        }

        const rewards = new Utils().getRandomInt(1000, 5000);
        await this.container.svc.economy.addCrystal(interaction.user.id, rewards);
        await this.container.svc.economy.addFate(interaction.user.id, 5);
        const updateUserData = await this.container.repo.user.updateUser({
            where: {
                discordId: interaction.user.id,
            },
            data: {
                RewardsClaim: {
                    update: {
                        weekly: now.toDate(),
                    },
                },
            },
        });
        if (updateUserData.isErr()) {
            return interaction.editReply({
                embeds: [
                    new EmbedBuilder().setDescription(
                        `${Constants.EMOJI.RED_CROSS} ・ An error occured while updating your user data.`
                    ),
                ],
            });
        }

        return interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(
                    `${Constants.EMOJI.CHECKMARK} ・ You got ${rewards.toLocaleString("us")} Crystals and 5 Fates!`
                ),
            ],
        });
    }

    private getTimeDuration(milliseconds: number): string {
        const durationObj = dayjs.duration(milliseconds);

        const days = durationObj.days();
        const hours = durationObj.hours();
        const minutes = durationObj.minutes();
        const seconds = durationObj.seconds();

        let formattedTime = "";
        if (days > 0) {
            formattedTime += `${days} day${days > 1 ? "s" : ""}, `;
        }
        if (hours > 0 || days > 0) {
            formattedTime += `${hours} hour${hours > 1 ? "s" : ""}, `;
        }
        if (minutes > 0 || hours > 0 || days > 0) {
            formattedTime += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
        }
        formattedTime += `${seconds} second${seconds > 1 ? "s" : ""}`;

        return formattedTime;
    }

    private getTimeDifference(lastClaimDate: Date, timeBenchmark: QUnitType | OpUnitType): number | string | boolean {
        const lastClaim = dayjs(lastClaimDate);
        const now = dayjs();

        const difference = now.diff(lastClaim, timeBenchmark);

        if (difference < 1) {
            const miliseconds = dayjs(lastClaimDate)
                .add(1, timeBenchmark as ManipulateType)
                .diff(now, "millisecond");
            return `${this.getTimeDuration(miliseconds)}`;
        }
        return `Ready to claim.`;
    }
}
