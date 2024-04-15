import { PrismaClient as PrismaClientBase } from "@prisma/client";

export class PrismaClient extends PrismaClientBase {
    private constructor() {
        super();
    }

    private static instance: PrismaClient;

    public static getInstance(): PrismaClient {
        if (!PrismaClient.instance) PrismaClient.instance = new PrismaClient();
        return PrismaClient.instance;
    }
}
