export { Prisma } from "@prisma/client";

type NonEmptyArray<T> = [T, ...T[]];
type NonEmptyStringArray = NonEmptyArray<string>;

// eslint-disable-next-line @typescript-eslint/ban-types
type PrismaIncludes<T> = T extends NonEmptyArray<infer U extends string | number | symbol> ? Record<U, true> : {};

// export type PossibleIncludes<T> = (keyof T)[];
// export type PossibleIncludes<T extends Record<string, unknown>> = (keyof T)[];

export type IncludesOptions<T extends Record<string, any>> = {
    _count?: boolean;
} & Record<keyof T, boolean>;

export type PossibleIncludes<T extends Record<string, any>> = Array<keyof T>;

export type PrismaUserIncludesOption = Prisma.UserInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaBalanceIncludesOption = Prisma.BalanceInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaProgressionIncludesOption = Prisma.ProgressionInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaRewardsClaimIncludesOption = Prisma.RewardsClaimInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaCardDeckIncludesOption = Prisma.CardDeckInclude | PrismaIncludes<NonEmptyStringArray>;

export type PrismaWishIncludesOption = Prisma.WishInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaWishHistoryIncludesOption = Prisma.WishHistoryInclude | PrismaIncludes<NonEmptyStringArray>;

export type PrismaSkillIncludesOption = Prisma.SkillInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaSkillCardIncludesOption = Prisma.SkillCardInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaUserSkillCardIncludesOption = Prisma.UserSkillCardInclude | PrismaIncludes<NonEmptyStringArray>;

export type PrismaCardIncludesOption = Prisma.CardInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaCardBaseStatisticIncludesOption =
    | Prisma.CardBaseStatisticInclude
    | PrismaIncludes<NonEmptyStringArray>;

export type PrismaRarityIncludesOption = Prisma.RarityInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaRarityCardIncludesOption = Prisma.RarityCardInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaRarityUserCardIncludesOption = Prisma.RarityUserCardInclude | PrismaIncludes<NonEmptyStringArray>;

export type PrismaUserCardIncludesOption = Prisma.UserCardInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaUserCardStatisticIncludesOption =
    | Prisma.UserCardStatisticInclude
    | PrismaIncludes<NonEmptyStringArray>;
export type PrismaUserCardProgressionIncludesOption =
    | Prisma.UserCardProgressionInclude
    | PrismaIncludes<NonEmptyStringArray>;

export type PrismaDuelIncludesOption = Prisma.DuelInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaDuelRoundIncludesOption = Prisma.DuelRoundInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaDuelActionIncludesOption = Prisma.DuelActionInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaActionTypeIncludesOption = Prisma.ActionTypeInclude | PrismaIncludes<NonEmptyStringArray>;
export type PrismaActionEffectIncludesOption = Prisma.ActionEffectInclude | PrismaIncludes<NonEmptyStringArray>;
