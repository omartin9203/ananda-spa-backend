import { Field, InputType } from 'type-graphql';
import { RetentionTreatmentSettingInput } from './treatment/retention-treatment-setting.input';
import { RetentionAvailabilitySettingUpdate } from './availability/retention-availability-setting.update';
import { RetentionTreatmentSettingUpdate } from './treatment/retention-treatment-setting.update';

@InputType()
export class RetentionSettingUpdate {
  @Field(t => RetentionTreatmentSettingUpdate, {nullable: true})
  treatment?: RetentionTreatmentSettingUpdate;
  @Field(t => RetentionAvailabilitySettingUpdate, {nullable: true})
  availability?: RetentionAvailabilitySettingUpdate;
  static getUnzip(input: RetentionSettingUpdate) {
    const result: any = {}
    if (input.treatment) {
      const unzip = RetentionTreatmentSettingUpdate.getUnzip(input.treatment);
      Object.keys(unzip).forEach(x => {
        result[`treatment.${x}`] = unzip[x];
      });
    }
    if (input.availability) {
      const unzip = RetentionAvailabilitySettingUpdate.getUnzip(input.availability);
      Object.keys(unzip).forEach(x => {
        result[`availability.${x}`] = unzip[x];
      });
    }
    return result;
  }
}
