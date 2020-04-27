import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { API_KEY, PROVIDER, STATUS } from '../../../../constants/constants';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../../dtos/dtos/auth/auth-data.dto';
import { AuthSSODto } from '../../dtos/dtos/auth/sso-auth-data.dto';
import { awaitExpression } from '@babel/types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) { }

  async validateOAuthLogin(profile: any, provider: PROVIDER): Promise<AuthSSODto> {
      const { thirdPartyId, email} = profile;
      const responseStatus = await this.usersService.signInSSO(email);
      if (!responseStatus.success) {
        return {
          success: false,
          message: responseStatus.message,
        };
      }
      const payload = {
        providerData: {
          thirdPartyId,
          provider,
        },
        sub: responseStatus.data.id,
      };

      const jwt = this.jwtService.sign(payload);
      // return { jwt, id: responseStatus.data.id };
      return {
        success: true,
        message: responseStatus.message,
        jwt,
      };
  }

  async validateLocalLogin(unique: string, password: string): Promise<AuthDto> {
    const responseStatus = await this.usersService.signInLocal(unique, password);
    if (!responseStatus.success) {
      return {
        success: false,
        message: responseStatus.message,
      };
    }
    const payload = {
      providerData: {
        thirdPartyId: responseStatus.data.id,
        provider: PROVIDER.LOCAL,
      },
      sub: responseStatus.data.id,
    };
    const jwt = this.jwtService.sign(payload);
    return {
      success: true,
      message: responseStatus.message,
      jwt,
      id: responseStatus.data.id,
    };
  }

  async validateSignUp(user: object): Promise<AuthDto> {
    const responseStatus = await this.usersService.signUp(user);
    if (!responseStatus.success) {
      return {
        success: false,
        message: responseStatus.message,
      };
      // return null;
    }
    const payload = {
      providerData: {
        thirdPartyId: responseStatus.data.id,
        provider: PROVIDER.LOCAL,
      },
      sub: responseStatus.data.id,
    };
    const jwt = this.jwtService.sign(payload);
    return {
      success: true,
      message: responseStatus.message,
      jwt,
      id: responseStatus.data.id,
    };
  }

  async getRoles(userId: string) {
    return await this.usersService.getRolesOfUser(userId);
  }

  async getUserInfo(userId: string) {
    return await this.usersService.getUserInfo(userId);
  }
}
