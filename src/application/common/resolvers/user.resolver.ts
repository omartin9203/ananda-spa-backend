import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { UserService } from '../services/user/user.service';
import { UserDto } from '../dtos/dtos/user/user.dto';
import { UserInput } from '../dtos/inputs/user/user.input';
import { UpdateUserInput } from '../dtos/inputs/user/user.update';
import { PaginatedUserResponse } from '../dtos/dtos/user/paginate.user.dto';
import { Logger, UseGuards } from '@nestjs/common';
import { PaginatedClientResponse } from '../dtos/dtos/client/paginate.client.dto';
import { FilterClientsArgsInput } from '../dtos/inputs/args/query.arg.input';
import { UserFilterInput } from '../dtos/inputs/user/UserFilter';
import { GqlAuthGuard } from '../guard/auth/graphql.guard';
import { CurrentUser } from '../decorators/params/current-user.decorator';
import { QueryFilterIdDto } from '../../core/dtos/filter/query-filter/query-filter-id.dto';
import { UserBalanceRetentionDto } from '../dtos/dtos/user/balance/user-balance-retention.dto';
import { ColorSettingDto } from '../dtos/dtos/settings/color/color-setting.dto';
import { ColorSettingService } from '../services/settings/color-setting.service';

@Resolver(of => UserDto)
export class UserResolver {
  constructor(
    // private readonly authorsService: AuthorsService,
    private readonly usersService: UserService,
    private readonly colorService: ColorSettingService,
  ) {}

  @Query(() => UserDto, { name: 'user' })
  async getUser(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.usersService.findResource(id);
  }

  @Query(() => PaginatedUserResponse, { name: 'users' })
  async getUsers(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    Logger.log(limit, 'UserResolver');
    return await this.usersService.getAll(skip, limit);
  }

  @Mutation(() => UserDto)
  async createUser(@Args('input') input: UserInput) {
    return await this.usersService.createResource(input);
  }
  @Mutation(() => UserDto)
  async updateUser(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: UpdateUserInput) {
    return await this.usersService.updateResource(id, input);
  }
  @Mutation(() => UserDto)
  async deleteUser( @Args({ name: 'id', type: () => ID }) id: string ) {
    return await this.usersService.deleteResource(id);
  }
  @Query(() => PaginatedUserResponse)
  // @UseGuards(GqlAuthGuard, RolesGuard)
  // @Roles('ADMIN', 'MANAGER')
  @UseGuards(GqlAuthGuard)
  async filterUsers(
    @Args({ name: 'filter', type: () => UserFilterInput, nullable: true }) input: UserFilterInput,
    // @Args() { query, limit, skip }: FilterClientsArgsInput,
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({name: 'limit', type: () => Int, nullable: true }) limit: number,
    @CurrentUser() user,
  ) {
    if (!['MANAGER', 'ADMIN'].some(x => user.roles.includes(x))) {
      input.id = {
        eq: user.id,
      } as QueryFilterIdDto;
    }
    const result = (input !== null || Object.keys(input).length)
      ? await this.usersService.filter(UserFilterInput.getQuery(input), skip, limit)
      : await this.usersService.getAll(skip, limit);
    return result;
  }
  @Query(() => UserBalanceRetentionDto)
  @UseGuards(GqlAuthGuard)
  async getUserBalanceRetention(
    @Args({ name: 'filter', type: () => UserFilterInput, nullable: true }) input: UserFilterInput,
    @CurrentUser() user,
  ) {
    if (!['MANAGER', 'ADMIN'].some(x => user.roles.includes(x))) {
      input.id = {
        eq: user.id,
      } as QueryFilterIdDto;
    }
    const result = await this.usersService.getBalanceRetention(UserFilterInput.getQuery(input));
    return result;
  }
  @ResolveProperty(returns => ColorSettingDto, {nullable: true})
  async color(@Parent() user) {
    const { colorId } = user;
    try {
       return await this.colorService.findResource(colorId);
    } catch (e) {
      return null;
    }
  }
}
