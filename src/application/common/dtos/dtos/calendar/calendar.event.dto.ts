import { Field, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../core/dtos/resource.dto';

@ObjectType()
export class CalendarEventDto extends ResourceDto {
  @Field()
  readonly summary: string;
  @Field({nullable: true})
  readonly description?: string;
  @Field()
  readonly colorId: string;
  @Field()
  readonly start: string;
  @Field()
  readonly end: string;
  @Field(t => String)
  readonly status: 'confirmed' | 'tentative' | 'cancelled';
}
