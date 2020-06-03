import { Field, InputType } from 'type-graphql';

@InputType()
export class RetentionAmountOptionSettingUpdate {
  @Field(t => [String], {nullable: true})
  readonly match?: string[];
  @Field({nullable: true})
  readonly type?: string;
  @Field({nullable: true})
  readonly display?: string;
  getUnzip() {
    const result: any = {};
    Object.keys(this).forEach(x => {
      result[x] = this[x];
    });
    return result;
  }
}
