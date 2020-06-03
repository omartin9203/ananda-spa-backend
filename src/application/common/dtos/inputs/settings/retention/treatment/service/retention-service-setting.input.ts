import { Field, InputType } from 'type-graphql';
import { RetentionServiceMatchSettingInput } from './retention-service-match-setting.input';

@InputType()
export class RetentionServiceSettingInput {
  @Field(t => [RetentionServiceMatchSettingInput])
  setting: RetentionServiceMatchSettingInput[];
  @Field({nullable: true})
  default?: string;
}
