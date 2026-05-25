import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.PRINT_MASTER_CONNECTION);
const db = client.db(process.env.PRINT_MASTER_COLLECTION);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.Client_ID,
            clientSecret: process.env.Client_secret,
        },
    },
    database: mongodbAdapter(db, {
        client
    }),
});