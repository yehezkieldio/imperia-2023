import { PrismaClient } from "#libraries/extensions/PrismaClient";
import { UserRepository } from "../../repositories/UserRepository";
import { ChatInputCommand } from "@sapphire/framework";
import { CardRepository } from "../../repositories/CardRepository";
import { DuelRepository } from "../../repositories/DuelRepository";
import { WishRepository } from "../../repositories/WishRepository";
import { SkillRepository } from "../../repositories/SkillRepository";
import { RarityRepository } from "../../repositories/RarityRepository";
import { DuelService } from "../../services/DuelService";
import { EconomyService } from "../../services/EconomyService";
import { ProgressionService } from "../../services/ProgressionService";
import { WishService } from "../../services/WishService";
import { Analytics } from "#libraries/structures/Analytics";
import { AnalyticsRepository } from "#repositories/AnalyticsRepository";

declare module "@sapphire/framework" {
    interface Preconditions {
        DeveloperOnly: never;
        RegisteredUserOnly: never;
    }
}

declare module "@sapphire/plugin-subcommands" {
    interface Subcommand {
        chatInputRun(interaction: ChatInputCommand.Interaction, context: ChatInputCommand.RunContext): Promise<void>;
    }
}

declare module "@sapphire/pieces" {
    interface Container {
        prisma: PrismaClient;
        analytics: AnalyticsRepository;
        repo: {
            card: CardRepository;
            duel: DuelRepository;
            rarity: RarityRepository;
            skill: SkillRepository;
            user: UserRepository;
            wish: WishRepository;
        };
        svc: {
            duel: DuelService;
            economy: EconomyService;
            progression: ProgressionService;
            wish: WishService;
        };
    }
}
