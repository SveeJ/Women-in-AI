"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("./logger"));
const logger = new logger_1.default("Main");
const discord_js_1 = require("discord.js");
const bot_1 = __importStar(require("./managers/bot"));
const database_1 = __importDefault(require("./managers/database"));
const constants_1 = require("./constants");
!async function () {
    const [db, client, guild] = await Promise.all([database_1.default, bot_1.default, bot_1.defaultGuild]).catch(err => {
        logger.error(`Startup failed:\n${err.stack}`);
        return process.exit(1);
    });
    function createEmbed(description, color = "#228B22", footerSuffix = `Watching ${guild.memberCount} Players!`) {
        const embed = new discord_js_1.MessageEmbed()
            .setColor(color)
            .setFooter(`© Equinox | ${footerSuffix}`, constants_1.Constants.BRANDING_URL);
        if (description)
            embed.setDescription(description);
        return embed;
    }
    client.on("message", async function (message) {
    });
    client.on('guildMemberAdd', async (member) => {
    });
    client.on('guildMemberRemove', async (member) => {
    });
    logger.info("App is now online!");
}();
