import { Injectable } from '@nestjs/common';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { PROVIDER } from '../../../../constants/constants';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../../dtos/dtos/auth/auth-data.dto';
import { AuthSSODto } from '../../dtos/dtos/auth/sso-auth-data.dto';
import { awaitExpression } from '@babel/types';
import { GOOGLE_FIREBASE_CREDENTIALS, GOOGLE_FIREBASE_DATABASE_URL } from '../../../../constants';
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
    // todo: verifyToken
    const responseStatus = await this.usersService.signInSSO(input.email);
    if (!responseStatus.success) {
      return responseStatus as AuthDto;
    }
    const payload: IPayloadAuth = {
      providerData: {
        provider: input.provider,
        thirdPartyId: responseStatus.data.id, // todo: uid
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
