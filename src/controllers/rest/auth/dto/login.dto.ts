import { IsNotEmpty, IsString } from 'class-validator';

import { IsValidEmail } from '~/src/core/decorators/validators.decorator';

export class LoginDto {
  @IsNotEmpty()
  @IsValidEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
