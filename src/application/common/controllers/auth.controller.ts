import { Controller, Get, UseGuards, Res, Req, Logger, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginInput } from '../dtos/inputs/auth/login.input';
import { AuthService } from '../services/auth/auth.service';
import * as ls from 'local-storage';
import { UI_URI_HELPER } from '../../../constants/constants';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
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
}
