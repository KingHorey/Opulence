import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { config } from 'dotenv'
import { userModel } from './user.models';

config();

const secretToken = process.env.JWT_TOKEN_SECRET as string;

export async function verifyAction(req: Request, res:Response, next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" })
	}
	try {
		let decodedResult = jwt.verify(token, secretToken);
		const { email } = req.body;
		try {
			let user = await userModel.findOne({ email: email }, { email: 1 })
			if (decodedResult && user) next();
			else {
				return res.status(401).json({ message: "Unauthorized" })
			}
		}
		catch(err:any) {
			console.log(err.message)
			return res.status(500).json({ message: "An error occured" })
		}
	}
	catch {
		return res.status(500).json({ message: "An error occured" })
	}
}
