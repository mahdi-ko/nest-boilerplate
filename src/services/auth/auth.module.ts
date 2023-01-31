import { Module } from '@nestjs/common';

import { AuthService } from '~/src/services/auth/auth.service';

import { PrismaModule } from '../../infrastructure/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
