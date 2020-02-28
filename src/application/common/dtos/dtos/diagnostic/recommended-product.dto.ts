import { Field, ObjectType } from 'type-graphql';

@ObjectType('RecommendedProductType')
export class RecommendedProductType {
  @Field({nullable: true})
  daytime?: string;
  @Field({nullable: true})
  nightime?: string;
}
