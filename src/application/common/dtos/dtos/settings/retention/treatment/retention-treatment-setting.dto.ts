import { Field, ObjectType } from 'type-graphql';
import { RetentionServiceSettingDto } from './service/retention-service-setting.dto';
import { RetentionRequestSettingDto } from './request/retention-request-setting.dto';
import { RetentionAmountSettingDto } from './amount/retention-amount-setting.dto';
import { RetentionDirectorySettingDto } from './directory/retention-directory-setting.dto';

@ObjectType()
export class RetentionTreatmentSettingDto {
  @Field(t => RetentionServiceSettingDto)
  readonly services: RetentionServiceSettingDto;
  @Field(t => RetentionRequestSettingDto)
  readonly request: RetentionRequestSettingDto;
  @Field(t => RetentionAmountSettingDto)
  readonly amount: RetentionAmountSettingDto;
  @Field(t => RetentionDirectorySettingDto)
  readonly directory: RetentionDirectorySettingDto;
  @Field(t => RetentionAmountSettingDto)
  readonly tip: RetentionAmountSettingDto;
  @Field(t => [String], {defaultValue: []})
  readonly otherInfo: string[];
}
