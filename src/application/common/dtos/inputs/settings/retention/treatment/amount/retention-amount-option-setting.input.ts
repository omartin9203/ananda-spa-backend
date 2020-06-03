import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionAmountOptionSettingInput {
  @Field(t => [String])
  readonly match: string[];
  @Field()
  readonly type: string;
  @Field({nullable: true})
  readonly display?: string;
}
