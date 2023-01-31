import {
  Country,
  CurrencyEnum,
  JobTimeEnum,
  JobTypeEnum,
  Prisma,
  Region,
} from '@prisma/client';

import { Category } from '../../category/dto/category.model';

export type JobObject = {
  id: number;
  createdAt: Date;
  title: string;
  salary?: number | Prisma.Decimal;
  description?: string;
  filePath?: string;
  city?: string;
  address?: string;
  currency: CurrencyEnum;
  type: JobTypeEnum;
  time: JobTimeEnum;
  category: Category;
  country: Country;
  region: Region;
  publisher: {
    id: number;
    isPremium: boolean;
    username: string;
    profilePicPath: string | null;
  };
};
