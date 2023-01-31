import { CurrencyEnum } from '@prisma/client';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { IsValidInt } from '~/src/core/decorators/validators.decorator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

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
}
