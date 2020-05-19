import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ReviewUserBalance {
  @Field()
  userId: string;
  @Field()
  overall: number;
  @Field()
  retention: number;
  @Field()
  expectedReviews: number;
  @Field()
  critics: number;
}
