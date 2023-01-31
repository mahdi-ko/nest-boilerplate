import { IsEnum, IsOptional, IsString } from 'class-validator';

import { IsValidInt } from '~/src/core/decorators/validators.decorator';
import { PostedDateEnum } from '~/src/core/utils/enums/PostedDate.enum';

enum ServicesSortByEnum {
  createdAt = 'createdAt',
  price = 'price',
}
enum SortOrder {
  asc,
  desc,
}

export class GetServicesQueryDto {
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
  @IsEnum(ServicesSortByEnum)
  sortBy?: ServicesSortByEnum;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}

export class GetFeaturedServicesQueryDto {
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