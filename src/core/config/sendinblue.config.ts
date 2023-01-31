import { Injectable } from '@nestjs/common';

// TODO : Add the sendinblue api key in the .env file
// AND CHANGE THE SENDER EMAIL AND NAME
@Injectable()
export class SendinblueConfig {
  apiKey = process.env.SENDINBLUE_API_KEY;
  senderEmail = 'no-reply@thelebanonservices.com';
  senderName = 'Lebanon Services';
}
