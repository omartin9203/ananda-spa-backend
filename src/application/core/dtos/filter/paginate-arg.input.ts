import {ArgsType, Field, Int} from "type-graphql";

@ArgsType()
export class PaginateArgsInput {
  @Field(() => Int)
  skip: number = 0;
  @Field(() => Int)
  limit?: number = 10;
}
