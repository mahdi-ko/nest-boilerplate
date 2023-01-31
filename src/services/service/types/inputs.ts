import { CurrencyEnum } from '@prisma/client';

export type CreateServiceInput = {
  title: string;
  price?: number;
  description?: string;
  filesPaths?: string[];
  city?: string;
  address?: string;
  currency: CurrencyEnum;
  categoryId: number;
  countryId: number;
  regionId?: number;
};

export type UpdateServiceInput = {
  title?: string;
  price?: number;
  description?: string;
  filesPaths?: string[];
  city?: string;
  address?: string;
  currency?: CurrencyEnum;
  categoryId?: number;
  countryId?: number;
  regionId?: number;
};
