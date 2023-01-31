import { Injectable } from '@nestjs/common';

//TODO add to env
// AND CHANGE THE SENDER EMAIL AND NAME
@Injectable()
export class SendinblueConfig {
  apiKey = process.env.SENDINBLUE_API_KEY;
  senderEmail = 'no-reply@thelebanonservices.com';
  senderName = 'Lebanon Services';
}
