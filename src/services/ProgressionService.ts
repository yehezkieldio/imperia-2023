import { container } from "@sapphire/pieces";
import { Constants } from "#utils/Constants";

export class ProgressionService {
    public async getUserLevel(discordId: string): Promise<number> {
        const getUserLevel = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserLevel.isErr()) {
            container.logger.debug(`Failed to get user progression level.`);
            return 0;
        }

        const userLevel = getUserLevel.unwrap();
        return userLevel.Progression.level;
    }

    public async getUserExperience(discordId: string): Promise<number> {
        const getUserExperience = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserExperience.isErr()) {
            container.logger.debug(`Failed to get user progression experience count`);
            return 0;
        }

        const userExperience = getUserExperience.unwrap();
        return userExperience.Progression.experience;
    }

    public async getUserExperienceToNextLevel(discordId: string): Promise<number> {
        const getUserProgression = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserProgression.isErr()) {
            container.logger.debug(`Failed to get user progression`);
            return 0;
        }

        const user = getUserProgression.unwrap();
        return user.Progression.level * Constants.USER_PROGRESSION_MULTIPLIER;
    }

    public async calculateUserProgressionToNextLevelPercentage(discordId: string): Promise<number> {
        const getUserProgression = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserProgression.isErr()) {
            container.logger.debug(`Failed to get user progression`);
            return 0;
        }

        const user = getUserProgression.unwrap();
        const experienceRequiredForNextLevel = user.Progression.level * Constants.USER_PROGRESSION_MULTIPLIER;
        return (user.Progression.experience / experienceRequiredForNextLevel) * 100;
    }

    public async addUserExperience(discordId: string, experience: number): Promise<void> {
        const getUserProgression = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserProgression.isErr()) {
            container.logger.debug(`Failed to get user progression`);
            return;
        }

        const user = getUserProgression.unwrap();

        let userExperience = user.Progression.experience + experience;
        const userExperienceToNextLevel = user.Progression.level * Constants.USER_PROGRESSION_MULTIPLIER;
        let { level } = user.Progression;

        while (userExperience >= userExperienceToNextLevel) {
            userExperience -= level * Constants.USER_PROGRESSION_MULTIPLIER;
            level++;
        }

        const updateUserProgression = await container.repo.user.updateUser({
            where: {
                id: user.id,
            },
            data: {
                Progression: {
                    update: {
                        experience: userExperience,
                        level,
                    },
                },
            },
        });

        if (updateUserProgression.isErr()) {
            container.logger.debug(`Failed to update user progression`);
        }
    }

    public async removeUserExperience(discordId: string, experience: number): Promise<void> {
        const getUserProgression = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserProgression.isErr()) {
            container.logger.debug(`Failed to get user progression`);
            return;
        }

        const user = getUserProgression.unwrap();

        let userExperience = user.Progression.experience - experience;
        const userExperienceToNextLevel = user.Progression.level * Constants.USER_PROGRESSION_MULTIPLIER;
        let { level } = user.Progression;

        while (userExperience <= userExperienceToNextLevel) {
            userExperience += level * Constants.USER_PROGRESSION_MULTIPLIER;
            level--;
        }

        const updateUserProgression = await container.repo.user.updateUser({
            where: {
                id: user.id,
            },
            data: {
                Progression: {
                    update: {
                        experience: userExperience,
                        level,
                    },
                },
            },
        });

        if (updateUserProgression.isErr()) {
            container.logger.debug(`Failed to update user progression`);
        }
    }

    public async addUserLevel(discordId: string, level: number): Promise<void> {
        const getUserProgression = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserProgression.isErr()) {
            container.logger.debug(`Failed to get user progression`);
            return;
        }

        const user = getUserProgression.unwrap();

        const updateUserProgression = await container.repo.user.updateUser({
            where: {
                id: user.id,
            },
            data: {
                Progression: {
                    update: {
                        level: user.Progression.level + level,
                    },
                },
            },
        });

        if (updateUserProgression.isErr()) {
            container.logger.debug(`Failed to update user progression`);
        }
    }

    public async removeUserLevel(discordId: string, level: number): Promise<void> {
        const getUserProgression = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserProgression.isErr()) {
            container.logger.debug(`Failed to get user progression`);
            return;
        }

        const user = getUserProgression.unwrap();

        const updateUserProgression = await container.repo.user.updateUser({
            where: {
                id: user.id,
            },
            data: {
                Progression: {
                    update: {
                        level: user.Progression.level - level,
                    },
                },
            },
        });

        if (updateUserProgression.isErr()) {
            container.logger.debug(`Failed to update user progression`);
        }
    }

    public async resetUserProgression(discordId: string): Promise<void> {
        const getUserProgression = await container.repo.user.getUserByDiscordId(discordId, ["Progression"]);

        if (getUserProgression.isErr()) {
            container.logger.debug(`Failed to get user progression`);
            return;
        }

        const user = getUserProgression.unwrap();

        const updateUserProgression = await container.repo.user.updateUser({
            where: {
                id: user.id,
            },
            data: {
                Progression: {
                    update: {
                        level: 1,
                        experience: 0,
                    },
                },
            },
        });

        if (updateUserProgression.isErr()) {
            container.logger.debug(`Failed to update user progression`);
        }
    }

    public async getUserCardLevel(userCardId: string, rarityId: string): Promise<number> {
        const getUserCardLevel = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
            userCardId,
            rarityId,
            ["UserCardProgression"]
        );

        if (getUserCardLevel.isErr()) {
            container.logger.debug(`Failed to get user card level`);
            return 0;
        }

        const userCardLevel = getUserCardLevel.unwrap();
        return userCardLevel.UserCardProgression.level;
    }

    public async getUserCardExperience(userCardId: string, rarityId: string): Promise<number> {
        const getUserCardLevel = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
            userCardId,
            rarityId,
            ["UserCardProgression"]
        );

        if (getUserCardLevel.isErr()) {
            container.logger.debug(`Failed to get user card level`);
            return 0;
        }

        const userCardLevel = getUserCardLevel.unwrap();
        return userCardLevel.UserCardProgression.experience;
    }

    public async getUserCardExperienceToNextLevel(userCardId: string, rarityId: string): Promise<number> {
        const getUserCardLevel = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
            userCardId,
            rarityId,
            ["UserCardProgression"]
        );

        if (getUserCardLevel.isErr()) {
            container.logger.debug(`Failed to get user card level`);
            return 0;
        }

        const userCardLevel = getUserCardLevel.unwrap();
        return userCardLevel.UserCardProgression.level * Constants.USER_PROGRESSION_MULTIPLIER;
    }

    public async addUserCardExperience(userCardId: string, rarityId: string, experience: number): Promise<void> {
        const getUserCardProgression = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
            userCardId,
            rarityId,
            ["UserCardProgression"]
        );

        if (getUserCardProgression.isErr()) {
            container.logger.debug(`Failed to get user card progression`);
            return;
        }

        const userCard = getUserCardProgression.unwrap();

        let userCardExperience = userCard.UserCardProgression.experience + experience;
        const userCardExperienceToNextLevel =
            userCard.UserCardProgression.level * Constants.USER_PROGRESSION_MULTIPLIER;
        let { level } = userCard.UserCardProgression;

        while (userCardExperience >= userCardExperienceToNextLevel) {
            userCardExperience -= level * Constants.USER_PROGRESSION_MULTIPLIER;
            level++;
        }

        const updateUserCardProgression = await container.repo.rarity.updateRarityUserCard({
            where: {
                id: userCard.id,
            },
            data: {
                UserCardProgression: {
                    update: {
                        experience: userCardExperience,
                        level,
                    },
                },
            },
        });

        if (updateUserCardProgression.isErr()) {
            container.logger.debug(`Failed to update user card progression`);
        }
    }

    public async addUserCardLevel(userCardId: string, rarityId: string, level: number): Promise<void> {
        const getUserCardProgression = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
            userCardId,
            rarityId,
            ["UserCardProgression"]
        );

        if (getUserCardProgression.isErr()) {
            container.logger.debug(`Failed to get user card progression`);
            return;
        }

        const userCard = getUserCardProgression.unwrap();

        const updateUserCardProgression = await container.repo.rarity.updateRarityUserCard({
            where: {
                id: userCard.id,
            },
            data: {
                UserCardProgression: {
                    update: {
                        level: userCard.UserCardProgression.level + level,
                    },
                },
            },
        });

        if (updateUserCardProgression.isErr()) {
            container.logger.debug(`Failed to update user card progression`);
        }
    }

    public async removeUserCardLevel(userCardId: string, rarityId: string, level: number): Promise<void> {
        const getUserCardProgression = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
            userCardId,
            rarityId,
            ["UserCardProgression"]
        );

        if (getUserCardProgression.isErr()) {
            container.logger.debug(`Failed to get user card progression`);
            return;
        }

        const userCard = getUserCardProgression.unwrap();

        const updateUserCardProgression = await container.repo.rarity.updateRarityUserCard({
            where: {
                id: userCard.id,
            },
            data: {
                UserCardProgression: {
                    update: {
                        level: userCard.UserCardProgression.level - level,
                    },
                },
            },
        });

        if (updateUserCardProgression.isErr()) {
            container.logger.debug(`Failed to update user card progression`);
        }
    }

    public async removeUserCardExperience(userCardId: string, rarityId: string, experience: number): Promise<void> {
        const getUserCardProgression = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
            userCardId,
            rarityId,
            ["UserCardProgression"]
        );

        if (getUserCardProgression.isErr()) {
            container.logger.debug(`Failed to get user card progression`);
            return;
        }

        const userCard = getUserCardProgression.unwrap();

        const updateUserCardProgression = await container.repo.rarity.updateRarityUserCard({
            where: {
                id: userCard.id,
            },
            data: {
                UserCardProgression: {
                    update: {
                        experience: userCard.UserCardProgression.experience - experience,
                    },
                },
            },
        });

        if (updateUserCardProgression.isErr()) {
            container.logger.debug(`Failed to update user card progression`);
        }
    }

    public async resetUserCardProgression(userCardId: string, rarityId: string): Promise<void> {
        const getUserCardProgression = await container.repo.rarity.getRarityUserCardByUserCardIdAndRarityId(
            userCardId,
            rarityId,
            ["UserCardProgression"]
        );

        if (getUserCardProgression.isErr()) {
            container.logger.debug(`Failed to get user card progression`);
            return;
        }

        const userCard = getUserCardProgression.unwrap();

        const updateUserCardProgression = await container.repo.rarity.updateRarityUserCard({
            where: {
                id: userCard.id,
            },
            data: {
                UserCardProgression: {
                    update: {
                        experience: 0,
                        level: 1,
                    },
                },
            },
        });

        if (updateUserCardProgression.isErr()) {
            container.logger.debug(`Failed to update user card progression`);
        }
    }

    protected static instance: ProgressionService;

    public static getInstance(): ProgressionService {
        if (!ProgressionService.instance) {
            ProgressionService.instance = new ProgressionService();
        }

        return ProgressionService.instance;
    }
}
