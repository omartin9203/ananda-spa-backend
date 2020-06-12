import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CalendarEventUpdateDto {
  @Field({ nullable: true })
  readonly summary?: string;
  @Field({ nullable: true })
  readonly colorId?: string;
}
