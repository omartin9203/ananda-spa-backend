import { Field, InputType } from 'type-graphql';
import { RetentionAvailabilityOptionSettingUpdate } from './retention-availability-option-setting.update';

@InputType()
export class RetentionAvailabilitySettingUpdate {
  @Field(t => RetentionAvailabilityOptionSettingUpdate, {nullable: true})
  available?: RetentionAvailabilityOptionSettingUpdate;
  @Field(t => RetentionAvailabilityOptionSettingUpdate, {nullable: true})
  unavailable?: RetentionAvailabilityOptionSettingUpdate;
  static getUnzip(input: RetentionAvailabilitySettingUpdate) {
    const result: any = {};
    Object.keys(input).forEach(x => {
      const unzip = RetentionAvailabilityOptionSettingUpdate.getUnzip(input[x]);
      Object.keys(unzip).forEach(field => {
        result[`${x}.${field}`] = unzip[field];
      });
    });
    return result;
  }
}
