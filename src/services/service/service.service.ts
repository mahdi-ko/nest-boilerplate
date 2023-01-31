import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  GetFeaturedServicesQueryDto,
  GetServicesQueryDto,
} from '~/src/controllers/rest/service/dto/getServices.dto';
import { PaginationInput } from '~/src/core/utils/commonTypes/pagination.types';
import { deleteFile } from '~/src/core/utils/helpers/deleteFile.utils';
import { getPaginatedResponse } from '~/src/core/utils/helpers/getPaginatedResponse.utils';
import { getRandom } from '~/src/core/utils/helpers/getRandom.utils';
import { postedDateEnumToDate } from '~/src/core/utils/helpers/postedDateEnumToDate.utils';

import { PrismaService } from '../../infrastructure/prisma.service';
import { CreateServiceInput, UpdateServiceInput } from './types/inputs';
// import { CreateServiceInput, UpdateServiceInput } from './types/inputs';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async getServices(pagination: PaginationInput, params: GetServicesQueryDto) {
    const { page, ...args } = pagination;
    const {
      search,

      postedDateEnum,
      sortBy,
      sortOrder,
    } = params;
    const orderBy: Prisma.ServiceOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || 'asc' }
      : { createdAt: 'desc' };
    const where: Prisma.JobWhereInput = {
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

    const wherePremium: Prisma.ServiceWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      }),
    };

    const [normal, premiumResult, total] = await this.prisma.$transaction([
      this.prisma.service.findMany({
        ...args,
        where,
        include: {
          files: true,
          publisher: {
            select: {
              id: true,
              username: true,
              profilePicPath: true,
            },
          },
        },
        orderBy,
      }),
      this.prisma.service.findMany({
        where: wherePremium,
        include: {
          files: true,
          publisher: {
            select: {
              id: true,
              username: true,
              profilePicPath: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      this.prisma.service.count({ where }),
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

  async getFeaturedServices(params: GetFeaturedServicesQueryDto) {
    const { search } = params;
    const where: Prisma.ServiceWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      }),
    };

    return this.prisma.service.findMany({
      where,
      include: {
        files: true,
        publisher: {
          select: {
            id: true,
            username: true,
            profilePicPath: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }

  async getService(serviceId: number) {
    return this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { files: true },
    });
  }

  async createService(userId: number, data: CreateServiceInput) {
    const { filesPaths, ...args } = data;

    // check if the service belongs to the user

    return this.prisma.service.create({
      data: {
        ...args,
        publisherId: userId,
        ...(filesPaths && {
          files: {
            createMany: { data: filesPaths.map((path) => ({ path })) },
          },
        }),
      },
      include: { files: true },
    });
  }

  async updateService(
    userId: number,
    serviceId: number,
    data: UpdateServiceInput,
  ) {
    const { filesPaths, ...args } = data;
    // check if the service belongs to the user
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { files: true },
    });
    if (service.publisherId !== userId)
      throw new BadRequestException(
        'You are not allowed to update this service',
      );
    if (filesPaths && filesPaths.length + service.files.length > 5) {
      for (const file of filesPaths) deleteFile(file);
      throw new BadRequestException('You can not have more than 5 files');
    }
    return this.prisma.service.update({
      where: { id: serviceId },
      data: {
        ...args,
        ...(filesPaths && {
          files: {
            createMany: { data: filesPaths.map((path) => ({ path })) },
          },
        }),
      },
      include: { files: true },
    });
  }

  async deleteService(userId: number, serviceId: number) {
    // check if the service belongs to the user
    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
      include: { files: true },
    });
    if (!service) throw new NotFoundException('Service not found');
    if (service.publisherId !== userId)
      throw new BadRequestException(
        'You are not allowed to delete this service',
      );

    await this.prisma.service.delete({
      where: { id: serviceId },
      include: { files: true },
    });
    // remove the image
    if (service.files) {
      service.files.forEach((file) => {
        deleteFile(file.path);
      });
    }
    await this.prisma.file.deleteMany({
      where: { serviceId },
    });

    return service;
  }
}
