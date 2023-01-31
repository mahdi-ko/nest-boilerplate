import {
  ConditionEnum,
  CurrencyEnum,
  PropertyTypeEnum,
  SaleTypeEnum,
} from '@prisma/client';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import {
  IsValidBoolean,
  IsValidInt,
} from '~/src/core/decorators/validators.decorator';

export class CreateRealEstateDto {
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

  @IsNotEmpty()
  @IsEnum(ConditionEnum)
  condition: ConditionEnum;

  @IsNotEmpty()
  @IsEnum(SaleTypeEnum)
  saleType: SaleTypeEnum;

  @IsNotEmpty()
  @IsEnum(PropertyTypeEnum)
  propertyType: PropertyTypeEnum;

  @IsNotEmpty()
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @IsOptional()
  @IsValidInt()
  amenityId: number;

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
}
