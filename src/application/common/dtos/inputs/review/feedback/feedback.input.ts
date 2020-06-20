import { Field, InputType } from 'type-graphql';

@InputType()
export class FeedbackInputType {
  @Field()
  extractions: string;
  @Field()
  rating: number;
  @Field()
  clientId: string;
  @Field()
  facialistId: string;
}
