import { Field, ObjectType } from 'type-graphql';
import { RetentionAmountOptionSettingDto } from './retention-amount-option-setting.dto';

@ObjectType()
export class RetentionAmountSettingDto {
  @Field({nullable: true})
  readonly default?: string;
  @Field(t => [RetentionAmountOptionSettingDto])
  readonly setting: RetentionAmountOptionSettingDto[];
}
