import { PrismaClient, ElementType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    const common = await prisma.rarity.create({
        data: {
            name: "COMMON",
        },
    });
    const rare = await prisma.rarity.create({
        data: {
            name: "RARE",
        },
    });
    const superRare = await prisma.rarity.create({
        data: {
            name: "SUPER_RARE",
        },
    });
    const speciallySuperRare = await prisma.rarity.create({
        data: {
            name: "SPECIALLY_SUPER_RARE",
        },
    });
    const ultraRare = await prisma.rarity.create({
        data: {
            name: "ULTRA_RARE",
        },
    });

    const wish = await prisma.wish.create({
        data: {
            name: "Genshin Impact",
            cost: 1,
            rarityWeight: {
                undefined: undefined,
            },
        },
    });

    const elements = Object.values(ElementType);
    const elementCount = elements.length;
    const elementIndex = Math.floor(Math.random() * elementCount);
    const element = elements[elementIndex];

    const attack = Math.floor(Math.random() * 100) + 150;
    const defense = Math.floor(Math.random() * 100) + 150;
    const health = Math.floor(Math.random() * 100) + 250;
    const speed = Math.floor(Math.random() * 100) + 150;
    const mana = Math.floor(Math.random() * 100) + 150;
    const accuracy = Math.floor(Math.random() * 100) / 100 + 0.5;
    const criticalChance = Math.floor(Math.random() * 100) / 1000 + 0.05;
    const criticalDamage = Math.floor(Math.random() * 100) / 100 + 1.5;

    for (let i = 1; i <= 10; i++) {
        await prisma.card.create({
            data: {
                name: `Card ${i}`,
                stock: 100,
                element: element,
                Wish: {
                    connect: {
                        id: wish.id,
                    },
                },
                CardBaseStatistic: {
                    create: {
                        attack: attack,
                        defense: defense,
                        health: health,
                        speed: speed,
                        mana: mana,
                        accuracy: accuracy,
                        criticalChance: criticalChance,
                        criticalDamage: criticalDamage,
                    },
                },
                RarityCard: {
                    create: [
                        {
                            Rarity: {
                                connect: {
                                    id: common.id,
                                },
                            },
                        },
                        {
                            Rarity: {
                                connect: {
                                    id: rare.id,
                                },
                            },
                        },
                        {
                            Rarity: {
                                connect: {
                                    id: superRare.id,
                                },
                            },
                        },
                        {
                            Rarity: {
                                connect: {
                                    id: speciallySuperRare.id,
                                },
                            },
                        },
                        {
                            Rarity: {
                                connect: {
                                    id: ultraRare.id,
                                },
                            },
                        },
                    ],
                },
            },
        });
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
