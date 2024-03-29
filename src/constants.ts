import Logger from "./logger";

const logger = new Logger("Constants");

const { GUILD } = process.env;
if(!GUILD){
    logger.error("Required environment variable GUILD is not defined.");
    process.exit(1);
}

export namespace Constants {
    export const BRANDING_URL = 'https://cdn.discordapp.com/attachments/804629278301093898/807564996442587156/fulllogos-405x252.png';
    export const INVITE_GEN = '807569301203583028';
    export const WELCOME_CHANNEL = '807567353670926356';
    export const BASE_URL = 'https://discord.gg/';
    export const TEEN = '807581141858910228';
    export const MENTOR = '807581044777156608';
    export const INVITE_LOGS = '807592430638596116';
}