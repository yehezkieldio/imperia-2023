import {
    ApplicationCommandRegistries,
    RegisterBehavior,
    SapphireClient,
    SapphireClientOptions,
} from "@sapphire/framework";
import { container } from "@sapphire/pieces";
import { ClientOptions } from "discord.js";
import { PrismaClient } from "#libraries/extensions/PrismaClient";
import { UserRepository } from "#repositories/UserRepository";
import { CardRepository } from "#repositories/CardRepository";
import { DuelRepository } from "#repositories/DuelRepository";
import { SkillRepository } from "#repositories/SkillRepository";
import { WishRepository } from "#repositories/WishRepository";
import { RarityRepository } from "#repositories/RarityRepository";
import { DuelService } from "#services/DuelService";
import { EconomyService } from "#services/EconomyService";
import { ProgressionService } from "#services/ProgressionService";
import { WishService } from "#services/WishService";
import { AnalyticsRepository } from "#repositories/AnalyticsRepository";

export interface ImperiaClientOptions extends SapphireClientOptions, ClientOptions {
    bulkOverwriteApplicationCommandRegistries?: boolean;
    analyticsEnabled?: boolean;
}

export class ImperiaClient extends SapphireClient {
    public constructor(options: ImperiaClientOptions) {
        super(options);

        if (options.bulkOverwriteApplicationCommandRegistries) {
            ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        }

        container.prisma = PrismaClient.getInstance();
        container.analytics = options.analyticsEnabled ? AnalyticsRepository.getInstance() : undefined;
        container.repo = {
            card: CardRepository.getInstance(),
            duel: DuelRepository.getInstance(),
            rarity: RarityRepository.getInstance(),
            skill: SkillRepository.getInstance(),
            user: UserRepository.getInstance(),
            wish: WishRepository.getInstance(),
        };
        container.svc = {
            duel: DuelService.getInstance(),
            economy: EconomyService.getInstance(),
            progression: ProgressionService.getInstance(),
            wish: WishService.getInstance(),
        };
    }
}
