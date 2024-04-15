import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";
import { Result } from "@sapphire/result";
import { Repository } from "#libraries/structures/Repository";
import { RepositoryError } from "#libraries/errors/RepositoryError";
import { PrismaUserIncludesOption } from "#typings/PrismaIncludes";
import {
    PrismaUser,
    PrismaUserCreateOptions,
    PrismaUserDeleteOptions,
    PrismaUserIncludes,
    PrismaUserUpdateOptions,
} from "#typings/Prisma";
import { container } from "@sapphire/pieces";

export { Prisma } from "@prisma/client";

export class UserRepository extends Repository {
    public constructor() {
        super();
    }

    public async getUserById(
        id: string,
        includes?: (keyof PrismaUserIncludes)[]
    ): Promise<Result<PrismaUser, RepositoryError>> {
        const includeObject: PrismaUserIncludesOption = this.getIncludeObject(includes);

        const user = await Result.fromAsync(async () =>
            this.prisma.user.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (user.isErr()) container.logger.error(user.unwrapErr());

        return user.isOk()
            ? Result.ok(user.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "UserRepository",
                      identifier: ImperiaIdentifiers.UserRepositoryError,
                      message: "The requested user was not found.",
                  })
              );
    }

    public async getUserByDiscordId(
        discordId: string,
        includes?: (keyof PrismaUserIncludes)[]
    ): Promise<Result<PrismaUser, RepositoryError>> {
        const includeObject: PrismaUserIncludesOption = this.getIncludeObject(includes);

        const user = await Result.fromAsync(async () =>
            this.prisma.user.findUniqueOrThrow({
                where: {
                    discordId,
                },
                include: includeObject,
            })
        );

        if (user.isErr()) container.logger.error(user.unwrapErr());

        return user.isOk()
            ? Result.ok(user.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "UserRepository",
                      identifier: ImperiaIdentifiers.UserRepositoryError,
                      message: "The requested user was not found.",
                  })
              );
    }

    public async getUsers(): Promise<Result<PrismaUser[], RepositoryError>> {
        const user = await Result.fromAsync(async () => this.prisma.user.findMany());

        if (user.isErr()) container.logger.error(user.unwrapErr());

        return user.isOk()
            ? Result.ok(user.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "UserRepository",
                      identifier: ImperiaIdentifiers.UserRepositoryError,
                      message: "The requested users was not found.",
                  })
              );
    }

    public async createUser(options: PrismaUserCreateOptions): Promise<Result<PrismaUser, RepositoryError>> {
        const user = await Result.fromAsync(async () => this.prisma.user.create(options));

        if (user.isErr()) container.logger.error(user.unwrapErr());

        return user.isOk()
            ? Result.ok(user.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "UserRepository",
                      identifier: ImperiaIdentifiers.UserRepositoryError,
                      message: "The requested user was not created.",
                  })
              );
    }

    public async updateUser(options: PrismaUserUpdateOptions): Promise<Result<PrismaUser, RepositoryError>> {
        const user = await Result.fromAsync(async () => this.prisma.user.update(options));

        if (user.isErr()) container.logger.error(user.unwrapErr());

        return user.isOk()
            ? Result.ok(user.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "UserRepository",
                      identifier: ImperiaIdentifiers.UserRepositoryError,
                      message: "The requested user was not updated.",
                  })
              );
    }

    public async deleteUser(options: PrismaUserDeleteOptions): Promise<Result<PrismaUser, RepositoryError>> {
        const user = await Result.fromAsync(async () => this.prisma.user.delete(options));

        if (user.isErr()) container.logger.error(user.unwrapErr());

        return user.isOk()
            ? Result.ok(user.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "UserRepository",
                      identifier: ImperiaIdentifiers.UserRepositoryError,
                      message: "The requested user was not deleted.",
                  })
              );
    }

    public async getUsersCount(): Promise<Result<number, RepositoryError>> {
        const user = await Result.fromAsync(async () => this.prisma.user.count());

        if (user.isErr()) container.logger.error(user.unwrapErr());

        return user.isOk()
            ? Result.ok(user.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "UserRepository",
                      identifier: ImperiaIdentifiers.UserRepositoryError,
                      message: "The requested users was not found.",
                  })
              );
    }

    public async getUserIdByDiscordId(discordId: string): Promise<Result<string, RepositoryError>> {
        const user = await Result.fromAsync(async () =>
            this.prisma.user.findUnique({
                where: {
                    discordId,
                },
                select: {
                    id: true,
                },
            })
        );

        if (user.isErr()) container.logger.error(user.unwrapErr());

        return user.isOk()
            ? Result.ok(user.unwrap().id)
            : Result.err(
                  new RepositoryError({
                      repository: "UserRepository",
                      identifier: ImperiaIdentifiers.UserRepositoryError,
                      message: "The requested user was not found.",
                  })
              );
    }

    protected static instance: UserRepository;

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }
}
