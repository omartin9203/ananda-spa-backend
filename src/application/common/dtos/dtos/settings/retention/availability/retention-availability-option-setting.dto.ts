import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RetentionAvailabilityOptionSettingDto {
  @Field(t => [String])
  readonly match: string[];
}
