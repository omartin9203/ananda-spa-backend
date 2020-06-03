import { Field, ObjectType } from 'type-graphql';
import { RetentionDirectoryOptionSettingDto } from './retention-directory-option-setting.dto';

@ObjectType()
export class RetentionDirectorySettingDto {
  @Field()
  readonly default: string;
  @Field(t => [RetentionDirectoryOptionSettingDto])
  readonly setting: RetentionDirectoryOptionSettingDto[];
}
