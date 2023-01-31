import { Category } from './category.model';

export type GetCategoriesType = Promise<{
  jobCategories: Category[];
  serviceCategories: Category[];
  vehicleCategories: Category[];
  realEstateCategories: Category[];
}>;
