import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RecommendedProductDto {
  @Field({nullable: true})
  daytime?: string;
  @Field({nullable: true})
  nightime?: string;
}
