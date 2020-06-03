import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RetentionAmountOptionSettingDto {
  @Field(t => [String])
  readonly match: string[];
  @Field()
  readonly type: string;
  @Field({nullable: true})
  readonly display?: string;
}
