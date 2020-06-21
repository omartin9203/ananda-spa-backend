import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { SERVICE_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';
import { ServiceSettingDto } from '../../dtos/dtos/settings/service/service-setting.dto';
import { ServiceSettingService } from '../../services/settings/service-setting.service';
import { PaginatedServiceSettingResponse } from '../../dtos/dtos/settings/service/service-setting.paginate.dto';
import { ServiceSettingInput } from '../../dtos/inputs/settings/service/service-setting.input';
import { ServiceSettingUpdate } from '../../dtos/inputs/settings/service/service-setting.update';

@Resolver(of => ServiceSettingDto)
export class ServiceSettingResolver {
  constructor(private readonly service: ServiceSettingService) {
  }

  @Query(() => ServiceSettingDto, {nullable: true})
  async getServiceSetting(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.findResource(id);
  }

  @Query(() => PaginatedServiceSettingResponse)
  async getServiceSettings(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    return await this.service.getAll(skip, limit, { type: SERVICE_SETTING_MODEL_NAME });
  }

  @Mutation(() => ServiceSettingDto)
  async createServiceSetting(@Args('input') input: ServiceSettingInput) {
    return await this.service.createResource(input);
  }
  @Mutation(() => ServiceSettingDto)
  async deleteServiceSetting(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.deleteResource(id);
  }
  @Mutation(() => ServiceSettingDto)
  async updateServiceSetting(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: ServiceSettingUpdate) {
    return await this.service.updateResource(id, input);
  }
}
