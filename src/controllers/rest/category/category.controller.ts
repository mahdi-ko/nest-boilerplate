//This file is to be splitted in case more requests are made for individual categories
import { Controller, Get } from '@nestjs/common';
import {
  Amenity,
  JobCategory,
  RealEstateCategory,
  ServiceCategory,
  VehicleCategory,
} from '@prisma/client';

import { CategoryService } from '~/src/services/category/category.service';

import { GetCategoriesType } from './dto/response';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getAllCategories(): GetCategoriesType {
    return this.categoryService.getAllCategories();
  }

  @Get('job')
  getJobCategories(): Promise<JobCategory[]> {
    return this.categoryService.getJobCategories();
  }

  @Get('realEstate')
  getRealEstateCategories(): Promise<RealEstateCategory[]> {
    return this.categoryService.getRealEstateCategories();
  }

  @Get('service')
  getServiceCategories(): Promise<ServiceCategory[]> {
    return this.categoryService.getServiceCategories();
  }

  @Get('vehicle')
  getVehicleCategories(): Promise<VehicleCategory[]> {
    return this.categoryService.getVehicleCategories();
  }

  @Get('amenity')
  getAmenities(): Promise<Amenity[]> {
    return this.categoryService.getAmenities();
  }
}
