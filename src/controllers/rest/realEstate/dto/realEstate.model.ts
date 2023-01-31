import {
  Amenity,
  ConditionEnum,
  Country,
  CurrencyEnum,
  PropertyTypeEnum,
  Region,
  SaleTypeEnum,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { Category } from '../../category/dto/category.model';
import { FileObject } from '../../file/types/file.model';

export type RealEstateObject = {
  id: number;
  createdAt: Date;
  title: string;
  price: Decimal;
  description: string;
  categoryId: number;
  countryId: number;
  currency: CurrencyEnum;
  condition: ConditionEnum;
  saleType: SaleTypeEnum;
  propertyType: PropertyTypeEnum;
  isPremium: boolean;
  phone?: string;
  amenityId: number;
  size?: number;
  files?: FileObject[];
  city?: string;
  address?: string;
  regionId?: number;
  bathrooms?: number;
  bedrooms?: number;
  furnished?: boolean;
  floor?: number;
};

export type RealEstateObjectFull = RealEstateObject & {
  country: Country;
  category: Category;
  region: Region;
  amenity: Amenity;
  publisher: {
    id: number;
    username: string;
    profilePicPath: string | null;
  };
};
