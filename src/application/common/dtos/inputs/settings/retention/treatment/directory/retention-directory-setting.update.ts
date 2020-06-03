import { Field, InputType } from 'type-graphql';
import { RetentionDirectoryOptionSettingUpdate } from './retention-directory-option-setting.update';

@InputType()
export class RetentionDirectorySettingUpdate {
  @Field({nullable: true})
  readonly default?: string;
  @Field(t => [RetentionDirectoryOptionSettingUpdate], {nullable: true})
  readonly setting?: RetentionDirectoryOptionSettingUpdate[];
  getUnzip() {
    return { ...this };
  }
}
