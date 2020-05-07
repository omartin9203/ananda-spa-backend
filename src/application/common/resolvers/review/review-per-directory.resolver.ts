import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { ReviewPerDirectoryDto } from '../../dtos/dtos/review/review-per-directory.dto';
import { PaginatedReviewResponse } from '../../dtos/dtos/review/paginate.review.dto';

@Resolver(of => ReviewPerDirectoryDto)
export class ReviewPerDirectoryResolver {
  @ResolveProperty(returns => PaginatedReviewResponse)
  async paginate(@Parent() parent) {
    const { items, total , skip, limit } = parent;
    return {
      items: items.map(x => ({ ...x, id: x._id.toString() })),
      total,
      hasMore: limit + skip < total,
    } as PaginatedReviewResponse;
  }
  @ResolveProperty(returns => String)
  async directoryId(@Parent() parent) {
    const { _id } = parent;
    return _id.toString();
  }
}
