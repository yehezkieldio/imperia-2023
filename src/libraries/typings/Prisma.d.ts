import {
    ActionEffect,
    ActionType,
    Balance,
    Card,
    CardBaseStatistic,
    CardDeck,
    CommandAnalytics,
    Duel,
    DuelAction,
    DuelRound,
    Prisma,
    Progression,
    Rarity,
    RarityCard,
    RarityUserCard,
    RewardsClaim,
    Skill,
    SkillCard,
    User,
    UserCard,
    UserCardProgression,
    UserCardStatistic,
    UserDuelHistory,
    UserSkillCard,
    Wish,
    WishHistory,
} from "@prisma/client";

export type PrismaUserCreateOptions = Prisma.UserCreateArgs;
export type PrismaUserUpdateOptions = Prisma.UserUpdateArgs;
export type PrismaUserDeleteOptions = Prisma.UserDeleteArgs;

export type PrismaUser = User & {
    Balance?: Partial<Balance>;
    RewardsClaim?: Partial<RewardsClaim>;
    CardDeck?: CardDeck[];
    Progression?: Partial<Progression>;
    UserCard?: UserCard[];
    UserDuelHistory?: UserDuelHistory[];
    WishHistory?: Partial<WishHistory>[];
};

export type PrismaUserIncludes = Pick<Prisma.UserInclude, keyof Prisma.UserInclude>;

export type PrismaBalanceCreateOptions = Prisma.BalanceCreateArgs;
export type PrismaBalanceUpdateOptions = Prisma.BalanceUpdateArgs;
export type PrismaBalanceDeleteOptions = Prisma.BalanceDeleteArgs;

export type PrismaBalance = Balance & {
    User?: Partial<User>;
};

export type PrismaBalanceIncludes = Pick<Prisma.BalanceInclude, keyof Prisma.BalanceInclude>;

export type PrismaProgressionCreateOptions = Prisma.ProgressionCreateArgs;
export type PrismaProgressionUpdateOptions = Prisma.ProgressionUpdateArgs;
export type PrismaProgressionDeleteOptions = Prisma.ProgressionDeleteArgs;

export type PrismaProgression = Progression & {
    User?: Partial<User>;
};

export type PrismaProgressionIncludes = Pick<Prisma.ProgressionInclude, keyof Prisma.ProgressionInclude>;

export type PrismaRewardsClaimCreateOptions = Prisma.RewardsClaimCreateArgs;
export type PrismaRewardsClaimUpdateOptions = Prisma.RewardsClaimUpdateArgs;
export type PrismaRewardsClaimDeleteOptions = Prisma.RewardsClaimDeleteArgs;

export type PrismaRewardsClaim = RewardsClaim & {
    User?: Partial<User>;
};

export type PrismaWishCreateOptions = Prisma.WishCreateArgs;
export type PrismaWishUpdateOptions = Prisma.WishUpdateArgs;
export type PrismaWishDeleteOptions = Prisma.WishDeleteArgs;

export type PrismaWishHistoryCreateOptions = Prisma.WishHistoryCreateArgs;
export type PrismaWishHistoryUpdateOptions = Prisma.WishHistoryUpdateArgs;
export type PrismaWishHistoryDeleteOptions = Prisma.WishHistoryDeleteArgs;

export type PrismaWish = Wish & {
    WishHistory?: Partial<WishHistory>[];
};

export type PrismaWishHistory = WishHistory & {
    Card?: Partial<Card>;
    User?: Partial<User>;
    Wish?: Partial<Wish>;
};

export type PrismaWishIncludes = Pick<Prisma.WishInclude, keyof Prisma.WishInclude>;
export type PrismaWishHistoryIncludes = Pick<Prisma.WishHistoryInclude, keyof Prisma.WishHistoryInclude>;

export type PrismaSkillCreateOptions = Prisma.SkillCreateArgs;
export type PrismaSkillUpdateOptions = Prisma.SkillUpdateArgs;
export type PrismaSkillDeleteOptions = Prisma.SkillDeleteArgs;

export type PrismaSkill = Skill & {
    SkillCard?: SkillCard[];
};

export type PrismaSkillIncludes = Pick<Prisma.SkillInclude, keyof Prisma.SkillInclude>;

export type PrismaSkillCardCreateOptions = Prisma.SkillCardCreateArgs;
export type PrismaSkillCardUpdateOptions = Prisma.SkillCardUpdateArgs;
export type PrismaSkillCardDeleteOptions = Prisma.SkillCardDeleteArgs;

export type PrismaSkillCard = SkillCard & {
    Skill?: Partial<Skill>;
    Card?: Partial<Card>;
    UserSkillCard?: UserSkillCard[];
};

export type PrismaSkillCardIncludes = Pick<Prisma.SkillCardInclude, keyof Prisma.SkillCardInclude>;

export type PrismaUserSkillCardCreateOptions = Prisma.UserSkillCardCreateArgs;
export type PrismaUserSkillCardUpdateOptions = Prisma.UserSkillCardUpdateArgs;
export type PrismaUserSkillCardDeleteOptions = Prisma.UserSkillCardDeleteArgs;

export type PrismaUserSkillCard = UserSkillCard & {
    SkillCard?: Partial<SkillCard>;
    RarityUserCard?: RarityUserCard[];
};

export type PrismaUserSkillCardIncludes = Pick<Prisma.UserSkillCardInclude, keyof Prisma.UserSkillCardInclude>;

export type PrismaCardCreateOptions = Prisma.CardCreateArgs;
export type PrismaCardUpdateOptions = Prisma.CardUpdateArgs;
export type PrismaCardDeleteOptions = Prisma.CardDeleteArgs;

export type PrismaCard = Card & {
    CardBaseStatistic?: Partial<CardBaseStatistic>;
    RarityCard?: RarityCard[];
    WishHistory?: Partial<WishHistory>[];
    UserCard?: UserCard[];
    Wish?: Wish[];
    SkillCard?: SkillCard[];
};

export type PrismaCardIncludes = Pick<Prisma.CardInclude, keyof Prisma.CardInclude>;

export type PrismaCardBaseStatisticCreateOptions = Prisma.CardBaseStatisticCreateArgs;
export type PrismaCardBaseStatisticUpdateOptions = Prisma.CardBaseStatisticUpdateArgs;
export type PrismaCardBaseStatisticDeleteOptions = Prisma.CardBaseStatisticDeleteArgs;

export type PrismaCardBaseStatistic = CardBaseStatistic & {
    Card?: Partial<Card>;
};

export type PrismaCardBaseStatisticIncludes = Pick<
    Prisma.CardBaseStatisticInclude,
    keyof Prisma.CardBaseStatisticInclude
>;

export type PrismaUserCardCreateOptions = Prisma.UserCardCreateArgs;
export type PrismaUserCardUpdateOptions = Prisma.UserCardUpdateArgs;
export type PrismaUserCardDeleteOptions = Prisma.UserCardDeleteArgs;

export type PrismaUserCard = UserCard & {
    User?: Partial<User>;
    Card?: Partial<Card> & {
        CardBaseStatistic?: Partial<CardBaseStatistic>;
    };
    RarityUserCard?: RarityUserCard[];
    CardDeck?: CardDeck[];
};

export type PrismaUserCardIncludes = Pick<Prisma.UserCardInclude, keyof Prisma.UserCardInclude>;

export type PrismaUserCardStatisticCreateOptions = Prisma.UserCardStatisticCreateArgs;
export type PrismaUserCardStatisticUpdateOptions = Prisma.UserCardStatisticUpdateArgs;
export type PrismaUserCardStatisticDeleteOptions = Prisma.UserCardStatisticDeleteArgs;

export type PrismaUserCardStatistic = UserCardStatistic & {
    RarityUserCard?: RarityUserCard[];
};

export type PrismaUserCardStatisticIncludes = Pick<
    Prisma.UserCardStatisticInclude,
    keyof Prisma.UserCardStatisticInclude
>;

export type PrismaUserCardProgressionCreateOptions = Prisma.UserCardProgressionCreateArgs;
export type PrismaUserCardProgressionUpdateOptions = Prisma.UserCardProgressionUpdateArgs;
export type PrismaUserCardProgressionDeleteOptions = Prisma.UserCardProgressionDeleteArgs;

export type PrismaUserCardProgression = UserCardProgression & {
    RarityUserCard?: RarityUserCard[];
};

export type PrismaUserCardProgressionIncludes = Pick<
    Prisma.UserCardProgressionInclude,
    keyof Prisma.UserCardProgressionInclude
>;

export type PrismaRarityCardCreateOptions = Prisma.RarityCardCreateArgs;
export type PrismaRarityCardUpdateOptions = Prisma.RarityCardUpdateArgs;
export type PrismaRarityCardDeleteOptions = Prisma.RarityCardDeleteArgs;

export type PrismaRarityCard = RarityCard & {
    Card?: Partial<Card>;
    Rarity?: Rarity;
};

export type PrismaRarityCardIncludes = Pick<Prisma.RarityCardInclude, keyof Prisma.RarityCardInclude>;

export type PrismaRarityUserCardCreateOptions = Prisma.RarityUserCardCreateArgs;
export type PrismaRarityUserCardUpdateOptions = Prisma.RarityUserCardUpdateArgs;
export type PrismaRarityUserCardDeleteOptions = Prisma.RarityUserCardDeleteArgs;

export type PrismaRarityUserCard = RarityUserCard & {
    UserCard?: Partial<UserCard>;
    Rarity?: Rarity;
    UserSkillCard?: UserSkillCard[];
    UserCardStatistic?: UserCardStatistic;
    UserCardProgression?: UserCardProgression;
};

export type PrismaRarityUserCardIncludes = Pick<Prisma.RarityUserCardInclude, keyof Prisma.RarityUserCardInclude>;

export type PrismaCardDeckCreateOptions = Prisma.CardDeckCreateArgs;
export type PrismaCardDeckUpdateOptions = Prisma.CardDeckUpdateArgs;
export type PrismaCardDeckDeleteOptions = Prisma.CardDeckDeleteArgs;

export type PrismaCardDeck = CardDeck & {
    UserCard?: Partial<UserCard[]>;
    User?: Partial<User>;
};

export type PrismaCardDeckIncludes = Pick<Prisma.CardDeckInclude, keyof Prisma.CardDeckInclude>;

export type PrismaRarityCreateOptions = Prisma.RarityCreateArgs;
export type PrismaRarityUpdateOptions = Prisma.RarityUpdateArgs;
export type PrismaRarityDeleteOptions = Prisma.RarityDeleteArgs;

export type PrismaRarity = Rarity & {
    RarityCard?: RarityCard[];
    RarityUserCard?: RarityUserCard[];
};

export type PrismaRarityIncludes = Pick<Prisma.RarityInclude, keyof Prisma.RarityInclude>;

export type PrismaDuelCreateOptions = Prisma.DuelCreateArgs;
export type PrismaDuelUpdateOptions = Prisma.DuelUpdateArgs;
export type PrismaDuelDeleteOptions = Prisma.DuelDeleteArgs;

export type PrismaDuel = Duel & {
    playerOne?: Partial<User>;
    playerTwo?: Partial<User>;
    winner?: Partial<User>;
    UserDuelHistory?: UserDuelHistory[];
    DuelRound?: DuelRound[];
};

export type PrismaDuelIncludes = Pick<Prisma.DuelInclude, keyof Prisma.DuelInclude>;

export type PrismaDuelRoundCreateOptions = Prisma.DuelRoundCreateArgs;
export type PrismaDuelRoundUpdateOptions = Prisma.DuelRoundUpdateArgs;
export type PrismaDuelRoundDeleteOptions = Prisma.DuelRoundDeleteArgs;

export type PrismaDuelRound = DuelRound & {
    Duel?: Partial<Duel>;
    DuelAction?: DuelAction[];
};

export type PrismaDuelRoundIncludes = Pick<Prisma.DuelRoundInclude, keyof Prisma.DuelRoundInclude>;

export type PrismaDuelActionCreateOptions = Prisma.DuelActionCreateArgs;
export type PrismaDuelActionUpdateOptions = Prisma.DuelActionUpdateArgs;
export type PrismaDuelActionDeleteOptions = Prisma.DuelActionDeleteArgs;

export type PrismaDuelAction = DuelAction & {
    actionType?: Partial<ActionType>;
    attacker?: Partial<UserCard>;
    defender?: Partial<UserCard>;
    DuelRound?: Partial<DuelRound>;
};

export type PrismaDuelActionIncludes = Pick<Prisma.DuelActionInclude, keyof Prisma.DuelActionInclude>;

export type PrismaActionTypeCreateOptions = Prisma.ActionTypeCreateArgs;
export type PrismaActionTypeUpdateOptions = Prisma.ActionTypeUpdateArgs;
export type PrismaActionTypeDeleteOptions = Prisma.ActionTypeDeleteArgs;

export type PrismaActionType = ActionType & {
    effects?: Partial<ActionEffect>[];
    DuelAction?: DuelAction[];
};

export type PrismaActionTypeIncludes = Pick<Prisma.ActionTypeInclude, keyof Prisma.ActionTypeInclude>;

export type PrismaActionEffectCreateOptions = Prisma.ActionEffectCreateArgs;
export type PrismaActionEffectUpdateOptions = Prisma.ActionEffectUpdateArgs;
export type PrismaActionEffectDeleteOptions = Prisma.ActionEffectDeleteArgs;

export type PrismaActionEffect = ActionEffect & {
    ActionType?: Partial<ActionType>;
};

export type PrismaActionEffectIncludes = Pick<Prisma.ActionEffectInclude, keyof Prisma.ActionEffectInclude>;

export type PrismaUserDuelHistoryCreateOptions = Prisma.UserDuelHistoryCreateArgs;
export type PrismaUserDuelHistoryUpdateOptions = Prisma.UserDuelHistoryUpdateArgs;
export type PrismaUserDuelHistoryDeleteOptions = Prisma.UserDuelHistoryDeleteArgs;

export type PrismaUserDuelHistory = UserDuelHistory & {
    User?: Partial<User>;
    duelStarted?: Partial<Duel>;
    duelEnded?: Partial<Duel>;
    duelWon?: Partial<Duel>;
    Duel?: Duel[];
};

export type PrismaUserDuelHistoryIncludes = Pick<Prisma.UserDuelHistoryInclude, keyof Prisma.UserDuelHistoryInclude>;

export type PrismaCommandAnalytics = CommandAnalytics;
export type PrismaCommandAnalyticsCreateOptions = Prisma.CommandAnalyticsCreateArgs;
