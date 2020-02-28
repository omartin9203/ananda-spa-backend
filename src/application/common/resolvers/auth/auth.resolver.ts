import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../services/auth/auth.service';
import { LoginInput } from '../../dtos/inputs/auth/login.input';
import { AuthDto } from '../../dtos/dtos/auth/auth-data.dto';
import { UserInput } from '../../dtos/inputs/user/user.input';
import { Logger, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserInfoDto } from '../../dtos/dtos/user/user.Info.dto';
import { CurrentUser } from '../../decorators/params/current-user.decorator';
import { GqlAuthGuard } from '../../guard/auth/graphql.guard';

@Resolver(of => AuthDto)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Query(() => AuthDto)
  async logIn(@Args('input', new ValidationPipe()) input: LoginInput) {
    return await this.authService.validateLocalLogin(input.unique, input.password);
  }
  @Mutation(() => AuthDto)
  async signUp(@Args('input', new ValidationPipe()) input: UserInput) {
    return await this.authService.validateSignUp(input);
  }
  @Query(() => UserInfoDto)
  @UseGuards(GqlAuthGuard)
  async userInfo(@CurrentUser() user) {
    Logger.log(user, 'USER');
    return await this.authService.getUserInfo(user.sub);
  }
  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async verifyToken() {
    return true;
  }
}
