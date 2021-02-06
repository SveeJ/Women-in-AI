"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
const logger_1 = __importDefault(require("./logger"));
const logger = new logger_1.default("Constants");
const { GUILD } = process.env;
if (!GUILD) {
    logger.error("Required environment variable GUILD is not defined.");
    process.exit(1);
}
var Constants;
(function (Constants) {
    Constants.BRANDING_URL = 'https://cdn.discordapp.com/attachments/804629278301093898/807564996442587156/fulllogos-405x252.png';
    Constants.INVITE_GEN = '807569301203583028';
    Constants.WELCOME_CHANNEL = '807567353670926356';
    Constants.BASE_URL = 'https://discord.gg/';
    Constants.TEEN = '807581141858910228';
    Constants.MENTOR = '807581044777156608';
})(Constants = exports.Constants || (exports.Constants = {}));
