import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { DiagnosticService } from '../services/diagnostic/diagnostic.service';
import { ID, Int } from 'type-graphql';
import { Logger } from '@nestjs/common';
import { DiagnosticDto } from '../dtos/dtos/diagnostic/diagnostic.dto';
import { PaginatedDiagnosticResponse } from '../dtos/dtos/diagnostic/paginate.diagnostic.dto';
import { CreateDiagnosticInputDto } from '../dtos/inputs/diagnostic/diagnostic.input';
import { UpdateDiagnosticDto } from '../dtos/inputs/diagnostic/diagnostic.update';
import { ClientDto } from '../dtos/dtos/client/client.dto';
import { ClientService } from '../services/client/client.service';
import { UserDto } from '../dtos/dtos/user/user.dto';
import { UserService } from '../services/user/user.service';

@Resolver(of => DiagnosticDto)
export class DiagnosticResolver {
  constructor(
    private readonly service: DiagnosticService,
    private readonly clientService: ClientService,
    private readonly userService: UserService,
  ) { }

  @Query(() => DiagnosticDto, { name: 'diagnostic' })
  async getDiagnostic(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.findResource(id);
  }

  @Query(() => PaginatedDiagnosticResponse, { name: 'diagnostics' })
  async getDiagnostics(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    return await this.service.getAll(skip, limit);
  }

  @Mutation(() => DiagnosticDto)
  async createDiagnostic(@Args('input') input: CreateDiagnosticInputDto) {
    return await this.service.createResource(input);
  }
  @Mutation(() => DiagnosticDto)
  async updateDiagnostic(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: UpdateDiagnosticDto) {
    return await this.service.updateResource(id, input);
  }
  @Mutation(() => DiagnosticDto)
  async deleteDiagnostic(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.deleteResource(id);
  }

  @ResolveProperty(returns => ClientDto)
  async client(@Parent() diagnostic) {
    const { clientId } = diagnostic;
    let client;
    try {
      client = await this.clientService.findResource(clientId);
    } catch (e) {
      return null;
    }
    return client;
  }
  @ResolveProperty(returns => UserDto)
  async performedBy(@Parent() diagnostic) {
    const { performedById } = diagnostic;
    let user;
    try {
      user = await this.userService.findResource(performedById);
    } catch (e) {
      return null;
    }
    return user;
  }
}
