import { Field, InputType } from 'type-graphql';

@InputType()
export class NoteInput {
  @Field()
  text: string;
  @Field()
  status: string;
  @Field()
  performedById: string;
}
