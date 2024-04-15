import { Identifiers as SapphireIdentifiers } from "@sapphire/framework";

enum Identifiers {
    CardRepositoryError = "cardRepositoryError",
    DuelRepositoryError = "duelRepositoryError",
    SkillRepositoryError = "skillRepositoryError",
    UserRepositoryError = "userRepositoryError",
    WishRepositoryError = "wishRepositoryError",
    RarityRepositoryError = "rarityRepositoryError",
    PreconditionDeveloperOnly = "preconditionDeveloperOnly",
    PreconditionRegisteredUserOnly = "preconditionRegisteredUserOnly",
}

export const ImperiaIdentifiers = {
    ...SapphireIdentifiers,
    ...Identifiers,
};
