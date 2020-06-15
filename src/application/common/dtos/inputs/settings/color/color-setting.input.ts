import { Field, InputType } from 'type-graphql';

@InputType()
export class ColorSettingInput {
  @Field()
  colorId: string;
  @Field()
  name: string;
  @Field()
  hexcode: string;
}
