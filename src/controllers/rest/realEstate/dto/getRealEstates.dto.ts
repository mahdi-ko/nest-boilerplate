import { ConditionEnum, PropertyTypeEnum, SaleTypeEnum } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import {
  IsValidBoolean,
  IsValidInt,
} from '~/src/core/decorators/validators.decorator';
import { PostedDateEnum } from '~/src/core/utils/enums/PostedDate.enum';

enum RealEstatesSortByEnum {
  createdAt = 'createdAt',
  price = 'price',
}
enum SortOrder {
  asc,
  desc,
}

export class GetRealEstatesQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsValidInt()
  categoryId?: number;

  @IsOptional()
  @IsValidInt()
  countryId?: number;

  @IsOptional()
  @IsEnum(PostedDateEnum)
  postedDateEnum?: PostedDateEnum;

  @IsOptional()
  @IsValidInt({ each: true })
  regionsIds?: number[];

  @IsOptional()
  @IsValidInt()
  amenityId?: number;

  @IsOptional()
  @IsEnum(RealEstatesSortByEnum)
  sortBy?: RealEstatesSortByEnum;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @IsOptional()
  @IsValidInt()
  minPrice?: number;

  @IsOptional()
  @IsValidInt()
  maxPrice?: number;

  @IsOptional()
  @IsValidInt()
  minSize?: number;

  @IsOptional()
  @IsValidInt()
  maxSize?: number;

  @IsOptional()
  @IsValidInt()
  bedrooms?: number;

  @IsOptional()
  @IsValidInt()
  bathrooms?: number;

  @IsOptional()
  @IsValidInt()
  floor?: number;

  @IsOptional()
  @IsValidBoolean()
  furnished?: boolean;

  @IsOptional()
  @IsEnum(ConditionEnum)
  condition?: ConditionEnum;

  @IsOptional()
  @IsEnum(SaleTypeEnum)
  saleType?: SaleTypeEnum;

  @IsOptional()
  @IsEnum(PropertyTypeEnum)
  propertyType?: PropertyTypeEnum;
}

export class GetFeaturedRealEstatesQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsValidInt()
  categoryId?: number;

  @IsOptional()
  @IsValidInt()
  countryId?: number;
}
