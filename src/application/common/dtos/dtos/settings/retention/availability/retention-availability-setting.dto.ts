import { Field, ObjectType } from 'type-graphql';
import { RetentionAvailabilityOptionSettingDto } from './retention-availability-option-setting.dto';

@ObjectType()
export class RetentionAvailabilitySettingDto {
  @Field(t => RetentionAvailabilityOptionSettingDto)
  readonly available: RetentionAvailabilityOptionSettingDto;
  @Field(t => RetentionAvailabilityOptionSettingDto)
  readonly unavailable: RetentionAvailabilityOptionSettingDto;
}
