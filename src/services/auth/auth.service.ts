import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';

import { GenerateAccessTokenDto } from '~/src/controllers/rest/auth/dto/generateAccessToken.dto';
import { LoginDto } from '~/src/controllers/rest/auth/dto/login.dto';
import { LoginWithFacebookDto } from '~/src/controllers/rest/auth/dto/loginWithFacebook.dto';
import { LoginWithGoogleDto } from '~/src/controllers/rest/auth/dto/loginWithGoogle.dto';
import { LoginResponse } from '~/src/controllers/rest/auth/dto/response';
import { SendEmailDto } from '~/src/controllers/rest/auth/dto/sendConfirmEmail.dto';
import { VerifyEmailTokenDto } from '~/src/controllers/rest/auth/dto/verifyEmailtoken.dto';
import { VerifyForgotPasswordTokenDto } from '~/src/controllers/rest/auth/dto/VerifyForgotPasswordToken.dto';
import { sendTemplateEmail } from '~/src/core/apis/sendinblue/sendinblue.api';
import { GoogleAuthConfig } from '~/src/core/config/google_auth.config';

import { PrismaService } from '../../infrastructure/prisma.service';
import { SignupDto } from './../../controllers/rest/auth/dto/signup.dto';
import { defaultUserSelect } from './../../core/utils/defaultSelect/user.utils';
import { FacebookDebugTokenResponse } from './types';
import { debugFacebookToken } from './utils/debugFacebookToken.utils';
import { hashPass, isPassMatch } from './utils/encrypt.utils';
import {
  signAccessToken,
  signOtherToken,
  signRefreshToken,
  verifyOtherToken,
  verifyRefreshToken,
} from './utils/jsonwebtoken.utils';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(private prisma: PrismaService) {
    this.googleClient = new GoogleAuthConfig().client;
  }

  async login(input: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: input.email },
    });
    if (!user || !(await isPassMatch(input.password, user.password)))
      throw new BadRequestException('incorrect login credentials');
    if (!user.active) {
      await this.sendConfirmEmail({ email: user.email });
      throw new BadRequestException(
        'To verify your email please check your inbox',
      );
    }
    const { password: _, ...userProps } = user;

    const accessToken = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id, role: user.role });

    return { user: userProps, accessToken, refreshToken };
  }

  async signup(input: SignupDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: input.email },
      select: { ...defaultUserSelect, active: true },
    });

    if (user && user.active)
      throw new BadRequestException('Email already exist please login ');

    const password = await hashPass(input.password);

    const data = { ...input, password };

    const registeredUser = await this.prisma.user.upsert({
      create: data,
      update: data,
      where: { email: input.email },
      select: defaultUserSelect,
    });
    await this.sendConfirmEmail({ email: input.email });
    return registeredUser;
  }

  async generateAccessToken(input: GenerateAccessTokenDto) {
    const { refreshToken } = input;
    const { id, role } = verifyRefreshToken(refreshToken);
    const user = { id, role };
    const accessToken = signAccessToken(user);
    return { accessToken };
  }

  async sendConfirmEmail(input: SendEmailDto) {
    const user = await this.prisma.user.findFirst({
      where: input,
    });
    if (!user) throw new BadRequestException('Please register First');

    if (user.active) throw new BadRequestException('Email is already verified');

    const token = signOtherToken({ id: user.id, role: user.role });
    await this.prisma.user.update({
      where: { id: user.id },
      data: { verifyEmailToken: token },
    });
    await sendTemplateEmail({
      template: 'confirmEmail',
      receiverEmail: user.email,
      username: user.username,
      token,
    });
    return { message: 'An email is sent to you please check your inbox' };
  }

  async verifyEmailToken(input: VerifyEmailTokenDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user || user.verifyEmailToken != input.token)
      throw new BadRequestException('Invalid Request');

    if (user.active)
      throw new BadRequestException('Email is verified, please login');
    verifyOtherToken(input.token);

    return this.prisma.user.update({
      data: { active: true },
      where: { email: input.email },
      select: defaultUserSelect,
    });
  }

  async sendForgotPasswordEmail(input: SendEmailDto) {
    const user = await this.prisma.user.findFirst({
      where: input,
    });
    if (!user) throw new BadRequestException('Please register First');

    const token = signOtherToken({ id: user.id, role: user.role });
    await this.prisma.user.update({
      where: { id: user.id },
      data: { forgotPasswordToken: token },
    });
    await sendTemplateEmail({
      template: 'forgotPassword',
      receiverEmail: user.email,
      username: user.username,
      token,
    });
    return { message: 'An email is sent to you please check your inbox' };
  }

  async verifyForgotPasswordToken(input: VerifyForgotPasswordTokenDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user || user.forgotPasswordToken != input.token)
      throw new BadRequestException('Invalid Request');

    verifyOtherToken(input.token);

    const password = await hashPass(input.password);

    return this.prisma.user.update({
      data: { password },
      where: { email: input.email },
      select: defaultUserSelect,
    });
  }

  async loginWithGoogle(input: LoginWithGoogleDto): Promise<LoginResponse> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: input.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
      select: { ...defaultUserSelect, googleId: true },
    });

    if (!user) {
      const registeredUser = await this.prisma.user.create({
        data: {
          email: payload.email,
          username: payload.name,
          googleId: ticket.getUserId(),
        },
        select: defaultUserSelect,
      });

      const accessToken = signAccessToken({
        id: registeredUser.id,
        role: registeredUser.role,
      });

      const refreshToken = signRefreshToken({
        id: registeredUser.id,
        role: registeredUser.role,
      });

      return { user: registeredUser, accessToken, refreshToken };
    }
    if (!user.googleId)
      await this.prisma.user.update({
        where: { email: payload.email },
        data: {
          googleId: ticket.getUserId(),
        },
        select: defaultUserSelect,
      });

    const { googleId: _, ...userProps } = user;

    const accessToken = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id, role: user.role });

    return { user: userProps, accessToken, refreshToken };
  }

  async loginWithFacebook(input: LoginWithFacebookDto): Promise<LoginResponse> {
    const response = await debugFacebookToken(input.token);

    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      select: { ...defaultUserSelect, facebookId: true },
    });

    if (!user) {
      const registeredUser = await this.prisma.user.create({
        data: {
          email: input.email,
          username: input.userName,
          facebookId: response.data.user_id.toString(),
        },
        select: defaultUserSelect,
      });

      const accessToken = signAccessToken({
        id: registeredUser.id,
        role: registeredUser.role,
      });

      const refreshToken = signRefreshToken({
        id: registeredUser.id,
        role: registeredUser.role,
      });

      return { user: registeredUser, accessToken, refreshToken };
    }
    if (!user.facebookId)
      await this.prisma.user.update({
        where: { email: input.email },
        data: {
          facebookId: response.data.user_id.toString(),
        },
        select: defaultUserSelect,
      });

    const { facebookId: _, ...userProps } = user;

    const accessToken = signAccessToken({ id: user.id, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id, role: user.role });

    return { user: userProps, accessToken, refreshToken };
  }
}
