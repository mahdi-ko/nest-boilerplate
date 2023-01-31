import { UserObject } from '../../user/dto/user.model';

export type LoginResponse = Promise<{
  user: UserObject;
  accessToken: string;
  refreshToken: string;
}>;

export type SignupResponse = Promise<UserObject>;

export type GenerateAccessTokenResponse = Promise<{
  accessToken: string;
}>;

export type SendConfirmEmailResponse = Promise<{
  message: string;
}>;
