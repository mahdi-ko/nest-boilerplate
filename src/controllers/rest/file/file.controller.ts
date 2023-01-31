import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';

import { AuthUser } from '~/src/core/decorators/authUser.decorator';
import { Roles } from '~/src/core/decorators/roles.decorator';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { FileService } from '~/src/services/file/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Roles('ADMIN', 'MEMBER')
  @Delete(':fileId')
  deleteFile(
    @AuthUser() { id }: TokenUser,
    @Param('fileId', ParseIntPipe) fileId: number,
  ) {
    return this.fileService.deleteFile(id, fileId);
  }
}
