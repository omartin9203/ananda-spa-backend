import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { ClientService } from '../services/client/client.service';
import { ClientDto } from '../dtos/dtos/client/client.dto';
import { PaginatedClientResponse } from '../dtos/dtos/client/paginate.client.dto';
import { CreateClientInputDto } from '../dtos/inputs/client/create-client.input';
import { UpdateClientInputDto } from '../dtos/inputs/client/client.update';
import { Logger } from '@nestjs/common';
import { FilterClientsArgsInput } from '../dtos/inputs/args/query.arg.input';
import { validateOrReject, validate } from 'class-validator';
import { ClientFilterInput } from '../dtos/inputs/client/client-filter.input';
import { ColorSettingDto } from '../dtos/dtos/settings/color/color-setting.dto';

@Resolver(of => ClientDto)
export class ClientResolver {
  constructor(
    // private readonly authorsService: AuthorsService,
    private readonly clientService: ClientService,
  ) {}

  @Query(() => ClientDto, { name: 'client', nullable: true })
  async getClient(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.clientService.findResource(id);
  }

  @Query(() => PaginatedClientResponse, { name: 'clients' })
  async getClients(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    return await this.clientService.getAll(skip, limit);
  }

  @Query(() => PaginatedClientResponse)
  async filterClients(
    // @Args({ name: 'query', type: () => String, nullable: true }) query: string,
    @Args() { query, limit, skip }: FilterClientsArgsInput,
    // @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    // @Args({name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    const filter = query !== ''
      ? ClientFilterInput.getQuery({search: query})
      : undefined;
    const result = await this.clientService.filter(filter, skip, limit);
    return result;
  }
  @Mutation(() => ClientDto, {nullable: true})
  async createClient(@Args('input') input: CreateClientInputDto) {
    return await this.clientService.createResource(input);
  }
  @Mutation(() => ClientDto, {nullable: true})
  async updateClient(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: UpdateClientInputDto) {
    return await this.clientService.updateResource(id, input);
  }
  @Mutation(() => ClientDto, {nullable: true})
  async deleteClient( @Args({ name: 'id', type: () => ID }) id: string ) {
    return await this.clientService.deleteResource(id);
  }
}
