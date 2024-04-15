import { PrismaCardDeck, PrismaUser, PrismaUserCard } from "#libraries/typings/Prisma";
import { EffectTypes, TargetTypes } from "@prisma/client";
import { container } from "@sapphire/pieces";

interface CardStatistic {
    attack: number;
    defense: number;
    health: {
        current: number;
        max: number;
    };
    element: string;
    speed: number;
    mana: number;
    accuracy: number;
    critical: {
        chance: number;
        damage: number;
    };
}

interface SkillStatistic {
    name: string;
    effect: EffectTypes;
    target: TargetTypes;
    cost: number;
    cooldown: number;
}

interface TurnResult {
    attacker: {
        card: CardStatistic;
        skill: SkillStatistic;
        status: {
            damage: {
                dealt: number;
                received: number;
            };
            health: {
                current: number;
            };
        };
    };
    defender: {
        card: CardStatistic;
        skill: SkillStatistic;
        status: {
            damage: {
                dealt: number;
                received: number;
            };
            health: {
                current: number;
            };
        };
    };
    status: {
        winner: "attacker" | "defender" | "draw";
        status: "ongoing" | "finished";
    };
}

interface BattleOptions {
    attacker: {
        user: PrismaUser;
        deck: PrismaCardDeck[];
    };
    defender: {
        user: PrismaUser;
        deck: PrismaCardDeck[];
    };
}

export class DuelService {
    public async performBattle(options: BattleOptions) {
        container.logger.debug(
            `Performing battle between ${options.attacker.user.discordId} and ${options.defender.user.discordId}`
        );

        const attackerCards = options.attacker.deck[0].UserCard;
        const defenderCards = options.defender.deck[0].UserCard;

        const attackerStats = await this.getUserCardStatistic(attackerCards);
        const defenderStats = await this.getUserCardStatistic(defenderCards);

        container.logger.debug(`attacker stats: ${JSON.stringify(attackerStats)}`);
        container.logger.debug(`defender stats: ${JSON.stringify(defenderStats)}`);
    }

    public async getUserCardStatistic(cards: PrismaUserCard[]) {
        const cardStats: CardStatistic[] = [];

        for (const card of cards) {
            const getCard = await container.repo.card.getCardById(card.cardId, ["CardBaseStatistic"]);
            const cardUnwrap = getCard.unwrap();

            cardStats.push({
                attack: cardUnwrap.CardBaseStatistic.attack,
                defense: cardUnwrap.CardBaseStatistic.defense,
                health: {
                    current: cardUnwrap.CardBaseStatistic.health,
                    max: cardUnwrap.CardBaseStatistic.health,
                },
                element: cardUnwrap.element,
                speed: cardUnwrap.CardBaseStatistic.speed,
                mana: cardUnwrap.CardBaseStatistic.mana,
                accuracy: cardUnwrap.CardBaseStatistic.accuracy,
                critical: {
                    chance: cardUnwrap.CardBaseStatistic.criticalChance,
                    damage: cardUnwrap.CardBaseStatistic.criticalDamage,
                },
            });
        }

        return cardStats;

        // const getUserCard = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(userCardId, rarityId, [
        //     "UserCardStatistic",
        //     "UserCard",
        // ]);
        //
        // if (getUserCard.isErr()) {
        //     container.logger.debug(`Failed to get user card`);
        //     return undefined;
        // }
        //
        // const getCard = await container.repo.card.getCardById(getUserCard.unwrap().UserCard.cardId);
        //
        // return {
        //     attack: getUserCard.unwrap().UserCardStatistic.attack,
        //     defense: getUserCard.unwrap().UserCardStatistic.defense,
        //     health: {
        //         current: getUserCard.unwrap().UserCardStatistic.health,
        //         max: getUserCard.unwrap().UserCardStatistic.health,
        //     },
        //     element: getCard.unwrap().element,
        //     speed: getUserCard.unwrap().UserCardStatistic.speed,
        //     mana: getUserCard.unwrap().UserCardStatistic.mana,
        //     accuracy: getUserCard.unwrap().UserCardStatistic.accuracy,
        //     critical: {
        //         chance: getUserCard.unwrap().UserCardStatistic.criticalChance,
        //         damage: getUserCard.unwrap().UserCardStatistic.criticalDamage,
        //     },
        // };
    }

    protected static instance: DuelService;

    public static getInstance(): DuelService {
        if (!DuelService.instance) {
            DuelService.instance = new DuelService();
        }

        return DuelService.instance;
    }
}
