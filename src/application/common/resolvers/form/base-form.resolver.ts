import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { FieldResolver } from 'type-graphql';
import { isUndefined } from 'util';
import { ResourceService } from '../../../core/services/resource.service';
import { ClientDto } from '../../dtos/dtos/client/client.dto';
import { BaseFormDto } from '../../dtos/dtos/form/base/base-form.dto';
import { ClientService } from '../../services/client/client.service';

@Resolver(of => BaseFormDto)
export class BaseFormResolver {
  private readonly clientService: ClientService;
  constructor(
    clientService: ClientService,
  ) {
    this.clientService = clientService;
  }

  @ResolveProperty(returns => ClientDto)
  async client(@Parent() baseForm): Promise<ClientDto> {
    const { clientId } = baseForm;
    let client;
    try {
      client = await this.clientService.findResource(clientId);
    } catch (e) {
      return null;
    }
    return client;
  }
}
