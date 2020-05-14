import { Field, ObjectType } from 'type-graphql';
import { PaginatedReviewResponse } from '../../review/paginate.review.dto';

@ObjectType()
export class UserBalanceRetentionDto {
  @Field()
  total: number;
  @Field()
  important: number;
  @Field()
  percentageRetention: number;
}
