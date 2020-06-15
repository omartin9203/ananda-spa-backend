import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class CalendarEventUpdateDto {
  @Field({ nullable: true })
  summary?: string;
  @Field({ nullable: true })
  colorId?: string;
}
