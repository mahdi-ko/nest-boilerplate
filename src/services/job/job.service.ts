import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Job, Prisma } from '@prisma/client';

import {
  GetFeaturedJobsQueryDto,
  GetJobsQueryDto,
} from '~/src/controllers/rest/job/dto/getJobs.dto';
import { PaginationInput } from '~/src/core/utils/commonTypes/pagination.types';
import { deleteFile } from '~/src/core/utils/helpers/deleteFile.utils';
import { getPaginatedResponse } from '~/src/core/utils/helpers/getPaginatedResponse.utils';
import { getRandom } from '~/src/core/utils/helpers/getRandom.utils';
import { postedDateEnumToDate } from '~/src/core/utils/helpers/postedDateEnumToDate.utils';

import { PrismaService } from '../../infrastructure/prisma.service';
import { CreateJobInput, UpdateJobInput } from './types/inputs';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async getJobs(pagination: PaginationInput, params: GetJobsQueryDto) {
    const { page, ...args } = pagination;
    const { search, type, postedDateEnum } = params;

    const where: Prisma.JobWhereInput = {
      type,
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),
      ...(postedDateEnum && {
        createdAt: { gte: postedDateEnumToDate(postedDateEnum) },
      }),
    };
    const wherePremium: Prisma.JobWhereInput = {
      type,
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),
    };

    const [normal, premiumResult, total] = await this.prisma.$transaction([
      this.prisma.job.findMany({
        ...args,
        where,
        include: {
          publisher: {
            select: {
              id: true,
              username: true,
              profilePicPath: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.job.findMany({
        where: wherePremium,
        include: {
          publisher: {
            select: {
              id: true,
              username: true,
              profilePicPath: true,
            },
          },
        },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.job.count({ where }),
    ]);

    const premium = getRandom(premiumResult, 5);

    return getPaginatedResponse({
      data: {
        normal,
        premium,
      },
      take: args.take,
      page,
      total,
    });
  }

  async getFeaturedJobs(params: GetFeaturedJobsQueryDto) {
    const { search, type } = params;
    const where: Prisma.JobWhereInput = {
      type,
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),
    };
    return this.prisma.job.findMany({
      where,
      include: {
        publisher: {
          select: {
            id: true,
            username: true,
            profilePicPath: true,
          },
        },
      },
      take: 5,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getJob(jobId: number): Promise<Job> {
    return this.prisma.job.findUnique({
      where: { id: jobId },
    });
  }

  async createJob(userId: number, data: CreateJobInput): Promise<Job> {
    return this.prisma.job.create({ data: { ...data, publisherId: userId } });
  }

  async updateJob(
    userId: number,
    jobId: number,
    data: UpdateJobInput,
  ): Promise<Job> {
    // delete the previous image
    if (data.filePath) {
      const job = await this.prisma.job.findUnique({
        where: { id: jobId },
      });
      if (job.publisherId !== userId)
        throw new BadRequestException('You are not allowed to delete this job');

      deleteFile(job.filePath);
    }
    return this.prisma.job.update({
      where: { id: jobId },
      data,
    });
  }

  async deleteJob(userId: number, jobId: number): Promise<Job> {
    // check if the user is the publisher
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });
    if (!job) throw new NotFoundException('Job not found');
    if (job.publisherId !== userId)
      throw new BadRequestException('You are not allowed to delete this job');

    await this.prisma.job.delete({
      where: { id: jobId },
    });
    // remove the image
    if (job.filePath) deleteFile(job.filePath);

    return job;
  }
}
