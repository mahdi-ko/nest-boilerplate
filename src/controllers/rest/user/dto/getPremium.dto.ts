import { IsNotEmpty, IsString } from 'class-validator';

import { IsValidEmail } from '~/src/core/decorators/validators.decorator';

export class GetPremiumDto {
  @IsNotEmpty()
  @IsValidEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  phone?: string;
}
