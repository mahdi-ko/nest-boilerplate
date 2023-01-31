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
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  school?: string;

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
  @IsValidBoolean()
  isPremium?: boolean;

  @IsOptional()
  @IsValidDate()
  @Transform(({ value }) => value && new Date(value))
  premiumStart?: Date;

  @IsOptional()
  @IsValidDate()
  @Transform(({ value }) => value && new Date(value))
  premiumEnd?: Date;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;
}