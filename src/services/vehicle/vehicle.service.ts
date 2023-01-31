import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, RoleEnum } from '@prisma/client';

import {
  GetFeaturedVehiclesQueryDto,
  GetVehiclesQueryDto,
} from '~/src/controllers/rest/vehicle/dto/getVehicles.dto';
import { PaginationInput } from '~/src/core/utils/commonTypes/pagination.types';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { deleteFile } from '~/src/core/utils/helpers/deleteFile.utils';
import { getPaginatedResponse } from '~/src/core/utils/helpers/getPaginatedResponse.utils';
import { getRandom } from '~/src/core/utils/helpers/getRandom.utils';
import { postedDateEnumToDate } from '~/src/core/utils/helpers/postedDateEnumToDate.utils';

import { PrismaService } from '../../infrastructure/prisma.service';
import { isPremiumFromDate } from '../user/utils/isPremiumFromDate.utils';
import { CreateVehicleInput, UpdateVehicleInput } from './types/inputs';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}

  async getVehicles(pagination: PaginationInput, params: GetVehiclesQueryDto) {
    const { page, ...args } = pagination;
    const {
      search,
      postedDateEnum,
      sortBy,
      sortOrder,
      condition,
      maxPrice,
      minPrice,
      minKilometers,
      maxKilometers,
      color,
      transmission,
      year,
    } = params;

    const orderBy: Prisma.VehicleOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || 'asc' }
      : { createdAt: 'desc' };
    const where: Prisma.VehicleWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),

      ...(postedDateEnum && {
        createdAt: { gte: postedDateEnumToDate(postedDateEnum) },
      }),
      ...(condition && { condition }),
      ...((minPrice || maxPrice) && {
        price: { gte: minPrice, lte: maxPrice },
      }),
      ...((minKilometers || maxKilometers) && {
        kilometers: {
          gte: minKilometers,
          lte: maxKilometers,
        },
      }),
      ...(color && { color }),
      ...(transmission && { transmission }),
      ...(year && { year }),
    };

    const wherePremium: Prisma.VehicleWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),
    };

    const [normal, premiumResult, total] = await this.prisma.$transaction([
      this.prisma.vehicle.findMany({
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
      this.prisma.vehicle.findMany({
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
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    const premium = getRandom(premiumResult, 3);

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
  async getFeaturedVehicles(params: GetFeaturedVehiclesQueryDto) {
    const { search } = params;
    const where: Prisma.VehicleWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),
    };

    return this.prisma.vehicle.findMany({
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
      take: 3,
    });
  }

  async getVehicle(vehicleId: number) {
    return this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { files: true },
    });
  }

  async createVehicle(userId: number, data: CreateVehicleInput) {
    const { filesPaths, ...args } = data;
    return this.prisma.vehicle.create({
      data: {
        ...args,
        publisherId: userId,
        ...(filesPaths && {
          files: {
            createMany: { data: filesPaths.map((path) => ({ path })) },
          },
        }),
      },
    });
  }

  async updateVehicle(
    user: TokenUser,
    vehicleId: number,
    data: UpdateVehicleInput,
  ) {
    const isAdmin = user.role === RoleEnum.ADMIN;

    const { filesPaths, premiumStart, premiumEnd, ...args } = data;
    // check if the vehicle belongs to the user
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { files: true },
    });
    if (vehicle.publisherId !== user.id && !isAdmin) {
      for (const file of filesPaths) deleteFile(file);
      throw new BadRequestException(
        'You are not allowed to update this vehicle',
      );
    }
    if (filesPaths && filesPaths.length + vehicle.files.length > 5) {
      for (const file of filesPaths) deleteFile(file);
      throw new BadRequestException('You can not have more than 5 files');
    }

    const isPremium = isPremiumFromDate(
      premiumStart ?? vehicle.premiumStart,
      premiumEnd ?? vehicle.premiumEnd,
    );

    return this.prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        ...args,
        ...(filesPaths && {
          files: {
            createMany: { data: filesPaths.map((path) => ({ path })) },
          },
        }),
        ...(isAdmin && { premiumStart, premiumEnd, isPremium }),
      },
      include: { files: true },
    });
  }

  async deleteVehicle(userId: number, vehicleId: number) {
    // check if the vehicle belongs to the user
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: { files: true },
    });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    if (vehicle.publisherId !== userId)
      throw new BadRequestException(
        'You are not allowed to delete this vehicle',
      );

    await this.prisma.vehicle.delete({
      where: { id: vehicleId },
      include: { files: true },
    });
    // remove the image
    if (vehicle.files) {
      vehicle.files.forEach((file) => {
        deleteFile(file.path);
      });
    }
    await this.prisma.file.deleteMany({
      where: { vehicleId },
    });

    return vehicle;
  }

  async updateVehiclesPremium() {
    const now = new Date();
    await this.prisma.vehicle.updateMany({
      where: {
        premiumStart: { lt: now },
        premiumEnd: { gt: now },
        isPremium: false,
      },
      data: { isPremium: true },
    });

    await this.prisma.vehicle.updateMany({
      where: {
        OR: [
          { premiumStart: { gt: now } },
          { premiumEnd: { lt: now } },
          { premiumStart: null },
          { premiumEnd: null },
        ],
        isPremium: true,
      },
      data: { isPremium: false },
    });
  }
}
