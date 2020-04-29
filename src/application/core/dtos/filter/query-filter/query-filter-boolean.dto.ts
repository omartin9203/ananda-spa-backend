import {Field, InputType} from "type-graphql";

@InputType()
export class QueryFilterBooleanDto {
  @Field({nullable: true})
  eq?: boolean;
}
