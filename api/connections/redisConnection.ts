import { createClient } from "redis";

export const client = createClient();

client.on('connect', () => {
	console.log('Connected to Redis');
});

client.on("exit", () => {
	console.log('Redis connection closed');
});

client.on('error', (err: any) => {
	console.log(err.message);
});
