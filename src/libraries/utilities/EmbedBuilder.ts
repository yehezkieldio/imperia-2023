import { EmbedBuilder as EmbedBuilderBase } from "discord.js";
import { Constants } from "#utils/Constants";

export class EmbedBuilder extends EmbedBuilderBase {
    public constructor() {
        super();

        this.setColor(Constants.COLORS.PRIMARY);
    }

    public isErrorEmbed(): this {
        this.setColor(Constants.COLORS.ERROR);
        return this;
    }
}
