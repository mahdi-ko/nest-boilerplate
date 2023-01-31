import { CurrencyEnum, JobTimeEnum, JobTypeEnum, Prisma } from '@prisma/client';

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
  publisher: {
    id: number;
    isPremium: boolean;
    username: string;
    profilePicPath: string | null;
  };
};
