import { RoleEnum } from '@prisma/client';

export type TokenUser = {
  id: number;
  role: RoleEnum;
};
