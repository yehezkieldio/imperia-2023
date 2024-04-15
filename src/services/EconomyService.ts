import { container } from "@sapphire/pieces";

export class EconomyService {
    public async addCrystal(discordId: string, amount: number): Promise<void> {
        const getUserBalance = await container.repo.user.getUserByDiscordId(discordId, ["Balance"]);

        if (getUserBalance.isErr()) {
            container.logger.debug(`Failed to get user balance`);
            return;
        }

        const userBalance = getUserBalance.unwrap();

        const updateUserBalance = await container.repo.user.updateUser({
            where: {
                id: userBalance.id,
            },
            data: {
                Balance: {
                    update: {
                        crystal: userBalance.Balance.crystal + amount,
                    },
                },
            },
        });

        if (updateUserBalance.isErr()) {
            container.logger.debug(`Failed to update user balance`);
        }
    }

    public async removeCrystal(discordId: string, amount: number): Promise<void> {
        const getUserBalance = await container.repo.user.getUserByDiscordId(discordId, ["Balance"]);

        if (getUserBalance.isErr()) {
            container.logger.debug(`Failed to get user balance`);
            return;
        }

        const userBalance = getUserBalance.unwrap();

        const updateUserBalance = await container.repo.user.updateUser({
            where: {
                id: userBalance.id,
            },
            data: {
                Balance: {
                    update: {
                        crystal: userBalance.Balance.crystal - amount,
                    },
                },
            },
        });

        if (updateUserBalance.isErr()) {
            container.logger.debug(`Failed to update user balance`);
        }
    }

    public async addFate(discordId: string, amount: number): Promise<void> {
        const getUserBalance = await container.repo.user.getUserByDiscordId(discordId, ["Balance"]);

        if (getUserBalance.isErr()) {
            container.logger.debug(`Failed to get user balance`);
            return;
        }

        const userBalance = getUserBalance.unwrap();

        const updateUserBalance = await container.repo.user.updateUser({
            where: {
                id: userBalance.id,
            },
            data: {
                Balance: {
                    update: {
                        fate: userBalance.Balance.fate + amount,
                    },
                },
            },
        });

        if (updateUserBalance.isErr()) {
            container.logger.debug(`Failed to update user balance`);
        }
    }

    public async removeFate(discordId: string, amount: number): Promise<void> {
        const getUserBalance = await container.repo.user.getUserByDiscordId(discordId, ["Balance"]);

        if (getUserBalance.isErr()) {
            container.logger.debug(`Failed to get user balance`);
            return;
        }

        const userBalance = getUserBalance.unwrap();

        const updateUserBalance = await container.repo.user.updateUser({
            where: {
                id: userBalance.id,
            },
            data: {
                Balance: {
                    update: {
                        fate: userBalance.Balance.fate - amount,
                    },
                },
            },
        });

        if (updateUserBalance.isErr()) {
            container.logger.debug(`Failed to update user balance`);
        }
    }

    protected static instance: EconomyService;

    public static getInstance(): EconomyService {
        if (!EconomyService.instance) {
            EconomyService.instance = new EconomyService();
        }

        return EconomyService.instance;
    }
}
