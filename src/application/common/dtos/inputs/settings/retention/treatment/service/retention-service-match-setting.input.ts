import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionServiceMatchSettingInput {
  @Field()
  serviceId: string;
  @Field(type => [String])
  match: string[];
}
