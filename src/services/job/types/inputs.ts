import { CurrencyEnum, JobTimeEnum, JobTypeEnum } from '@prisma/client';

export type CreateJobInput = {
  title: string;
  filePath?: string;
  salary?: number;
  description?: string;
  city?: string;
  address?: string;
  currency: CurrencyEnum;
  type: JobTypeEnum;
  time: JobTimeEnum;
};

export type UpdateJobInput = {
  title?: string;
  filePath?: string;
  salary?: number;
  description?: string;
  city?: string;
  address?: string;
  currency?: CurrencyEnum;
  type?: JobTypeEnum;
  time?: JobTimeEnum;
};
