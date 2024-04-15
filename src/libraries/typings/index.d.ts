declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        DISCORD_BOT_TOKEN: string;
        DEFAULT_PREFIX: string;
        NODE_ENV: "development" | "production" | "test";

        ANALYTICS_ENABLED: "true" | "false";
    }
}
