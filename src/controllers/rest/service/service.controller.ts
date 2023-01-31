import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AuthUser } from '~/src/core/decorators/authUser.decorator';
import { Pagination } from '~/src/core/decorators/pagination.decorator';
import { Roles } from '~/src/core/decorators/roles.decorator';
import {
  GetPaginateResponse,
  PaginationInput,
} from '~/src/core/utils/commonTypes/pagination.types';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { multerOptions } from '~/src/core/utils/helpers/multerOptions.utils';
import { ServiceService } from '~/src/services/service/service.service';

import { CreateServiceDto } from './dto/addService.dto';
import {
  GetFeaturedServicesQueryDto,
  GetServicesQueryDto,
} from './dto/getServices.dto';
import { ServiceObject, ServiceObjectFull } from './dto/service.model';
import { UpdateServiceDto } from './dto/updateService.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  /**
   *for params and response explanation
   *@see [Pagination] at (src\core\decorators\pagination.decorator.ts)
   */

  @Get()
  getServices(
    @Query() params: GetServicesQueryDto,
    @Pagination() paginationInput: PaginationInput,
  ): GetPaginateResponse<{
    normal: ServiceObjectFull[];
    premium: ServiceObjectFull[];
  }> {
    return this.serviceService.getServices(paginationInput, params);
  }

  @Get('featured')
  getFeaturedServices(
    @Query() params: GetFeaturedServicesQueryDto,
  ): Promise<ServiceObjectFull[]> {
    return this.serviceService.getFeaturedServices(params);
  }

  @Get('/:serviceId')
  async getService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ): Promise<ServiceObject> {
    return this.serviceService.getService(serviceId);
  }
  @Roles('ADMIN', 'MEMBER')
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, multerOptions('./public/images/services')),
  )
  addService(
    @Body() input: CreateServiceDto,
    @AuthUser() { id }: TokenUser,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<ServiceObject> {
    const filesPaths = files?.map((file) => file.path.replace('public', ''));
    return this.serviceService.createService(id, { ...input, filesPaths });
  }

  @Roles('ADMIN', 'MEMBER')
  @Put('/:serviceId')
  @UseInterceptors(
    FilesInterceptor('files', 5, multerOptions('./public/images/services')),
  )
  updateService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Body() input: UpdateServiceDto,
    @AuthUser() { id }: TokenUser,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<ServiceObject> {
    const filesPaths = files?.map((file) => file.path.replace('public', ''));
    return this.serviceService.updateService(id, serviceId, {
      ...input,
      filesPaths,
    });
  }

  @Roles('ADMIN', 'MEMBER')
  @Delete('/:serviceId')
  deleteService(
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @AuthUser() { id }: TokenUser,
  ): Promise<ServiceObject> {
    return this.serviceService.deleteService(id, serviceId);
  }
}
