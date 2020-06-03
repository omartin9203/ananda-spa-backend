import { Field, InputType } from 'type-graphql';
import { RetentionDirectoryOptionSettingDto } from '../../../../../dtos/settings/retention/treatment/directory/retention-directory-option-setting.dto';
import { RetentionDirectoryOptionSettingInput } from './retention-directory-option-setting.input';

@InputType()
export class RetentionDirectorySettingInput {
  @Field()
  readonly default: string;
  @Field(t => [RetentionDirectoryOptionSettingInput])
  readonly setting: RetentionDirectoryOptionSettingInput[];
}
