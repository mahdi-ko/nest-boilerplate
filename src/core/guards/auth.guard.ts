import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '@prisma/client';

import { verifyAccessToken } from './../../services/auth/utils/jsonwebtoken.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    // Retrieve decorators value
    const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());

    // Get http or graphql request :
    const request = context.switchToHttp().getRequest();
    const originalUrl = request.originalUrl;
    const method = request?.route?.['stack'][0].method;

    if (!roles) {
      Logger.log(`${method} ${originalUrl}`);
      return true;
    }
    const accessToken = request.headers['authorization'];
    if (!!accessToken) {
      try {
        const user = verifyAccessToken(accessToken.split(' ')[1]);

        if (!roles.includes(user.role)) {
          Logger.log(
            `${method} ${originalUrl} not authorized for role ${user.role}`,
          );
          return false;
        }
        // Allow request
        request.user = user;
        request.accessToken = accessToken;
        Logger.log(`${method} ${originalUrl} authorized`);
        return true;
      } catch (err) {
        Logger.log(`${method} ${originalUrl} unauthorized bad token`);
        Logger.log(err.message);
        throw new UnauthorizedException();
      }
    }
    Logger.log(
      `${method} ${originalUrl} the access to this resource has been forbidden`,
    );
    return false;
  }
}
