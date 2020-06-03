import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionAvailabilityOptionSettingInput {
  @Field(t => [String])
  readonly match: string[];
}
