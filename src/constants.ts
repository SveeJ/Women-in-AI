import Logger from "./logger";

const logger = new Logger("Constants");

const { GUILD } = process.env;
if(!GUILD){
    logger.error("Required environment variable GUILD is not defined.");
    process.exit(1);
}

export namespace Constants {
    export const BRANDING_URL = 'https://cdn.discordapp.com/attachments/804629278301093898/807564996442587156/fulllogos-405x252.png';
}