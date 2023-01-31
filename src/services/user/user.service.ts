import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';
import { getPaginatedResponse } from 'src/core/utils/helpers/getPaginatedResponse.utils';

import { GetJobsQueryDto } from '~/src/controllers/rest/job/dto/getJobs.dto';
import { CreateUserDto } from '~/src/controllers/rest/user/dto/addUser.dto';
import { GetUsersQueryDto } from '~/src/controllers/rest/user/dto/getUsers.dto';
import { UpdateSelfDto } from '~/src/controllers/rest/user/dto/updateSelf.dto';
import { UpdateUserDto } from '~/src/controllers/rest/user/dto/updateUser.dto';
import { PaginationInput } from '~/src/core/utils/commonTypes/pagination.types';
import { defaultUserSelect } from '~/src/core/utils/defaultSelect/user.utils';
import { deleteFile } from '~/src/core/utils/helpers/deleteFile.utils';

import { PrismaService } from '../../infrastructure/prisma.service';
import { hashPass } from '../auth/utils/encrypt.utils';
import { isPremiumFromDate } from './utils/isPremiumFromDate.utils';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private async _updateUser(userId: number, input: UpdateUserDto) {
    let password = input.password;
    if (password) password = await hashPass(input.password);

    return await this.prisma.user.update({
      where: { id: userId },
      data: { ...input, password },
      select: defaultUserSelect,
    });
  }

  async getUsers(pagination: PaginationInput, params: GetUsersQueryDto) {
    const { page, ...args } = pagination;
    const { sortBy, sortOrder, search } = params;

    const orderBy = sortBy ? { [sortBy]: sortOrder || 'asc' } : {};
    const where = {
      active: true,
      role: RoleEnum.MEMBER,
      ...(search && {
        OR: [
          !isNaN(+search) ? { id: { equals: +search } } : {},
          { username: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
        ],
      }),
    };

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        ...args,
        where,
        orderBy,
        select: defaultUserSelect,
      }),
      this.prisma.user.count({ where }),
    ]);

    return getPaginatedResponse({ data: users, take: args.take, page, total });
  }

  async addUser(input: CreateUserDto) {
    const isUserExist = await this.prisma.user.findFirst({
      where: { email: input.email },
      select: { id: true },
    });
    if (isUserExist) throw new BadRequestException('Email already exist');

    const password = await hashPass(input.password);

    return this.prisma.user.create({
      data: { ...input, password, active: true },
      select: defaultUserSelect,
    });
  }

  async updateUser(userId: number, input: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new BadRequestException('user does not exist');

    return this._updateUser(userId, input);
  }

  async deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
  async clearUsers() {
    return this.prisma.user.deleteMany();
  }

  async getUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getSelf(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: defaultUserSelect,
    });
  }

  async updateSelf(id: number, input: UpdateSelfDto) {
    return this._updateUser(id, input);
  }

  async updateSelfImage(id: number, imagePath: string) {
    if (!imagePath) throw new BadRequestException('Image not provided');
    const { profilePicPath } = await this.prisma.user.findUnique({
      where: { id },
    });

    deleteFile(profilePicPath);

    return this.prisma.user.update({
      where: { id },
      data: { profilePicPath: imagePath },
      select: defaultUserSelect,
    });
  }

  async getUserJobs(userId: number, input: GetJobsQueryDto) {
    return this.prisma.job.findMany({
      where: { publisherId: userId, ...input },
    });
  }

  async getUserServices(userId: number) {
    return this.prisma.service.findMany({
      where: { publisherId: userId },
      include: {
        files: true,
      },
    });
  }
}
