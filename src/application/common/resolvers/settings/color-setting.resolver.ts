import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { COLOR_SETTING_MODEL_NAME, SERVICE_SETTING_MODEL_NAME } from '../../../../constants/modules/models_names';
import { ColorSettingDto } from '../../dtos/dtos/settings/color/color-setting.dto';
import { ColorSettingService } from '../../services/settings/color-setting.service';
import { PaginatedColorSettingResponse } from '../../dtos/dtos/settings/color/color-setting.paginate.dto';
import { ColorSettingInput } from '../../dtos/inputs/settings/color/color-setting.input';
import { ColorSettingUpdate } from '../../dtos/inputs/settings/color/color-setting.update';

@Resolver(of => ColorSettingDto)
export class ColorSettingResolver {
  constructor(private readonly service: ColorSettingService) {
  }

  @Query(() => ColorSettingDto, {nullable: true})
  async getColorSetting(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.findResource(id);
  }

  @Query(() => PaginatedColorSettingResponse)
  async getColorSettings(
    @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
    @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
  ) {
    return await this.service.getAll(skip, limit, { type: COLOR_SETTING_MODEL_NAME });
  }

  @Mutation(() => ColorSettingDto, {nullable: true})
  async createColorSetting(@Args('input') input: ColorSettingInput) {
    return await this.service.createResource(input);
  }
  @Mutation(() => ColorSettingDto, {nullable: true})
  async deleteColorSetting(@Args({ name: 'id', type: () => ID }) id: string) {
    return await this.service.deleteResource(id);
  }
  @Mutation(() => ColorSettingDto, {nullable: true})
  async updateColorSetting(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('input') input: ColorSettingUpdate) {
    return await this.service.updateResource(id, input);
  }
}
