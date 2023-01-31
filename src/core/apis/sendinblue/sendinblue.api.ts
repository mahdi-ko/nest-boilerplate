import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from 'sib-api-v3-typescript';

import { SendinblueConfig } from '../../config/sendinblue.config';
import { sendEmailInput } from './types';

const config = new SendinblueConfig();
const client = new TransactionalEmailsApi();
client.setApiKey(TransactionalEmailsApiApiKeys.apiKey, config.apiKey);

// TODO make the templates in sendinblue and add them here
export const TEMPLATES_MAPPING = {
  confirmEmail: 1,
  forgotPassword: 2,
  getPremium: 4,
};

export const sendTemplateEmail = async (payload: sendEmailInput) => {
  const response = await client.sendTransacEmail({
    templateId: TEMPLATES_MAPPING[payload.template],
    sender: {
      email: config.senderEmail,
      name: config.senderName,
    },
    to: [{ email: payload.receiverEmail }],
    params: {
      USERNAME: payload.username,
      TOKEN: payload.token,
      DISPLAY_EMAIL: payload.displayEmail,
      PHONE: payload.phone,
    },
  });
  return response.body;
};
