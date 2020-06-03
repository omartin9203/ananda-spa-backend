import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionRequestSettingUpdate {
  @Field(t => Boolean, {nullable: true})
  default?: boolean;
  @Field(type => [String], {nullable: true})
  readonly personalMatch?: string[];
  @Field(type => [String], {nullable: true})
  readonly requestMatch?: string[];
}
