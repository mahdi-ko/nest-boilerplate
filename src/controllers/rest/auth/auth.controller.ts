import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { LoginDto } from '~/src/controllers/rest/auth/dto/login.dto';
import { DAY } from '~/src/core/utils/constants/constants.utils';
import { AuthService } from '~/src/services/auth/auth.service';

import { UserObject } from '../user/dto/user.model';
import { GenerateAccessTokenDto } from './dto/generateAccessToken.dto';
import { LoginWithFacebookDto } from './dto/loginWithFacebook.dto';
import { LoginWithGoogleDto } from './dto/loginWithGoogle.dto';
import {
  GenerateAccessTokenResponse,
  LoginResponse,
  SendConfirmEmailResponse,
  SignupResponse,
} from './dto/response';
import { SendEmailDto } from './dto/sendConfirmEmail.dto';
import { SignupDto } from './dto/signup.dto';
import { VerifyEmailTokenDto } from './dto/verifyEmailtoken.dto';
import { VerifyForgotPasswordTokenDto } from './dto/VerifyForgotPasswordToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() input: LoginDto): LoginResponse {
    return this.authService.login(input);
  }

  @Post('signup')
  signup(@Body() input: SignupDto): SignupResponse {
    return this.authService.signup(input);
  }

  @Post('refreshToken')
  generateAccessToken(
    @Body() input: GenerateAccessTokenDto,
  ): GenerateAccessTokenResponse {
    return this.authService.generateAccessToken(input);
  }

  @Post('sendConfirmEmail')
  sendConfirmEmail(@Body() input: SendEmailDto): SendConfirmEmailResponse {
    return this.authService.sendConfirmEmail(input);
  }

  @Post('verifyEmailToken')
  verifyEmail(@Body() input: VerifyEmailTokenDto): Promise<UserObject> {
    return this.authService.verifyEmailToken(input);
  }

  @Throttle(2, DAY)
  @Post('forgotPassword')
  sendForgotPasswordEmail(
    @Body() input: SendEmailDto,
  ): SendConfirmEmailResponse {
    return this.authService.sendForgotPasswordEmail(input);
  }

  @Post('verifyForgotPassword')
  verifyForgotPasswordToken(
    @Body() input: VerifyForgotPasswordTokenDto,
  ): Promise<UserObject> {
    return this.authService.verifyForgotPasswordToken(input);
  }

  @Post('login-with-google')
  loginGoogle(@Body() input: LoginWithGoogleDto): Promise<LoginResponse> {
    return this.authService.loginWithGoogle(input);
  }

  @Post('login-with-facebook')
  loginFacebook(@Body() input: LoginWithFacebookDto): Promise<LoginResponse> {
    return this.authService.loginWithFacebook(input);
  }
}
