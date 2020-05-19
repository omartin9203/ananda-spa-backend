import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ID, Int } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { ReviewDto } from '../../dtos/dtos/review/review.dto';
import { ReviewService } from '../../services/review/review.service';
import { PaginatedReviewResponse } from '../../dtos/dtos/review/paginate.review.dto';
import { ReviewInput } from '../../dtos/inputs/review/review.input';
import { ReviewUpdate } from '../../dtos/inputs/review/review.update';
import { ReviewSettingDto } from '../../dtos/dtos/settings/review/review-setting.dto';
import { ReviewSettingService } from '../../services/settings/review-settings.service';
import { AccreditedInputType } from '../../dtos/inputs/review/accredited/accredited.input';
import { AccreditedUpdate } from '../../dtos/inputs/review/accredited/accredited.update';
import {FilterReviewArgsInput} from '../../dtos/inputs/review/review-filter-args.input';
import {ReviewFilterInput} from '../../dtos/inputs/review/review-filter';
import { CurrentUser } from '../../decorators/params/current-user.decorator';
import { GqlAuthGuard } from '../../guard/auth/graphql.guard';
import { QueryFilterStringDto } from '../../../core/dtos/filter/query-filter/query-filter-string.dto';
import { ReviewQuerySortInput } from '../../dtos/inputs/review/review-query-sort.input';
import { ReviewPerDirectoryDto } from '../../dtos/dtos/review/review-per-directory.dto';
import { ReviewUserBalance } from '../../dtos/dtos/review/ReviewUserBalance';
import { RolesGuard } from '../../guard/auth/roles.guard';
import { Roles } from '../../decorators/auth/roles.decorator';

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
    // @UseGuards(GqlAuthGuard)
    async getReviews(
        @Args({ name: 'skip', type: () => Int, nullable: true }) skip: number,
        @Args({ name: 'limit', type: () => Int, nullable: true }) limit: number,
    ) {
        return await this.service.getAll(skip, limit);
    }
    @Query(() => PaginatedReviewResponse)
    @UseGuards(GqlAuthGuard)
    async filterReviews(
      @Args() { filter, limit, skip, sort }: FilterReviewArgsInput,
      @CurrentUser() user,
    ) {
        if (!['MANAGER', 'ADMIN'].some(x => user.roles.includes(x))) {
            filter.assignedTo = {
                eq: user.id,
            } as QueryFilterStringDto;
        }
        return await this.service.filterReview(ReviewFilterInput.getQuery(filter), skip, limit, ReviewQuerySortInput.getStringSort(sort));
    }

    @Query(() => [ReviewUserBalance])
    @UseGuards(GqlAuthGuard, RolesGuard)
    @Roles('ADMIN', 'MANAGER')
    async getReviewUsersBalance(
      // @Args() { filter, limit, skip, sort }: FilterReviewArgsInput,
    ) {
        const newVar = await this.service.getReviewUsersBalance({}/*ReviewFilterInput.getQuery(filter)*/);
        return newVar;
    }

    @Query(() => [ReviewPerDirectoryDto])
    @UseGuards(GqlAuthGuard)
    async filterReviewsPerDirectory(
      @Args() { filter, limit, skip, sort }: FilterReviewArgsInput,
      @CurrentUser() user,
    ) {
        if (!['MANAGER', 'ADMIN'].some(x => user.roles.includes(x))) {
            filter.assignedTo = {
                eq: user.id,
            } as QueryFilterStringDto;
        }

        const result: any = await this.service.getReviewsPerDirectory(ReviewFilterInput.getQuery(filter), { ...sort }, skip, limit);
        return result.map(x => ({...x, skip, limit}));
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
