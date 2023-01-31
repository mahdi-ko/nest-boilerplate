import { BadRequestException, Injectable } from '@nestjs/common';
import { Experience } from '@prisma/client';

import { PrismaService } from '../../infrastructure/prisma.service';
import { CreateExperienceInput, UpdateExperienceInput } from './types/inputs';
// import { CreateExperienceInput, UpdateExperienceInput } from './types/inputs';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async getExperiences(userId: number) {
    return this.prisma.experience.findMany({
      where: { userId },
    });
  }

  async getExperience(experienceId: number): Promise<Experience> {
    return this.prisma.experience.findUnique({
      where: { id: experienceId },
    });
  }

  async createExperience(
    userId: number,
    data: CreateExperienceInput,
  ): Promise<Experience> {
    return this.prisma.experience.create({
      data: { ...data, userId },
    });
  }

  async updateExperience(
    userId: number,
    experienceId: number,
    data: UpdateExperienceInput,
  ): Promise<Experience> {
    const experience = await this.prisma.experience.findFirst({
      where: { userId, id: experienceId },
    });
    if (!experience) throw new BadRequestException('Experience not found');
    return this.prisma.experience.update({
      where: { id: experienceId },
      data,
    });
  }

  async deleteExperience(
    userId: number,
    experienceId: number,
  ): Promise<Experience> {
    const experience = await this.prisma.experience.findFirst({
      where: { userId, id: experienceId },
    });
    if (!experience) throw new BadRequestException('Experience not found');
    return this.prisma.experience.delete({
      where: { id: experienceId },
    });
  }

  async getOthersExperiences(userId: number) {
    return this.prisma.experience.findMany({
      where: { userId },
    });
  }
}
