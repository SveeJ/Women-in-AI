import dotenv from "dotenv";
dotenv.config();

import Logger from "./logger";

const logger = new Logger("Main");

import { ColorResolvable, MessageEmbed } from "discord.js";
import bot, { defaultGuild } from "./managers/bot";
import database from "./managers/database";
import { Constants } from "./constants";
import type { Invites } from "./typings/invites";

!async function(){

    const [ db, client, guild ] = await Promise.all([database, bot, defaultGuild]).catch(err => {
        logger.error(`Startup failed:\n${err.stack}`);
        return process.exit(1);
    });

    let invite_cache = await guild.fetchInvites();

    function createEmbed(description?: string, color: ColorResolvable = "#228B22", footerSuffix = `Watching ${guild!.memberCount} Players!`){
        const embed = new MessageEmbed() 
            .setColor(color)
            .setFooter(`© Equinox | ${footerSuffix}`, Constants.BRANDING_URL);

        if(description) embed.setDescription(description);
        
        return embed;
    }

    client.on("message", async function(message){
        if(message.channel.id === Constants.INVITE_GEN && message.content.startsWith('=invite')) {
            const msg_arr = message.content.split(' ');
            if(msg_arr.length !== 2 || (msg_arr[1] !== 'teen' && msg_arr[1] !== 'mentor')) {
                return message.reply(createEmbed('Invalid Format. Use \`=invite teen/mentor\` to generate an invite link.', "RED"));
            }

            const welcome_channel = guild.channels.cache.get(Constants.WELCOME_CHANNEL);

            if(!welcome_channel) return logger.error("WELCOME CHANNEL NOT FOUND.");

            const type = msg_arr[1];
            const invite = await welcome_channel.createInvite({ "maxAge": 0, "maxUses": 1 });
            const dbInvite: Invites = {
                "code": invite.code,
                "type": type,
            }

            await db.invites.insertOne(dbInvite);

            return message.reply(createEmbed(`Invite Link: ${Constants.BASE_URL}${invite.code}`).setTitle("Invite Created Successfully!"));
        }
    });

    client.on('guildMemberAdd', async member => {

        let invite;

        const cache = await guild.fetchInvites();

        for(let i in cache) {

            const inv = cache.get(i);
            if(!inv) continue;

            const inv2 = invite_cache.get(inv.code);
            if(inv2) {
                if((inv.uses ?? 0) > (inv2.uses ?? 0)) {
                    invite = inv;
                    invite_cache = await guild.fetchInvites();
                }   
            }
        }

        if(invite) {
            const dbInv = await db.invites.findOne({ "code": invite.code });
            if(dbInv) {
                const role_id = dbInv.type === 'mentor' ? Constants.MENTOR : Constants.TEEN;
                await member.roles.add(role_id).catch(() => null);
                await db.invites.deleteOne({ "code": invite.code });
            }
        }

        return;
    });

    client.on('guildMemberRemove', async member => {    

    });

    logger.info("App is now online!");
}();
