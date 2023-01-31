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
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  school?: string;

  @IsOptional()
  @IsValidBoolean()
  active?: boolean;

  @IsOptional()
  @IsString()
  degree?: string;

  @IsOptional()
  @IsString()
  studyField?: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsValidDate()
  @Transform(({ value }) => value && new Date(value))
  premiumStart?: Date;

  @IsOptional()
  @IsValidDate()
  @Transform(({ value }) => value && new Date(value))
  premiumEnd?: Date;

  @IsOptional()
  @IsValidBoolean()
  isPremium?: boolean;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}
