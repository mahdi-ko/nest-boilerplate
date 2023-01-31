import {
  Amenity,
  ConditionEnum,
  CurrencyEnum,
  PropertyTypeEnum,
  SaleTypeEnum,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { FileObject } from '../../file/types/file.model';

export type RealEstateObject = {
  id: number;
  createdAt: Date;
  title: string;
  price: Decimal;
  description: string;
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
  bathrooms?: number;
  bedrooms?: number;
  furnished?: boolean;
  floor?: number;
};

export type RealEstateObjectFull = RealEstateObject & {
  amenity: Amenity;
  publisher: {
    id: number;
    username: string;
    profilePicPath: string | null;
  };
};
