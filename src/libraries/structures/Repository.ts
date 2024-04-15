import { PrismaClient } from "#libraries/extensions/PrismaClient";
import { container } from "@sapphire/pieces";
import { IncludesOptions, PossibleIncludes } from "#typings/PrismaIncludes";

export class Repository {
    public prisma: PrismaClient;

    public constructor() {
        this.prisma = container.prisma;
    }

    public getIncludeObject<T extends Record<string, any>>(includes?: PossibleIncludes<T> | null): IncludesOptions<T> {
        return includes?.length
            ? includes.reduce<any>((acc, include) => ({ ...acc, [include]: true }), { _count: true })
            : {
                  _count: true,
              };
    }
}
