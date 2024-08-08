import mongoose from 'mongoose'
import { config } from 'dotenv';

config();

const DB: string = process.env.DB as string;
const mongoUri = process.env.MONGO_URI as string;
const localMongoURI = process.env.LOCAL_MONGO_URI as string;



export const mongo = mongoose.connect(mongoUri, {
	dbName: DB,
	ssl: true,
}).then(() => {
	console.log('Connected to MongoDB');
}).catch((err: any) => {
    console.log(err.message);
    // try to connect to local mongosh for development
    try {
        mongoose.connect(localMongoURI, {
            dbName: DB
        })
        console.log("Successfully connected to local mongosh")
    }
    catch (err: any) {
        console.error(err.message)
    }
});
