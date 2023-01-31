import {
  ColorEnum,
  ConditionEnum,
  CurrencyEnum,
  TransmissionEnum,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

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
  files?: FileObject[];
};

export type VehicleObjectFull = VehicleObject & {
  publisher: {
    id: number;
    username: string;
    profilePicPath: string | null;
  };
};
