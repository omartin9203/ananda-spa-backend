import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionDirectoryOptionSettingUpdate {
  @Field({nullable: true})
  readonly directoryId?: string;
  @Field(t => [String], {nullable: true})
  readonly match?: string[];
}
