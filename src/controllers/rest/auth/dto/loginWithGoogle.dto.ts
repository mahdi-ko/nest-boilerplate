import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithGoogleDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
