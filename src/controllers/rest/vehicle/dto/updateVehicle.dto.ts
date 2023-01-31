import {
  ColorEnum,
  ConditionEnum,
  CurrencyEnum,
  TransmissionEnum,
} from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDecimal, IsEnum, IsOptional, IsString } from 'class-validator';

import {
  IsValidDate,
  IsValidInt,
} from '~/src/core/decorators/validators.decorator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  title?: string;

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
  @IsEnum(ConditionEnum)
  condition?: ConditionEnum;

  @IsOptional()
  @IsEnum(CurrencyEnum)
  currency?: CurrencyEnum;

  @IsOptional()
  @IsValidInt()
  categoryId?: number;

  @IsOptional()
  @IsValidInt()
  countryId?: number;

  @IsOptional()
  @IsValidInt()
  regionId?: number;

  @IsOptional()
  @IsString()
  phone?: string;

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

  @IsOptional()
  @IsValidDate()
  @Transform(({ value }) => value && new Date(value))
  premiumStart?: Date;

  @IsOptional()
  @IsValidDate()
  @Transform(({ value }) => value && new Date(value))
  premiumEnd?: Date;
}
