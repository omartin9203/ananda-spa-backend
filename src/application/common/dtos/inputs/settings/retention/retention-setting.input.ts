import { Field, InputType } from 'type-graphql';
import { RetentionTreatmentSettingInput } from './treatment/retention-treatment-setting.input';
import { RetentionAvailabilitySettingInput } from './availability/retention-availability-setting.input';

@InputType()
export class RetentionSettingInput {
  @Field(t => RetentionTreatmentSettingInput)
  treatment: RetentionTreatmentSettingInput;
  @Field(t => RetentionAvailabilitySettingInput)
  availability: RetentionAvailabilitySettingInput;
}
