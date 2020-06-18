import { BadRequestException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PROVIDER } from '../../../../constants/constants';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../../dtos/dtos/auth/auth-data.dto';
import { AuthSSODto } from '../../dtos/dtos/auth/sso-auth-data.dto';
import * as admin from 'firebase-admin';
import DecodedIdToken = admin.auth.DecodedIdToken;
import { LoginInput } from '../../dtos/inputs/auth/login.input';
import { IPayloadAuth } from '../../dtos/dtos/auth/payload.dto';

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
        provider: PROVIDER.LOCAL,
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
    const payload: IPayloadAuth = {
      providerData: {
        provider: PROVIDER.LOCAL,
        thirdPartyId: responseStatus.data.id,
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

  async validateExternalLogin(input: LoginInput) {
    if (!input.tokenId) {
      throw new BadRequestException('TokenId is required');
    }
    const decoded = await this.validateFirebaseToken(input.tokenId);
    if (!decoded) {
      throw new ForbiddenException('Verify token error', '403');
    }
    if (!decoded.email) {
      throw new ForbiddenException('Can`t obtain email from token', '403');
    }
    const responseStatus = await this.usersService.signInSSO(decoded.email);
    if (!responseStatus.success) {
      return responseStatus as AuthDto;
    }
    const payload: IPayloadAuth = {
      providerData: {
        provider: input.provider,
        thirdPartyId: decoded.uid,
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

  async validateLogin(input: LoginInput): Promise<AuthDto> {
    if (input.provider === PROVIDER.LOCAL) {
      return await this.validateLocalLogin(input.email, input.password);
    }
    return await this.validateExternalLogin(input);
  }

  async validateSignUp(user: object): Promise<AuthDto> {
    return await this.usersService.signUp(user);
    // if (!responseStatus.success) {
    //   return {
    //     success: false,
    //     message: responseStatus.message,
    //   };
    //   // return null;
    // }
    // const payload = {
    //   providerData: {
    //     thirdPartyId: responseStatus.data.id,
    //     provider: PROVIDER.LOCAL,
    //   },
    //   sub: responseStatus.data.id,
    // };
    // const jwt = this.jwtService.sign(payload);
    // return {
    //   success: true,
    //   message: responseStatus.message,
    //   // jwt,
    //   // id: responseStatus.data.id,
    // };
  }

  async getRoles(userId: string) {
    return await this.usersService.getRolesOfUser(userId);
  }

  async getUserInfo(userId: string) {
    return await this.usersService.getUserInfo(userId);
  }

  async validateFirebaseToken(tokenId: string): Promise<DecodedIdToken | undefined> {
    try {
      return  await admin.auth().verifyIdToken(tokenId);
    } catch (e) {
      return undefined;
    }
  }
}
