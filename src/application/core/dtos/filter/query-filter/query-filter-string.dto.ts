import {Field, InputType} from 'type-graphql';

@InputType()
export class QueryFilterStringDto {
  @Field({nullable: true})
  eq?: string;
  @Field(type => [String], {nullable: true})
  in?: string[];
  @Field({nullable: true})
  regex: string;
}
