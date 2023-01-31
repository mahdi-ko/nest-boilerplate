import { BadRequestException, Injectable } from '@nestjs/common';

import { deleteFile } from '~/src/core/utils/helpers/deleteFile.utils';

import { PrismaService } from '../../infrastructure/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteFile(userId: number, fileId: number) {
    //check if file is owned by user
    const file = await this.prisma.file.findUnique({
      where: {
        id: fileId,
      },
      select: {
        id: true,
        path: true,
        realEstate: { select: { publisherId: true } },
        service: { select: { publisherId: true } },
        vehicle: { select: { publisherId: true } },
      },
    });
    if (!file) throw new BadRequestException('File not found');

    if (
      file.realEstate?.publisherId !== userId &&
      file.service?.publisherId !== userId &&
      file.vehicle?.publisherId !== userId
    )
      throw new BadRequestException('You are not allowed to delete this file');

    const deletedFile = await this.prisma.file.delete({
      where: {
        id: fileId,
      },
    });
    deleteFile(file.path);
    return deletedFile;
  }
}
