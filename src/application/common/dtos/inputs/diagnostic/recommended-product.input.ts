import { Field, InputType } from 'type-graphql';

@InputType()
export class RecommendedProductInput {
  @Field({ nullable: true })
  daytime?: string;
  @Field({ nullable: true })
  nightime?: string;
}
