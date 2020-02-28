import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { RolesGuard } from '../guard/auth/roles.guard';
import { Roles } from '../decorators/auth/roles.decorator';

@Resolver(of => UserDto)
export class UserResolver {
  constructor(
    // private readonly authorsService: AuthorsService,
    private readonly usersService: UserService,
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
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  async filterUsers(
    @Args({ name: 'filter', type: () => UserFilterInput, nullable: true }) input: UserFilterInput,
    // @Args() { query, limit, skip }: FilterClientsArgsInput,
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    const result = (input !== null || Object.keys(input).length)
      ? await this.usersService.filter(input, skip, limit)
      : await this.usersService.getAll(skip, limit);
    return result;
  }
}
