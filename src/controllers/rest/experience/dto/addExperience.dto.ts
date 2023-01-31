import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
  IsValidBoolean,
  IsValidDate,
} from '~/src/core/decorators/validators.decorator';

export class CreateExperienceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  industry: string;

  @IsNotEmpty()
  @IsValidDate()
  startDate: Date;

  @IsOptional()
  @IsValidDate()
  endDate?: Date;

  @IsOptional()
  @IsValidBoolean()
  active: boolean;
}
