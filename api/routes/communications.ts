import { Router, Request, Response } from 'express';

export const commsRoute: Router = Router();

commsRoute.post("/contact-us", (req: Request, res: Response) => {
	const { name, email, summary, message } = req.body;
})
