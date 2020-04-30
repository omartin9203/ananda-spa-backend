import {Field, InputType, Int} from 'type-graphql';

@InputType()
export class QueryFilterNumberDto {
  @Field({nullable: true})
  eq?: number;
  @Field({nullable: true})
  gt: number;
  @Field({nullable: true})
  gte: number;
  @Field({nullable: true})
  lt: number;
  @Field({nullable: true})
  lte: number;
  @Field(type => [Int], {nullable: true})
  in: number[];
}
