import { ColorEnum, ConditionEnum, TransmissionEnum } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { IsValidInt } from '~/src/core/decorators/validators.decorator';
import { PostedDateEnum } from '~/src/core/utils/enums/PostedDate.enum';

enum VehiclesSortByEnum {
  createdAt = 'createdAt',
  price = 'price',
}
enum SortOrder {
  asc,
  desc,
}

export class GetVehiclesQueryDto {
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
  @IsEnum(VehiclesSortByEnum)
  sortBy?: VehiclesSortByEnum;

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
  @IsEnum(ConditionEnum)
  condition?: ConditionEnum;

  @IsOptional()
  @IsValidInt()
  year?: number;

  @IsOptional()
  @IsValidInt()
  minKilometers?: number;

  @IsOptional()
  @IsValidInt()
  maxKilometers?: number;

  @IsOptional()
  @IsEnum(TransmissionEnum)
  transmission?: TransmissionEnum;

  @IsOptional()
  @IsEnum(ColorEnum)
  color?: ColorEnum;
}

export class GetFeaturedVehiclesQueryDto {
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
