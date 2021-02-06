import { Client, Guild } from "discord.js";
import Logger from "../logger";

const { GUILD, TOKEN } = process.env;

const logger = new Logger("Bot Manager");

if(!GUILD){
    logger.error("Required environment variable GUILD is not defined.");
    process.exit(1);
}

if(!TOKEN){
    logger.error("Required environment variable TOKEN is not defined.");
    process.exit(1);
}

const bot = new Promise<Client>((res, rej) => {
    const client = new Client();

    client.login(TOKEN).catch(err => {
        logger.error("Failed to login to Discord.");
        rej(err);
    });

    client.on("ready", async () => {
        res(client);
    });
});

/** Gets the discord bot. */
export default bot;

export const defaultGuild = new Promise<Guild>(async res => {
    const guild = (await bot).guilds.cache.get(GUILD);
    if(!guild){
        logger.error(`Unknown guild: ${GUILD}`);
        return process.exit(1);
    }
    res(guild);
});