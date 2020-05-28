import { Field, InputType } from 'type-graphql';

@InputType()
export class ServiceSettingUpdate {
  @Field({nullable: true})
  name?: string;
  @Field(type => [String], { nullable: true })
  roles?: string[];
}
