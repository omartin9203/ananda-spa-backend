import {Field, InputType} from 'type-graphql';

@InputType()
export class QueryFilterIdDto {
  @Field({nullable: true})
  eq?: string;
  @Field(type => [String], {nullable: true})
  in?: string[];
}
