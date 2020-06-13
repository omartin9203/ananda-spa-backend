import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ReviewPerDirectoryDto } from '../../dtos/dtos/review/review-per-directory.dto';
import { PaginatedReviewResponse } from '../../dtos/dtos/review/paginate.review.dto';
import { RetentionPerformanceDto } from '../../dtos/dtos/visitRetention/retention-performance.dto';
import { PaginatedVisitRetentionResponse } from '../../dtos/dtos/visitRetention/paginate.visitRetention.dto';

@Resolver(of => RetentionPerformanceDto)
export class RetentionPerformanceResolver {
  @ResolveProperty(returns => PaginatedReviewResponse, {nullable: true})
  async paginate(@Parent() parent) {
    const { paginate, withItems } = parent;
    if (!paginate || !withItems) { return undefined; }
    return {
      items: paginate.items.map(x => ({ ...x, id: x._id.toString() })),
      total: paginate.total,
      hasMore: paginate.hasMore,
    } as PaginatedVisitRetentionResponse;
  }
}
