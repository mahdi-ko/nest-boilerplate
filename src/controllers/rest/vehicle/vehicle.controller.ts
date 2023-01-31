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
import { Vehicle } from '@prisma/client';

import { AuthUser } from '~/src/core/decorators/authUser.decorator';
import { Pagination } from '~/src/core/decorators/pagination.decorator';
import { Roles } from '~/src/core/decorators/roles.decorator';
import {
  GetPaginateResponse,
  PaginationInput,
} from '~/src/core/utils/commonTypes/pagination.types';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { multerOptions } from '~/src/core/utils/helpers/multerOptions.utils';
import { VehicleService } from '~/src/services/vehicle/vehicle.service';

import { CreateVehicleDto } from './dto/createVehicle.dto';
import {
  GetFeaturedVehiclesQueryDto,
  GetVehiclesQueryDto,
} from './dto/getVehicles.dto';
import { UpdateVehicleDto } from './dto/updateVehicle.dto';
import { VehicleObject, VehicleObjectFull } from './dto/vehicle.model';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  /**
   *for params and response explanation
   *@see [Pagination] at (src\core\decorators\pagination.decorator.ts)
   */

  @Get()
  getVehicles(
    @Query() params: GetVehiclesQueryDto,
    @Pagination() paginationInput: PaginationInput,
  ): GetPaginateResponse<{
    normal: VehicleObjectFull[];
    premium: VehicleObjectFull[];
  }> {
    return this.vehicleService.getVehicles(paginationInput, params);
  }

  @Get('featured')
  getFeaturedVehicles(
    @Query() params: GetFeaturedVehiclesQueryDto,
  ): Promise<VehicleObjectFull[]> {
    return this.vehicleService.getFeaturedVehicles(params);
  }

  @Get('/:vehicleId')
  async getVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ): Promise<VehicleObject> {
    return this.vehicleService.getVehicle(vehicleId);
  }

  @Roles('ADMIN', 'MEMBER')
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, multerOptions('./public/images/vehicles')),
  )
  addVehicle(
    @Body() input: CreateVehicleDto,
    @AuthUser() { id }: TokenUser,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<Vehicle> {
    const filesPaths = files?.map((file) => file.path.replace('public', ''));
    return this.vehicleService.createVehicle(id, {
      ...input,
      filesPaths,
    });
  }

  @Roles('ADMIN', 'MEMBER')
  @Put('/:vehicleId')
  @UseInterceptors(
    FilesInterceptor('files', 5, multerOptions('./public/images/vehicles')),
  )
  updateVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() input: UpdateVehicleDto,
    @AuthUser() user: TokenUser,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<VehicleObject> {
    const filesPaths = files?.map((file) => file.path.replace('public', ''));
    return this.vehicleService.updateVehicle(user, vehicleId, {
      ...input,
      filesPaths,
    });
  }

  @Roles('ADMIN', 'MEMBER')
  @Delete('/:vehicleId')
  deleteVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @AuthUser() { id }: TokenUser,
  ): Promise<VehicleObject> {
    return this.vehicleService.deleteVehicle(id, vehicleId);
  }
}
