import { GenderEnum, RoleEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  IsValidBoolean,
  IsValidDate,
  IsValidEmail,
} from '~/src/core/decorators/validators.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsValidEmail()
  email?: string;

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
  @Transform(({ value }) => value && new Date(value))
  @IsValidDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsValidBoolean()
  active?: boolean;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}
