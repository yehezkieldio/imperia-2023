import { repository, version as PACKAGE_VERSION } from "../../../package.json";

export namespace Constants {
    export const VERSION = PACKAGE_VERSION;

    export const DEVELOPERS = ["327849142774923266", "387886389800337409"];

    export const TEST_SERVERS = ["909618952634781716", "1053312595618177135"];

    export const USER_PROGRESSION_MULTIPLIER = 100;

    export const CARD_PROGRESSION_MULTIPLIER = 150;

    export const GITHUB_REPOSITORY = repository.url;

    export enum COLORS {
        PRIMARY = "#0f1216",
        ERROR = "#a22423",
    }

    export enum BUTTON_IDENTIFIER {
        TERMS_OF_SERVICE = "termsofservice",
    }

    export enum EMOJI {
        CHECKMARK = "<:checkmark:1080037252765335572>",
        LOADING = "<a:loading:1080031855836930049>",
        RED_CROSS = "<:red_cross:1083636400689262624>",
    }
}
