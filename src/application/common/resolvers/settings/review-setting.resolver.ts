import { BaseSettingResolver } from "./base-setting.resolver";
import { ReviewSettingService } from "../../services/settings/review-settings.service";
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ReviewSettingDto } from "../../dtos/dtos/settings/review/review-setting.dto";
import { ReviewSettingUpdate } from "../../dtos/inputs/settings/review/review-setting.update";
import { ID, Int } from "type-graphql";
import { ReviewSettingInput } from "../../dtos/inputs/settings/review/review-setting.input";
import { REVIEW_SETTING_MODEL_NAME } from "../../../../constants/modules/models_names";
import { PaginatedReviewSettingResponse } from "../../dtos/dtos/settings/review/review-setting.paginate.dto";


@Resolver(of => ReviewSettingDto)
export class ReviewSettingResolver {
    constructor(private readonly service: ReviewSettingService) {
    }

    @Query(() => ReviewSettingDto)
    async getReviewSetting(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.service.findResource(id);
    }

    @Query(() => PaginatedReviewSettingResponse)
    async getReviewSettings(
        @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
        @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
    ) {
        return await this.service.getAll(skip, limit, { type: REVIEW_SETTING_MODEL_NAME });
    }

    @Mutation(() => ReviewSettingDto)
    async createReviewSetting(@Args('input') input: ReviewSettingInput) {
        return await this.service.createResource(input);
    }
    @Mutation(() => ReviewSettingDto)
    async deleteReviewSetting(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.service.deleteResource(id);
    }
    @Mutation(() => ReviewSettingDto)
    async updateReviewSetting(
        @Args({ name: 'id', type: () => ID }) id: string,
        @Args('input') input: ReviewSettingUpdate) {
        return await this.service.updateResource(id, input);
    }
}