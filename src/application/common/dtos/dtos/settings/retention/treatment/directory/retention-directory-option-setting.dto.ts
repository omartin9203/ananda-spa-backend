import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RetentionDirectoryOptionSettingDto {
  @Field()
  readonly directoryId: string;
  @Field(t => [String])
  readonly match: string[];
}
