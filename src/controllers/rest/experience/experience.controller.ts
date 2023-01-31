import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Experience } from '@prisma/client';

import { AuthUser } from '~/src/core/decorators/authUser.decorator';
import { Roles } from '~/src/core/decorators/roles.decorator';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { ExperienceService } from '~/src/services/experience/experience.service';

import { CreateExperienceDto } from './dto/addExperience.dto';
import { UpdateExperienceDto } from './dto/updateExperience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  /**
   *for params and response explanation
   *@see [Pagination] at (src\core\decorators\pagination.decorator.ts)
   */
  @Roles('ADMIN', 'MEMBER')
  @Get()
  getExperiences(@AuthUser() { id }: TokenUser): Promise<Experience[]> {
    return this.experienceService.getExperiences(id);
  }

  @Roles('ADMIN', 'MEMBER')
  @Get('/:userId')
  async getOthersExperiences(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Experience[]> {
    return this.experienceService.getOthersExperiences(userId);
  }

  @Roles('ADMIN', 'MEMBER')
  @Post()
  addExperience(
    @Body() input: CreateExperienceDto,
    @AuthUser() { id }: TokenUser,
  ): Promise<Experience> {
    return this.experienceService.createExperience(id, input);
  }

  @Roles('ADMIN', 'MEMBER')
  @Put('/:experienceId')
  updateExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
    @Body() input: UpdateExperienceDto,
    @AuthUser() { id }: TokenUser,
  ): Promise<Experience> {
    return this.experienceService.updateExperience(id, experienceId, input);
  }

  @Roles('ADMIN', 'MEMBER')
  @Delete('/:experienceId')
  deleteExperience(
    @Param('experienceId', ParseIntPipe) experienceId: number,
    @AuthUser() { id }: TokenUser,
  ): Promise<Experience> {
    return this.experienceService.deleteExperience(id, experienceId);
  }
}
