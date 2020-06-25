import { Controller, Get, UseGuards, Res, Req, Logger, Body, Post, Headers, UnauthorizedException, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth/auth.service';
import { UI_URI_HELPER } from '../../../constants/constants';
import { API_KEY } from '../../../constants';
import { UserService } from '../services/user/user.service';

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

  @Post('password/reset/:id')
  async resetPassword(
    @Headers('token') apiKey,
    @Param('id') id: string,
    @Body() { password }: { password: string; },
  ) {
    if (apiKey !== API_KEY) { throw new UnauthorizedException(); }
    let success = false;
    let message = 'Error at reset password';
    try {
      success = await this.userService.resetPassword(id, password);
    } catch (e) {
      Logger.debug(e);
      message = e.message ?? message;
    }
    return {
      success,
      message: success ? 'Ok' : message,
    };
  }

  @Get('password/forgot')
  async forgotPassword(
    @Headers('token') apiKey,
    @Body() { email, redirect }: { email: string, redirect: string },
  ) {
    if (apiKey !== API_KEY) { throw new UnauthorizedException(); }
    try {
      return await this.authService.forgotPassword(email, redirect);
    } catch (e) {
      Logger.debug(e);
      return {
        success: false,
        message: e.message ?? 'Error at forgot password',
      };
    }
  }
}
