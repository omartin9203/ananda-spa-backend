import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionRequestSettingInput {
  @Field(t => Boolean)
  default: boolean;
  @Field(type => [String])
  readonly personalMatch: string[];
  @Field(type => [String])
  readonly requestMatch: string[];
}
