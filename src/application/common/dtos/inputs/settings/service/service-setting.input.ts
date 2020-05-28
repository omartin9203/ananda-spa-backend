import { Field, InputType } from 'type-graphql';

@InputType()
export class ServiceSettingInput {
  @Field()
  name: string;
  @Field(type => [String], { nullable: true })
  roles?: string[];
}
