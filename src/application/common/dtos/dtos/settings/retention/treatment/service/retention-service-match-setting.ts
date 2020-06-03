import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RetentionServiceMatchSetting {
  @Field()
  serviceId: string;
  @Field(type => [String])
  match: string[];
}
