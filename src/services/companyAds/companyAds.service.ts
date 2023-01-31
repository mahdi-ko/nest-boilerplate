import { Injectable } from '@nestjs/common';
import { CompanyAd, Prisma } from '@prisma/client';

import { GetCompanyAdsQueryDto } from '~/src/controllers/rest/companyAds/dto/getCompanyAds.dto';
import { PaginationInput } from '~/src/core/utils/commonTypes/pagination.types';
import { deleteResponse } from '~/src/core/utils/commonTypes/response.types';
import { deleteFile } from '~/src/core/utils/helpers/deleteFile.utils';
import { getPaginatedResponse } from '~/src/core/utils/helpers/getPaginatedResponse.utils';

import { PrismaService } from '../../infrastructure/prisma.service';
import { CreateCompanyAddInput, UpdateCompanyAddInput } from './types/inputs';

@Injectable()
export class CompanyAdsService {
  constructor(private prisma: PrismaService) {}

  async getCompanyAds(
    pagination: PaginationInput,
    params: GetCompanyAdsQueryDto,
  ) {
    const { page, ...args } = pagination;
    const { sortBy, sortOrder, search } = params;

    const orderBy: Prisma.CompanyAdOrderByWithRelationInput = sortBy
      ? { [sortBy]: sortOrder || 'asc' }
      : { createdAt: 'desc' };
    const where: Prisma.CompanyAdWhereInput = {
      ...(search && {
        OR: [
          !isNaN(+search) ? { id: { equals: +search } } : {},
          { name: { contains: search } },
          { website: { contains: search } },
        ],
      }),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.companyAd.findMany({
        ...args,
        where,
        orderBy,
      }),
      this.prisma.companyAd.count({ where }),
    ]);

    return getPaginatedResponse({ data, take: args.take, page, total });
  }

  async getActiveCompanyAds() {
    return this.prisma.companyAd.findMany({
      where: { active: true },
    });
  }

  async getCompanyAd(companyAdId: number): Promise<CompanyAd> {
    return this.prisma.companyAd.findUnique({
      where: { id: companyAdId },
    });
  }

  async createCompanyAd(data: CreateCompanyAddInput): Promise<CompanyAd> {
    return this.prisma.companyAd.create({ data });
  }

  async updateCompanyAd(
    companyAdId: number,
    data: UpdateCompanyAddInput,
  ): Promise<CompanyAd> {
    // delete the previous image
    if (data.imagePath) {
      const { imagePath } = await this.prisma.companyAd.findUnique({
        where: { id: companyAdId },
      });

      deleteFile(imagePath);
    }
    return this.prisma.companyAd.update({
      where: { id: companyAdId },
      data,
    });
  }

  async deleteCompanyAd(companyAdId: number): Promise<CompanyAd> {
    const companyAd = await this.prisma.companyAd.delete({
      where: { id: companyAdId },
    });
    // remove the image
    deleteFile(companyAd.imagePath);

    return companyAd;
  }

  async clearCompanyAds(): deleteResponse {
    // remove the images
    const companyAds = await this.prisma.companyAd.findMany();

    companyAds.forEach((companyAd) => {
      deleteFile(companyAd.imagePath);
    });

    return this.prisma.companyAd.deleteMany();
  }
}
