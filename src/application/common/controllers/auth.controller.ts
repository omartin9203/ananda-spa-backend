import { Controller, Get, UseGuards, Res, Req, Logger, Body, Post, Headers, UnauthorizedException, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth/auth.service';
import { UI_URI_HELPER } from '../../../constants/constants';
import { API_KEY } from '../../../constants';
import { UserService } from '../services/user/user.service';
import { CurrentUser } from '../decorators/params/current-user.decorator';
import { UserInfoDto } from '../dtos/dtos/user/user.Info.dto';
import { AuthDto } from '../dtos/dtos/auth/auth-data.dto';
import { ResetPasswordInput } from '../dtos/inputs/auth/reset-password.input';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService, readonly userService: UserService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const data = req.user;
    if (data.success) {
      res.redirect(`${UI_URI_HELPER.AUTH.login.handler}?jwt=${data.jwt}`);
    } else {
      res.redirect(`${UI_URI_HELPER.AUTH.login.handler}?error=${data.message.split(' ').join('-')}`);
    }
  }
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource(@Req() req) {
    return 'JWT is working!';
  }

  @Post('password/reset')
  @UseGuards(AuthGuard('jwt'))
  async resetPassword(
    @Req() { user }: any,
    @Body() { password }: ResetPasswordInput,
  ): Promise<AuthDto> {
    return await this.authService.resetPassword(user.id, password);
  }

  @Post('password/forgot')
  async forgotPassword(
    @Headers('token') apiKey,
    @Body() { email, redirect, param }: { email: string, redirect: string, param: string },
    @Req() req: any,
  ) {
    if (apiKey !== API_KEY) { throw new UnauthorizedException(); }
    try {
      return await this.authService.forgotPassword(email, redirect, param);
    } catch (e) {
      Logger.debug(e);
      return {
        success: false,
        message: e.message ?? 'Error at forgot password',
      };
    }
  }
}
