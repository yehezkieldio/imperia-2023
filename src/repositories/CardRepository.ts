import { Repository } from "#libraries/structures/Repository";
import { Result } from "@sapphire/result";
import {
    PrismaCard,
    PrismaCardCreateOptions,
    PrismaCardDeck,
    PrismaCardDeckCreateOptions,
    PrismaCardDeckIncludes,
    PrismaCardDeleteOptions,
    PrismaCardIncludes,
    PrismaCardUpdateOptions,
    PrismaUserCard,
    PrismaUserCardCreateOptions,
    PrismaUserCardDeleteOptions,
    PrismaUserCardIncludes,
    PrismaUserCardUpdateOptions,
} from "#typings/Prisma";
import { RepositoryError } from "#libraries/errors/RepositoryError";
import { container } from "@sapphire/pieces";
import { ImperiaIdentifiers } from "#typings/ImperiaIdentifiers";
import {
    PossibleIncludes,
    PrismaCardDeckIncludesOption,
    PrismaCardIncludesOption,
    PrismaUserCardIncludesOption,
} from "#typings/PrismaIncludes";
import { RarityType } from "@prisma/client";

export { Prisma } from "@prisma/client";

export class CardRepository extends Repository {
    public constructor() {
        super();
    }

    public async getCardById(
        id: string,
        includes?: PossibleIncludes<PrismaCardIncludes>
    ): Promise<Result<PrismaCard, RepositoryError>> {
        const includeObject: PrismaCardIncludesOption = this.getIncludeObject(includes);

        const card = await Result.fromAsync(async () =>
            this.prisma.card.findUniqueOrThrow({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested card was not found.",
                  })
              );
    }

    public async getCardByName(
        name: string,
        includes?: PossibleIncludes<PrismaCardIncludes>
    ): Promise<Result<PrismaCard, RepositoryError>> {
        const includeObject: PrismaCardIncludesOption = this.getIncludeObject(includes);

        const card = await Result.fromAsync(async () =>
            this.prisma.card.findFirstOrThrow({
                where: {
                    name,
                },
                include: includeObject,
            })
        );

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested card was not found.",
                  })
              );
    }

    public async getCardsByRarity(
        rarity: RarityType,
        includes?: PossibleIncludes<PrismaCardIncludes>
    ): Promise<Result<PrismaCard[], RepositoryError>> {
        const includeObject: PrismaCardIncludesOption = this.getIncludeObject(includes);

        const card = await Result.fromAsync(async () =>
            this.prisma.card.findMany({
                where: {
                    RarityCard: {
                        some: {
                            Rarity: {
                                name: rarity,
                            },
                        },
                    },
                },
                include: includeObject,
            })
        );

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async getCardsByWishId(
        wishId: string,
        includes?: PossibleIncludes<PrismaCardIncludes>
    ): Promise<Result<PrismaCard[], RepositoryError>> {
        const includeObject: PrismaCardIncludesOption = this.getIncludeObject(includes);

        const card = await Result.fromAsync(async () =>
            this.prisma.card.findMany({
                where: {
                    Wish: {
                        id: wishId,
                    },
                },
                include: includeObject,
            })
        );

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async getCardsByRarityAndWishId(
        rarity: RarityType,
        wishId: string,
        includes?: PossibleIncludes<PrismaCardIncludes>
    ): Promise<Result<PrismaCard[], RepositoryError>> {
        const includeObject: PrismaCardIncludesOption = this.getIncludeObject(includes);

        const card = await Result.fromAsync(async () =>
            this.prisma.card.findMany({
                where: {
                    Wish: {
                        id: wishId,
                    },
                    RarityCard: {
                        some: {
                            Rarity: {
                                name: rarity,
                            },
                        },
                    },
                },
                include: includeObject,
            })
        );

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async getCards(): Promise<Result<PrismaCard[], RepositoryError>> {
        const card = await Result.fromAsync(async () => this.prisma.card.findMany());

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async createCard(options: PrismaCardCreateOptions): Promise<Result<PrismaCard, RepositoryError>> {
        const card = await Result.fromAsync(async () => this.prisma.card.create(options));

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async updateCard(options: PrismaCardUpdateOptions): Promise<Result<PrismaCard, RepositoryError>> {
        const card = await Result.fromAsync(async () => this.prisma.card.update(options));

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async deleteCard(options: PrismaCardDeleteOptions): Promise<Result<PrismaCard, RepositoryError>> {
        const card = await Result.fromAsync(async () => this.prisma.card.delete(options));

        if (card.isErr()) container.logger.error(card.unwrapErr());

        return card.isOk()
            ? Result.ok(card.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async getUserCards(): Promise<Result<PrismaUserCard[], RepositoryError>> {
        const userCard = await Result.fromAsync(async () => this.prisma.userCard.findMany());

        if (userCard.isErr()) container.logger.error(userCard.unwrapErr());

        return userCard.isOk()
            ? Result.ok(userCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async getUserCardsByUserId(
        userId: string,
        includes?: PossibleIncludes<PrismaUserCardIncludes>
    ): Promise<Result<PrismaUserCard[], RepositoryError>> {
        const includeObject: PrismaUserCardIncludesOption = this.getIncludeObject(includes);

        const userCard = await Result.fromAsync(async () =>
            this.prisma.userCard.findMany({
                where: {
                    User: {
                        id: userId,
                    },
                },
                include: includeObject,
            })
        );

        if (userCard.isErr()) container.logger.error(userCard.unwrapErr());

        return userCard.isOk()
            ? Result.ok(userCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async getUserCard(
        id: string,
        includes?: PossibleIncludes<PrismaUserCardIncludes>
    ): Promise<Result<PrismaUserCard, RepositoryError>> {
        const includeObject: PrismaUserCardIncludesOption = this.getIncludeObject(includes);

        const userCard = await Result.fromAsync(async () =>
            this.prisma.userCard.findUnique({
                where: {
                    id,
                },
                include: includeObject,
            })
        );

        if (userCard.isErr()) container.logger.error(userCard.unwrapErr());

        return userCard.isOk()
            ? Result.ok(userCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested card was not found.",
                  })
              );
    }

    public async getUserCardByCardIdAndUserId(
        cardId: string,
        userId: string,
        includes?: PossibleIncludes<PrismaUserCardIncludes>
    ): Promise<Result<PrismaUserCard, RepositoryError>> {
        const includeObject: PrismaUserCardIncludesOption = this.getIncludeObject(includes);

        const userCard = await Result.fromAsync(async () =>
            this.prisma.userCard.findFirst({
                where: {
                    cardId,
                    userId,
                },
                include: includeObject,
            })
        );

        if (userCard.isErr()) container.logger.error(userCard.unwrapErr());

        return userCard.isOk()
            ? Result.ok(userCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested card was not found.",
                  })
              );
    }

    public getUserCardCountByRarity(rarity: RarityType): Promise<Result<number, RepositoryError>> {
        return Result.fromAsync(async () =>
            this.prisma.userCard.count({
                where: {
                    RarityUserCard: {
                        some: {
                            Rarity: {
                                name: rarity,
                            },
                        },
                    },
                },
            })
        );
    }

    public async createUserCard(
        options: PrismaUserCardCreateOptions
    ): Promise<Result<PrismaUserCard, RepositoryError>> {
        const userCard = await Result.fromAsync(async () => this.prisma.userCard.create(options));

        if (userCard.isErr()) container.logger.error(userCard.unwrapErr());

        return userCard.isOk()
            ? Result.ok(userCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async updateUserCard(
        options: PrismaUserCardUpdateOptions
    ): Promise<Result<PrismaUserCard, RepositoryError>> {
        const userCard = await Result.fromAsync(async () => this.prisma.userCard.update(options));

        if (userCard.isErr()) container.logger.error(userCard.unwrapErr());

        return userCard.isOk()
            ? Result.ok(userCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async deleteUserCard(
        options: PrismaUserCardDeleteOptions
    ): Promise<Result<PrismaUserCard, RepositoryError>> {
        const userCard = await Result.fromAsync(async () => this.prisma.userCard.delete(options));

        if (userCard.isErr()) container.logger.error(userCard.unwrapErr());

        return userCard.isOk()
            ? Result.ok(userCard.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested cards was not found.",
                  })
              );
    }

    public async getDefaultCardDeckByUserId(
        userId: string,
        includes?: PossibleIncludes<PrismaCardDeckIncludes>
    ): Promise<Result<PrismaCardDeck, RepositoryError>> {
        const includeObject: PrismaCardDeckIncludesOption = this.getIncludeObject(includes);

        const cardDeck = await Result.fromAsync(async () =>
            this.prisma.cardDeck.findFirst({
                where: {
                    User: {
                        id: userId,
                    },
                    name: "default",
                },
                include: includeObject,
            })
        );

        if (cardDeck.isErr()) container.logger.error(cardDeck.unwrapErr());

        return cardDeck.isOk()
            ? Result.ok(cardDeck.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested card deck was not found.",
                  })
              );
    }

    public async getCardDecksByUserId(
        userId: string,
        includes?: PossibleIncludes<PrismaCardDeckIncludes>
    ): Promise<Result<PrismaCardDeck[], RepositoryError>> {
        const includeObject: PrismaCardDeckIncludesOption = this.getIncludeObject(includes);

        const cardDecks = await Result.fromAsync(async () =>
            this.prisma.cardDeck.findMany({
                where: {
                    User: {
                        id: userId,
                    },
                },
                include: includeObject,
            })
        );

        if (cardDecks.isErr()) container.logger.error(cardDecks.unwrapErr());

        return cardDecks.isOk()
            ? Result.ok(cardDecks.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested card decks was not found.",
                  })
              );
    }

    public async createCardDeck(
        options: PrismaCardDeckCreateOptions
    ): Promise<Result<PrismaCardDeck, RepositoryError>> {
        const cardDeck = await Result.fromAsync(async () => this.prisma.cardDeck.create(options));

        if (cardDeck.isErr()) container.logger.error(cardDeck.unwrapErr());

        return cardDeck.isOk()
            ? Result.ok(cardDeck.unwrap())
            : Result.err(
                  new RepositoryError({
                      repository: "CardRepository",
                      identifier: ImperiaIdentifiers.CardRepositoryError,
                      message: "The requested card deck was not found.",
                  })
              );
    }

    protected static instance: CardRepository;

    public static getInstance(): CardRepository {
        if (!CardRepository.instance) {
            CardRepository.instance = new CardRepository();
        }

        return CardRepository.instance;
    }
}
