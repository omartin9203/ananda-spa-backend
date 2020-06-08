import { Field, InputType } from 'type-graphql';
import { RetentionServiceSettingInput } from './service/retention-service-setting.input';
import { RetentionRequestSettingInput } from './request/retention-request-setting.input';
import { RetentionAmountSettingInput } from './amount/retention-amount-setting.input';
import { RetentionDirectorySettingInput } from './directory/retention-directory-setting.input';
import { RetentionAmountSettingUpdate } from './amount/retention-amount-setting.update';
import { RetentionDirectorySettingUpdate } from './directory/retention-directory-setting.update';
import { RetentionRequestSettingUpdate } from './request/retention-request-setting.update';
import { RetentionServiceSettingUpdate } from './service/retention-service-setting.update';

@InputType()
export class RetentionTreatmentSettingUpdate {
  @Field(t => RetentionServiceSettingUpdate, {nullable: true})
  services?: RetentionServiceSettingUpdate;

  @Field(t => RetentionRequestSettingUpdate, {nullable: true})
  request?: RetentionRequestSettingUpdate;

  @Field(t => RetentionAmountSettingUpdate, {nullable: true})
  amount?: RetentionAmountSettingUpdate;

  @Field(t => RetentionDirectorySettingUpdate, {nullable: true})
  directory?: RetentionDirectorySettingUpdate;

  @Field(t => RetentionAmountSettingUpdate, {nullable: true})
  tip?: RetentionAmountSettingUpdate;

  @Field(t => [String], {nullable: true})
  otherInfo?: string[];

  static getUnzip(input: RetentionTreatmentSettingUpdate) {
    const result: any = {};
    Object.keys(input).forEach(x => {
      if (x === 'otherInfo') {
        result[x] = input[x];
      } else {
        const unzip = input[x];
        Object.keys(unzip).forEach(field => {
          result[`${x}.${field}`] = unzip[field];
        });
      }
    });
    return result;
  }
}
