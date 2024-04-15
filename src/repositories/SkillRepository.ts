import { Repository } from "#libraries/structures/Repository";
import {
    PrismaSkill,
    PrismaSkillCard,
    PrismaSkillCardCreateOptions,
    PrismaSkillCardDeleteOptions,
    PrismaSkillCardUpdateOptions,
    PrismaSkillCreateOptions,
    PrismaSkillDeleteOptions,
    PrismaSkillIncludes,
    PrismaSkillUpdateOptions,
    PrismaUserSkillCard,
    PrismaUserSkillCardCreateOptions,
    PrismaUserSkillCardDeleteOptions,
    PrismaUserSkillCardIncludes,
    PrismaUserSkillCardUpdateOptions,
} from "#typings/Prisma";
import { Result } from "@sapphire/result";
import { RepositoryError } from "#libraries/errors/RepositoryError";
import { container } from "@sapphire/pieces";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";
import {
    PossibleIncludes,
    PrismaSkillIncludesOption,
    PrismaUserSkillCardIncludesOption,
} from "#typings/PrismaIncludes";
import { EffectTypes, TargetTypes } from "@prisma/client";

export { Prisma } from "@prisma/client";

export class SkillRepository extends Repository {
    public constructor() {
        super();
    }

    public async getSkills(): Promise<Result<PrismaSkill[], RepositoryError>> {
        const skill = await Result.fromAsync(async () => this.prisma.skill.findMany());

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skills was not found.",
                  })
              );
    }

    public async getSkillById(
        id: string,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkill, RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skill = await Result.fromAsync(async () =>
            this.prisma.skill.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill was not found.",
                  })
              );
    }

    public async getSkillByName(
        name: string,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkill, RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skill = await Result.fromAsync(async () =>
            this.prisma.skill.findFirstOrThrow({
                where: {
                    name,
                },
                include: includeObject,
            })
        );

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill was not found.",
                  })
              );
    }

    public async getSkillsByTargetType(
        target: TargetTypes,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkill[], RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skill = await Result.fromAsync(async () =>
            this.prisma.skill.findMany({
                where: {
                    target,
                },
                include: includeObject,
            })
        );

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skills was not found.",
                  })
              );
    }

    public async getSkillsByEffectType(
        effect: EffectTypes,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkill[], RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skill = await Result.fromAsync(async () =>
            this.prisma.skill.findMany({
                where: {
                    effect,
                },
                include: includeObject,
            })
        );

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skills was not found.",
                  })
              );
    }

    public async getSkillsByEffectTypeAndTargetType(
        effect: EffectTypes,
        target: TargetTypes,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkill[], RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skill = await Result.fromAsync(async () =>
            this.prisma.skill.findMany({
                where: {
                    effect,
                    target,
                },
                include: includeObject,
            })
        );

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skills was not found.",
                  })
              );
    }

    public async createSkill(options: PrismaSkillCreateOptions): Promise<Result<PrismaSkill, RepositoryError>> {
        const skill = await Result.fromAsync(async () => this.prisma.skill.create(options));

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill was not created.",
                  })
              );
    }

    public async updateSkill(options: PrismaSkillUpdateOptions): Promise<Result<PrismaSkill, RepositoryError>> {
        const skill = await Result.fromAsync(async () => this.prisma.skill.update(options));

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill was not updated.",
                  })
              );
    }

    public async deleteSkill(options: PrismaSkillDeleteOptions): Promise<Result<PrismaSkill, RepositoryError>> {
        const skill = await Result.fromAsync(async () => this.prisma.skill.delete(options));

        if (skill.isErr()) container.logger.error(skill.unwrapErr());

        return skill.isOk()
            ? Result.ok(skill.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill was not deleted.",
                  })
              );
    }

    public async getSkillCardById(
        id: string,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkillCard, RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skillCard = await Result.fromAsync(async () =>
            this.prisma.skillCard.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (skillCard.isErr()) container.logger.error(skillCard.unwrapErr());

        return skillCard.isOk()
            ? Result.ok(skillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill card was not found.",
                  })
              );
    }

    public async getSkillCardBySkillId(
        skillId: string,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkillCard, RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skillCard = await Result.fromAsync(async () =>
            this.prisma.skillCard.findFirstOrThrow({
                where: {
                    skillId,
                },
                include: includeObject,
            })
        );

        if (skillCard.isErr()) container.logger.error(skillCard.unwrapErr());

        return skillCard.isOk()
            ? Result.ok(skillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill card was not found.",
                  })
              );
    }

    public async getSkillCardByCardId(
        cardId: string,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkillCard, RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skillCard = await Result.fromAsync(async () =>
            this.prisma.skillCard.findFirstOrThrow({
                where: {
                    cardId,
                },
                include: includeObject,
            })
        );

        if (skillCard.isErr()) container.logger.error(skillCard.unwrapErr());

        return skillCard.isOk()
            ? Result.ok(skillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill card was not found.",
                  })
              );
    }

    public async getSkillCardByCardIdAndSkillId(
        cardId: string,
        skillId: string,
        includes?: PossibleIncludes<PrismaSkillIncludes> | null
    ): Promise<Result<PrismaSkillCard, RepositoryError>> {
        const includeObject: PrismaSkillIncludesOption = this.getIncludeObject(includes);

        const skillCard = await Result.fromAsync(async () =>
            this.prisma.skillCard.findFirstOrThrow({
                where: {
                    cardId,
                    skillId,
                },
                include: includeObject,
            })
        );

        if (skillCard.isErr()) container.logger.error(skillCard.unwrapErr());

        return skillCard.isOk()
            ? Result.ok(skillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill card was not found.",
                  })
              );
    }

    public async createSkillCard(
        options: PrismaSkillCardCreateOptions
    ): Promise<Result<PrismaSkillCard, RepositoryError>> {
        const skillCard = await Result.fromAsync(async () => this.prisma.skillCard.create(options));

        if (skillCard.isErr()) container.logger.error(skillCard.unwrapErr());

        return skillCard.isOk()
            ? Result.ok(skillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill card was not created.",
                  })
              );
    }

    public async updateSkillCard(
        options: PrismaSkillCardUpdateOptions
    ): Promise<Result<PrismaSkillCard, RepositoryError>> {
        const skillCard = await Result.fromAsync(async () => this.prisma.skillCard.update(options));

        if (skillCard.isErr()) container.logger.error(skillCard.unwrapErr());

        return skillCard.isOk()
            ? Result.ok(skillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill card was not updated.",
                  })
              );
    }

    public async deleteSkillCard(
        options: PrismaSkillCardDeleteOptions
    ): Promise<Result<PrismaSkillCard, RepositoryError>> {
        const skillCard = await Result.fromAsync(async () => this.prisma.skillCard.delete(options));

        if (skillCard.isErr()) container.logger.error(skillCard.unwrapErr());

        return skillCard.isOk()
            ? Result.ok(skillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested skill card was not deleted.",
                  })
              );
    }

    public async getUserSkillCardById(
        id: string,
        includes?: PossibleIncludes<PrismaUserSkillCardIncludes>
    ): Promise<Result<PrismaUserSkillCard, RepositoryError>> {
        const includeObject: PrismaUserSkillCardIncludesOption = this.getIncludeObject(includes);

        const userSkillCard = await Result.fromAsync(async () =>
            this.prisma.userSkillCard.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (userSkillCard.isErr()) container.logger.error(userSkillCard.unwrapErr());

        return userSkillCard.isOk()
            ? Result.ok(userSkillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested user skill card was not found.",
                  })
              );
    }

    public async getUserSkillCardBySkillCardId(
        skillCardId: string,
        includes?: PossibleIncludes<PrismaUserSkillCardIncludes>
    ): Promise<Result<PrismaUserSkillCard, RepositoryError>> {
        const includeObject: PrismaUserSkillCardIncludesOption = this.getIncludeObject(includes);

        const userSkillCard = await Result.fromAsync(async () =>
            this.prisma.userSkillCard.findFirstOrThrow({
                where: {
                    skillCardId,
                },
                include: includeObject,
            })
        );

        if (userSkillCard.isErr()) container.logger.error(userSkillCard.unwrapErr());

        return userSkillCard.isOk()
            ? Result.ok(userSkillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested user skill card was not found.",
                  })
              );
    }

    public async getUserSkillCardByRarityUserCardId(
        rarityUserCardId: string,
        includes?: PossibleIncludes<PrismaUserSkillCardIncludes>
    ): Promise<Result<PrismaUserSkillCard, RepositoryError>> {
        const includeObject: PrismaUserSkillCardIncludesOption = this.getIncludeObject(includes);

        const userSkillCard = await Result.fromAsync(async () =>
            this.prisma.userSkillCard.findFirstOrThrow({
                where: {
                    rarityUserCardId,
                },
                include: includeObject,
            })
        );

        if (userSkillCard.isErr()) container.logger.error(userSkillCard.unwrapErr());

        return userSkillCard.isOk()
            ? Result.ok(userSkillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested user skill card was not found.",
                  })
              );
    }

    public async createUserSkillCard(
        options: PrismaUserSkillCardCreateOptions
    ): Promise<Result<PrismaUserSkillCard, RepositoryError>> {
        const userSkillCard = await Result.fromAsync(async () => this.prisma.userSkillCard.create(options));

        if (userSkillCard.isErr()) container.logger.error(userSkillCard.unwrapErr());

        return userSkillCard.isOk()
            ? Result.ok(userSkillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested user skill card was not created.",
                  })
              );
    }

    public async updateUserSkillCard(
        options: PrismaUserSkillCardUpdateOptions
    ): Promise<Result<PrismaUserSkillCard, RepositoryError>> {
        const userSkillCard = await Result.fromAsync(async () => this.prisma.userSkillCard.update(options));

        if (userSkillCard.isErr()) container.logger.error(userSkillCard.unwrapErr());

        return userSkillCard.isOk()
            ? Result.ok(userSkillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested user skill card was not updated.",
                  })
              );
    }

    public async deleteUserSkillCard(
        options: PrismaUserSkillCardDeleteOptions
    ): Promise<Result<PrismaUserSkillCard, RepositoryError>> {
        const userSkillCard = await Result.fromAsync(async () => this.prisma.userSkillCard.delete(options));

        if (userSkillCard.isErr()) container.logger.error(userSkillCard.unwrapErr());

        return userSkillCard.isOk()
            ? Result.ok(userSkillCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "SkillRepository",
                      identifier: ImperiaIdentifiers.SkillRepositoryError,
                      message: "The requested user skill card was not deleted.",
                  })
              );
    }

    protected static instance: SkillRepository;

    public static getInstance(): SkillRepository {
        if (!SkillRepository.instance) {
            SkillRepository.instance = new SkillRepository();
        }

        return SkillRepository.instance;
    }
}
