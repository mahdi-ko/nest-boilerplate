import { TEMPLATES_MAPPING } from '../sendinblue.api';

export type sendEmailInput = {
  template: keyof typeof TEMPLATES_MAPPING;
  receiverEmail: string;
  username: string;
  token?: string;
  phone?: string;
  displayEmail?: string;
};
