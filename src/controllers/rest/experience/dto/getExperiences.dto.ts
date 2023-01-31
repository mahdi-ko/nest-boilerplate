import { IsOptional, IsString } from 'class-validator';

export class GetExperiencesQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
