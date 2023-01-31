import { IsOptional, IsString } from 'class-validator';

import {
  IsValidBoolean,
  IsValidDate,
} from '~/src/core/decorators/validators.decorator';

export class UpdateExperienceDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsValidDate()
  startDate?: Date;

  @IsOptional()
  @IsValidDate()
  endDate?: Date;

  @IsOptional()
  @IsValidBoolean()
  active?: boolean;
}
