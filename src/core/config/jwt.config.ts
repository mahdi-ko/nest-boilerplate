import { Injectable } from '@nestjs/common';

//TODO add to env
@Injectable()
export class JwtConfig {
  accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  accessTokenExpiry = '6h';
  refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  refreshTokenExpiry = '14d';
  otherToken = process.env.OTHER_TOKEN_SECRET;
  otherTokenExpiry = '2h';
}
