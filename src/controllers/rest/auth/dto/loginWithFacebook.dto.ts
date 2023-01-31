import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithFacebookDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  userName: string;
}
