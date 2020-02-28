import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../../services/auth/auth.service';
import { Strategy, StrategyOptionsWithRequest, Profile, VerifyCallback } from 'passport-google-oauth20';
import { PROVIDER, URI_HELPER } from '../../../../constants';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {
    super({
      clientID    : '151152271985-0j9ms9vdief2kfosaificpdke8gs74m4.apps.googleusercontent.com',     // <- Replace this with your client id
      clientSecret: 'hfEh816GQjGmXz10pi2GGpET', // <- Replace this with your client secret
      callbackURL : URI_HELPER.callback.auth.google,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    } as StrategyOptionsWithRequest);
  }
  async validate(request: any, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    try {
      if (!profile) {
        done(new BadRequestException(), null);
      }
      const thirdPartyProfile = {
        thirdPartyId: profile.id,
        email: profile.emails[0].value,
      };
      const authDataSSO = await this.authService.validateOAuthLogin(thirdPartyProfile, PROVIDER.GOOGLE);
      // Logger.log(authDataSSO);
      if (!authDataSSO.success) {
        throw new UnauthorizedException(authDataSSO.message);
      }
      // const user = {
      //   jwt: this.jwtService.sign(payload),
      // };
      const data = {
        success: true,
        message: 'Ok',
        jwt: authDataSSO.jwt,
      };
      done(null, data);
    } catch (err) {
      Logger.log(err);
      const data = {
        success: false,
        message: err.response.message,
        user: null,
      };
      // done(err, false);
      done(null, data);
    }
  }
}
