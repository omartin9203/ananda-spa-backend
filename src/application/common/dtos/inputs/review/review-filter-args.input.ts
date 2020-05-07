import {ArgsType, Field, Int} from "type-graphql";
import {ReviewFilterInput} from "./review-filter";
import { ReviewQuerySortInput } from './review-query-sort.input';

@ArgsType()
export class FilterReviewArgsInput {
  @Field(type => ReviewFilterInput, {nullable: true})
  filter?: ReviewFilterInput;
  @Field(() => Int, {nullable: true})
  skip?: number = 0;
  @Field(() => Int, {nullable: true})
  limit?: number = 10;
  @Field(type => ReviewQuerySortInput, {nullable: true})
  sort?: ReviewQuerySortInput;
}
