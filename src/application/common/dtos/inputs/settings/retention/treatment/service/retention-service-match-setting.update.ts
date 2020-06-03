import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionServiceMatchSettingUpdate {
  @Field({nullable: true})
  serviceId?: string;
  @Field(type => [String], {nullable: true})
  match?: string[];
}
