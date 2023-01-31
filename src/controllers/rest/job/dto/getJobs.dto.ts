import { JobTypeEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IsValidInt } from '~/src/core/decorators/validators.decorator';
import { PostedDateEnum } from '~/src/core/utils/enums/PostedDate.enum';

export class GetJobsQueryDto {
  @IsNotEmpty()
  @IsEnum(JobTypeEnum)
  type: JobTypeEnum;

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
}

export class GetFeaturedJobsQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsNotEmpty()
  @IsEnum(JobTypeEnum)
  type: JobTypeEnum;

  @IsOptional()
  @IsValidInt()
  categoryId?: number;

  @IsOptional()
  @IsValidInt()
  countryId?: number;
}
