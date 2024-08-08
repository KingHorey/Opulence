import { Router, Request, Response } from 'express';
import Nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const hostMail: string = process.env.HOST_MAIL as string;

const comms: Router = Router();
const transporter = Nodemailer.createTransport({
  host: hostMail,
  port: 587,
  secure: false,
  auth: {
    
  }
})
comms.post("/contact-us", (req: Request, res: Response) => {
  const { email, name, summary, message } = req.body;

}
)

