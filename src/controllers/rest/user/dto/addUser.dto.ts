import { GenderEnum, RoleEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
  IsValidBoolean,
  IsValidDate,
  IsValidEmail,
} from '~/src/core/decorators/validators.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsValidEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsValidDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}
