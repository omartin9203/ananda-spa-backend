import { Field, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../core/dtos/resource.dto';

@ObjectType('CalendarEventType')
export class CalendarEventDto extends ResourceDto {
  @Field()
  readonly ID: number;
  @Field()
  readonly summary: string;
  @Field()
  readonly colorId: string;
  @Field()
  readonly createdate: Date;
}
