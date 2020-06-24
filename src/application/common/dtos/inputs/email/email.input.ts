import { Field, InputType } from 'type-graphql';

@InputType()
export class EmailInput {
  @Field()
  to: string;
  @Field()
  subject: string;
  @Field()
  html: string;
}
