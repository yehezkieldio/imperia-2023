import { Repository } from "#libraries/structures/Repository";
import { Result } from "@sapphire/result";
import {
    PrismaWish,
    PrismaWishCreateOptions,
    PrismaWishDeleteOptions,
    PrismaWishHistory,
    PrismaWishHistoryCreateOptions,
    PrismaWishHistoryDeleteOptions,
    PrismaWishHistoryIncludes,
    PrismaWishHistoryUpdateOptions,
    PrismaWishIncludes,
    PrismaWishUpdateOptions,
} from "#typings/Prisma";
import { RepositoryError } from "#libraries/errors/RepositoryError";
import { container } from "@sapphire/pieces";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";
import { PossibleIncludes, PrismaWishHistoryIncludesOption, PrismaWishIncludesOption } from "#typings/PrismaIncludes";

export { Prisma } from "@prisma/client";

export class WishRepository extends Repository {
    public constructor() {
        super();
    }

    public async getWishes(): Promise<Result<PrismaWish[], RepositoryError>> {
        const wish = await Result.fromAsync(async () => this.prisma.wish.findMany());

        if (wish.isErr()) container.logger.error(wish.unwrapErr());

        return wish.isOk()
            ? Result.ok(wish.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wishes was not found.",
                  })
              );
    }

    public async getWishesCount(): Promise<Result<number, RepositoryError>> {
        const wish = await Result.fromAsync(async () => this.prisma.wish.count());

        if (wish.isErr()) container.logger.error(wish.unwrapErr());

        return wish.isOk()
            ? Result.ok(wish.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wishes was not found.",
                  })
              );
    }

    public async getWishById(
        id: string,
        includes?: PossibleIncludes<PrismaWishIncludes> | null
    ): Promise<Result<PrismaWish, RepositoryError>> {
        const includeObject: PrismaWishIncludesOption = this.getIncludeObject(includes);

        const wish = await Result.fromAsync(async () =>
            this.prisma.wish.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (wish.isErr()) container.logger.error(wish.unwrapErr());

        return wish.isOk()
            ? Result.ok(wish.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish was not found.",
                  })
              );
    }

    public async getWishByName(
        name: string,
        includes?: PossibleIncludes<PrismaWishIncludes> | null
    ): Promise<Result<PrismaWish, RepositoryError>> {
        const includeObject: PrismaWishIncludesOption = this.getIncludeObject(includes);

        const wish = await Result.fromAsync(async () =>
            this.prisma.wish.findFirstOrThrow({
                where: {
                    name,
                },
                include: includeObject,
            })
        );

        if (wish.isErr()) container.logger.error(wish.unwrapErr());

        return wish.isOk()
            ? Result.ok(wish.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish was not found.",
                  })
              );
    }

    public async getWishHistories(): Promise<Result<PrismaWishHistory[], RepositoryError>> {
        const wishHistory = await Result.fromAsync(async () => this.prisma.wishHistory.findMany());

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish histories was not found.",
                  })
              );
    }

    public async getWishHistoriesCount(): Promise<Result<number, RepositoryError>> {
        const wishHistory = await Result.fromAsync(async () => this.prisma.wishHistory.count());

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish histories was not found.",
                  })
              );
    }

    public async getWishHistoriesCountByUserId(userId: string): Promise<Result<number, RepositoryError>> {
        const wishHistory = await Result.fromAsync(async () =>
            this.prisma.wishHistory.count({
                where: {
                    userId,
                },
            })
        );

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish histories was not found.",
                  })
              );
    }

    public async getWishHistoryById(
        id: string,
        includes?: PossibleIncludes<PrismaWishHistoryIncludes> | null
    ): Promise<Result<PrismaWishHistory, RepositoryError>> {
        const includeObject: PrismaWishHistoryIncludesOption = this.getIncludeObject(includes);

        const wishHistory = await Result.fromAsync(async () =>
            this.prisma.wishHistory.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish history was not found.",
                  })
              );
    }

    public async getWishHistoryByWishId(
        wishId: string,
        includes?: PossibleIncludes<PrismaWishHistoryIncludes> | null
    ): Promise<Result<PrismaWishHistory[], RepositoryError>> {
        const includeObject: PrismaWishHistoryIncludesOption = this.getIncludeObject(includes);

        const wishHistory = await Result.fromAsync(async () =>
            this.prisma.wishHistory.findMany({
                where: {
                    wishId,
                },
                include: includeObject,
            })
        );

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish history was not found.",
                  })
              );
    }

    public async getWishHistoryByUserId(
        userId: string,
        includes?: PossibleIncludes<PrismaWishHistoryIncludes> | null
    ): Promise<Result<PrismaWishHistory[], RepositoryError>> {
        const includeObject: PrismaWishHistoryIncludesOption = this.getIncludeObject(includes);

        const wishHistory = await Result.fromAsync(async () =>
            this.prisma.wishHistory.findMany({
                where: {
                    userId,
                },
                include: includeObject,
            })
        );

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish history was not found.",
                  })
              );
    }

    public async getWishHistoryByWishIdAndUserId(
        wishId: string,
        userId: string,
        includes?: PossibleIncludes<PrismaWishHistoryIncludes> | null
    ): Promise<Result<PrismaWishHistory[], RepositoryError>> {
        const includeObject: PrismaWishHistoryIncludesOption = this.getIncludeObject(includes);

        const wishHistory = await Result.fromAsync(async () =>
            this.prisma.wishHistory.findMany({
                where: {
                    wishId,
                    userId,
                },
                include: includeObject,
            })
        );

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish history was not found.",
                  })
              );
    }

    public async createWish(options: PrismaWishCreateOptions): Promise<Result<PrismaWish, RepositoryError>> {
        const wish = await Result.fromAsync(async () => this.prisma.wish.create(options));

        if (wish.isErr()) container.logger.error(wish.unwrapErr());

        return wish.isOk()
            ? Result.ok(wish.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish was not created.",
                  })
              );
    }

    public async createWishHistory(
        options: PrismaWishHistoryCreateOptions
    ): Promise<Result<PrismaWishHistory, RepositoryError>> {
        const wishHistory = await Result.fromAsync(async () => this.prisma.wishHistory.create(options));

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish history was not created.",
                  })
              );
    }

    public async updateWish(options: PrismaWishUpdateOptions): Promise<Result<PrismaWish, RepositoryError>> {
        const wish = await Result.fromAsync(async () => this.prisma.wish.update(options));

        if (wish.isErr()) container.logger.error(wish.unwrapErr());

        return wish.isOk()
            ? Result.ok(wish.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish was not updated.",
                  })
              );
    }

    public async updateWishHistory(
        options: PrismaWishHistoryUpdateOptions
    ): Promise<Result<PrismaWishHistory, RepositoryError>> {
        const wishHistory = await Result.fromAsync(async () => this.prisma.wishHistory.update(options));

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish history was not updated.",
                  })
              );
    }

    public async deleteWish(options: PrismaWishDeleteOptions): Promise<Result<PrismaWish, RepositoryError>> {
        const wish = await Result.fromAsync(async () => this.prisma.wish.delete(options));

        if (wish.isErr()) container.logger.error(wish.unwrapErr());

        return wish.isOk()
            ? Result.ok(wish.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish was not deleted.",
                  })
              );
    }

    public async deleteWishHistory(
        options: PrismaWishHistoryDeleteOptions
    ): Promise<Result<PrismaWishHistory, RepositoryError>> {
        const wishHistory = await Result.fromAsync(async () => this.prisma.wishHistory.delete(options));

        if (wishHistory.isErr()) container.logger.error(wishHistory.unwrapErr());

        return wishHistory.isOk()
            ? Result.ok(wishHistory.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "WishRepository",
                      identifier: ImperiaIdentifiers.WishRepositoryError,
                      message: "The requested wish history was not deleted.",
                  })
              );
    }

    protected static instance: WishRepository;

    public static getInstance(): WishRepository {
        if (!WishRepository.instance) {
            WishRepository.instance = new WishRepository();
        }

        return WishRepository.instance;
    }
}
