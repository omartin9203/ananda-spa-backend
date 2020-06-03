import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RetentionRequestSettingDto {
  @Field()
  readonly default: boolean;
  @Field(type => [String])
  readonly personalMatch: string[];
  @Field(type => [String])
  readonly requestMatch: string[];
}
