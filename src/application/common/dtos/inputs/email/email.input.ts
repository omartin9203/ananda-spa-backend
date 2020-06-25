import { Field, InputType } from 'type-graphql';

@InputType()
export class EmailInput {
  @Field(t => [String])
  to: string[];
  @Field()
  subject: string;
  @Field()
  html: string;
}
