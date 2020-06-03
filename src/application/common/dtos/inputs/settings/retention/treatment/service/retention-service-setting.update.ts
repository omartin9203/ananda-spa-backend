import { Field, InputType } from 'type-graphql';
import { RetentionServiceMatchSettingInput } from './retention-service-match-setting.input';
import { RetentionServiceMatchSettingUpdate } from './retention-service-match-setting.update';

@InputType()
export class RetentionServiceSettingUpdate {
  @Field(t => [RetentionServiceMatchSettingUpdate], {nullable: true})
  setting?: RetentionServiceMatchSettingUpdate[];
  @Field({nullable: true})
  default?: string;
  getUnzip() {
    return { ...this };
  }
}
