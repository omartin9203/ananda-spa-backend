import { Field, InputType } from 'type-graphql';

@InputType()
export class ColorSettingInput {
  @Field()
  colorId: number;
  @Field()
  name: string;
  @Field()
  hexcode: string;
}
