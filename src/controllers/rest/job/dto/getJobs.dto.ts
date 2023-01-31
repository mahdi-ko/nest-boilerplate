import { JobTypeEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PostedDateEnum } from '~/src/core/utils/enums/PostedDate.enum';

export class GetJobsQueryDto {
  @IsNotEmpty()
  @IsEnum(JobTypeEnum)
  type: JobTypeEnum;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(PostedDateEnum)
  postedDateEnum?: PostedDateEnum;
}

export class GetFeaturedJobsQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsNotEmpty()
  @IsEnum(JobTypeEnum)
  type: JobTypeEnum;
}
