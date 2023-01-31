import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, RoleEnum } from '@prisma/client';

import {
  GetFeaturedRealEstatesQueryDto,
  GetRealEstatesQueryDto,
} from '~/src/controllers/rest/realEstate/dto/getRealEstates.dto';
import { PaginationInput } from '~/src/core/utils/commonTypes/pagination.types';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { deleteFile } from '~/src/core/utils/helpers/deleteFile.utils';
import { getPaginatedResponse } from '~/src/core/utils/helpers/getPaginatedResponse.utils';
import { getRandom } from '~/src/core/utils/helpers/getRandom.utils';
import { postedDateEnumToDate } from '~/src/core/utils/helpers/postedDateEnumToDate.utils';

import { PrismaService } from '../../infrastructure/prisma.service';
import { isPremiumFromDate } from '../user/utils/isPremiumFromDate.utils';
import { CreateRealEstateInput, UpdateRealEstateInput } from './types/inputs';

@Injectable()
export class RealEstateService {
  constructor(private readonly prisma: PrismaService) {}

  async getRealEstates(
    pagination: PaginationInput,
    params: GetRealEstatesQueryDto,
  ) {
    const { page, ...args } = pagination;
    const {
      search,
      postedDateEnum,
      sortBy,
      sortOrder,
      amenityId,
      bathrooms,
      bedrooms,
      condition,
      floor,
      furnished,
      maxPrice,
      maxSize,
      minPrice,
      minSize,
      propertyType,
      saleType,
    } = params;

    console.log('params', minSize, maxSize);

    const orderBy: Prisma.RealEstateOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || 'asc' }
      : { createdAt: 'desc' };
    const where: Prisma.RealEstateWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),

      ...(postedDateEnum && {
        createdAt: { gte: postedDateEnumToDate(postedDateEnum) },
      }),
      ...(amenityId && { amenityId }),
      ...(bathrooms && { bathrooms }),
      ...(bedrooms && { bedrooms }),
      ...(condition && { condition }),
      ...(floor && { floor }),
      ...(furnished && { furnished }),
      ...((minPrice || maxPrice) && {
        price: { gte: minPrice, lte: maxPrice },
      }),
      ...((minSize || maxSize) && {
        size: { gte: minSize, lte: maxSize },
      }),
      ...(propertyType && { propertyType }),
      ...(saleType && { saleType }),
    };

    const wherePremium: Prisma.RealEstateWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),
    };

    const [normal, premiumResult, total] = await this.prisma.$transaction([
      this.prisma.realEstate.findMany({
        ...args,
        where,
        include: {
          files: true,
          amenity: true,
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
      this.prisma.realEstate.findMany({
        where: wherePremium,
        include: {
          amenity: true,
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
      }),
      this.prisma.realEstate.count({ where }),
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
  async getFeaturedRealEstates(params: GetFeaturedRealEstatesQueryDto) {
    const { search } = params;
    const where: Prisma.RealEstateWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search }, city: { contains: search } },
        ],
      }),
    };

    return this.prisma.realEstate.findMany({
      where,
      include: {
        amenity: true,
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

  async getRealEstate(realEstateId: number) {
    return this.prisma.realEstate.findUnique({
      where: { id: realEstateId },
      include: { files: true },
    });
  }

  async createRealEstate(userId: number, data: CreateRealEstateInput) {
    const { filesPaths, ...args } = data;

    return this.prisma.realEstate.create({
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

  async updateRealEstate(
    user: TokenUser,
    realEstateId: number,
    data: UpdateRealEstateInput,
  ) {
    const isAdmin = user.role === RoleEnum.ADMIN;
    const { filesPaths, premiumStart, premiumEnd, ...args } = data;
    // check if the realEstate belongs to the user
    const realEstate = await this.prisma.realEstate.findUnique({
      where: { id: realEstateId },
      include: { files: true },
    });
    if (realEstate.publisherId !== user.id && !isAdmin)
      throw new BadRequestException(
        'You are not allowed to update this realEstate',
      );
    if (filesPaths && filesPaths.length + realEstate.files.length > 5) {
      for (const file of filesPaths) deleteFile(file);
      throw new BadRequestException('You can not have more than 5 files');
    }

    const isPremium = isPremiumFromDate(
      premiumStart ?? realEstate.premiumStart,
      premiumEnd ?? realEstate.premiumEnd,
    );

    return this.prisma.realEstate.update({
      where: { id: realEstateId },
      data: {
        ...args,
        ...(filesPaths && {
          files: {
            createMany: { data: filesPaths.map((path) => ({ path })) },
          },
        }),
        ...(isAdmin && { isPremium, premiumStart, premiumEnd }),
      },
      include: { files: true },
    });
  }

  async deleteRealEstate(userId: number, realEstateId: number) {
    // check if the realEstate belongs to the user
    const realEstate = await this.prisma.realEstate.findUnique({
      where: { id: realEstateId },
      include: { files: true },
    });
    if (!realEstate) throw new NotFoundException('RealEstate not found');
    if (realEstate.publisherId !== userId)
      throw new BadRequestException(
        'You are not allowed to delete this realEstate',
      );

    await this.prisma.realEstate.delete({
      where: { id: realEstateId },
      include: { files: true },
    });
    // remove the image
    if (realEstate.files) {
      realEstate.files.forEach((file) => {
        deleteFile(file.path);
      });
    }
    await this.prisma.file.deleteMany({
      where: { realEstateId },
    });

    return realEstate;
  }

  async updateRealEstatesPremium() {
    const now = new Date();
    await this.prisma.realEstate.updateMany({
      where: {
        premiumStart: { lt: now },
        premiumEnd: { gt: now },
        isPremium: false,
      },
      data: { isPremium: true },
    });

    await this.prisma.realEstate.updateMany({
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
