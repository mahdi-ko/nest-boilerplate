import { IsNotEmpty, IsString } from 'class-validator';

import { IsValidEmail } from '~/src/core/decorators/validators.decorator';

export class VerifyEmailTokenDto {
  @IsNotEmpty()
  @IsValidEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
