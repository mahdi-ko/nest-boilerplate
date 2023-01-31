import { CurrencyEnum } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

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
  files: FileObject[];
};

export type ServiceObjectFull = ServiceObject & {
  publisher: {
    id: number;
    isPremium: boolean;
    username: string;
    profilePicPath: string | null;
  };
};
