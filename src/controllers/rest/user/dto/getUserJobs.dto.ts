import { JobTypeEnum } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class GetJobsQueryDto {
  @IsNotEmpty()
  @IsEnum(JobTypeEnum)
  type: JobTypeEnum;
}
