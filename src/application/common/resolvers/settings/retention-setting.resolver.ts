import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { RetentionSettingDto } from '../../dtos/dtos/settings/retention/retention-setting.dto';
import { RetentionSettingsService } from '../../services/settings/retention-settings.service';
import { PaginatedRetentionSettingResponse } from '../../dtos/dtos/settings/retention/retention-setting.paginate.dto';
import { RetentionSettingInput } from '../../dtos/inputs/settings/retention/retention-setting.input';
import { RetentionSettingUpdate } from '../../dtos/inputs/settings/retention/retention-setting.update';
import { RETENTION_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';

@Resolver(of => RetentionSettingDto)
export class RetentionSettingResolver {
  constructor(private readonly service: RetentionSettingsService) {
  }

  @Query(() => RetentionSettingDto, {nullable: true})
  async getRetentionSetting(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.findResource(id);
  }

  @Query(() => PaginatedRetentionSettingResponse)
  async getRetentionSettings(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    return await this.service.getAll(skip, limit, { type: RETENTION_SETTING_MODEL_NAME });
  }

  @Mutation(() => RetentionSettingDto)
  async createRetentionSetting(@Args('input') input: RetentionSettingInput) {
    return await this.service.createResource(input);
  }
  @Mutation(() => RetentionSettingDto)
  async deleteRetentionSetting(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.deleteResource(id);
  }
  @Mutation(() => RetentionSettingDto)
  async updateRetentionSetting(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: RetentionSettingUpdate) {
    const unzip = RetentionSettingUpdate.getUnzip(input);
    return await this.service.updateResource(id, unzip);
  }
}
