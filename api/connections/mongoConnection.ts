import mongoose from 'mongoose'
import { config } from 'dotenv';
import { createClient } from "redis";

config();

const DB: string = process.env.DB as string;
const mongoUri = process.env.MONGO_URI as string;
export const client = createClient();


export const mongo = mongoose.connect(mongoUri, {
	dbName: DB,
	ssl: true,
}).then(() => {
	console.log('Connected to MongoDB');
}).catch((err: any) => {
    console.log(err.message);
    // try to connect to local mongosh for development
});




client.on('connect', () => {
	console.log('Connected to Redis');
});

client.on("exit", () => {
	console.log('Redis connection closed');
});

client.on('error', (err: any) => {
	console.log(err.message);
});
