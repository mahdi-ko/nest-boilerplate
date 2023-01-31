import { IsEnum, IsOptional, IsString } from 'class-validator';

enum companyAdsSortByEnum {
  id,
  name,
  website,
  active,
}
enum SortOrder {
  asc,
  desc,
}

export class GetCompanyAdsQueryDto {
  @IsOptional()
  @IsEnum(companyAdsSortByEnum, {
    message:
      'sortBy must be in:id,username,email,phone,premiumStart,premiumEnd or dateOfBirth',
  })
  sortBy?: companyAdsSortByEnum;

  @IsOptional()
  @IsEnum(SortOrder, {
    message: 'sortOrder must be in asc or desc',
  })
  sortOrder?: SortOrder;

  @IsOptional()
  @IsString()
  search?: string;
}
