import { Country, CurrencyEnum, Region } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { Category } from '../../category/dto/category.model';
import { FileObject } from '../../file/types/file.model';

export type ServiceObject = {
  id: number;
  createdAt: Date;
  title: string;
  price: number | Decimal;
  description: string;
  city: string;
  address: string;
  currency: CurrencyEnum;
  categoryId: number;
  countryId: number;
  regionId: number;
  files: FileObject[];
};

export type ServiceObjectFull = ServiceObject & {
  country: Country;
  category: Category;
  region: Region;
  publisher: {
    id: number;
    isPremium: boolean;
    username: string;
    profilePicPath: string | null;
  };
};
