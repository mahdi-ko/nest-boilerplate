import { Body, Controller, Get } from '@nestjs/common';

import { PrismaService } from '~/src/infrastructure/prisma.service';
import { UserService } from '~/src/services/user/user.service';

@Controller('playground')
export class PlaygroundController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('test')
  test(@Body() body: unknown) {
    return 'ok';
  }
}
