import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
