import { ReviewBalanceDto } from '../../dtos/dtos/review/review-balance.dto';
import { ResolveProperty, Resolver, Parent, Args, Query } from '@nestjs/graphql';
import { ReviewService } from '../../services/review/review.service';
import { ReviewSettingService } from '../../services/settings/review-settings.service';
import { ReviewSettingDto } from '../../dtos/dtos/settings/review/review-setting.dto';
import { ID } from 'type-graphql';

@Resolver(of => ReviewBalanceDto)
export class ReviewBalanceResolver {
    constructor(
        private readonly reviewService: ReviewService,
        private readonly reviewSettingService: ReviewSettingService,
    ) { }

    @Query(() => [ReviewBalanceDto])
    async getReviewBalance(@Args({ name: 'id', type: () => ID, nullable: true }) id?: string) {
        return await this.reviewService.getbalance(id);
    }

    @ResolveProperty(returns => ReviewSettingDto)
    async directory(@Parent() balance) {
        const { _id } = balance;
        try {
            return await this.reviewSettingService.findOne(_id);
        } catch (e) {
            return null;
        }
    }
}
