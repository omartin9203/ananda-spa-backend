import {Field, InputType} from "type-graphql";

@InputType()
export class QueryFilterExistsDto {
  @Field({nullable: true})
  exists?: boolean;
}
