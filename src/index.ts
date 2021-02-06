import dotenv from "dotenv";
dotenv.config();

import Logger from "./logger";

const logger = new Logger("Main");

import { ColorResolvable, MessageEmbed } from "discord.js";
import bot, { defaultGuild } from "./managers/bot";
import database from "./managers/database";
import { Constants } from "./constants";

!async function(){

    const [ db, client, guild ] = await Promise.all([database, bot, defaultGuild]).catch(err => {
        logger.error(`Startup failed:\n${err.stack}`);
        return process.exit(1);
    });

    function createEmbed(description?: string, color: ColorResolvable = "#228B22", footerSuffix = `Watching ${guild!.memberCount} Players!`){
        const embed = new MessageEmbed() 
            .setColor(color)
            .setFooter(`© Equinox | ${footerSuffix}`, Constants.BRANDING_URL);

        if(description) embed.setDescription(description);
        
        return embed;
    }

    client.on("message", async function(message){
        
    });

    // role storage
    client.on('guildMemberAdd', async member => {
        
    });

    // role storage
    client.on('guildMemberRemove', async member => {    

    });

    logger.info("App is now online!");
}();
