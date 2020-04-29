import {ArgsType, Field, Int} from "type-graphql";
import {ReviewFilterInput} from "./review-filter";

@ArgsType()
export class FilterReviewArgsInput {
  @Field(type => ReviewFilterInput, {nullable: true})
  filter?: ReviewFilterInput;
  @Field(() => Int)
  skip: number = 0;
  @Field(() => Int)
  limit?: number = 10;
}
