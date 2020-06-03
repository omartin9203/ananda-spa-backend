import { RetentionAvailabilityOptionSettingInput } from './retention-availability-option-setting.input';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionAvailabilitySettingInput {
  @Field(t => RetentionAvailabilityOptionSettingInput)
  available: RetentionAvailabilityOptionSettingInput;
  @Field(t => RetentionAvailabilityOptionSettingInput)
  unavailable: RetentionAvailabilityOptionSettingInput;
}
