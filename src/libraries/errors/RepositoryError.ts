import { UserError } from "@sapphire/framework";

export class RepositoryError extends UserError {
    public readonly repository: string;

    public constructor(options: RepositoryError.Options) {
        super(options);

        this.repository = options.repository;
    }
}

export namespace RepositoryError {
    export interface Options extends Omit<UserError.Options, "identifier"> {
        repository: string;

        identifier: string;
    }
}
