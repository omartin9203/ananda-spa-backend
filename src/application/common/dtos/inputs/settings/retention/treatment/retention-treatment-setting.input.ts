import { Field, InputType } from 'type-graphql';
import { RetentionServiceSettingInput } from './service/retention-service-setting.input';
import { RetentionRequestSettingInput } from './request/retention-request-setting.input';
import { RetentionAmountSettingInput } from './amount/retention-amount-setting.input';
import { RetentionDirectorySettingInput } from './directory/retention-directory-setting.input';

@InputType()
export class RetentionTreatmentSettingInput {
  @Field(t => RetentionServiceSettingInput)
  services: RetentionServiceSettingInput;

  @Field(t => RetentionRequestSettingInput)
  request: RetentionRequestSettingInput;

  @Field(t => RetentionAmountSettingInput)
  amount: RetentionAmountSettingInput;

  @Field(t => RetentionDirectorySettingInput)
  directory: RetentionDirectorySettingInput;

  @Field(t => RetentionAmountSettingInput)
  tip: RetentionAmountSettingInput;

  @Field(t => [String])
  otherInfo: string[];
}
