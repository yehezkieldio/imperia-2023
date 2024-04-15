import timers from "node:timers/promises";

export class Utils {
    public wait(ms: number): Promise<void> {
        return timers.setTimeout(ms);
    }

    public getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private static instance: Utils;

    public static getInstance(): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils();
        }
        return Utils.instance;
    }
}
