import { Repository } from "#libraries/structures/Repository";
import { Result } from "@sapphire/result";
import {
    PrismaRarity,
    PrismaRarityIncludes,
    PrismaRarityUserCard,
    PrismaRarityUserCardCreateOptions,
    PrismaRarityUserCardDeleteOptions,
    PrismaRarityUserCardIncludes,
    PrismaRarityUserCardUpdateOptions,
} from "#typings/Prisma";
import { RepositoryError } from "#libraries/errors/RepositoryError";
import { container } from "@sapphire/pieces";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";
import { PossibleIncludes, PrismaRarityIncludesOption } from "#typings/PrismaIncludes";
import { RarityType } from "@prisma/client";

export { Prisma } from "@prisma/client";

export class RarityRepository extends Repository {
    public constructor() {
        super();
    }

    public async getRarityById(
        id: string,
        includes?: PossibleIncludes<PrismaRarityIncludes> | null
    ): Promise<Result<PrismaRarity, RepositoryError>> {
        const includeObject: PrismaRarityIncludesOption = this.getIncludeObject(includes);

        const rarity = await Result.fromAsync(async () =>
            this.prisma.rarity.findFirstOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (rarity.isErr()) container.logger.error(rarity.unwrapErr());

        return rarity.isOk()
            ? Result.ok(rarity.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "RarityRepository",
                      identifier: ImperiaIdentifiers.RarityRepositoryError,
                      message: "The requested rarity was not found.",
                  })
              );
    }

    public async getRarityByName(
        rarityType: RarityType,
        includes?: PossibleIncludes<PrismaRarityIncludes> | null
    ): Promise<Result<PrismaRarity, RepositoryError>> {
        const includeObject: PrismaRarityIncludesOption = this.getIncludeObject(includes);

        const rarity = await Result.fromAsync(async () =>
            this.prisma.rarity.findFirstOrThrow({
                where: {
                    name: rarityType,
                },
                include: includeObject,
            })
        );

        if (rarity.isErr()) container.logger.error(rarity.unwrapErr());

        return rarity.isOk()
            ? Result.ok(rarity.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "RarityRepository",
                      identifier: ImperiaIdentifiers.RarityRepositoryError,
                      message: "The requested rarity was not found.",
                  })
              );
    }

    public async getRarityUserCardByUserCardIdAndRarityId(
        userCardId: string,
        rarityId: string,
        includes?: PossibleIncludes<PrismaRarityUserCardIncludes> | null
    ): Promise<Result<PrismaRarityUserCard, RepositoryError>> {
        const includeObject: PrismaRarityIncludesOption = this.getIncludeObject(includes);

        const rarity = await Result.fromAsync(async () =>
            this.prisma.rarityUserCard.findFirstOrThrow({
                where: {
                    userCardId,
                    rarityId,
                },
                include: includeObject,
            })
        );

        if (rarity.isErr()) container.logger.error(rarity.unwrapErr());

        return rarity.isOk()
            ? Result.ok(rarity.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "RarityRepository",
                      identifier: ImperiaIdentifiers.RarityRepositoryError,
                      message: "The requested rarity user card was not found.",
                  })
              );
    }

    public async createRarityUserCard(
        options: PrismaRarityUserCardCreateOptions
    ): Promise<Result<PrismaRarityUserCard, RepositoryError>> {
        const rarityUserCard = await Result.fromAsync(async () => this.prisma.rarityUserCard.create(options));

        if (rarityUserCard.isErr()) container.logger.error(rarityUserCard.unwrapErr());

        return rarityUserCard.isOk()
            ? Result.ok(rarityUserCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "RarityRepository",
                      identifier: ImperiaIdentifiers.RarityRepositoryError,
                      message: "The requested rarity user card was not found.",
                  })
              );
    }

    public async updateRarityUserCard(
        options: PrismaRarityUserCardUpdateOptions
    ): Promise<Result<PrismaRarityUserCard, RepositoryError>> {
        const updatedRarityUserCard = await Result.fromAsync(async () => this.prisma.rarityUserCard.update(options));

        if (updatedRarityUserCard.isErr()) container.logger.error(updatedRarityUserCard.unwrapErr());

        return updatedRarityUserCard.isOk()
            ? Result.ok(updatedRarityUserCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "RarityRepository",
                      identifier: ImperiaIdentifiers.RarityRepositoryError,
                      message: "The requested rarity user card was not found.",
                  })
              );
    }

    public async deleteRarityUserCard(
        options: PrismaRarityUserCardDeleteOptions
    ): Promise<Result<PrismaRarityUserCard, RepositoryError>> {
        const deletedRarityUserCard = await Result.fromAsync(async () => this.prisma.rarityUserCard.delete(options));

        if (deletedRarityUserCard.isErr()) container.logger.error(deletedRarityUserCard.unwrapErr());

        return deletedRarityUserCard.isOk()
            ? Result.ok(deletedRarityUserCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "RarityRepository",
                      identifier: ImperiaIdentifiers.RarityRepositoryError,
                      message: "The requested rarity user card was not found.",
                  })
              );
    }

    protected static instance: RarityRepository;

    public static getInstance(): RarityRepository {
        if (!RarityRepository.instance) {
            RarityRepository.instance = new RarityRepository();
        }

        return RarityRepository.instance;
    }
}
