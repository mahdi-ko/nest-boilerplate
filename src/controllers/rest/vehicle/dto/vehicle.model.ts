import {
  ColorEnum,
  ConditionEnum,
  Country,
  CurrencyEnum,
  Region,
  TransmissionEnum,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { Category } from '../../category/dto/category.model';
import { FileObject } from '../../file/types/file.model';

export type VehicleObject = {
  id: number;
  createdAt: Date;
  title: string;
  phone: string;
  price: number | Decimal;
  description?: string;
  kilometers?: number;
  year?: number;
  city?: string;
  condition: ConditionEnum;
  color?: ColorEnum;
  transmission?: TransmissionEnum;
  currency: CurrencyEnum;
  categoryId: number;
  countryId: number;
  regionId?: number;
  files?: FileObject[];
};

export type VehicleObjectFull = VehicleObject & {
  country: Country;
  category: Category;
  region: Region;
  publisher: {
    id: number;
    username: string;
    profilePicPath: string | null;
  };
};
