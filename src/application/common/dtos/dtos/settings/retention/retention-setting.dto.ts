import { Field, ObjectType } from 'type-graphql';
import { ResourceDto } from '../../../../../core/dtos/resource.dto';
import { RetentionTreatmentSettingDto } from './treatment/retention-treatment-setting.dto';
import { RetentionAvailabilitySettingDto } from './availability/retention-availability-setting.dto';

@ObjectType()
export class RetentionSettingDto extends ResourceDto {
  @Field(t => RetentionTreatmentSettingDto)
  readonly treatment: RetentionTreatmentSettingDto;
  @Field(t => RetentionAvailabilitySettingDto)
  readonly availability: RetentionAvailabilitySettingDto;
}
