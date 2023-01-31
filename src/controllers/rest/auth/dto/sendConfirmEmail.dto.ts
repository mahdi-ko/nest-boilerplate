import { IsNotEmpty } from 'class-validator';

import { IsValidEmail } from '~/src/core/decorators/validators.decorator';

export class SendEmailDto {
  @IsNotEmpty()
  @IsValidEmail()
  email: string;
}
