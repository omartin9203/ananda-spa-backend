import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionDirectoryOptionSettingInput {
  @Field()
  readonly directoryId: string;
  @Field(t => [String])
  readonly match: string[];
}
