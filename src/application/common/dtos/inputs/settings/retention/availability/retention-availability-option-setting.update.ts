import { Field, InputType } from 'type-graphql';
import { RetentionAvailabilityOptionSettingInput } from './retention-availability-option-setting.input';

@InputType()
export class RetentionAvailabilityOptionSettingUpdate {
  @Field(t => [String], {nullable: true})
  readonly match?: string[];
  static getUnzip(input: RetentionAvailabilityOptionSettingUpdate) {
    const result: any = {};
    Object.keys(input).forEach(x => {
      result[x] = input[x];
    });
    return result;
  }
}
