import { CurrencyEnum, JobTimeEnum, JobTypeEnum } from '@prisma/client';
import { IsDecimal, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateJobDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDecimal()
  salary?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(CurrencyEnum)
  currency?: CurrencyEnum;

  @IsOptional()
  @IsEnum(JobTypeEnum)
  type?: JobTypeEnum;

  @IsOptional()
  @IsEnum(JobTimeEnum)
  time?: JobTimeEnum;
}
