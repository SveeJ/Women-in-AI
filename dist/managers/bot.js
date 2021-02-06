"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGuild = void 0;
const discord_js_1 = require("discord.js");
require("node-fetch");
const logger_1 = __importDefault(require("../logger"));
const { GUILD, TOKEN } = process.env;
const logger = new logger_1.default("Bot Manager");
if (!GUILD) {
    logger.error("Required environment variable GUILD is not defined.");
    process.exit(1);
}
if (!TOKEN) {
    logger.error("Required environment variable TOKEN is not defined.");
    process.exit(1);
}
const bot = new Promise((res, rej) => {
    const client = new discord_js_1.Client();
    client.login(TOKEN).catch(err => {
        logger.error("Failed to login to Discord.");
        rej(err);
    });
    client.on("ready", async () => {
        res(client);
    });
});
exports.default = bot;
exports.defaultGuild = new Promise(async (res) => {
    const guild = (await bot).guilds.cache.get(GUILD);
    if (!guild) {
        logger.error(`Unknown guild: ${GUILD}`);
        return process.exit(1);
    }
    res(guild);
});
