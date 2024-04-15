import { Repository } from "#libraries/structures/Repository";
import { Result } from "@sapphire/result";
import { RepositoryError } from "#libraries/errors/RepositoryError";
import { container } from "@sapphire/pieces";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";
import { CommandAnalytics } from "@prisma/client";
import { PrismaCommandAnalyticsCreateOptions } from "#typings/Prisma";

export { Prisma } from "@prisma/client";

export class AnalyticsRepository extends Repository {
    public constructor() {
        super();
    }

    public async createCommandAnalytics(
        options: PrismaCommandAnalyticsCreateOptions
    ): Promise<Result<CommandAnalytics, RepositoryError>> {
        const commandAnalytics = await Result.fromAsync(() => this.prisma.commandAnalytics.create(options));

        if (commandAnalytics.isErr()) container.logger.error(commandAnalytics.unwrapErr());

        return commandAnalytics.isOk()
            ? Result.ok(commandAnalytics.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "AnalyticsRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested commandAnalyticss was not found.",
                  })
              );
    }

    protected static instance: AnalyticsRepository;

    public static getInstance(): AnalyticsRepository {
        if (!AnalyticsRepository.instance) {
            AnalyticsRepository.instance = new AnalyticsRepository();
        }

        return AnalyticsRepository.instance;
    }
}
