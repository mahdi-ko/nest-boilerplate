import { BadRequestException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { JwtConfig } from '~/src/core/config/jwt.config';

import { TokenUser } from './../../../core/utils/commonTypes/tokenObject.types';

const jwtConfig = new JwtConfig();

export const signAccessToken = (user: TokenUser) => {
  return sign(user, jwtConfig.accessTokenSecret, {
    expiresIn: jwtConfig.accessTokenExpiry,
  });
};

export const signOtherToken = (user: TokenUser) => {
  return sign(user, jwtConfig.otherToken, {
    expiresIn: jwtConfig.accessTokenExpiry,
  });
};

export const signRefreshToken = (user: TokenUser) => {
  return sign(user, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenExpiry,
  });
};

const verifyToken = (token: string, secret: string) => {
  try {
    return verify(token, secret) as TokenUser;
  } catch {
    throw new BadRequestException('Token is not valid');
  }
};

export const verifyAccessToken = (token: string) => {
  return verifyToken(token, jwtConfig.accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
  return verifyToken(token, jwtConfig.refreshTokenSecret);
};

export const verifyOtherToken = (token: string) => {
  return verifyToken(token, jwtConfig.otherToken);
};
