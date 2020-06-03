import { Field, ObjectType } from 'type-graphql';
import { RetentionServiceMatchSetting } from './retention-service-match-setting';

@ObjectType()
export class RetentionServiceSettingDto {
  @Field(t => [RetentionServiceMatchSetting])
  readonly setting: RetentionServiceMatchSetting[];
  @Field({nullable: true})
  readonly default?: string;
}
