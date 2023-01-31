import { GenderEnum, RoleEnum } from '@prisma/client';

export type UserObject = {
  id: number;
  createdAt: Date;
  email: string;
  username: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  profilePicPath?: string;
  role?: RoleEnum;
  gender?: GenderEnum;
};
