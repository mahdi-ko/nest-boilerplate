import { IsEnum, IsOptional, IsString } from 'class-validator';

enum userSortByEnum {
  id = 'id',
  username = 'username',
  email = 'email',
  phone = 'phone',
  premiumStart = 'premiumStart',
  premiumEnd = 'premiumEnd',
  dateOfBirth = 'dateOfBirth',
}
enum SortOrder {
  asc,
  desc,
}

export class GetUsersQueryDto {
  @IsOptional()
  @IsEnum(userSortByEnum, {
    message:
      'sortBy must be in:id,username,email,phone,premiumStart,premiumEnd or dateOfBirth',
  })
  sortBy?: userSortByEnum;

  @IsOptional()
  @IsEnum(SortOrder, {
    message: 'sortOrder must be in asc or desc',
  })
  sortOrder?: SortOrder;

  @IsOptional()
  @IsString()
  search?: string;
}
