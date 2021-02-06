import { MongoClient } from "mongodb";
import Logger from "../logger";
import type { Database } from "../typings/database";

const logger = new Logger("Database Manager");

const { DB_URL } = process.env;

if(!DB_URL){
    logger.error("Required environment variable DB_URL is not defined.");
    process.exit(1);
}

/** Gets the database. */
export default new Promise<Database>((res, rej) => {

    MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {

        const db = client.db("hackathon");

        res({
            invites: db.collection("invites")
        });

    }).catch(rej);

});