import { IsOptional, IsString } from 'class-validator';

import { IsValidBoolean } from '~/src/core/decorators/validators.decorator';

export class CreateCompanyAddDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsValidBoolean()
  active: boolean;
}

export class UpdateCompanyAddDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsValidBoolean()
  active: boolean;
}
