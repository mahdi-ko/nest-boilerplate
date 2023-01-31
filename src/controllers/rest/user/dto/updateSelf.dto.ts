import { GenderEnum } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { IsValidDate } from '~/src/core/decorators/validators.decorator';

export class UpdateSelfDto {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsValidDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}
