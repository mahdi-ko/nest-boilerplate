import {
  ColorEnum,
  ConditionEnum,
  CurrencyEnum,
  TransmissionEnum,
} from '@prisma/client';

export type CreateVehicleInput = {
  title: string;
  phone: string;
  price: number;
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
  filesPaths?: string[];
};

export type UpdateVehicleInput = {
  title?: string;
  phone?: string;
  price?: number;
  description?: string;
  kilometers?: number;
  year?: number;
  city?: string;
  condition?: ConditionEnum;
  color?: ColorEnum;
  transmission?: TransmissionEnum;
  currency?: CurrencyEnum;
  categoryId?: number;
  countryId?: number;
  regionId?: number;
  filesPaths?: string[];
  premiumStart?: Date;
  premiumEnd?: Date;
};
