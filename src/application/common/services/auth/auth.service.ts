import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PROVIDER } from '../../../../constants/constants';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../../dtos/dtos/auth/auth-data.dto';
import { AuthSSODto } from '../../dtos/dtos/auth/sso-auth-data.dto';
import * as admin from 'firebase-admin';
import { LoginInput } from '../../dtos/inputs/auth/login.input';
import { IPayloadAuth } from '../../dtos/dtos/auth/payload.dto';
import { AuthSignUpDto } from '../../dtos/dtos/auth/auth-signup-dto';
import { EmailService } from '../email/email.service';
import DecodedIdToken = admin.auth.DecodedIdToken;
import { TemplateBuilderService } from '../../../core/services/template-builder.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    readonly emailService: EmailService,
    readonly templateBuilderService: TemplateBuilderService
  ) { }

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

  async validateSignUp(user: object): Promise<AuthSignUpDto> {
    const data = await this.usersService.signUp(user);
    return {
      success: data.success,
      message: data.message,
      userId: data.data?.id,
      roles: data.data?.roles,
      status: data.data?.status,
    };
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

  async resetPassword(id: string, password: string): Promise<AuthDto> {
    try {
      const success = await this.usersService.resetPassword(id, password);
      if (!success) {
        return {
          success: false,
          message: 'Invalid Id',
        };
      }
      const payload: IPayloadAuth = {
        providerData: {
          provider: PROVIDER.LOCAL,
          thirdPartyId: id,
        },
        sub: id,
      };
      const jwt = this.jwtService.sign(payload);
      return {
        success: true,
        message: 'OK',
        jwt,
        id,
      } as AuthDto;
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async forgotPassword(email: string, redirect: string, param: string): Promise<{success: boolean, message: string}> {
    try {
      const user = await this.usersService.findOne({email});
      if (!user) {
        return {
          success: false,
          message: 'The email is not registered',
        };
      }
      const payload: IPayloadAuth = {
        providerData: {
          provider: PROVIDER.LOCAL,
          thirdPartyId: user.id,
        },
        sub: user.id,
      };
      const jwt = this.jwtService.sign(payload);
      const href: string = `${redirect}?${param}=${jwt}`;
      const html = `
          <h1>Hi! ${[user.firstName, user.lastName].join(' ')}</h1>
          <br />
          <a href="${href}">
            <button>Reset Password</button>
          </a>
        `;
      // // todo: build html
      // this.templateBuilderService.buildTemplate<{firstname: string, lastname: string, url: string}>(
      //   {
      //     firstname: user.firstName,
      //     lastname: user.lastName,
      //     url: href,
      //   }, 'path to template',
      //   );
      return await this.emailService.sendEmail({
        to: [email],
        html,
        subject: 'Your Password Reset Instructions',
      });
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
