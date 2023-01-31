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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Pagination } from '~/src/core/decorators/pagination.decorator';
import {
  GetPaginateResponse,
  PaginationInput,
} from '~/src/core/utils/commonTypes/pagination.types';
import { deleteResponse } from '~/src/core/utils/commonTypes/response.types';
import { multerOptions } from '~/src/core/utils/helpers/multerOptions.utils';
import { CompanyAdsService } from '~/src/services/companyAds/companyAds.service';

import { CompanyAdObject } from './dto/companyAds.model';
import {
  CreateCompanyAddDto,
  UpdateCompanyAddDto,
} from './dto/createCompanyAds.dto';
import { GetCompanyAdsQueryDto } from './dto/getCompanyAds.dto';

@Controller('companyAds')
export class CompanyAdsController {
  constructor(private readonly companyAdsService: CompanyAdsService) {}

  @Get()
  getCompanyAds(
    @Query() params: GetCompanyAdsQueryDto,
    @Pagination() paginationInput: PaginationInput,
  ): GetPaginateResponse<CompanyAdObject[]> {
    return this.companyAdsService.getCompanyAds(paginationInput, params);
  }

  @Get('/active')
  getActiveCompanyAds(): Promise<CompanyAdObject[]> {
    return this.companyAdsService.getActiveCompanyAds();
  }

  @Get('/:companyAdId')
  async getCompanyAd(
    @Param('companyAdId', ParseIntPipe) companyAdId: number,
  ): Promise<CompanyAdObject> {
    return this.companyAdsService.getCompanyAd(companyAdId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'image',
      multerOptions('./public/images/companyAds', false),
    ),
  )
  createCompanyAd(
    @UploadedFile() image: Express.Multer.File,
    @Body() input: CreateCompanyAddDto,
  ): Promise<CompanyAdObject> {
    const imagePath = image.path.replace('public', '');
    return this.companyAdsService.createCompanyAd({ ...input, imagePath });
  }

  @Put('/:companyAdId')
  @UseInterceptors(
    FileInterceptor(
      'image',
      multerOptions('./public/images/companyAds', false),
    ),
  )
  updateCompanyAd(
    @Param('companyAdId', ParseIntPipe) companyAdId: number,
    @Body() input: UpdateCompanyAddDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<CompanyAdObject> {
    const imagePath = image?.path.replace('public', '');
    return this.companyAdsService.updateCompanyAd(companyAdId, {
      ...input,
      imagePath,
    });
  }

  @Delete('/:companyAdId')
  deleteCompanyAd(
    @Param('companyAdId', ParseIntPipe) companyAdId: number,
  ): Promise<CompanyAdObject> {
    return this.companyAdsService.deleteCompanyAd(companyAdId);
  }

  @Delete('/')
  clearCompanyAds(): deleteResponse {
    return this.companyAdsService.clearCompanyAds();
  }
}
