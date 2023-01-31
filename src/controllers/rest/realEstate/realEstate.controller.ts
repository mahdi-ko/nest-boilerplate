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
import { RealEstate } from '@prisma/client';

import { AuthUser } from '~/src/core/decorators/authUser.decorator';
import { Pagination } from '~/src/core/decorators/pagination.decorator';
import { Roles } from '~/src/core/decorators/roles.decorator';
import {
  GetPaginateResponse,
  PaginationInput,
} from '~/src/core/utils/commonTypes/pagination.types';
import { TokenUser } from '~/src/core/utils/commonTypes/tokenObject.types';
import { multerOptions } from '~/src/core/utils/helpers/multerOptions.utils';
import { RealEstateService } from '~/src/services/realEstate/realEstate.service';

import { CreateRealEstateDto } from './dto/createRealEstate.dto';
import {
  GetFeaturedRealEstatesQueryDto,
  GetRealEstatesQueryDto,
} from './dto/getRealEstates.dto';
import { RealEstateObject, RealEstateObjectFull } from './dto/realEstate.model';
import { UpdateRealEstateDto } from './dto/updateRealEstate.dto';

@Controller('realEstate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  /**
   *for params and response explanation
   *@see [Pagination] at (src\core\decorators\pagination.decorator.ts)
   */

  @Get()
  getRealEstates(
    @Query() params: GetRealEstatesQueryDto,
    @Pagination() paginationInput: PaginationInput,
  ): GetPaginateResponse<{
    normal: RealEstateObjectFull[];
    premium: RealEstateObjectFull[];
  }> {
    return this.realEstateService.getRealEstates(paginationInput, params);
  }

  @Get('featured')
  getFeaturedRealEstates(
    @Query() params: GetFeaturedRealEstatesQueryDto,
  ): Promise<RealEstateObjectFull[]> {
    return this.realEstateService.getFeaturedRealEstates(params);
  }

  @Get('/:realEstateId')
  async getRealEstate(
    @Param('realEstateId', ParseIntPipe) realEstateId: number,
  ): Promise<RealEstateObject> {
    return this.realEstateService.getRealEstate(realEstateId);
  }

  @Roles('ADMIN', 'MEMBER')
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, multerOptions('./public/images/realEstates')),
  )
  addRealEstate(
    @Body() input: CreateRealEstateDto,
    @AuthUser() { id }: TokenUser,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<RealEstate> {
    const filesPaths = files?.map((file) => file.path.replace('public', ''));
    return this.realEstateService.createRealEstate(id, {
      ...input,
      filesPaths,
    });
  }

  @Roles('ADMIN', 'MEMBER')
  @Put('/:realEstateId')
  @UseInterceptors(
    FilesInterceptor('files', 5, multerOptions('./public/images/realEstates')),
  )
  updateRealEstate(
    @Param('realEstateId', ParseIntPipe) realEstateId: number,
    @Body() input: UpdateRealEstateDto,
    @AuthUser() user: TokenUser,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<RealEstateObject> {
    const filesPaths = files?.map((file) => file.path.replace('public', ''));
    return this.realEstateService.updateRealEstate(user, realEstateId, {
      ...input,
      filesPaths,
    });
  }

  @Roles('ADMIN', 'MEMBER')
  @Delete('/:realEstateId')
  deleteRealEstate(
    @Param('realEstateId', ParseIntPipe) realEstateId: number,
    @AuthUser() { id }: TokenUser,
  ): Promise<RealEstateObject> {
    return this.realEstateService.deleteRealEstate(id, realEstateId);
  }
}
