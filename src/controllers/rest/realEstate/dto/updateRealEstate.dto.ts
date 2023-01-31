import {
  ConditionEnum,
  CurrencyEnum,
  PropertyTypeEnum,
  SaleTypeEnum,
} from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDecimal, IsEnum, IsOptional, IsString } from 'class-validator';

import {
  IsValidBoolean,
  IsValidDate,
  IsValidInt,
} from '~/src/core/decorators/validators.decorator';

export class UpdateRealEstateDto {
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
  @IsEnum(ConditionEnum)
  condition?: ConditionEnum;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsValidInt()
  size?: number;

  @IsOptional()
  @IsValidInt()
  bathrooms?: number;

  @IsOptional()
  @IsValidInt()
  bedrooms?: number;

  @IsOptional()
  @IsValidBoolean()
  furnished?: boolean;

  @IsOptional()
  @IsValidInt()
  floor?: number;

  @IsOptional()
  @IsEnum(SaleTypeEnum)
  saleType?: SaleTypeEnum;

  @IsOptional()
  @IsEnum(CurrencyEnum)
  currency?: CurrencyEnum;

  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  propertyType?: PropertyTypeEnum;

  @IsOptional()
  @IsValidInt()
  amenityId?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsValidDate()
  @Transform(({ value }) => value && new Date(value))
  premiumStart?: Date;

  @IsOptional()
  @IsValidDate()
  @Transform(({ value }) => value && new Date(value))
  premiumEnd?: Date;
}
