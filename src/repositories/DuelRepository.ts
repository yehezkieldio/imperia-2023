import { Repository } from "#libraries/structures/Repository";
import { Result } from "@sapphire/result";
import {
    PrismaActionEffect,
    PrismaActionEffectCreateOptions,
    PrismaActionEffectDeleteOptions,
    PrismaActionEffectIncludes,
    PrismaActionEffectUpdateOptions,
    PrismaActionType,
    PrismaActionTypeCreateOptions,
    PrismaActionTypeDeleteOptions,
    PrismaActionTypeIncludes,
    PrismaActionTypeUpdateOptions,
    PrismaDuel,
    PrismaDuelAction,
    PrismaDuelActionCreateOptions,
    PrismaDuelActionDeleteOptions,
    PrismaDuelActionUpdateOptions,
    PrismaDuelCreateOptions,
    PrismaDuelDeleteOptions,
    PrismaDuelIncludes,
    PrismaDuelRound,
    PrismaDuelRoundCreateOptions,
    PrismaDuelRoundDeleteOptions,
    PrismaDuelRoundUpdateOptions,
    PrismaDuelUpdateOptions,
} from "#typings/Prisma";
import { RepositoryError } from "#libraries/errors/RepositoryError";
import { container } from "@sapphire/pieces";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";
import { DuelStatus, TargetType } from "@prisma/client";
import {
    PossibleIncludes,
    PrismaActionEffectIncludesOption,
    PrismaActionTypeIncludesOption,
    PrismaDuelActionIncludesOption,
    PrismaDuelRoundIncludesOption,
} from "#typings/PrismaIncludes";

export { Prisma } from "@prisma/client";

export class DuelRepository extends Repository {
    public constructor() {
        super();
    }

    public async getDuels(): Promise<Result<PrismaDuel[], RepositoryError>> {
        const duel = await Result.fromAsync(async () => this.prisma.duel.findMany());

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duels was not found.",
                  })
              );
    }

    public async getDuelsByDuelStatus(status: DuelStatus): Promise<Result<PrismaDuel[], RepositoryError>> {
        const duel = await Result.fromAsync(async () =>
            this.prisma.duel.findMany({
                where: {
                    status,
                },
            })
        );

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duels was not found.",
                  })
              );
    }

    public async getDuelById(
        id: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuel, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duel = await Result.fromAsync(async () =>
            this.prisma.duel.findUnique({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel was not found.",
                  })
              );
    }

    public async getDuelByPlayerOneId(
        playerOneId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuel, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duel = await Result.fromAsync(async () =>
            this.prisma.duel.findFirstOrThrow({
                where: {
                    playerOneId,
                },
                include: includeObject,
            })
        );

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel was not found.",
                  })
              );
    }

    public async getDuelByPlayerTwoId(
        playerTwoId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuel, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duel = await Result.fromAsync(async () =>
            this.prisma.duel.findFirstOrThrow({
                where: {
                    playerTwoId,
                },
                include: includeObject,
            })
        );

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel was not found.",
                  })
              );
    }

    public async getDuelByPlayerOneIdAndPlayerTwoId(
        playerOneId: string,
        playerTwoId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuel, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duel = await Result.fromAsync(async () =>
            this.prisma.duel.findFirstOrThrow({
                where: {
                    playerOneId,
                    playerTwoId,
                },
                include: includeObject,
            })
        );

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel was not found.",
                  })
              );
    }

    public async getDuelByWinnerId(
        winnerId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuel, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duel = await Result.fromAsync(async () =>
            this.prisma.duel.findFirstOrThrow({
                where: {
                    winnerId,
                },
                include: includeObject,
            })
        );

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel was not found.",
                  })
              );
    }

    public async createDuel(options: PrismaDuelCreateOptions): Promise<Result<PrismaDuel, RepositoryError>> {
        const duel = await Result.fromAsync(async () => this.prisma.duel.create(options));

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel was not created.",
                  })
              );
    }

    public async updateDuel(options: PrismaDuelUpdateOptions): Promise<Result<PrismaDuel, RepositoryError>> {
        const duel = await Result.fromAsync(async () => this.prisma.duel.update(options));

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel was not updated.",
                  })
              );
    }

    public async deleteDuel(options: PrismaDuelDeleteOptions): Promise<Result<PrismaDuel, RepositoryError>> {
        const duel = await Result.fromAsync(async () => this.prisma.duel.delete(options));

        if (duel.isErr()) container.logger.error(duel.unwrapErr());

        return duel.isOk()
            ? Result.ok(duel.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel was not deleted.",
                  })
              );
    }

    public async getDuelRoundById(
        id: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuelRound, RepositoryError>> {
        const includeObject: PrismaDuelRoundIncludesOption = this.getIncludeObject(includes);

        const duelRound = await Result.fromAsync(async () =>
            this.prisma.duelRound.findFirstOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (duelRound.isErr()) container.logger.error(duelRound.unwrapErr());

        return duelRound.isOk()
            ? Result.ok(duelRound.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel round was not found.",
                  })
              );
    }

    public async getDuelRoundByDuelId(
        duelId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuelRound, RepositoryError>> {
        const includeObject: PrismaDuelRoundIncludesOption = this.getIncludeObject(includes);

        const duelRound = await Result.fromAsync(async () =>
            this.prisma.duelRound.findFirstOrThrow({
                where: {
                    duelId,
                },
                include: includeObject,
            })
        );

        if (duelRound.isErr()) container.logger.error(duelRound.unwrapErr());

        return duelRound.isOk()
            ? Result.ok(duelRound.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel round was not found.",
                  })
              );
    }

    public async createDuelRound(
        options: PrismaDuelRoundCreateOptions
    ): Promise<Result<PrismaDuelRound, RepositoryError>> {
        const duelRound = await Result.fromAsync(async () => this.prisma.duelRound.create(options));

        if (duelRound.isErr()) container.logger.error(duelRound.unwrapErr());

        return duelRound.isOk()
            ? Result.ok(duelRound.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel round was not created.",
                  })
              );
    }

    public async updateDuelRound(
        options: PrismaDuelRoundUpdateOptions
    ): Promise<Result<PrismaDuelRound, RepositoryError>> {
        const duelRound = await Result.fromAsync(async () => this.prisma.duelRound.update(options));

        if (duelRound.isErr()) container.logger.error(duelRound.unwrapErr());

        return duelRound.isOk()
            ? Result.ok(duelRound.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel round was not updated.",
                  })
              );
    }

    public async deleteDuelRound(
        options: PrismaDuelRoundDeleteOptions
    ): Promise<Result<PrismaDuelRound, RepositoryError>> {
        const duelRound = await Result.fromAsync(async () => this.prisma.duelRound.delete(options));

        if (duelRound.isErr()) container.logger.error(duelRound.unwrapErr());

        return duelRound.isOk()
            ? Result.ok(duelRound.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel round was not deleted.",
                  })
              );
    }

    public async getDuelActionById(
        id: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duelAction = await Result.fromAsync(async () =>
            this.prisma.duelAction.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not found.",
                  })
              );
    }

    public async getDuelActionByDuelRoundId(
        duelRoundId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duelAction = await Result.fromAsync(async () =>
            this.prisma.duelAction.findFirstOrThrow({
                where: {
                    duelRoundId,
                },
                include: includeObject,
            })
        );

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not found.",
                  })
              );
    }

    public async getDuelActionByActionTypeId(
        actionTypeId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duelAction = await Result.fromAsync(async () =>
            this.prisma.duelAction.findFirstOrThrow({
                where: {
                    actionTypeId,
                },
                include: includeObject,
            })
        );

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not found.",
                  })
              );
    }

    public async getDuelActionByAttackerId(
        attackerId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duelAction = await Result.fromAsync(async () =>
            this.prisma.duelAction.findFirstOrThrow({
                where: {
                    attackerId,
                },
                include: includeObject,
            })
        );

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not found.",
                  })
              );
    }

    public async getDuelActionByDefenderId(
        defenderId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duelAction = await Result.fromAsync(async () =>
            this.prisma.duelAction.findFirstOrThrow({
                where: {
                    defenderId,
                },
                include: includeObject,
            })
        );

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not found.",
                  })
              );
    }

    public async getDuelActionByAttackerIdAndDefenderId(
        attackerId: string,
        defenderId: string,
        includes?: PossibleIncludes<PrismaDuelIncludes> | null
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const includeObject: PrismaDuelActionIncludesOption = this.getIncludeObject(includes);

        const duelAction = await Result.fromAsync(async () =>
            this.prisma.duelAction.findFirstOrThrow({
                where: {
                    attackerId,
                    defenderId,
                },
                include: includeObject,
            })
        );

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not found.",
                  })
              );
    }

    public async createDuelAction(
        options: PrismaDuelActionCreateOptions
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const duelAction = await Result.fromAsync(async () => this.prisma.duelAction.create(options));

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not created.",
                  })
              );
    }

    public async updateDuelAction(
        options: PrismaDuelActionUpdateOptions
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const duelAction = await Result.fromAsync(async () => this.prisma.duelAction.update(options));

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not updated.",
                  })
              );
    }

    public async deleteDuelAction(
        options: PrismaDuelActionDeleteOptions
    ): Promise<Result<PrismaDuelAction, RepositoryError>> {
        const duelAction = await Result.fromAsync(async () => this.prisma.duelAction.delete(options));

        if (duelAction.isErr()) container.logger.error(duelAction.unwrapErr());

        return duelAction.isOk()
            ? Result.ok(duelAction.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested duel action was not deleted.",
                  })
              );
    }

    public async getActionTypes(): Promise<Result<PrismaActionType[], RepositoryError>> {
        const actionTypes = await Result.fromAsync(async () => this.prisma.actionType.findMany());

        if (actionTypes.isErr()) container.logger.error(actionTypes.unwrapErr());

        return actionTypes.isOk()
            ? Result.ok(actionTypes.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action types were not found.",
                  })
              );
    }

    public async getActionTypeById(
        id: string,
        includes?: PossibleIncludes<PrismaActionTypeIncludes>
    ): Promise<Result<PrismaActionType, RepositoryError>> {
        const includeObject: PrismaActionTypeIncludesOption = this.getIncludeObject(includes);

        const actionType = await Result.fromAsync(async () =>
            this.prisma.actionType.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (actionType.isErr()) container.logger.error(actionType.unwrapErr());

        return actionType.isOk()
            ? Result.ok(actionType.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action type was not found.",
                  })
              );
    }

    public async getActionTypeByName(
        name: string,
        includes?: PossibleIncludes<PrismaActionTypeIncludes>
    ): Promise<Result<PrismaActionType, RepositoryError>> {
        const includeObject: PrismaActionTypeIncludesOption = this.getIncludeObject(includes);

        const actionType = await Result.fromAsync(async () =>
            this.prisma.actionType.findFirstOrThrow({
                where: {
                    name,
                },
                include: includeObject,
            })
        );

        if (actionType.isErr()) container.logger.error(actionType.unwrapErr());

        return actionType.isOk()
            ? Result.ok(actionType.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action type was not found.",
                  })
              );
    }

    public async createActionType(
        options: PrismaActionTypeCreateOptions
    ): Promise<Result<PrismaActionType, RepositoryError>> {
        const actionType = await Result.fromAsync(async () => this.prisma.actionType.create(options));

        if (actionType.isErr()) container.logger.error(actionType.unwrapErr());

        return actionType.isOk()
            ? Result.ok(actionType.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action type was not created.",
                  })
              );
    }

    public async updateActionType(
        options: PrismaActionTypeUpdateOptions
    ): Promise<Result<PrismaActionType, RepositoryError>> {
        const actionType = await Result.fromAsync(async () => this.prisma.actionType.update(options));

        if (actionType.isErr()) container.logger.error(actionType.unwrapErr());

        return actionType.isOk()
            ? Result.ok(actionType.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action type was not updated.",
                  })
              );
    }

    public async deleteActionType(
        options: PrismaActionTypeDeleteOptions
    ): Promise<Result<PrismaActionType, RepositoryError>> {
        const actionType = await Result.fromAsync(async () => this.prisma.actionType.delete(options));

        if (actionType.isErr()) container.logger.error(actionType.unwrapErr());

        return actionType.isOk()
            ? Result.ok(actionType.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action type was not deleted.",
                  })
              );
    }

    public async getActionEffects(): Promise<Result<PrismaActionEffect[], RepositoryError>> {
        const actionEffects = await Result.fromAsync(async () => this.prisma.actionEffect.findMany());

        if (actionEffects.isErr()) container.logger.error(actionEffects.unwrapErr());

        return actionEffects.isOk()
            ? Result.ok(actionEffects.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action effects were not found.",
                  })
              );
    }

    public async getActionEffectById(
        id: string,
        includes?: PossibleIncludes<PrismaActionEffectIncludes>
    ): Promise<Result<PrismaActionEffect, RepositoryError>> {
        const includeObject: PrismaActionEffectIncludesOption = this.getIncludeObject(includes);

        const actionEffect = await Result.fromAsync(async () =>
            this.prisma.actionEffect.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (actionEffect.isErr()) container.logger.error(actionEffect.unwrapErr());

        return actionEffect.isOk()
            ? Result.ok(actionEffect.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action effect was not found.",
                  })
              );
    }

    public async getActionEffectByTargetType(
        targetType: TargetType,
        includes?: PossibleIncludes<PrismaActionEffectIncludes>
    ): Promise<Result<PrismaActionEffect, RepositoryError>> {
        const includeObject: PrismaActionEffectIncludesOption = this.getIncludeObject(includes);

        const actionEffect = await Result.fromAsync(async () =>
            this.prisma.actionEffect.findFirstOrThrow({
                where: {
                    targetType,
                },
                include: includeObject,
            })
        );

        if (actionEffect.isErr()) container.logger.error(actionEffect.unwrapErr());

        return actionEffect.isOk()
            ? Result.ok(actionEffect.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action effect was not found.",
                  })
              );
    }

    public async getActionEffectByActionTypeId(
        actionTypeId: string,
        includes?: PossibleIncludes<PrismaActionEffectIncludes>
    ): Promise<Result<PrismaActionEffect, RepositoryError>> {
        const includeObject: PrismaActionEffectIncludesOption = this.getIncludeObject(includes);

        const actionEffect = await Result.fromAsync(async () =>
            this.prisma.actionEffect.findFirstOrThrow({
                where: {
                    actionTypeId,
                },
                include: includeObject,
            })
        );

        if (actionEffect.isErr()) container.logger.error(actionEffect.unwrapErr());

        return actionEffect.isOk()
            ? Result.ok(actionEffect.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action effect was not found.",
                  })
              );
    }

    public async getActionEffectByActionTypeIdAndTargetType(
        actionTypeId: string,
        targetType: TargetType,
        includes?: PossibleIncludes<PrismaActionEffectIncludes>
    ): Promise<Result<PrismaActionEffect, RepositoryError>> {
        const includeObject: PrismaActionEffectIncludesOption = this.getIncludeObject(includes);

        const actionEffect = await Result.fromAsync(async () =>
            this.prisma.actionEffect.findFirstOrThrow({
                where: {
                    actionTypeId,
                    targetType,
                },
                include: includeObject,
            })
        );

        if (actionEffect.isErr()) container.logger.error(actionEffect.unwrapErr());

        return actionEffect.isOk()
            ? Result.ok(actionEffect.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action effect was not found.",
                  })
              );
    }

    public async createActionEffect(
        options: PrismaActionEffectCreateOptions
    ): Promise<Result<PrismaActionEffect, RepositoryError>> {
        const actionEffect = await Result.fromAsync(async () => this.prisma.actionEffect.create(options));

        if (actionEffect.isErr()) container.logger.error(actionEffect.unwrapErr());

        return actionEffect.isOk()
            ? Result.ok(actionEffect.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action effect was not created.",
                  })
              );
    }

    public async updateActionEffect(
        options: PrismaActionEffectUpdateOptions
    ): Promise<Result<PrismaActionEffect, RepositoryError>> {
        const actionEffect = await Result.fromAsync(async () => this.prisma.actionEffect.update(options));

        if (actionEffect.isErr()) container.logger.error(actionEffect.unwrapErr());

        return actionEffect.isOk()
            ? Result.ok(actionEffect.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action effect was not updated.",
                  })
              );
    }

    public async deleteActionEffect(
        options: PrismaActionEffectDeleteOptions
    ): Promise<Result<PrismaActionEffect, RepositoryError>> {
        const actionEffect = await Result.fromAsync(async () => this.prisma.actionEffect.delete(options));

        if (actionEffect.isErr()) container.logger.error(actionEffect.unwrapErr());

        return actionEffect.isOk()
            ? Result.ok(actionEffect.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "DuelRepository",
                      identifier: ImperiaIdentifiers.DuelRepositoryError,
                      message: "The requested action effect was not deleted.",
                  })
              );
    }

    protected static instance: DuelRepository;

    public static getInstance(): DuelRepository {
        if (!DuelRepository.instance) {
            DuelRepository.instance = new DuelRepository();
        }

        return DuelRepository.instance;
    }
}
