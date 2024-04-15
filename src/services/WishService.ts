import { PrismaCard, PrismaUser, PrismaWish } from "#typings/Prisma";
import { RarityType } from "@prisma/client";
import { container } from "@sapphire/pieces";

export { Prisma } from "@prisma/client";

type Distribution = number[];

export interface RarityWeights {
    COMMON: number;
    RARE: number;
    SUPER_RARE: number;
    SPECIALLY_SUPER_RARE: number;
    ULTRA_RARE: number;
}

export class WishService {
    public async performWish(
        wish: PrismaWish,
        user: PrismaUser
    ): Promise<{
        card: PrismaCard;
        rarity: { rolledRarity: string; targetRarity: string };
    }> {
        const rarityWeights = {
            COMMON: 50,
            RARE: 30,
            SUPER_RARE: 10,
            SPECIALLY_SUPER_RARE: 4,
            ULTRA_RARE: 1,
        };

        const rarity = await this.getRandomRarity(rarityWeights, wish, user);
        const card = await this.getRandomCard(rarity.rolledRarity as RarityType, wish, user);

        return {
            card,
            rarity,
        };
    }

    private async getRandomRarity(
        rarityWeights: RarityWeights,
        wish: PrismaWish,
        user: PrismaUser
    ): Promise<{ rolledRarity: string; targetRarity: string }> {
        const getWishHistoryCount = await container.repo.wish.getWishHistoriesCountByUserId(user.id);
        const wishHistoryCount = getWishHistoryCount.unwrap();

        const updateUserPity = await container.repo.user.updateUser({
            where: {
                id: user.id,
            },
            data: {
                pity: wishHistoryCount + 1,
            },
        });

        if (updateUserPity.isErr()) {
            container.logger.debug(`Failed to update user pity`);
            return undefined;
        }
        const userPity = updateUserPity.unwrap();

        const isSoftPity = userPity.pity >= 70 && userPity.pity < 80;
        const isHardPity = userPity.pity >= 80 && userPity.pity <= 90;

        let ultraRareWeight = rarityWeights.ULTRA_RARE;
        let ultraRareWeightHardPity = rarityWeights.ULTRA_RARE;

        if (userPity.pity > 0) {
            const getUltraRareCount = await container.repo.card.getUserCardCountByRarity("ULTRA_RARE");
            const ultraRareCount = getUltraRareCount.unwrap();
            const ultraRareWeightMultiplier = 1 + ultraRareCount / userPity.pity;

            ultraRareWeight *= ultraRareWeightMultiplier;
            ultraRareWeightHardPity *= ultraRareWeightMultiplier;
        }

        if (isSoftPity) {
            const softPityMultiplier = 1 + (userPity.pity - 70) / 20;
            ultraRareWeight *= softPityMultiplier;
            ultraRareWeightHardPity *= softPityMultiplier;
        }

        if (isHardPity) {
            ultraRareWeight = 1;
            ultraRareWeightHardPity = 1;
        }

        const totalWeight =
            rarityWeights.COMMON +
            rarityWeights.RARE +
            rarityWeights.SUPER_RARE +
            rarityWeights.SPECIALLY_SUPER_RARE +
            ultraRareWeight +
            ultraRareWeightHardPity;

        const adjustedRarityWeights = {
            common: rarityWeights.COMMON / totalWeight,
            rare: rarityWeights.RARE / totalWeight,
            superRare: rarityWeights.SUPER_RARE / totalWeight,
            speciallySuperRare: rarityWeights.SPECIALLY_SUPER_RARE / totalWeight,
            ultraRare: ultraRareWeight / totalWeight,
            ultraRareHardPity: ultraRareWeightHardPity / totalWeight,
        };

        const probabilityDistribution = [
            adjustedRarityWeights.common,
            adjustedRarityWeights.rare,
            adjustedRarityWeights.superRare,
            adjustedRarityWeights.speciallySuperRare,
            adjustedRarityWeights.ultraRare,
            adjustedRarityWeights.ultraRareHardPity,
        ];

        const pityProbabilityDistribution = [0, 0, 0, 0, 0, 1 - (isHardPity ? 1 : 0)];

        const combinedProbabilityDistribution = this.rollWithCompoundProbabilityDistribution([
            [probabilityDistribution, 0.95],
            [pityProbabilityDistribution, 0.05],
        ]);

        let targetRarityIndex = this.rollWithProbabilityDistribution(combinedProbabilityDistribution);
        let rolledRarityIndex = targetRarityIndex;

        targetRarityIndex = Math.min(targetRarityIndex + Math.floor(Math.random() * 3) - 1, 4);
        rolledRarityIndex = Math.max(Math.min(rolledRarityIndex + Math.floor(Math.random() * 3) - 1, 4), 0);

        const rarities = ["COMMON", "RARE", "SUPER_RARE", "SPECIALLY_SUPER_RARE", "ULTRA_RARE"];

        const targetRarity = rarities[targetRarityIndex];
        const rolledRarity = rarities[rolledRarityIndex];

        return {
            targetRarity,
            rolledRarity,
        };
    }

    private async getRandomCard(
        rolledRarity: RarityType,
        wish: PrismaWish,
        user: PrismaUser
    ): Promise<PrismaCard | undefined> {
        const getRarity = await container.repo.rarity.getRarityByName(rolledRarity);
        const rarity = getRarity.unwrap();

        const getFilteredCards = await container.repo.card.getCardsByRarity(rolledRarity, ["CardBaseStatistic"]);
        const filteredCards = getFilteredCards.unwrap();
        if (filteredCards.length === 0) {
            container.logger.debug(`No cards found for rarity ${rolledRarity}`);
            return undefined;
        }

        const availableCards = filteredCards.filter((card) => card.stock > 0);
        if (availableCards.length === 0) {
            container.logger.debug(`No cards available for rarity ${rolledRarity}`);
            return undefined;
        }

        const card = availableCards[Math.floor(Math.random() * availableCards.length)];
        const getUserCard = await container.repo.card.getUserCardByCardIdAndUserId(card.id, user.id);
        const userCard = getUserCard.isOk() ? getUserCard.unwrap() : null;

        if (userCard === null) {
            const createUserCard = await container.repo.card.createUserCard({
                data: {
                    userId: user.id,
                    cardId: card.id,
                    RarityUserCard: {
                        create: {
                            quantity: 1,
                            UserCardStatistic: {
                                create: {
                                    attack: card.CardBaseStatistic.attack,
                                    defense: card.CardBaseStatistic.defense,
                                    health: card.CardBaseStatistic.health,
                                    speed: card.CardBaseStatistic.speed,
                                    mana: card.CardBaseStatistic.mana,
                                    accuracy: card.CardBaseStatistic.accuracy,
                                    criticalChance: card.CardBaseStatistic.criticalChance,
                                    criticalDamage: card.CardBaseStatistic.criticalDamage,
                                },
                            },
                            UserCardProgression: {
                                create: {
                                    level: 1,
                                    experience: 0,
                                },
                            },
                            Rarity: {
                                connect: {
                                    id: rarity.id,
                                },
                            },
                        },
                    },
                },
            });

            if (createUserCard.isOk) return card;
        } else {
            const getRarityUserCard = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
                userCard.id,
                rarity.id
            );
            if (getRarityUserCard.isErr()) container.logger.error(getRarityUserCard.unwrapErr());
            const rarityUserCard = getRarityUserCard.unwrap();

            const updateUserCard = await container.repo.rarity.updateRarityUserCard({
                where: {
                    id: rarityUserCard.id,
                },
                data: {
                    quantity: {
                        increment: 1,
                    },
                },
            });

            if (updateUserCard.isOk) return card;
        }
    }

    private rollWithCompoundProbabilityDistribution(distributions: [Distribution, number][]): Distribution {
        return distributions.reduce((combinedDistribution, [distribution, weight]) => {
            for (let i = 0; i < distribution.length; i++) {
                combinedDistribution[i] += distribution[i] * weight;
            }
            return combinedDistribution;
        }, Array(distributions[0][0].length).fill(0));
    }

    private rollWithProbabilityDistribution(probabilities: number[]): number {
        const cumulativeProbs = probabilities.reduce(
            (acc, p) => {
                acc.push(acc[acc.length - 1] + p);
                return acc;
            },
            [0]
        );
        const rand = Math.random();
        return this.binarySearch(cumulativeProbs, rand);
    }

    private binarySearch(arr: number[], target: number): number {
        let low = 0;
        let high = arr.length - 1;
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }

    protected static instance: WishService;

    public static getInstance(): WishService {
        if (!WishService.instance) {
            WishService.instance = new WishService();
        }

        return WishService.instance;
    }
}
