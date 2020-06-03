import { Field, InputType } from 'type-graphql';
import { RetentionAmountOptionSettingDto } from '../../../../../dtos/settings/retention/treatment/amount/retention-amount-option-setting.dto';
import { RetentionAmountOptionSettingInput } from './retention-amount-option-setting.input';

@InputType()
export class RetentionAmountSettingInput {
  @Field({nullable: true})
  readonly default?: string;
  @Field(t => [RetentionAmountOptionSettingInput])
  readonly setting: RetentionAmountOptionSettingInput[];
}
