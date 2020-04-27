import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { UseGuards } from "@nestjs/common";
import { ReviewDto } from "../../dtos/dtos/review/review.dto";
import { ReviewService } from '../../services/review/review.service';
import { UserService } from '../../services/user/user.service';
import { PaginatedReviewResponse } from '../../dtos/dtos/review/paginate.review.dto';
import { UserDto } from '../../dtos/dtos/user/user.dto';
import { ReviewInput } from '../../dtos/inputs/review/review.input';
import { ReviewUpdate } from '../../dtos/inputs/review/review.update';
import { ReviewSettingDto } from '../../dtos/dtos/settings/review/review-setting.dto';
import { ReviewSettingService } from '../../services/settings/review-settings.service';
import { AccreditedInputType } from '../../dtos/inputs/review/accredited/accredited.input';
import { AccreditedUpdate } from '../../dtos/inputs/review/accredited/accredited.update';

@Resolver(of => ReviewDto)
export class ReviewResolver {
    constructor(
        private readonly service: ReviewService,
        private readonly reviewSettingService: ReviewSettingService,
    ) { }

    @Query(() => ReviewDto, { name: 'review' })
    async getReview(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.service.findResource(id);
    }

    @Query(() => PaginatedReviewResponse, { name: 'reviews' })
    //// @UseGuards(GqlAuthGuard, RolesGuard)
    //// @Roles('ADMIN', 'MANAGER')
    //@UseGuards(GqlAuthGuard)
    async getReviews(
        @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
        @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
    ) {
        return await this.service.getAll(skip, limit);
    }

    @Mutation(() => ReviewDto)
    async createReview(@Args('input') input: ReviewInput) {
        return await this.service.createResource(input);
    }

    @Mutation(() => ReviewDto)
    async updateReview(
        @Args({ name: 'id', type: () => ID }) id: string,
        @Args('input') input: ReviewUpdate) {
        return await this.service.updateResource(id, input);
    }

    @Mutation(() => ReviewDto)
    async deleteReview(@Args({ name: 'id', type: () => ID }) id: string) {
        return await this.service.deleteResource(id);
    }

    @Mutation(() => ReviewDto)
    async accreditReview(
        @Args({ name: 'id', type: () => ID }) id: string,
        @Args('input') input: AccreditedInputType) {
        return await this.service.accreditReview(id, input);
    }

    @Mutation(() => ReviewDto)
    async updateAccreditedReview(
        @Args({ name: 'id', type: () => ID }) id: string,
        @Args('input') input: AccreditedUpdate) {
        return await this.service.updateAccredit(id, input);
    }

    @ResolveProperty(returns => ReviewSettingDto)
    async directory(@Parent() review) {
        const { directoryId } = review;
        let directory;
        try {
            directory = await this.reviewSettingService.findResource(directoryId);
        } catch (e) {
            return null;
        }
        return directory;
    }
}