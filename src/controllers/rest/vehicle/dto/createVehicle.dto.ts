import {
  ColorEnum,
  ConditionEnum,
  CurrencyEnum,
  TransmissionEnum,
} from '@prisma/client';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { IsValidInt } from '~/src/core/decorators/validators.decorator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsNotEmpty()
  @IsEnum(ConditionEnum)
  condition: ConditionEnum;

  @IsNotEmpty()
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @IsNotEmpty()
  @IsValidInt()
  categoryId: number;

  @IsNotEmpty()
  @IsValidInt()
  countryId: number;

  @IsOptional()
  @IsValidInt()
  regionId?: number;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsValidInt()
  kilometers?: number;

  @IsOptional()
  @IsValidInt()
  year?: number;

  @IsOptional()
  @IsEnum(ColorEnum)
  color?: ColorEnum;

  @IsOptional()
  @IsEnum(TransmissionEnum)
  transmission?: TransmissionEnum;
}
