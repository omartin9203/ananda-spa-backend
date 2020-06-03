import { Field, InputType } from 'type-graphql';
import { RetentionAmountOptionSettingUpdate } from './retention-amount-option-setting.update';

@InputType()
export class RetentionAmountSettingUpdate {
  @Field({nullable: true})
  readonly default?: string;
  @Field(t => [RetentionAmountOptionSettingUpdate], {nullable: true})
  readonly setting?: RetentionAmountOptionSettingUpdate[];
}
