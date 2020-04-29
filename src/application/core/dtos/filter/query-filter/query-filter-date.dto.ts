import {Field, InputType} from "type-graphql";

@InputType()
export class QueryFilterDateDto {
  @Field({nullable: true})
  eq?: Date;
  @Field({nullable: true})
  gt: Date;
  @Field({nullable: true})
  gte: Date;
  @Field({nullable: true})
  lt: Date;
  @Field({nullable: true})
  lte: Date;
  @Field(type => [Date], {nullable: true})
  in: Date[];
}
