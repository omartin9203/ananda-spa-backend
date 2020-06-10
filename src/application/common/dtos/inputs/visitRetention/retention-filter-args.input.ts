import { ArgsType, Field, Int } from 'type-graphql';
import { ReviewFilterInput } from '../review/review-filter';
import { ReviewQuerySortInput } from '../review/review-query-sort.input';
import { RetentionFilterInput } from './retention-filter.input';

@ArgsType()
export class RetentionFilterArgsInput {
  @Field(type => RetentionFilterInput, {nullable: true})
  filter?: RetentionFilterInput;
  @Field(() => Int, {nullable: true})
  skip?: number = 0;
  @Field(() => Int, {nullable: true})
  limit?: number = 10;
  // @Field(type => ReviewQuerySortInput, {nullable: true})
  // sort?: ReviewQuerySortInput;
}
