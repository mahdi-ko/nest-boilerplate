import { GenderEnum, RoleEnum } from '@prisma/client';

export type UserObject = {
  id: number;
  createdAt: Date;
  email: string;
  username: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  website?: string;
  bio?: string;
  profilePicPath?: string;
  cvPath?: string;
  school?: string;
  degree?: string;
  studyField?: string;
  grade?: string;
  premiumStart?: Date;
  premiumEnd?: Date;
  isPremium?: boolean;
  role?: RoleEnum;
  gender?: GenderEnum;
};
