import { MailerSend } from "mailersend";
import { config } from "dotenv";

config();

const key: string = process.env.MAILER_SEND_API as string;

const mailerSend = new MailerSend({
  apiKey: key
})

export default mailerSend;



