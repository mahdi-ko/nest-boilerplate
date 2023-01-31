import {
  ConditionEnum,
  CurrencyEnum,
  PropertyTypeEnum,
  SaleTypeEnum,
} from '@prisma/client';

export type CreateRealEstateInput = {
  title: string;
  price: number;
  phone: string;
  description: string;
  currency: CurrencyEnum;
  condition: ConditionEnum;
  saleType: SaleTypeEnum;
  propertyType: PropertyTypeEnum;
  amenityId: number;
  size?: number;
  filesPaths?: string[];
  city?: string;
  bathrooms?: number;
  bedrooms?: number;
  furnished?: boolean;
  floor?: number;
};

export type UpdateRealEstateInput = {
  title?: string;
  price?: number;
  phone?: string;
  description?: string;
  currency?: CurrencyEnum;
  condition?: ConditionEnum;
  saleType?: SaleTypeEnum;
  propertyType?: PropertyTypeEnum;
  amenityId?: number;
  size?: number;
  filesPaths?: string[];
  city?: string;
  bathrooms?: number;
  bedrooms?: number;
  furnished?: boolean;
  floor?: number;
  premiumStart?: Date;
  premiumEnd?: Date;
};
