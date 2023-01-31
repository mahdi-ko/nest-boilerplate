import { CurrencyEnum, JobTimeEnum, JobTypeEnum } from '@prisma/client';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { IsValidInt } from '~/src/core/decorators/validators.decorator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsDecimal()
  salary?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @IsNotEmpty()
  @IsEnum(JobTypeEnum)
  type: JobTypeEnum;

  @IsNotEmpty()
  @IsEnum(JobTimeEnum)
  time: JobTimeEnum;
}
