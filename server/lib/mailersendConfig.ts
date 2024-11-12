import 'dotenv/config';
import { MailerSend } from "mailersend";

export const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API || '',
});